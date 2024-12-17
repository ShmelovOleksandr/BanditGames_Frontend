import { Input } from '@nextui-org/input'
import ButtonComponent from '@/components/Button'

interface ChatMessage {
    id: number;
    sender: string;
    text: string;
}

interface LobbyChatProps {
    chat: ChatMessage[];
}

export default function LobbyChat({ chat }: LobbyChatProps) {
    return (
        <aside className="w-1/4 p-4 bg-secondary-100">
            <p className="text-lg font-semibold text-gray-400">Chat</p>
            <div className="h-64 bg-gray-800 rounded-md p-4 overflow-y-auto space-y-2">
                {chat.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`px-4 py-2 rounded-md ${
                                message.sender === 'You' ? 'bg-secondary-400 text-white' : 'bg-gray-600 text-white'
                            }`}
                        >
                            <strong>{message.sender}:</strong> {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex items-center">
                <Input
                    variant="flat"
                    placeholder="Type a message..."
                    className="flex-grow px-4 py-2 text-white rounded-l-md focus:outline-none"
                />
                <ButtonComponent text="Send" />
            </div>
        </aside>
    )
}
