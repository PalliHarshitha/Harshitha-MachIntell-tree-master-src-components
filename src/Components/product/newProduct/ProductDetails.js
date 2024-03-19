import React, { useState } from 'react';
import SpecificationDetails from './SpecificationDetails';

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
    <div aria-label="productAdded">
      {form === 'specifications' ? (
        <SpecificationDetails />
      ):(
        <div>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={styles.th}>Name of the Product</th>
              <td style={styles.td}>Bicycle</td>
            </tr>
            <tr>
              <th style={styles.th}>Product ID</th>
              <td style={styles.td}>BI1xxxxABC</td>
            </tr>
            <tr>
              <th style={styles.th}>Main Functions</th>
              <td style={styles.td}>
                <textarea
                  value={product}
                  onChange={handleProductNameChange}
                />
              </td>
            </tr>
            <tr>
              <th style={styles.th} colSpan="2">Add secondary function</th>
            </tr>
          </thead>
          <tbody>
            {secondaryFunctions.map((secondaryFunction, index) => (
              <tr key={index} style={{ backgroundColor: isRowSelected(index) ? 'lightgray' : 'white' }} onClick={() => toggleRowSelection(index)}>
                <th style={styles.th}>Secondary function {index + 1}</th>
                <td style={styles.td}>
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
          <button onClick={handleAddSecondary}>Add Secondary Function</button>
        </div>
        <div>
          <button onClick={handleDelete}>Delete Secondary Function</button>
        </div>
        <div>
          <button onClick={handleSave}>Save</button>
        </div>
        </div>
        )}
    </div>
  );
}

const styles = {
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

export default ProductDetails;
