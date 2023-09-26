const express = require('express');//import express
const app = express()//app allow to declare end point

app.use(express.json())
const users=[]
//HTTP METHOD
//GET -Get Data
app.get('/',(request,response)=>{
    response.send("Welcome Home")
})
app.get('/users',(request,response)=>{
    if(users.length==0){
        response.status(404).send("No users found!")
        return
    }
    response.status(200).send(users)
})

//POST Create-data
app.post('/users',(request,response)=>{
    // console.log(request.body)
    const user =request.body;
    const findUser= users.find((x)=>x.id===user.id)
    if(findUser){
        response.status(400).send("User already exist")
        return
    }
    users.push(user)
    response.status(201).send("Create!")
})
//PUT
app.put('/users/:id', (request, response) => {
    const { id } = request.params;
    const updatedUserData = request.body; // Assuming you send the updated user data in the request body
  
    const findUserIndex = users.findIndex((x) => x.id === id);
    if (findUserIndex === -1) {
      response.status(400).send("User not found");
      return;
    }
  
    // Update the user data
    users[findUserIndex] = { ...users[findUserIndex], ...updatedUserData };
  
    response.status(200).send("User Update Success");
  });
//DELETE
app.delete('/users/:id',(request,response)=>{
const {id}=request.params
const findUserIndex =users.findIndex((x)=>x.id===id)
if(findUserIndex == -1){
response.status(400).send("User not found")
return
}
users.slice(findUserIndex,1)
response.status(200).send("User Delete Sucsess")
})

app.listen(3000,()=>{ //import make port in browser
    console.log("Done")
})

//to run application /*node app.js*/