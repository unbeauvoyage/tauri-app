import { atom } from "nanostores";

export const htmlContents = atom<Array<HtmlContent>>([{
    id: 1,
    title: "HTML Content",
    content: "This is a html content",
}])