const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.ico':'image/x-icon','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain','.json':'application/json'};
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if(p==='/'||p.endsWith('/')) p += 'index.html';
  const fp = path.join(root, p);
  fs.readFile(fp,(e,data)=>{
    if(e){res.writeHead(404);res.end('404');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(fp)]||'application/octet-stream'});
    res.end(data);
  });
}).listen(process.env.PORT||4321,()=>console.log('serving on '+(process.env.PORT||4321)));
