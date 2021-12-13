import React, {useState, useEffect} from 'react';
import {usersDb} from './UsersDb';
import User from './User';

for (const property in usersDb) {
  usersDb[property].forEach(element => {
    element["promjenaIkonice"] = true;
  });
}
const alphabetLetters = [];
for (let letter in usersDb) {
  alphabetLetters.push(letter);
}

function App() {
  const [users, setUsers] = useState (
    usersDb
  );

  const [clickedLetter, setClickedLetter] = useState('');

  const displayUsers = (letter) => {
    setClickedLetter(letter);
  };
  const handleInputChange = (event, letter, index, arg) => {
    const newUsers = {...users};
    let str = event.target.value.trimStart();
    if (arg === "prezime" && str[0] !== letter) {
      str = str.substring(1);
    }
    newUsers[letter][index][arg] = str;
    setUsers(newUsers);
  }
  const handleIconChange = (letter, index) => {
    let newUsers = {...users};
    const icn = newUsers[letter][index].promjenaIkonice;
    newUsers[letter][index].promjenaIkonice = !icn;

    console.log(!icn)
    console.log(newUsers[letter][index].promjenaIkonice)
    setUsers(newUsers);
    console.log(users)
  }
  const handleDeleteUser = (letter, id) => {
    const newUser = users[letter].filter(user => user.id !== id);
    const newUsers = {...users};
    newUsers[letter] = newUser;
    setUsers(newUsers);
  }
  return (
    <div>
     {alphabetLetters.map((letter) => ( 
       <button
        key={letter} 
        onClick={() => displayUsers(letter)}>{letter}</button>
     ))}
     {clickedLetter && users[clickedLetter].map((user,index) => (
        <User
          key={user.id}
          name={user.ime}
          surname={user.prezime}
          tel={user.tel}
          onNameChange = {event => handleInputChange(event, clickedLetter, index, "ime")}
          onSurnameChange = {event => handleInputChange(event, clickedLetter, index, "prezime")}
          onTelChange = {event => handleInputChange(event, clickedLetter, index, "tel")}
          onIconClick = {() => handleIconChange(clickedLetter, index)}
          editable={user.promjenaIkonice}
          onDelete = {() => handleDeleteUser(clickedLetter, user.id)}
        />
      ))}
    </div>
  );
}

export default App;
