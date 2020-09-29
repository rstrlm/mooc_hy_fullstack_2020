import React from 'react';
import Person from './Person.js'



const Persons = ({filter, persons, removePerson}) => {

    const namesToShow = filter.length>0 
    ? persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    : persons
    return(
        <div>
        {namesToShow.map((person) => 
            <Person key={person.name} person={person} removePerson={removePerson}/>
          )}
        </div>
    )
}
export default Persons
   