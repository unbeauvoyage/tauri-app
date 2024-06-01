import {useState} from "react";

interface ReactCardProps {
    text?: string
}
export default function ReactCard({text}: ReactCardProps) {
    const [content, setText] = useState<string>("")
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <button onClick={()=>{setText("new content")}}>click</button>
            <h1 className="text-6xl">React Card</h1>
            <p className="text-xl">This is a React card component</p>
            <p>{content}</p>
            <p>{text}</p>
        </div>
    )
}