import { signInSchema, signUpSchema } from "../model/users.model.js";
import { usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUpParticipants(req, res) { 

    // escreva aqui a função de cadastro do usuário

    try {
    const { name, email } = req.body;
    await usersCollection.insertOne({name, email});
    res.status(201).send("Usuário cadastrado com sucesso!");

        
    } catch (error) {
        console.log(error)
    }

}

export async function signInParticipants(req, res) { 
    

    // escreva aqui a função de login do usuário

    try {
    const { name, email } = req.body;
    const user = await usersCollection.findOne({ email });
    if(name !== user.name){
        return res.status(401).send({message: "nome incorreto" })
    }
    res.status(200).send(user);
        
    } catch (error) {
        console.log(error)
    }

}