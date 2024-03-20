import { useEffect, useState } from 'react'
import axios from 'axios'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState();

    const fetchProducts = async () => {
        await axios.get(`http://localhost:3001/category/${category}/products`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const NoProductsMatch = () => <div>No products match the selected category.</div>;

    return (
        <div className='container'>
            <form className='form'>
                <select onChange={(e)=>setCategory(e.target.value)}>
                    {
                      category.forEach(each=>{
                        <option>
                            each
                        </option>
                      })
                    }
                </select>
                {products.length > 0 ? (
                <div className='row-cols-4'>
                    {products.map((product) => (
                        <div key={product.id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <NoProductsMatch />
            )}
            </form>
        </div>
    );
}

export default ProductList;
