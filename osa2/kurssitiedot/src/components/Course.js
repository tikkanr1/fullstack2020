import React from "react";

  const Course = (props) => {
    return (
      <div>
        {props.courses.map(course =>
            <ul key={course.id}>
                <Header course={course.name}/>
                <Content parts={course.parts}/>
                <Total parts={course.parts}/>
            </ul>)}
      </div>
    )
  }

  const Header = (props) => {
    return (
      <div>
        <h2>{props.course}</h2>
      </div>
    )
  }

  const Content = (props) => {
    console.log("content",props)
    return (
      <div>
        {props.parts.map(part =>
          <li key={part.id}>
            <Part name={part.name} exercises={part.exercises}/>
          </li>
        )}
      </div>
    )
  }

  const Part = (props) => {
    return (
      <div>
        <p>{props.name} {props.exercises}</p>
      </div>
    )
  }

  const Total = (props) => {
    const sum = props.parts.reduce(
      (acc, cur) => acc + cur.exercises, 0
    )

    return (
      <div>
        <p>total of {sum} exercises</p>
      </div>
    )
  }

  export default Course;
