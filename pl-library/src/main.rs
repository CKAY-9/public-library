use actix_web::{HttpServer, App};
use api::configure_api;

mod api;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .configure(configure_api)
    })    
    .bind(("127.0.0.1", 3001))?
    .run()
    .await
}
