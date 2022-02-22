const express = require ('express')
const app = express()
const http = require ('http')
const path = require ('path')
const Contenedor = require ('./models/Contenedor')
const oneContainer = new Contenedor('./database/productos.txt')

const Container_msg = require ('./models/Container_msg')
const oneContainer_msg = new Container_msg('./database/bkp_mensajes.txt')

const moment = require ('moment')
// tomamos la clase Server de socket.io
// instanciamos en io de esa clase. y enviamos como argumento server de http
const { Server } = require ('socket.io')
const server = http.createServer(app)
const io = new Server(server)


app.use("/static", express.static(path.join(__dirname, 'public')));
app.get ('/',(req,res)=>{
   res.sendFile(path.join(__dirname,'public/index.html'))
})

io.on('connection',async (socket)=>{
   console.log ('An user are with us now')
   console.log (socket.id)

   
   //envío todos los productos.
   socket.emit("allProductos", await oneContainer.getAll())
   socket.on("save", async producto =>{
      // guardo el producto
      await oneContainer.save(producto)
      // renderizo los productos para todos
      io.sockets.emit("allProductos",await oneContainer.getAll())
   })

   socket.emit("allPrevMsg", await oneContainer_msg.getAll());

   socket.on("msg", async myMsg =>{
      const ahora = moment().format('DD/MM/YYYY HH:mm:ss')
      myMsg.date = ahora;
      await oneContainer_msg.save(myMsg)
      // renderizo los mensajes para todos
      io.sockets.emit ("allPrevMsg", await oneContainer_msg.getAll());
   })
})
/*
    socket.emit('mensajes', await mensajesApi.listarAll());
    io.sockets.emit('mensajes', await mensajesApi.listarAll());

*/


server.listen(8081,()=>{
   console.log ('listening on port 8081')
})