import {useStore} from "@nanostores/react";
import {htmlContents} from "../HtmlContentStore.ts";

import {fetch} from "@tauri-apps/plugin-http"
import ReactCard from "./ReactCard.tsx";

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


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <button onClick={addHtmlContent}>add html content</button>
            <button onClick={deleteHtmlContent}>delete html content</button>
            {
                $htmlContents.map((content) => <ReactCard content={content}/>)
            }
        </div>
    )
}