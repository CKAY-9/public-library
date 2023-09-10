use diesel::prelude::*;

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::lib_users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct LibUser {
    pub id: i32,
    pub username: String,
    pub token: String
}

#[derive(Insertable)]
#[diesel(table_name = lib_users)]
pub struct NewUser<'a> {
    pub username: &'a str,
    pub token: &'a str
}
