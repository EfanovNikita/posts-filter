export interface IPost {
    title: string,
    description: string,
    id: number,
}

export interface EntitiesPost {
    [key: string | number]: IPost
}

export interface InitialStateType {
    ids: (number | string)[],
    entities: EntitiesPost | {},
    loading: 'idle' | 'loading' | 'failed',
    error: string | null
}

export interface IFilter {
    search: string,
    type: string
}