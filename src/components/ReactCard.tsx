import {useState} from "react";

import {fetch} from "@tauri-apps/plugin-http"

interface ReactCardProps {
    text?: string
}
export default function ReactCard({text}: ReactCardProps) {
    const [content, setText] = useState<string>("")


    const [jsonData, setJsonData] = useState()
    const fetchJson = async ()=>{
        let data
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            data = await res.json()
        } catch(e) {
            console.log('errrrrr', e)
        }
        setJsonData(data)
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <button onClick={()=>{setText("new content")}}>click</button>
            <button onClick={fetchJson}>fetchJson</button>
            <h1>{jsonData}</h1>
            <h1 className="text-6xl">React Card</h1>
            <p className="text-xl">This is a React card component</p>
            <p>{content}</p>
            <p>{text}</p>
        </div>
    )
}