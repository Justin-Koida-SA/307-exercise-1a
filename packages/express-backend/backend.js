import express from "express";
import cors from "cors";

import userServices from "./models/user-services.js";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

  
  app.get("/users", async (req, res) => {
    const name = req.query["name"];
    const job = req.query["job"];
    try {
      const result = await userServices.getUsers(name, job);
      res.send({ users_list: result });
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    }
  });

  app.post("/users", async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
  });

  app.get("/users/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
      res.send({ users_list: result });
    }
  });

  app.delete("/users/:id", async (req, res) => {
    try{
      const userIdToDel = req.params["id"];
      console.log(userIdToDel)
      const delUser = await userServices.removeUser(userIdToDel);
      if(delUser){
        res.status(204).send();
      }else{
        res.status(404).send("404, User not found");
      }}catch (error) {
        console.error("Error during deletion:", error);
        res.status(500).send("Internal Server Error");
      }
    });


//   const findUserByName = (name) => {
//     console.log("running name")
//     return users["users_list"].filter(
//       (user) => user["name"] === name
//     );
//   };
  

//   const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);



// const addId = (user) =>{
//   const id = Math.floor(Math.random() *(1000000))
//   if(findUserById(id) !== undefined){
//     return addId(user)
//   }
//     user.id = id.toString()

// };

// const addUser = (user) => {
//   addId(user)
//   users["users_list"].push(user);
//   return user;
// };




// //my code
// const findUserByIdx = (id) =>{
//   return users["users_list"].findIndex((user) => user["id"] === id);

// };
// const removeUser = (userID) => {
//   const idx = findUserByIdx(userID);
//   //console.log("Index found: " + idx)
//   if(idx > -1){
//     users["users_list"].splice(idx, 1)
//     return true;
//   }
//   return false;
// };

// app.get("/users", (req, res) => {
//   res.send(users);
// });


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});


