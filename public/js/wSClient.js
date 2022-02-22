const socket = io()
console.log (socket)

// socket.on("hi",(data)=>{
//    alert(data)
// })
socket.on("allProductos",(data)=>{
   let ulProductos = document.querySelector('#ulProductos')
   let dataParse = JSON.parse(data)
   let html
   fetch ('/static/base/productos.hbs')
   .then(respuesta => respuesta.text())
   .then (plantillaHBS => {
      // compilo la plantilla product
      const plantilla = Handlebars.compile(plantillaHBS)
      // armo el html con la plantilla compilada
      html = plantilla ({dataParse})
   })
   .finally(()=>{
      ulProductos.innerHTML = html
   })
   .catch (err => {
      console.log (err)
   })
})


socket.on("allPrevMsg",(data)=>{
   let chat = document.querySelector('#chat')
   let html
   fetch ('/static/base/chats.hbs')
   .then(respuesta => respuesta.text())
   .then (plantillaHBS => {
      // compilo la plantilla product
      const plantilla = Handlebars.compile(plantillaHBS)
      // armo el html con la plantilla compilada
      html = plantilla ({data})
      chat.innerHTML = html
   })
   .catch (err => {
      console.log (err)
   })
})
 
const btn_enviar = document.querySelector('#btn_enviar')
btn_enviar.addEventListener('click',(e)=>{
   e.preventDefault();
   console.log ('evento btn_enviar')
   const form_title=document.querySelector('#title').value;
   const form_price=document.querySelector('#price').value;
   const form_thumbnail=document.querySelector('#thumbnail').value;
   const producto = {
      title: form_title,
      price:form_price,
      thumbnail:form_thumbnail
   }

   if (form_title.length && form_price.length){
      socket.emit("save",producto)
      document.querySelector('#title').value=""
      document.querySelector('#price').value=undefined
      document.querySelector('#thumbnail').value=""
   } 
})
document.querySelector('#textarea_chat').value="123222"
document.querySelector('#input_email').value="lucasvega2@gmail.com"
const send_msg = document.querySelector('#send_msg')
send_msg.addEventListener('click',(e)=>{
   e.preventDefault();
   textareachat=document.querySelector('#textarea_chat').value
   inputemail=document.querySelector('#input_email').value
   if (textareachat && inputemail) {
      const myMsg = {user:inputemail, msj:textareachat}
      socket.emit("msg",myMsg)
      document.querySelector('#textarea_chat').value=""
      document.querySelector('#input_email').value=""
   }
})
