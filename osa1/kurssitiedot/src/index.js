import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (<h1>
    {props.course.name}
  </h1>);
}
const Content = (props) => {
return [
  <div>
    <Part osa={props.osa[0]}/>
    <Part osa={props.osa[1]}/>
    <Part osa={props.osa[2]}/>
</div>
];

}
const Part = (props) => {
  return(
  <p>{props.osa.name} {props.osa.exercises} </p>
  )
}
const Total = (props) => {
return (<p>Number of exercises {props.osa[0].exercises + props.osa[1].exercises + props.osa[2].exercises}</p>);
}

const App = () => {
  const course =  { 
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content osa={course.parts} />
      <Total osa={course.parts} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))