export interface NewFileDTO {
    title: string,
    description: string
    author: string,
    published: number
}

export interface DisLikeDTO {
    work: number,
    user: number
}