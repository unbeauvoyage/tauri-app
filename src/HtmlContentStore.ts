import { atom } from "nanostores";

export const htmlContentsAtom = atom<Array<HtmlContent>>([{
    id: 1,
    title: "HTML Content",
    content: "This is a html content",
}])