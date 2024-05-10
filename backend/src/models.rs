use diesel::prelude::*;
use serde::{Serialize, Deserialize};

// #[derive(Queryable, Selectable)]
// #[diesel(table_name = crate::schema::users)]
// #[diesel(check_for_backend(diesel::sqlite::Sqlite))]
// pub struct Users {
//     pub id: i32,
//     pub name: Option<String>,
//     pub address: Option<String>,
// }



#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::messages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Messages {
    pub id: i32,
    pub from_user_id: String,
    pub to_user_id: String,
    pub message: String,
}


#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::messages)]
pub struct NewMessage {
    pub from_user_id: String,
    pub to_user_id: String,
    pub message: String,
}