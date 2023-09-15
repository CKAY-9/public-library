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

export interface AddToUserLibrary {
    work: number,
    server: number
}

export interface LibFile {
    id: number,
    dest: string,
    title: string,
    author: string,
    published: Date,
    description: string,
    cover: string,
    likes: string[],
    dislikes: string[]
}

export interface DeleteLibrary {
    libraryID: string
}

export interface LibFileFetch {
    entry: LibFile,
    hostData: {
        host: string,
        id: number
    }
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