import React from "react";

const PersonForm = ({newName, newPhone, addPerson, changeName, changePhone}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={changeName}/>
            </div>
            <div>
                number: <input value={newPhone} onChange={changePhone}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;