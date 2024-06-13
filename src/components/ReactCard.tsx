interface ReactCardProps {
    text?: string
    content: HtmlContent
}

export default function ReactCard({text, content}: ReactCardProps) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl">{content.title}</h1>
            <p>{text}</p>
            <div><p style={{color: "red"}}>{content?.id}</p><p>{content?.content}</p></div>
        </div>
    )
}