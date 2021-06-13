const socket =io();
let name ;
let messageArea=document.querySelector('.message_area');
do{
name = prompt("enter your name");
console.log(name);
}while(name ==null)


let textarea = document.querySelector('#textarea');


textarea.addEventListener('keyup',(e)=>{
    if(e.key=="Enter"){
       sendMsg(e.target.value) ;
    }
})

function sendMsg(message){
    let msg ={
        user:name,
        message:message.trim()
    }   
    appendmessage(msg,'outgoing');

    socket.emit('message',msg)



}
 function appendmessage(msg,type){
     let node = document.createElement('div');
     let type_of =type;
     node.classList.add(type_of,"message");
     let markup = `
     <h4>${msg.user}</h4>
     <p>${msg.message} </p>
     
     `;
     node.innerHTML=markup;
     messageArea.appendChild(node);



 }



 socket.on('message',(msg)=>{
    appendmessage(msg,'incoming')
})