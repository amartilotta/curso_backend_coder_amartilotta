console.log("Probando cliente")
const socketClient = io();

const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");

form.onsubmit = (e)=>{
    e.preventDefault()
    const price = inputPrice.value
    const userName = inputName.value
    socketClient.emit("firstEvent", userName)
    //console.log("probando");
    socketClient.emit("thirdEvent", price)
    console.log("probando");
}

socketClient.on('secondEvent', info => {
    console.log(`info sent: ${info}`)
})

socketClient.on('fourthEvent', info => {
    console.log(`NewPrice: ${info}`)
})