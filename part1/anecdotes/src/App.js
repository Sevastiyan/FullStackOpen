import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Display = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>Has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0);
  const [allVotes, setAllVotes] = useState([]);
  const max = anecdotes.length
  const text = anecdotes[selected]

  const handleVote = () => {
    if (allVotes.length === 0) {
      const newVotes = Array(max).fill(0)
      newVotes[selected] = 1
      setAllVotes(newVotes)
    } else {
      const votes = [...allVotes]
      votes[selected] = votes[selected] + 1
      setAllVotes(votes)
    }
  }

  const handleSelected = () => {
    setSelected(Math.floor(Math.random() * max))
  }

  const mostVotes = () => { 
    const mostVotes = Math.max(...allVotes)
    const index = allVotes.indexOf(mostVotes)
    return {
      text: anecdotes[index],
      votes: mostVotes
    }
  }

  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display text={text} votes={allVotes[selected]}/>
      <Button onClick={() => handleSelected()} text='next anecdote' />
      <Button onClick={() => handleVote()} text='vote' />
      <h1>Anecdote with most votes</h1>
      <Display text={mostVotes().text} votes={mostVotes().votes}/>
    </div>
  )
}

export default App
