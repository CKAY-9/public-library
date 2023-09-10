use crate::models::{LibUser, NewUser};

pub fn create_user(conn: &mut PgConnection, username: &str, token: &str) -> LibUser 

    let new_user = NewUser {
        username,
        token
    };

    diesel::insert_into()
}
