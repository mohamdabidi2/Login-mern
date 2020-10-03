const express = require("express");
const assert = require("assert");
const cors=require('cors')
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const MongoURL = "mongodb://localhost:27017";
const dbName='WeTalkIn'
MongoClient.connect(MongoURL,{ useNewUrlParser: true }, (err, client) => {
  assert.equal(err, null, "connection failed");
  console.log("success of connection between db and server");
  var db = client.db(dbName);


app.get("/",(req,res)=>{
res.send("welcome to todo API")
})

// ADD User
app.post("/users",(req,res)=>{
  const body=req.body
  const newuser={firstname:body.firstname}
  console.log(body)
  db.collection('users').insertOne(body,(err,data)=>{
    if(err){
      res.status(400).send('failed to insert')
    }
    else{
      res.send(body)
    }
  })
})


});


app.listen(4000, () => {
  console.log("server is listen on port 4000");
});