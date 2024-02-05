import express from 'express';
import {fork} from 'child_process';

const app = express();

function sumar(){
    let suma = 0;
    for (let i = 0; i < 7e9; i++){
        suma += 1;
    }
    return suma;
}

let visitas = 0

app.get("", (req,res) =>{
    res.send(`Esta es la visita numro ${++visitas}`);
});

app.get("/calculo-bloq", (req,res)=>{
    const resultado = sumar();
    res.send(`El resultado de la suma es ${resultado}`);
});

app.get("/calculo-nobloq", (req,res)=>{
    const childProcess = fork("./src/childProcess.js");
    childProcess.send('sumar');
    childProcess.on('message',(message)=>{
        res.send(`El resultado de la suma es ${message}`);
    });
});

app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
});