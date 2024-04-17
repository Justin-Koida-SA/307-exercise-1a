// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";


  
  function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );
    
      function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
      // function updateList(person) {
      //   setCharacters([...characters, person]);
      // }

      function updateList(person) { 
        postUser(person)
          .then((res) => {
            if(res.status == 201){
              setCharacters([...characters, person]);
          }else{
            throw new Error ("failed to create user with status: " + res.status);
          }})
          .catch((error) => {
            console.log(error);
          })
      }

      function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
      }
      function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        return promise;
      }

  
      return (
        <div className="container">
          <Table 
            characterData={characters} 
            removeCharacter={removeOneCharacter}  
          />
          <Form handleSubmit={updateList} />
        </div>
      );
      


  }

  
export default MyApp;