import React from "react";

const Filter = ({newFilter, filterPersons}) => {
    return (
        <div>
          filter shown with <input value={newFilter} onChange={filterPersons}/>
        </div>
    )
  }

export default Filter;