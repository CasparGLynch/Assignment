import axios from 'axios';
import * as React from 'react';
import '../static/addProduct.css';

type Props = { 
    saveProduct: (product: IProduct | any) => void
}

export const AddProduct: React.FC<Props> = ({ saveProduct }) => {
    const [product, setProduct] = React.useState<IProduct | {}>()

    const handleProductData = (e: React.FormEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }
    


    // AXIOS POST WHEN FORM IS SUBMITTED to api endpoint
    const addNewProduct = (e: React.FormEvent) => {
        axios.post('http://127.0.0.1:8000/api/products/', product)
            .then(res =>{
                console.log(res);
                console.log(res.data)
            })
        window.location.reload()
    }

    return (
        <form onSubmit={addNewProduct} className="Add-Product">
            <input
                type="text"
                id="name"
                placeholder="Name of Product"
                onChange={handleProductData}
            />
            <input
                type="text"
                id="description"
                placeholder="Description of Product"
                onChange={handleProductData}
            />
            <input
                type="float"
                id="price"
                placeholder="Price of Product"
                onChange={handleProductData}
            />
            <input
                type="number"
                id="stock"
                placeholder="Stock of Product"
                onChange={handleProductData}
            />
            <button disabled={product === undefined ? true : false} className="submit">
                Add Product
            </button>
        </form>
    )
} 