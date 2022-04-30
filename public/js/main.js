// const socket = io()

// const formAgregarProducto = document.getElementById('formulario')

// formAgregarProducto.addEventListener('submit', e =>{
//     e.preventDefault()
//     const Producto = {
//         titulo: document.getElementById('titulo').value,
//         precio: document.getElementById('precio').value,
//         foto: document.getElementById('foto').value
//     }
    
//     socket.emit('newProduct', Producto)
//     formAgregarProducto.reset()
// })

// const Email = document.getElementById('mail')
// Email.addEventListener('change', e =>{
//     e.preventDefault()
//     document.getElementById('mensaje').disabled = false;
//     document.getElementById('sendMessage').disabled = false;
// })
// Email.addEventListener('emptied', e =>{
//     e.preventDefault()
//     document.getElementById('mensaje').disabled = true;
//     document.getElementById('sendMessage').disabled = true;
    
// })

// const formMensaje = document.getElementById('formMensaje')
// formMensaje.addEventListener('submit', e =>{
//     e.preventDefault()
//     const Mensaje = {
//         mail: document.getElementById('mail').value,
//         mensaje: document.getElementById('mensaje').value,
//         fecha: new Date().toISOString()
//     }
//     if (Mensaje.mensaje.length > 0 && Mensaje.mail.length > 0){
//         socket.emit('newMessage', Mensaje)
//         document.getElementById('mensaje').value = ''
//     }
// })

// socket.on('productos', async productos =>{
//     const recursoRemoto = await fetch('plantillas/productos.ejs')
//     const textoPlantilla = await recursoRemoto.text()
    
//     const functionTemplate = ejs.compile(textoPlantilla)
    
//     const html = functionTemplate({productos})
    
//     document.getElementById('productos').innerHTML = html
// })

// socket.on('mensajes', async mensajes =>{
//     const recursoRemoto = await fetch('plantillas/chat.ejs')
//     const textoPlantilla = await recursoRemoto.text()
    
//     const functionTemplate = ejs.compile(textoPlantilla)
    
//     const html = functionTemplate({mensajes})
//     document.getElementById('mensajes').innerHTML = html
// })

fetch("/api/productos-test")
    .then(data => data.json())
    .then( async data => {
        const recursoRemoto = await fetch('plantillas/productos.ejs')
        const textoPlantilla = await recursoRemoto.text()
        
        const functionTemplate = ejs.compile(textoPlantilla)
        
        const html = functionTemplate(data)
        
        document.getElementById('productos').innerHTML = html
    })



