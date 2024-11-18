(()=>{var e={887:(e,r,n)=>{const i=n(383).promises,t=n(3);e.exports={listar:async(e,r)=>{try{const e=t.join(__dirname,"..","public/json","ingredientes.json"),n=await i.readFile(e,"utf8"),s=JSON.parse(n);return r.send(s)}catch(e){return console.error("Error al leer el archivo:",e),r.code(500).send({message:"Error interno del servidor"})}},crear:async(e,r)=>{const{nombre:n,cantidad:s,precio:o}=e.body,a=t.join(__dirname,"..","public/json","ingredientes.json"),c=await i.readFile(a,"utf8"),d=JSON.parse(c);let l=function(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");return function(e){let r=e.length;for(;0!==r;){const n=Math.floor(Math.random()*r);r--,[e[r],e[n]]=[e[n],e[r]]}}(e),e.slice(0,10).join("")}();const u={id:l,nombre:n,cantidad:s,precio:o};d.push(u);try{return await i.writeFile(a,JSON.stringify(d,null,2)),r.send({mensaje:"Ingrediente creado exitosamente",id:l})}catch(e){return console.error("Error al crear el ingrediente:",e),r.status(500).send({error:"Ha ocurrido un error inesperado"})}},actualizar:async(e,r)=>{const{id:n,nombre:s,cantidad:o,precio:a}=e.body,c=t.join(__dirname,"..","public/json","ingredientes.json"),d=await i.readFile(c,"utf8"),l=JSON.parse(d),u=l.findIndex((e=>e.id===n));if(-1===u)return r.status(404).send({error:"Ingrediente no encontrado"});const p={...l[u],nombre:s||l[u].nombre,cantidad:o||l[u].cantidad,precio:a||l[u].precio};l[u]=p;try{return await i.writeFile(c,JSON.stringify(l,null,2)),r.send({mensaje:"Ingrediente actualizado exitosamente",id:n})}catch(e){return console.error("Error al escribir el archivo de ingredientes:",e),r.status(500).send({error:"Ha ocurrido un error al actualizar el ingrediente"})}},eliminar:async(e,r)=>{const{clave:n}=e.body;if(26269828!=n)return r.status(500).send({error:"falta clave"});{const e=t.join(__dirname,"..","public/json","ingredientes.json");try{return await i.writeFile(e,JSON.stringify([{}],null,2)),r.send({mensaje:"Ingredientes eliminados exitosamente"})}catch(e){return console.error("Error al escribir el archivo de ingredientes:",e),r.status(500).send({error:"Ha ocurrido un error al eliminar los ingredientes"})}}}}},342:(e,r,n)=>{const i=n(552)({logger:!0}),t=n(528),s=n(889),o=n(818),a=n(3);i.register(t,{origin:"*",methods:["GET","POST"]}),o.config({path:a.resolve(__dirname,".env")});const c=n(476);i.register(c);const d=process.env.PORT||3e3;i.listen(d,"0.0.0.0",((e,r)=>{e&&(i.log.error(e),process.exit(1)),i.log.info(`Servidor corriendo en el puerto ${d}`)})),i.get("/",((e,r)=>{const n=s.address();r.send(n)})),e.exports=i},476:(e,r,n)=>{const{listar:i,crear:t,actualizar:s,eliminar:o}=n(887);e.exports=async function(e,r){e.get("/api/ingredientes",i),e.post("/api/ingredientes/crear",t),e.post("/api/ingredientes/actualizar",s),e.delete("/api/ingredientes/eliminar",o)}},528:e=>{"use strict";e.exports=require("@fastify/cors")},818:e=>{"use strict";e.exports=require("dotenv")},552:e=>{"use strict";e.exports=require("fastify")},383:e=>{"use strict";e.exports=require("fs")},889:e=>{"use strict";e.exports=require("ip")},3:e=>{"use strict";e.exports=require("path")}},r={};!function n(i){var t=r[i];if(void 0!==t)return t.exports;var s=r[i]={exports:{}};return e[i](s,s.exports,n),s.exports}(342)})();