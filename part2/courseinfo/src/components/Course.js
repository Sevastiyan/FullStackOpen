import React from 'react'

const Course = ({ course }) => {
    const { name, parts } = course;
  
    const sum = parts.map((part) => part.exercises).reduce((a, b) => a + b, 0);
  
    return (
      <div>
        <Header course={name} />
        <Content parts={parts} />
        <p>
          <b>Total of {sum} exercises</b>
        </p>
      </div>
    );
  };

const Header = ({ course }) => {
  console.log(course);
  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  return parts.map((part) => <Part key={part.id} part={part} />);
};

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
};



export default Course;
