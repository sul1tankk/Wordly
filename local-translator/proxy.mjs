import http from 'node:http';
import {webcrypto} from 'node:crypto';

const publicKey=await webcrypto.subtle.importKey('spki',Buffer.from('MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE9Jugu6Efm1qGritd4CRw/eTMV6yI4LrMgpuwHKHx1eSvbUU6et5Cwa8pFoJbjaCR+TWRoLS2NY7CfsVUonD96w==','base64'),{name:'ECDSA',namedCurve:'P-256'},false,['verify']);

http.createServer(async(req,res)=>{
  if(req.method!=='POST'||req.url!=='/translate'){res.writeHead(404).end();return;}
  try{
    const chunks=[];for await(const chunk of req)chunks.push(chunk);
    const body=Buffer.concat(chunks),timestamp=String(req.headers['x-wordly-timestamp']||''),signature=String(req.headers['x-wordly-signature']||'');
    if(!timestamp||!signature||Math.abs(Date.now()-Number(timestamp))>300000){res.writeHead(401).end();return;}
    const valid=await webcrypto.subtle.verify({name:'ECDSA',hash:'SHA-256'},publicKey,Buffer.from(signature,'base64'),Buffer.concat([Buffer.from(timestamp+'\n'),body]));
    if(!valid){res.writeHead(401).end();return;}
    const upstream=await fetch('http://translator:5000/translate',{method:'POST',headers:{'content-type':'application/json'},body});
    res.writeHead(upstream.status,{'content-type':'application/json'}).end(await upstream.text());
  }catch(error){console.error(error);res.writeHead(502,{'content-type':'application/json'}).end(JSON.stringify({error:'Translator unavailable'}));}
}).listen(8080,'0.0.0.0',()=>console.log('Wordly translator proxy is ready on port 8080'));
