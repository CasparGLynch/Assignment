interface IProduct {
    id: number
    name: string 
    description: string 
    price: number
    stock: number
}

type ProductState = { 
    products: IProduct[]
}

type ProductAction = { 
    type : string 
    product: IProduct
}

type DispatchType = (args: ProductAction) => ProductAction