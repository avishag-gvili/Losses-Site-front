export type CategoryType = {
    id?: number,
    name: string,
    parentId: number
}
export type ItemType = {
    id?: number,
    name: string,
    category: string,
    status: number,
    location: string,
    area: string,
    discraption: string,
    date:string,
    userId: number
}
export type RequestType = {
    id?: number,
    category: string,
    userId: number,
    date: string
}
export type UserType = {
    id?: number,
    name: string,
    phone: string,
    email: string,
    password: string
}
export type UserDetailsType = {
    id: number,
    name: string,
    email: string,
    phone: string,
};
export type AuthUserType = {
    token?: string,
    user: UserDetailsType
};
export type PageType = {
    label: string,
    path: string,
    settings?: PageType[]
}