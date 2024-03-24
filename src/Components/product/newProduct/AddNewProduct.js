import React, { useState } from 'react';
import ProductDetails from './ProductDetails';
import styles from '../product.module.css';

function AddNewProduct({}) {
  const [productName, setProductName] = useState('');
  const [fileLocation, setFileLocation] = useState('');
  const [form, setForm] = useState('');

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleFileLocationChange = (event) => {
    setFileLocation(event.target.value);
  };

  const handleSave = () => {
    console.log('Saving data...');
    setForm('productAdded'); // Set the form state to 'productAdded' to display ProductDetails
  };

  return (
    <div aria-label="Product Form" className={styles.form}>
      {form === 'productAdded' ? (
        <ProductDetails/>
      ) : (
        <form>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Name of the Product</th>
                  <td className={styles.td}>
                    <input
                      type="text"
                      value={productName}
                      onChange={handleProductNameChange}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className={styles.th}>File location</th>
                  <td className={styles.td}>
                    <input
                      type="text"
                      value={fileLocation}
                      onChange={handleFileLocationChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="button" className={styles.btn2} onClick={handleSave}>
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddNewProduct;
