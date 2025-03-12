const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }
  
  const Part = (props) => {
    console.log(props)
    return (
      <div>
        <p>{props.name} {props.exercises}</p>
      </div>
    )
  }
  
  const Content = ({items}) => {
    return (
      <div>
        {
          items.map(item => (
            <Part key={item.id} name={item.name} exercises={item.exercises}/>
          ))
        }
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((acc, part) => acc + part.exercises, 0)
    return (
      <div>
        <p><b>total of {total} exercises</b></p>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content items={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course 