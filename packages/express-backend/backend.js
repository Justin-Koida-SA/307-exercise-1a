import express from "express";
import cors from "cors";

import userServices from "./models/user-services.js";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};


  
  const findUserByName = (name) => {
    console.log("running name")
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  
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
  


  const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

  app.get("/users/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
      res.send({ users_list: result });
    }
  });

const addId = (user) =>{
  const id = Math.floor(Math.random() *(1000000))
  if(findUserById(id) !== undefined){
    return addId(user)
  }
    user.id = id.toString()

};

const addUser = (user) => {
  addId(user)
  users["users_list"].push(user);
  return user;
};

app.post("/users", async (req, res) => {
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) res.status(201).send(savedUser);
  else res.status(500).end();
});


//my code
const findUserByIdx = (id) =>{
  return users["users_list"].findIndex((user) => user["id"] === id);

};
const removeUser = (userID) => {
  const idx = findUserByIdx(userID);
  //console.log("Index found: " + idx)
  if(idx > -1){
    users["users_list"].splice(idx, 1)
    return true;
  }
  return false;
};

app.delete("/users/:id", (req, res) => {
  //console.log("User list:", JSON.stringify(users["users_list"]));
  const userIdToDel = req.params.id;
  if(removeUser(userIdToDel)){
    res.status(204).send(userIdToDel);
    console.log("Deleted user:", userIdToDel);
  }else{
    res.status(404).send("404, User: " + userIdToDel + " not found")
  }
});





app.get("/users", (req, res) => {
  res.send(users);
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});


