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

type ProductDispatchType = (args: ProductAction) => ProductAction



interface IProductOrder {
    id: number
    name: string
    stock: number 
    price: number
}

type ProductOrderState = {
    productOrders: IProductOrder[]
}

type ProductOrderAction = {
    type: string
    productOrder: IProductOrder
}

type ProductOrderDispatchType = (args: ProductOrderAction) => ProductOrderAction
