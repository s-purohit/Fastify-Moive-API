const app = require("fastify")({
    logger: true
})
import { writeFileSync } from 'fs';

// let db = [];
let db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

app.get('/db', (_request, reply) => {
    reply.send(db);
  });

app.post('/data', (request, reply) => {
    // console.log("hello");
    db.push(request.body);
    writeFileSync('./db.json', JSON.stringify(db));
    reply.send(db);
  });



  app.head('db/:dbId', (req, res) => {
    const dbId = req.params.dbId
  
    const db = db.movies.find(db => db.id === Number(dbId))
  
    if (db) {
      res.header('Content-Length', JSON.stringify(db).length)
      res.send()
    } else {
      res.status(404).send({ 'message': `Item with id: ${dbId} not found` })
    }
  })
  
  app.patch('db/:dbId', (req, res) => {
    console.log("hey")
    const dbId = req.params.dbId
    const updatedName = req.body.name
  
    // Find the item with the given ID
    const db = db.movies.find(db => db.id === Number(dbId))
  
    // If the item was found, update its name and return the updated item
    if (db) {
      db.name = updatedName
      res.send(db)
    } else {
      // If the item was not found, return a not found error
      res.status(404).send({ 'message': `Item with id: ${dbId} not found` })
    }
  })
  
  
app.delete('db/:dbId', (req, res) => {
    const dbId = req.params.dbId
  
    const dbIndex = db.movies.findIndex(db => db.id === Number(dbId))
  
    if (dbIndex !== -1) {
      db.movies.splice(dbIndex, 1)
      res.send({ 'message': `Item with id: ${dbId} was deleted` })
    } 
    else {
    
      res.status(404).send({ 'message': `Item with id: ${dbId} not found` })
    }
  })
   

const port = 3000;
app.listen(port, (err, address) => {
    if (err) throw err;
    console.log(`Server listening on ${address}`);
  });
  