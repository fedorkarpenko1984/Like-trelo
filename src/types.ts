export interface Column {
    id: number
    title: string
}

export interface Card {
    id: number
    title: string
    description?: string
    columnID: number
}