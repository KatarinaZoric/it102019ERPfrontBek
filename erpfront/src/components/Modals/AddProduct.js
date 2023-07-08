import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import ProductService from "../../services/ProductService";
import { useNavigate } from "react-router";
import FileUtility from "../../utility/FileUtility";
import Select from "react-select";

function AddProduct(props) {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(null);
  const [peopleCategories, setPeopleCategories] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addProduct = () => {
    FileUtility.convertToBase64(image)
      .then((imageAsBase64) => {
        ProductService.addProduct(
          name,
          price,
          amount,
          imageAsBase64,
          category.productCategoryID,
          peopleCategories
        )
          .then((response) => {
            navigate("/category/" + category.productCategoryID);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(console.error);
  };

  const preparePeopleCategories = () => {
    let selectArray = [];

    props.peopleCategories.forEach((peopleCategory) => {
      selectArray.push({
        value: peopleCategory.peopleCategoryID,
        label: peopleCategory.name,
      });
    });

    return selectArray;
  };

  const changePeopleCategories = (e) => {
    let tmpPeopleCategories = [];

    e.forEach((peopleCategory) => {
      tmpPeopleCategories.push(peopleCategory.value);
    });

    setPeopleCategories(tmpPeopleCategories);
  };

  return (
    <div>
      <Button variant="light" onClick={handleShow}>
        Dodaj proizvod
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Dodaj novi proizvod</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-label-group">
            <label htmlFor="inputName">Name</label>
            <input
              type="text"
              id="inputName"
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Name"
              required
              autoFocus
            />
          </div>
          <div className="form-label-group">
            <label htmlFor="inputPrice">Price</label>
            <input
              type="number"
              id="inputPrice"
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
              placeholder="Price"
              required
            />
          </div>
          <div className="form-label-group">
            <label htmlFor="inputAmount">Amount</label>
            <input
              type="number"
              id="inputAmount"
              onChange={(e) => setAmount(e.target.value)}
              className="form-control"
              placeholder="Amount"
              required
            />
          </div>
          <div className="form-label-group my-3">
            <label>Slika</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="form-control"
              required
            />
          </div>
          <div className="my-3">
            <label>Za muškarce/žene/decu</label>
            {props.peopleCategories && (
              <Select
                isMulti
                options={preparePeopleCategories()}
                onChange={changePeopleCategories}
              />
            )}
          </div>
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Kategorija
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {props.categories?.map((category) => {
                return (
                  <li key={category.productCategoryID}>
                    <a
                      onClick={() => setCategory(category)}
                      className="dropdown-item"
                    >
                      {category.name}
                    </a>
                  </li>
                );
              })}
            </ul>
            <p style={{ marginLeft: "15px" }}>
              {category !== null ? category.name : ""}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProduct;
