use actix_web::web;
use self::user::configure_user;

mod user;

pub fn configure_api(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .configure(configure_user)
    );
}
