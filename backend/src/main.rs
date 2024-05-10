use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;
use dotenvy::dotenv;
use std::env;
use tracing::info;
use tracing_subscriber::FmtSubscriber;

pub mod models;
pub mod schema;

// use crate::schema::messages::dsl::*;
// use crate::schema::users::dsl::*;

use models::*;

use axum::routing::get;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use socketioxide::{
    extract::{AckSender, Bin, Data, SocketRef},
    SocketIo,
};
use std::sync::atomic::AtomicUsize;
use tower::ServiceBuilder;

use crate::schema::messages::{self, message};
// use tower_http::{cors::CorsLayer, services::ServeDir};

#[derive(Deserialize, Serialize, Debug, Clone)]
#[serde(transparent)]
struct Username(String);

// #[derive(Deserialize, Serialize, Debug, Clone)]
// #[serde(rename_all = "camelCase", untagged)]
// enum Res {
//     Login {
//         #[serde(rename = "numUsers")]
//         num_users: usize,
//     },
//     UserEvent {
//         #[serde(rename = "numUsers")]
//         num_users: usize,
//         username: Username,
//     },
//     Message {
//         username: Username,
//         message: String,
//     },
//     Username {
//         username: Username,
//     },
// }


// struct UserCnt(AtomicUsize);
// impl UserCnt {
//     fn new() -> Self {
//         Self(AtomicUsize::new(0))
//     }
//     fn add_user(&self) -> usize {
//         self.0.fetch_add(1, std::sync::atomic::Ordering::SeqCst) + 1
//     }
//     fn remove_user(&self) -> usize {
//         self.0.fetch_sub(1, std::sync::atomic::Ordering::SeqCst) - 1
//     }
// }

#[derive(Debug, Serialize, Deserialize)]
pub struct UserAddress(String);


pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("Database url must be set");

    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to database {}", database_url))
}

fn on_connect(s: SocketRef, Data(data): Data<NewMessage>) {
    info!("Socket.IO connected: {:?} {:?}", s.ns(), s.id);

    let connection = &mut establish_connection();

    s.broadcast().emit("auth", data).ok();

    // s.on("new message", |s: SocketRef, Data::<NewMessage>(msg)| {
    //     diesel::insert_into(messages::table)
    //     .values(&msg)
    //     // .returning(Messages::as_returning())
    //     // .get_result(connection)
    //     // .expect("Error saving message");
    //     .execute(connection)
    //     .unwrap();

    //     s.broadcast().emit("new message", msg).ok();
    // });

    s.on("new message", |s: SocketRef, Data::<NewMessage>(msg)| {

        // connection.immediate_transaction(|connection: &mut SqliteConnection| {
        //     diesel::insert_into(messages::table)
        //     .values(msg)
        //     .execute(connection)
        // });

        s.broadcast().emit("new message", msg).ok();
    });

    s.on("typing", |s: SocketRef, Data::<UserAddress>(msg)| {
        // let username = s.extensions.get::<Username>().unwrap().clone();
        s.broadcast()
            .emit("typing", msg)
            .ok();
    });

    s.on("stop typing", |s: SocketRef, Data::<UserAddress>(msg)| {
        s.broadcast()
            .emit("stop typing", msg )
            .ok();
    });

    s.on_disconnect(|s: SocketRef| {
        s.broadcast().emit("user left", String::from("")).ok();
    });

}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let subscriber = FmtSubscriber::new();

    tracing::subscriber::set_global_default(subscriber)?;

    info!("Starting server");

    let (layer, io) = SocketIo::builder().build_layer();

    io.ns("/", on_connect);

    let app = axum::Router::new()
        // .nest_service("/", ServeDir::new("dist"))
        .route("/", get(|| async {"Welcome to this chat"}))
        .layer(
            ServiceBuilder::new()
                // .layer(CorsLayer::permissive()) // Enable CORS policy
                .layer(layer),
        );

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();

    Ok(())
}

