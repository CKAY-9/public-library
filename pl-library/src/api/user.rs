use actix_web::{web, Responder, post, HttpResponse};
use serde::{Deserialize, Serialize};
use sha2::{Sha256, Digest};

#[derive(Deserialize)]
struct CreateUserDTO {
    username: String,
    password: String
}

#[derive(Serialize)]
struct CreateUserRes {
    token: String,
    message: String
}

#[post("/create")]
async fn create_user(user: web::Json<CreateUserDTO>) -> Result<impl Responder, Box<dyn std::error::Error>> {
    if user.username.is_empty() {
        let res = CreateUserRes {
            token: String::from(""),
            message: String::from("Username cannot be empty")
        };
        return Ok(HttpResponse::Ok().json(res));
    }

    let mut hasher = Sha256::new();
    hasher.update(format!("{}{}", user.username, user.password).into_bytes());
    let token: String = format!("{:X}", hasher.finalize());

    return Ok(HttpResponse::Ok().json(CreateUserRes {
        token,
        message: String::from("Created user")
    }))
}

pub fn configure_user(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/user")
            .service(create_user)
    );
}
