import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [subimage1, setSubimage1] = useState(false);
  const [subimage2, setSubimage2] = useState(false);
  const [subimage3, setSubimage3] = useState(false);

  const [productDetails, setproductDetails] = useState({
    name: "",
    image: "",
    subimage1: "",
    subimage2: "",
    subimage3: "",
    category: "tshirt",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const subImageHandler1 = (e) => {
    setSubimage1(e.target.files[0]);
  };

  const subImageHandler2 = (e) => {
    setSubimage2(e.target.files[0]);
  };

  const subImageHandler3 = (e) => {
    setSubimage3(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setproductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);
    formData.append("subimage1", subimage1);
    formData.append("subimage2", subimage2);
    formData.append("subimage3", subimage3);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      product.subimage1 = responseData.subimage1_url;
      product.subimage2 = responseData.subimage2_url;
      product.subimage3 = responseData.subimage3_url;
      console.log(product);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="tshirt">Tshirt</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      {/* Sub Image 1 */}
      <div className="addproduct-itemfield">
        <label htmlFor="subimage-input-1">
          <img
            src={subimage1 ? URL.createObjectURL(subimage1) : upload_area}
            className="addproduct-thumnail-img"
            alt=""
          />
        </label>
        <input
          onChange={subImageHandler1}
          type="file"
          name="subimage1"
          id="subimage-input-1"
          hidden
        />
      </div>

      {/* Sub Image 2 */}
      <div className="addproduct-itemfield">
        <label htmlFor="subimage-input-2">
          <img
            src={subimage2 ? URL.createObjectURL(subimage2) : upload_area}
            className="addproduct-thumnail-img"
            alt=""
          />
        </label>
        <input
          onChange={subImageHandler2}
          type="file"
          name="subimage2"
          id="subimage-input-2"
          hidden
        />
      </div>

      {/* Sub Image 3 */}
      <div className="addproduct-itemfield">
        <label htmlFor="subimage-input-3">
          <img
            src={subimage3 ? URL.createObjectURL(subimage3) : upload_area}
            className="addproduct-thumnail-img"
            alt=""
          />
        </label>
        <input
          onChange={subImageHandler3}
          type="file"
          name="subimage3"
          id="subimage-input-3"
          hidden
        />
      </div>

      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
