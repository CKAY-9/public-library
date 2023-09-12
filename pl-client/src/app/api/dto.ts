export interface LibInfo {
    id: number,
    name: string,
    description: string
}

export interface LibFile {
    id: number,
    dest: string,
    title: string,
    description: string,
    cover: string,
    rating: number[]
}