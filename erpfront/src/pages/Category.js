import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import ProductService from '../services/ProductService';
import ProductCategoryService from '../services/ProductCategoryService';
import PeopleCategoryService from '../services/PeopleCategoryService';

function Category(props) {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [peopleCategories, setPeopleCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoryData, productCategoriesData, peopleCategoriesData] = await Promise.all([
          ProductService.getProductByCategory(categoryId),
          ProductCategoryService.getCategoryById(categoryId),
          ProductCategoryService.getCategores(),
          PeopleCategoryService.getPeople()
        ]);

        setProducts(productsData);
        setCurrentCategory(categoryData.name);
        setProductCategories(productCategoriesData);
        setPeopleCategories(peopleCategoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [categoryId]);

  const filterProductsByPeople = (peopleId) => {
    if (products.length === 0) {
      return; // No products to filter
    }
  
    const filteredProducts = products.filter(product => {
      return (
        product.peopleCategories &&
        product.peopleCategories.some(peopleCategory => peopleCategory.peopleCategoryID === peopleId)
      );
    });
  
    setProducts(filteredProducts);
  };
  
  return (
    <div>
      <Header />
      <h5 className="text-center">{currentCategory}</h5>
      <div className="container-fluid">
        <div className="row">
          <div className="position-sticky col-12 col-lg-2 py-5">
            <div className="list-group">
              {peopleCategories.map(peopleCategory => (
                <a
                  key={"peopleFilter" + peopleCategory.peopleCategoryID}
                  onClick={() => filterProductsByPeople(peopleCategory.peopleCategoryID)}
                  className="list-group-item list-group-item-action"
                >
                  {peopleCategory.name}
                </a>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-10">
            <ProductList
              addToCart={props.addToCart}
              products={products}
              productCategories={productCategories}
              peopleCategories={peopleCategories}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
