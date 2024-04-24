import express from "express";
import cors from "cors";
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
  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });

  // const findUserByJob = (job) => {
  //   console.log("running job")
  //   return users["users_list"].filter(
  //     (user) => user["job"] === job
  //   );
  // };
  
  // app.get("/users", (req, res) => {
  //   const job = req.query.job;
  //   if (job != undefined) {
  //     let result = findUserByJob(job);
  //     result = { users_list: result };
  //     res.send(result);
  //   } else {
  //     res.send(users);
  //   }
  // });


  const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
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

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  if (addedUser) {
    res.status(201).send(addedUser);
} else {
    res.status(500).send("Failed to add user");
}
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


