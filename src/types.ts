export interface Book {
    title: string,
    subtitle?: string,
    authors: string[],
    descriprtion: string,
    pageCount: number,
    imageLinks: imageLinks
}

interface imageLinks {
    smallThumbnail: string,
    thumbnail: string
}