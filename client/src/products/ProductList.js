import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoProductsMatch from './NoProductsMatch';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const categories = [
        "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", 
        "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", 
        "Speaker", "Headset", "Laptop", "PC"
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3001/category/${category}/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchProducts();
        }
    }, [category]);

    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div className='container-fluid'>
            <form className='form' style={{border:'solid 1px black',padding:'20px'}}>
                <p className='text'>Select the product category</p>
                <select value={category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            </form>
            <div className='row'>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="product">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                            </div>
                        ))
                        
                    ) : (
                        <NoProductsMatch/>
                    )
                )}
            </div>
        </div>
    );
}

export default ProductList;
