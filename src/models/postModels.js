import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Utiliza a função `conectarAoBanco` para estabelecer a conexão com o banco de dados.
const conexão = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    // Função assíncrona para buscar todos os posts do banco de dados.
    const db = conexão.db("imersao-instabytes");
    // Obtém o banco de dados com o nome "imersao-instabytes" da conexão estabelecida.
    const colecao = db.collection("posts");
    // Obtém a coleção "posts" dentro do banco de dados.
    return colecao.find().toArray();
    // Executa uma consulta para encontrar todos os documentos da coleção e retorna os resultados como um array.
};

export async function criarPost(novoPost){
        const db = conexão.db("imersao-instabytes");
        const colecao = db.collection("posts");
        return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost){
    const db = conexão.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)

    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost})
}
