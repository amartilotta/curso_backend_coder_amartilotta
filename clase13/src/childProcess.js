function sumar(){
    let suma = 0;
    for (let i = 0; i < 5e9; i++){
        suma += 1;
    }
    return suma;
}

process.on('message',(message)=>{
    console.log(message);
    const resultado = sumar();
    process.send(resultado);
})