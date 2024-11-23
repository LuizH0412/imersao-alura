import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controlers/postsControlers.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads", storage})

const routes = (app) => {
    // Habilita o middleware `express.json()` para permitir que a aplicação receba dados no formato JSON.
    app.use(express.json());
    app.use(cors(corsOptions))
    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);

    // Rota para criar um post
    app.post("/posts", postarNovoPost)

    // Rota para armazenar imagens na pasta "uploads" do servidor, solicitando uma única imagem.
    app.post("/upload", upload.single("Imagem"), uploadImagem)

    // Rota para atualizações dos registros no banco
    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;


