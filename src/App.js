
import React, { useState, useEffect} from 'react'
import "./App.css";
import Axios from "axios";

function App() {

    const [name,setName] = useState("");
    const [age,setAge] = useState(0);
    const [ListOfFriends, setListOfFriends] = useState([]);

    const addFriend = ()=>{
        Axios.post("https://mermories.herokuapp.com/addfriend",{ 
            name:name, 
            age:age, 
           }).then ((response) =>{
               setListOfFriends([...ListOfFriends,{_id:response.data._id,name:name,age:age}]);
           }); 
    };

    const updateFriend = (id) => {
       const newAge = prompt("Enter new age: ")

       Axios.put("https://mermories.herokuapp.com/update",{
           newAge:Number(newAge),
           id:id        
       }).then(()=>{
           setListOfFriends(ListOfFriends.map((val)=>{
               
               return val._id === id ?{_id:id, name:val.name, age:newAge}:val;
                
           }))
       })
    };

    const deleteFriend=(id)=>{
         Axios.delete(`https://mermories.herokuapp.com/delete/${id}`).then(()=>{
             setListOfFriends(ListOfFriends.filter((val) => {
                
                return val._id !== id;
             }));
         });
    };

    useEffect(()=>{
        Axios.get("https://mermories.herokuapp.com/gitread")
            .then((response) =>{
                setListOfFriends(response.data);
            })
            .catch(()=>{
                console.log("ERR");
            });

    }, [] ); 

    return (
        <div className ="App">
        <div className = "inputs">
        <input type = "text" placeholder="Friend name... " 
        onChange = {(event) =>{setName(event.target.value);
        }} 
        />
        <input type = "number"  placeholder="Friend age....  "
        />
        <button onClick={addFriend}>Add Friend</button>
        </div>   

        <div >
        {ListOfFriends.map((val)=>{
            return (
            <div className="friendCointainer">
            <div className='friend'>
            <h3>Name:{val.name}</h3>
            <h3>Age: {val.age}</h3>
            </div>
            <button onClick ={()=>
                {updateFriend(val._id);
            }}
            >
            Update</button>
            <button id ="removeButton"
            onClick={()=>{
                deleteFriend(val._id);
            }}
            >
            X</button>
            </div>
            );
        })};           
        </div>
        </div>
    )
}

export default App
