import {useState} from 'react'
import {AnimatePresence} from 'framer-motion'
import MessageBubble from '@/components/MessageBubble'

const Chat = () => {
    const [messages, setMessages] = useState([
        {role: 'chat', content: 'Hi! How can I help you today?'},
    ])
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!userInput.trim()) return

        const userMessage = {role: 'user', content: userInput}
        setMessages((prev) => [...prev, userMessage])
        setUserInput('')

        setLoading(true)
        try {
            const res = await fetch('http://127.0.0.1:8000/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: userInput}),
            })

            if (!res.ok) throw new Error('Network response was not ok')

            const data = await res.json()

            const chatContent = data.response || 'No response available.'
            const chatMessage = {role: 'chat', content: chatContent}

            setMessages((prev) => [...prev, chatMessage])
        } catch (err) {
            console.error('Error fetching response:', err)
            const errorMessage = {
                role: 'chat',
                content: 'Oops! Something went wrong. Please try again.',
            }
            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto mt-10 p-4 border border-gray-300 rounded-lg flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 p-4 bg-white rounded-lg max-h-96 overflow-y-auto">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <MessageBubble
                            key={index}
                            role={msg.role}
                            content={msg.content}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? '...' : 'Send'}
                </button>
            </form>
        </div>
    )
}

export default Chat
