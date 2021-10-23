const http = require('http');


const Server = http.createServer((request, response)=> {
  now = new Date
  now = now.getHours()

  if (now < 12){
    response.end('Buen dia')
  }else if (now >= 12 && now <= 18 ){
    response.end('Buenas tardes')
  }else{
    response.end('Buenas Noches')
  }
  
}).listen(8080);

console.log(`Server running at ${Server.address().port}`);