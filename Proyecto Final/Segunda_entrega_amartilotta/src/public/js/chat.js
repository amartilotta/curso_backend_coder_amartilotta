const socketClient = io();

const form = document.getElementById('chatForm');
const inputMessage = document.getElementById('chatMessage');
const h3Name = document.getElementById('name');
const divChat = document.getElementById('chat');

let user;
let email;

Swal.fire({
    title: 'Bienvenido',
    text: 'Ingrese su email',
    input: 'text',
    inputValidator: value=>{
        if(!value){
            return "El nombre es requerido"
        } else if (!value.includes('@')) {
            return 'El email debe contener una arroba (@)';
        }
    },
    confirmButtonText: 'Enter',
  }).then(input=>{
    user = input.value
    h3Name.innerText = `Chat user: ${user}`;
    socketClient.emit('newUser', user)
});

socketClient.on('newUserBroadcast', (user)=>{
    Toastify({
        text: `${user} conectado`,
        duration: 5000,
        
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
});

form.onsubmit = (e) =>{
    e.preventDefault();
    const infoMessage = {
        user: user,
        message: inputMessage.value,
    };
    inputMessage.value = '';

    // Ajusta la posición de desplazamiento al final del chat
    divChat.scrollTop = chat.scrollHeight;
    socketClient.emit('message', infoMessage);
};

socketClient.on('chat',(messages) => {
    const chat = messages.map(
        objMessage=>`<p>${objMessage.user}: ${objMessage.message}</p>`
    ).join(' ')
    divChat.innerHTML = chat;
    
});

//A mejorar, persistencia de tiempo