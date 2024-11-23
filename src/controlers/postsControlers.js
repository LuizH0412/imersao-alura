import fs from "fs"
import { getTodosPosts, criarPost, atualizarPost } from "../models/postModels.js";
import gerarDescricaoComGemini from "../services/geminiServices.js";

export async function listarPosts(req, res) {
    // Define uma rota GET para a URL "/posts".
    const resultado = await getTodosPosts();
    // Chama a função `getTodosPosts` para obter todos os posts e armazena o resultado.
    res.status(200).json(resultado);
    // Envia uma resposta HTTP com status 200 (OK) e o resultado da consulta no formato JSON.
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição!"})
    }
} 

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
    
    try {
        const postCriado = await criarPost(novoPost);
        const imgAtualizada = `./uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imgAtualizada)
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição!"})
    }
} 

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imageBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição!"})
    }
} 

