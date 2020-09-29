import React from 'react'

const Header = ({course}) => {
    return (<h2>
      {course.name}
    </h2>);
  }
  const Content = ({ osat }) => {
    return (
      <div>
        {osat.map(osa => 
          <Part key={osa.id} part={osa}/>,
        )}
      </div>
    )
  }
  const Course = ({ course }) => {
    return (
      <div>
        <h1>Web development curriculum</h1>
        {course.map(course => { 
          console.log(course.id)
          return (
          <div key={course.id}>
            <Header  course={course} />
            <Content osat={course.parts} />
            <Total osa={course.parts} />
          </div>
          )
        }
        )}
      </div>
    )
  }
  
  const Part = (props) => {
    return(
    <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  const Total = (props) => {
    const total = props.osa.reduce((sum, exer) => sum + exer.exercises, 0);
  return (<h4>Number of exercises {total}</h4>);
  }
  export default Course