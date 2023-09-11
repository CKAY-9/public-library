export interface KeyDTO {
    key: string,
    host: string
}

export interface NewKeyDTO {
    host: string
}

export interface UpdateKeyDTO {
    host: string,
    id: number,
    key: string,
    new_host: string
}