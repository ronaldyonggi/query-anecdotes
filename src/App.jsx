import './App.css'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, update } from './requests'

function App() {
    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation({
        mutationFn: update,
        onSuccess: (changedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            const mutatedAnecdotes = anecdotes.map(a => a.id === changedAnecdote.id ? changedAnecdote : a)
            queryClient.setQueryData(['anecdotes'], mutatedAnecdotes)
        }
    })

  const handleVote = anecdote => {
    // console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

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
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>

          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
        )}

    </div>
  )
}

export default App
