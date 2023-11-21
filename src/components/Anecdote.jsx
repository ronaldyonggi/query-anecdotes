import { useMutation, useQueryClient } from "@tanstack/react-query"
import { update } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const Anecdote = ({anecdote}) => {
    const notificationDispatch = useNotificationDispatch()

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
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
        notificationDispatch({type: true, payload: `anecdote '${anecdote.content}' voted`})
        setTimeout(() => {
            notificationDispatch({type: false})
        }, 5000);
    }

    return (
        <>
            <div>
                {anecdote.content}
            </div>

            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </>
    )
}

export default Anecdote