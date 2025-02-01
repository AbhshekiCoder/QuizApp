import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
let app = express();

app.use(cors());
app.use(bodyParser.json())
app.get('/quiz', async(req, res)=>{
   try{
    let result = await fetch('https://api.jsonserve.com/Uw5CrX')
    let data = await result.json();
    res.send(data);

   }catch(err){
    console.log(err.message)
   }
   
    
})

app.listen(3000, ()=>{
    console.log('connected')
})