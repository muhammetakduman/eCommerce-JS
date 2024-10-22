
export interface userType {
    id: string,
    username: string,
    password: string,
    balance: number
}

export interface ProductType {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    category: string
    rating: RatingType
}

interface RatingType {
    rate: number,
    count: number
}