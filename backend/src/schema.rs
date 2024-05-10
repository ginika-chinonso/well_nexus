// @generated automatically by Diesel CLI.

diesel::table! {
    messages (id) {
        id -> Integer,
        from_user_id -> Text,
        to_user_id -> Text,
        message -> Text,
    }
}
