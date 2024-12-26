interface BubbleProps {
    text: string;
}

export default function Bubble({text}: BubbleProps) {
    return <span className="px-4 py-1 bg-purple-300 text-purple-950 rounded-full">{text}</span>
}