import React, { useState } from 'react';
import UserUtility from '../utility/UserUtility';
import Card from './Card'
import AddProduct from './Modals/AddProduct'

const ProductList = ({ products, productCategories, addToCart, peopleCategories }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortType === "asc") {
            return a.price - b.price;
        } else if (sortType === "desc") {
            return b.price - a.price;
        } else {
            return 0;
        }
    });


    const filteredProducts = sortedProducts.filter((product) => {
        const productName = product.name.toLowerCase();
        const searchQuery = searchTerm.toLowerCase();
        return productName.includes(searchQuery);
    });

    const renderAddProduct = () => {
        if (UserUtility.isEmployee()) {
            return (
                <AddProduct peopleCategories={peopleCategories} categories={productCategories} />
            )
        }
    }

    const renderProducts = () => (
        <section className="py-5">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {filteredProducts.map(product => {
                        return <Card key={product.id} product={product} categories={productCategories} peopleCategories={peopleCategories} addToCart={addToCart} />
                    })}
                </div>
            </div>
        </section>
    )

    return (
        <div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pretraga proizvoda"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="mb-3">
                <select className="form-select" value={sortType} onChange={handleSortChange}>
                    <option value="">Sortiraj po ceni</option>
                    <option value="asc">Rastući redosled cene</option>
                    <option value="desc">Opadajući redosled cene</option>
                </select>

            </div>
            {renderAddProduct()}
            {renderProducts()}
        </div>
    )
}

export default ProductList;
