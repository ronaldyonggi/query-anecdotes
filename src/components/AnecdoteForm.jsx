import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
    const notificationDispatch = useNotificationDispatch()

    const queryClient = useQueryClient()
    const newNoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: newAnecdote => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
            notificationDispatch({ type: true, payload: `anecdote '${newAnecdote.content}' added` })
            setTimeout(() => {
                notificationDispatch({ type: false})
            }, 5000);
        }
    })

    const onCreate = event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newNoteMutation.mutate({content, votes: 0})
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm