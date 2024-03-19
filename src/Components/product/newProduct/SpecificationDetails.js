import React, { useState } from 'react';

function SpecificationDetails({ }) {
  const [product, setProductName] = useState('');
  const [specifications, setSpecifications] = useState([{ name: '', units: '', value: '' }]); // State to store specifications
  const [selectedRows, setSelectedRows] = useState([]); // State to store selected row indices

  const handleProductNameChange =(event) =>{
    setProductName(event.target.value);
  }

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { name: '', units: '', value: '' }]); // Add a new empty specification to the state
  };

  const handleDeleteSpecification = () => {
    const updatedSpecifications = specifications.filter((_, index) => !selectedRows.includes(index));
    setSpecifications(updatedSpecifications);
    setSelectedRows([]);
  };

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index][field] = value;
    setSpecifications(updatedSpecifications);
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

const handleSave = () => {
    // Implement save functionality here
    console.log('Saving data...');
  };

  return (
    <div aria-label='specifications'>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={styles.th}>Name of the Product</th>
              <td style={styles.td}>
                <input
                  type="text"
                  value={product}
                  onChange={handleProductNameChange}
                />
              </td>
            </tr>
            <tr>
              <th style={styles.th}>Product ID</th>
              <td style={styles.td}>BI1xxxxABC</td>
            </tr>
            <tr>
              <th style={styles.th}>Main Functions (string)</th>
              <td style={styles.td}>
                <input
                  type="text"
                  value={product}
                  onChange={handleProductNameChange}
                />
              </td>
            </tr>
          </thead>
        </table>

        <div>
          <h2>Specifications of BI1xxxxABC</h2>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={styles.th}>Specifications</th>
                <th style={styles.th}>Units</th>
                <th style={styles.th}>Value</th>
              </tr>
            </thead>
            <tbody>
              {specifications.map((specification, index) => (
                <tr key={index} style={{ backgroundColor: isRowSelected(index) ? 'lightgray' : 'white' }} onClick={() => toggleRowSelection(index)}>
                  <td style={styles.td}>
                    <input
                      type="text"
                      value={specification.name}
                      onChange={(event) => handleSpecificationChange(index, 'name', event.target.value)}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="text"
                      value={specification.units}
                      onChange={(event) => handleSpecificationChange(index, 'units', event.target.value)}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="text"
                      value={specification.value}
                      onChange={(event) => handleSpecificationChange(index, 'value', event.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div><button onClick={handleAddSpecification}>Add Specification</button></div>
        <div><button onClick={handleDeleteSpecification}>Delete Selected Specifications</button></div>
      <div>
          <button onClick={handleSave}>Save</button>
        </div>
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

export default SpecificationDetails;
