import React, {useState} from 'react';
import {usersDb} from './UsersDb';
import User from './User';

const usersDbNew = usersDb.map(obj => {return {...obj}}); // users that change after every input change
usersDbNew.forEach(element => {
  element["promjenaIkonice"] = true;
});
const usersBeforeChecked = usersDb.map(obj => {return {...obj}}); // users that change only after 'check icon' clicked
const alphabetLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "OTHER"];

function App() {
  
  const [users, setUsers] = useState (usersDbNew);
  const [clickedLetter, setClickedLetter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const filterUsers = letter => {
    const filtered = users.filter(u => u.prezime.toUpperCase().startsWith(letter));
    setClickedLetter(letter);
    
    if (letter === "OTHER") {
      for (let i = 0; i < users.length; i++) {
        const firstLetter = users[i].prezime.toUpperCase()[0];
        if (!alphabetLetters.includes(firstLetter)) {
          filtered.push(users[i]);
        }
      }
    }

    setFilteredUsers(filtered);
  };
  
  const handleInputChange = (event, id, arg) => {
    const newUsers = [...users];
    let str = event.target.value.trimStart();
    for (let i = 0; i < newUsers.length; i++) {
      if (newUsers[i].id === id) {
        newUsers[i][arg] = str;
        break;
      }
    }
    setUsers(newUsers);
  }

  const handleIconChange = (event,id) => {
    const arry = event.currentTarget.parentNode.children; // children of div element (input elements, but also other elements like buttons)
    const newUsers = [...users];
    for (let i = 0; i < newUsers.length; i++) {
      if (newUsers[i].id === id) {
        newUsers[i].promjenaIkonice = !newUsers[i].promjenaIkonice; // change icon from 'check icon' to 'pencil icon' and vice versa
        if (newUsers[i].promjenaIkonice === true) {
          let inputCount=0;
          let acceptEntries = true;
          for (let index = 0; index < arry.length; index++) {
            const element = arry[index];
            if (element.nodeName === "INPUT") {
              const str = element.value.trimEnd();
              if (str.length === 0) {
                acceptEntries = false;
                break;
              }
              inputCount++;
              switch (inputCount) {
                case 1:
                  newUsers[i].ime = str;
                  break;
                case 2:
                  newUsers[i].prezime = str;
                  break;
                case 3:
                  newUsers[i].tel = str;
                  break;
                default:
                  break;
              }
            }
            else continue;
          }
          if (acceptEntries === true) {
            usersBeforeChecked[i].ime = newUsers[i].ime;
            usersBeforeChecked[i].prezime = newUsers[i].prezime;
            usersBeforeChecked[i].tel = newUsers[i].tel;
          }
          else {
            newUsers[i].promjenaIkonice = !newUsers[i].promjenaIkonice; // doesn't allow change icon from 'check icon' to 'pencil icon' for empty input
          }
        } 
        break;
      }
    }
    setUsers(newUsers);
  }

  const revertState = id => {
    const newUsers = [...users];
    for (let i = 0; i < newUsers.length; i++) {
      if (newUsers[i].id === id) {
        newUsers[i].promjenaIkonice = true;
        newUsers[i].ime = usersBeforeChecked[i].ime;
        newUsers[i].prezime = usersBeforeChecked[i].prezime;
        newUsers[i].tel = usersBeforeChecked[i].tel;
        break;
      }
    }
    setUsers(newUsers);
  }
  const handleDeleteUser = (id) => {
    const newUsers = users.filter(user => user.id !== id);
    const newFilteredUsers = filteredUsers.filter(user => user.id !== id);
    setUsers(newUsers);
    setFilteredUsers(newFilteredUsers);
  }
  return (
    <div>
     {alphabetLetters.map(letter => 
      <button
        key={letter} 
        onClick={() => filterUsers(letter)}>{letter}
      </button>
     )}
     {clickedLetter && filteredUsers.map((user) => (
        <User
          key={user.id}
          name={user.ime}
          surname={user.prezime}
          tel={user.tel}
          onNameChange = {event => handleInputChange(event, user.id, "ime")}
          onSurnameChange = {event => handleInputChange(event, user.id, "prezime")}
          onTelChange = {event => handleInputChange(event, user.id, "tel")}
          onIconClick = {(event) => handleIconChange(event, user.id)}
          editable={user.promjenaIkonice}
          onRevert ={() => revertState(user.id)}
          onDelete = {() => handleDeleteUser(user.id)}
        />
      ))}
    </div>
  );
}

export default App;
