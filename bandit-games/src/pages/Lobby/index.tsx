import {Navigation} from '@/components/Navbar'
import SectionComponent from '@/components/Section'
import ButtonComponent from '@/components/Button'
import {useState} from 'react'
import {subtitle, title} from '@/components/primitives.ts'

export const Lobby: React.FC = () => {
    const [messages, setMessages] = useState([
        {id: 1, sender: 'John', text: 'Hey there!'},
        {id: 2, sender: 'You', text: 'Hi John, how are you?'},
    ])
    const [newMessage, setNewMessage] = useState('')
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                {id: prevMessages.length + 1, sender: 'You', text: newMessage},
            ])

            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {id: prevMessages.length + 2, sender: 'John', text: 'I\'m doing great, thanks for asking!'},
                ])
            }, 1000)

            setNewMessage('')
        }
    }


    return (
        <>
            <Navigation/>
            <SectionComponent className="flex h-screen bg-gray-900 text-white">
                {/* Main Lobby */}
                <main className="flex-grow p-6 bg-secondary-50">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Lobby</h1>
                        <ButtonComponent link="/game-library" text="Leave"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-700 h-32 rounded-md flex items-center justify-center">
                            <span>Group Information</span>
                        </div>
                        <div className="bg-gray-700 h-32 rounded-md flex items-center justify-center">
                            <span>Real-Time Chat</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-4">Events</h2>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-gray-700 h-20 rounded-md flex items-center justify-center">
                                Event
                            </div>
                            <div className="bg-gray-700 h-20 rounded-md flex items-center justify-center">
                                Event
                            </div>
                            <div className="bg-gray-700 h-20 rounded-md flex items-center justify-center">
                                Event
                            </div>
                            <div className="bg-gray-700 h-20 rounded-md flex items-center justify-center">
                                Event
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-1/4 p-4 bg-secondary-100">
                    <h2 className={subtitle()}>Chat</h2>
                    <div className="h-64 bg-gray-800 rounded-md p-4 overflow-y-auto space-y-2">
                        {messages.map((message) => (
                            <div key={message.id}
                                 className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`px-4 py-2 rounded-md ${
                                        message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'
                                    }`}
                                >
                                    <strong>{message.sender}:</strong> {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="px-4 py-2 bg-secondary-800 text-secondary-50 rounded-r-md hover:bg-blue-700"
                        >
                            Send
                        </button>
                    </div>
                </aside>
            </SectionComponent>
        </>
    )
}

export default Lobby
