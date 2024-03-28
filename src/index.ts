import { Server } from "./Server";
import dotenv from "dotenv";
import { authenticate } from "./DataBase/DataBase";
dotenv.config();
const app = new Server();
const PORT = process.env.PORT || 3000;

authenticate(); // Faz a autênticação com a database

app.server.listen(PORT, ()=>{
    console.log(`Server running on port: http://localhost:${PORT}`)
})