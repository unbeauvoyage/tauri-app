import {useStore} from "@nanostores/react";
import {htmlContents} from "../HtmlContentStore.ts";
import { readText } from '@tauri-apps/plugin-clipboard-manager';
import {fetch} from "@tauri-apps/plugin-http"
import ReactCard from "./ReactCard.tsx";
import {useState} from "react";

interface ReactCardProps {
    text?: string
}

export default function CardList() {
    const $htmlContents = useStore(htmlContents)
    console.log($htmlContents, "$htmlCOntents")


    // const [jsonData, setJsonData] = useState()
    // const fetchJson = async () => {
    //     let data
    //     try {
    //         const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    //         data = await res.json()
    //     } catch (e) {
    //         console.log('errrrrr', e)
    //     }
    //     setJsonData(data)
    // }

    const addHtmlContent = () => {
        htmlContents.set([...$htmlContents, {id: 2, title: "the title", content: "this is the content"}])
    }

    const deleteHtmlContent = () => {
        htmlContents.set($htmlContents.slice(0, -1))
    }

    const [clipboardContent, setClipboardContent] = useState<string>('');
    const readClipboard = async () => {
        const content = await readText();
        setClipboardContent(content);
        console.log(content);
        // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        // const data = await response.json()
        // console.log(data)
    }
    return (
        <>
            <button className={"text-white bg-gray-900 border-2"} onClick={addHtmlContent}>add html content</button>
            <button className={"text-white bg-gray-900 border-2"} onClick={deleteHtmlContent}>delete html content</button>
            <button className={"text-white bg-gray-900 border-2"} onClick={readClipboard}> read clipboard </button>
            <p>{clipboardContent}</p>
            {/* <button onClick={fetchJson}>fetch json</button> */}
            <div className="flex flex-col h-screen">
                {
                    $htmlContents.map((content) => <ReactCard content={content}/>)
                }
            </div>
        </>
    )

}