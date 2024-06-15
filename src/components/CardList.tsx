import {useStore} from "@nanostores/react";
import {htmlContentsAtom} from "../HtmlContentStore.ts";
import {readText, clear, writeText, readImage } from 'tauri-plugin-clipboard-manager';
import {mkdir, BaseDirectory, readDir, readTextFile} from "tauri-plugin-fs";
import { message } from '@tauri-apps/plugin-dialog';
import {fetch} from "@tauri-apps/plugin-http"
import ReactCard from "./ReactCard.tsx";
import {useState} from "react";

interface ReactCardProps {
    text?: string
}

export default function CardList() {
    const htmlContents = useStore(htmlContentsAtom)
    // console.log(htmlContents, "$htmlContents")


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
        htmlContentsAtom.set([...htmlContents, {id: 2, title: "the title", content: "this is the content"}])
    }

    const deleteHtmlContent = () => {
        htmlContentsAtom.set(htmlContents.slice(0, -1))
    }

    const [clipboardContent, setClipboardContent] = useState<string>('');
    const readClipboard = async () => {
        console.log('reading clipboard')
        const content = await readText();
        setClipboardContent(content);
        console.log(`clipboard content after reading clipboard: ${content}`);
        // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        // const data = await response.json()
        // console.log(data)
    }

    const clearClipboard = async () => {
        try {
            console.log('clearing clipboard')
            await clear()
            setClipboardContent("")
            // await message('Clipboard cleared', { title: 'Tauri', kind: 'info' })
        } catch (e) {
            console.log('error', e)
            await message('Clipboard is empty, nothing to clear', { title: 'Tauri', kind: 'error' })
        }
    }

    const writeToClipboard = async () => {
        await writeText("this is the text to write s;flkj ask;fl as;klfj as;klfj s;alkf ;alsf")
        // await readClipboard()
    }

    const [dirToMake, setDirToMake] = useState<string>("")
    const makeDirectory = async () => {
        const result = await mkdir( `${dirToMake}`, {baseDir: BaseDirectory.Home})
        // const result = await readDir("")
        console.log(result)
    }

    const [text, setText] = useState<string>("")
    const readTheFile = async () => {
        const result = await readTextFile("dnm.txt", {baseDir: BaseDirectory.Home})
        console.log(result)
        setText(result)
    }
    return (
        <>
            <input onChange={(e) => {
                setDirToMake(e.target.value)
            }}/>
            {text && <p>{text}</p>}
            <button onClick={makeDirectory}>make directory</button>
            <button onClick={readTheFile}>read the file</button>
            <button className={"text-white bg-gray-900 border-2"} onClick={addHtmlContent}>add html content</button>
            <button className={"text-white bg-gray-900 border-2"} onClick={deleteHtmlContent}>delete html content
            </button>
            <button className={"text-white bg-gray-900 border-2"} onClick={readClipboard}>read clipboard</button>
            <button className={"text-white bg-gray-900 border-2"} onClick={writeToClipboard}>write to clipboard
            </button>
            <button className={"text-white bg-gray-900 border-2"} onClick={clearClipboard}>clear clipboard</button>
            <p>{clipboardContent}</p>
            {/* <button onClick={fetchJson}>fetch json</button> */}
            <div className="flex flex-col h-screen">
                {
                    htmlContents.map((content) => <ReactCard content={content}/>)
                }
            </div>
        </>
    )

}