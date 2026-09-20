import http from 'node:http';

const token=process.env.WORDLY_TRANSLATOR_TOKEN;
if(!token)throw new Error('WORDLY_TRANSLATOR_TOKEN is required');

http.createServer(async(req,res)=>{
  if(req.method!=='POST'||req.url!=='/translate'||req.headers.authorization!==`Bearer ${token}`){res.writeHead(401).end();return;}
  try{
    const chunks=[];for await(const chunk of req)chunks.push(chunk);
    const upstream=await fetch('http://translator:5000/translate',{method:'POST',headers:{'content-type':'application/json'},body:Buffer.concat(chunks)});
    res.writeHead(upstream.status,{'content-type':'application/json'}).end(await upstream.text());
  }catch(error){console.error(error);res.writeHead(502,{'content-type':'application/json'}).end(JSON.stringify({error:'Translator unavailable'}));}
}).listen(8080,'0.0.0.0',()=>console.log('Wordly translator proxy is ready on port 8080'));
