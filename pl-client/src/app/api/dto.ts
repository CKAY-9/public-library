export interface LibInfo {
    id: number,
    name: string,
    description: string
}

export interface Profile {
    id: number,
    username: string,
    finished: string[],
    reading: string[],
    going_to_read: string[],
    admin: boolean
}

export interface LibFile {
    id: number,
    dest: string,
    title: string,
    description: string,
    cover: string,
    rating: number[]
}

export interface Comment {
    id: number,
    file_id: number,
    content: string,
    author: string,
    posted: Date
}

export interface NewComment {
    host: number,
    file_id: number,
    content: string
}