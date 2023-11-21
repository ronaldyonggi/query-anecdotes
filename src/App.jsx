import './App.css'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import Anecdote from './components/Anecdote'

function App() {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
//   console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote App</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote => 
      <Anecdote key={anecdote.id} anecdote={anecdote} />
        )}

    </div>
  )
}

export default App
