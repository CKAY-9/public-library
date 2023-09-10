use actix_web::{HttpServer, App};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
    })    
    .bind(("127.0.0.1", 3001))?
    .run()
    .await
}
