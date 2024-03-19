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

  const handleBrowse = () => {
    console.log('Browsing file location...');
  };

  const handleSave = () => {
    console.log('Saving data...');
    setForm('productAdded'); // Set the form state to 'productAdded' to display ProductDetails
  };

  return (
    <div aria-label="Product Form">
      {form === 'productAdded' ? (
        <ProductDetails/>
      ) : (
        <form>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={code.th}>Name of the Product</th>
                <td style={code.td}>
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
                <th style={code.th}>File location</th>
                <td style={code.td}>
                  <input
                    type="text"
                    value={fileLocation}
                    onChange={handleFileLocationChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" className={styles.btn} onClick={handleSave}>
            Save
          </button>
        </form>
      )}
    </div>
  );
}

const code = {
  th: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  },
  td: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  },
};

export default AddNewProduct;
