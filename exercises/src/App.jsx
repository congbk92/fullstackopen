const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {
        props.items.map((item, index) => (
          <Part key={index} part={item.part} exercises={item.exercises}/>
        ))
      }
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const items = [
    {"part": part1, "exercises": exercises1},
    {"part": part2, "exercises": exercises2},
    {"part": part3, "exercises": exercises3},
  ]

  return (
    <div>
      <Header name={course} />
      <Content items={items}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App