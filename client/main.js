var socket = io.connect('http://localhost:8000',{'forceNew':true});

//Recibir mensajes
socket.on('messages', function (data){
    console.log(data);
    render(data); 
});

//
function render(data){
    var html = data.map(function(message, index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>

        `);
    }).join('');

    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight; 
}

//funcion para llenar mensajes
function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}