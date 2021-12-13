import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import ButtonIcon from "./ButtonIcon";

export default class User extends React.Component {
  render() {
    const {name, surname, tel, onNameChange, onSurnameChange, onTelChange, onIconClick, editable, onDelete} = this.props;
    return (
      <div>
        <input value={name} onChange={onNameChange} disabled={editable}/>
         &nbsp;
        <input value={surname} onChange={onSurnameChange} disabled={editable}/>
         &nbsp;
        <input value={tel} onChange={onTelChange} disabled={editable}/>
         &nbsp; &nbsp;
         <button onClick={onIconClick}>
          <ButtonIcon
            icn={editable}
          />
         </button>
         &nbsp;
         <button onClick={onDelete}>
           <Icon.Trash color="red"/>
         </button>
      
      </div>
    );
  }
}