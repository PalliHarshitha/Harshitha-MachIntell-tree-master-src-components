import React, { useState } from 'react';
import SpecificationDetails from './SpecificationDetails';
import styles from '../product.module.css';

function ProductDetails({}) {
  const [product, setProductName] = useState('');
  const [secondaryFunctions, setSecondaryFunctions] = useState(['']); // State to store secondary functions
  const [selectedRows, setSelectedRows] = useState([]); // State to store selected row indices
  const [form, setForm] = useState('')

  const handleProductNameChange =(event) =>{
    setProductName(event.target.value);
  }

  const handleAddSecondary = () => {
    setSecondaryFunctions([...secondaryFunctions, '']); // Add a new empty secondary function to the state
  };

  const handleSecondaryFunctionChange = (index, value) => {
    const updatedSecondaryFunctions = [...secondaryFunctions];
    updatedSecondaryFunctions[index] = value;
    setSecondaryFunctions(updatedSecondaryFunctions);
  };

  const handleSave = () => {
    console.log('Saving data...');
    setForm('specifications')
  };

  const handleDelete = () => {
    const updatedSecondaryFunctions = secondaryFunctions.filter((_, index) => !selectedRows.includes(index));
    setSecondaryFunctions(updatedSecondaryFunctions);
    setSelectedRows([]);
  };

  const toggleRowSelection = (index) => {
    const selectedIndex = selectedRows.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, index]);
    } else {
      const updatedSelectedRows = [...selectedRows];
      updatedSelectedRows.splice(selectedIndex, 1);
      setSelectedRows(updatedSelectedRows);
    }
  };

  const isRowSelected = (index) => {
    return selectedRows.includes(index);
  };

  return (
    <div aria-label="productAdded" className={styles.form}>
      {form === 'specifications' ? (
        <SpecificationDetails />
      ):(
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Name of the Product</th>
                <td className={styles.td}>Bicycle</td>
              </tr>
              <tr>
                <th className={styles.th}>Product ID</th>
                <td className={styles.td}>BI1xxxxABC</td>
              </tr>
              <tr>
                <th className={styles.th}>Main Functions</th>
                <td className={styles.td}>
                  <textarea
                    value={product}
                    onChange={handleProductNameChange}
                  />
                </td>
              </tr>
              <tr>
                <th className={styles.th} colSpan="2">Add secondary function</th>
              </tr>
            </thead>
            <tbody>
              {secondaryFunctions.map((secondaryFunction, index) => (
                <tr key={index} style={{ backgroundColor: isRowSelected(index) ? 'lightgray' : 'white' }} onClick={() => toggleRowSelection(index)}>
                  <th className={styles.th}>Secondary function {index + 1}</th>
                  <td className={styles.th}>
                    <input
                      type="text"
                      value={secondaryFunction}
                      onChange={(event) => handleSecondaryFunctionChange(index, event.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div className={styles.btn2}>
              <button onClick={handleAddSecondary}>Add </button>
            </div>
            <div className={styles.btn2}>
              <button onClick={handleDelete}>Delete </button>
            </div>
            <div className={styles.btn2}>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
        )}
    </div>
  );
}


export default ProductDetails;
