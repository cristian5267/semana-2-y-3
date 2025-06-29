import express from "express";
import bodyParser from "body-parser";
import http from "http";
import morgan from "morgan";
import { Server as SocketIOServer } from "socket.io";
import { customMiddleware } from "./middlewares/customMiddleware.js";
import usersRouter from "./routes/users.routes.js";
import productsRouter from "./routes/products.routes.js";
import { configDb } from "./config/db.js";
import dotenv from "dotenv";
import { apiRateLimit } from "./middlewares/apiRateLimit.js";
import mariadb from "mariadb";
import { setupSocket } from "./config/socketio.js";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);
const socketio = new SocketIOServer(server, { cors: { origin: "*" } });

app.use(bodyParser.json());
app.use(morgan("combined")); 
app.use(apiRateLimit);
app.use(cors());

app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.get("/", [customMiddleware], (req, res) => {
    console.log(req.headers.myTime);
    return res.json({
        message: "Hola mundo",
    });
});

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,

});

async function verificarConexion() {
    try {
        const conexion = await pool.getConnection();
        console.log('Conexión exitosa con Docker');
        conexion.end();
    } catch (error) {
        console.error('Error al conectar:', error);
    }
}

configDb();
setupSocket(socketio);

server.listen(8000, () => {
    console.log("Listening on port 8000");
});

verificarConexion();

