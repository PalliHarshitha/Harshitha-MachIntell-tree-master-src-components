import React, { useState } from 'react';
import DynamicTable from './DynamicTable';
import code from './ProductDetails.module.css';
import styles from './newProduct.module.css';

function SpecificationDetails({ product }) {
  const [specifications, setSpecifications] = useState([
    [{ value: '', type: 'input' }, { value: '', type: 'input' }, { value: "", type: 'input' }],
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [error, setError] = useState('');
  const [isSpecificationsTableExpanded, setIsSpecificationsTableExpanded] = useState(true);
  const [vButtonVisible, setVButtonVisibility] = useState(false);

  const handleAddSpecification = () => {
    setSpecifications([...specifications, [{ value: '', type: 'input' }, { value: '', type: 'input' }, { value: "", type: 'input' }]]);
  };

  const handleDeleteRow = (index) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications.splice(index, 1);
    setSpecifications(updatedSpecifications);
    setSelectedRows([]);
  };

  const handleSave = () => {
    // product.specifications=specifications;
    console.log(product);

    if (validation()) {
      console.log('saved');
      // Hide data rows on save
      setIsSpecificationsTableExpanded(false); // Only show headers
      setVButtonVisibility(true);
    } else {
      console.log('Validation Failed');
    }
  };

  const validation = () => {
    let isValid = true;
    let errorMessage = '';

    if (specifications.some(row => row.some(sp => sp.value.trim() === ''))) {
      errorMessage += "Please enter all Specifications.\n";
      isValid = false;
    }

    setError(errorMessage);

    return isValid;
  };

  const handleExpandCollapse = () => {
    setIsSpecificationsTableExpanded(!isSpecificationsTableExpanded);
  };

  const handleInputChange = (event, rowIndex, cellIndex) => {
    // console.log(event.target.value)
    const updatedSpecifications = [...specifications];
    updatedSpecifications[rowIndex][cellIndex].value = event.target.value; // Update the 'value' property
    setSpecifications(updatedSpecifications);
  };

  return (
    <div>
      <div className={code.productForm}>
        <div>
          <h4 style={{ textAlign: 'center' }}>Add specifications</h4>
          <DynamicTable
            className="dynamic-table"
            headers={['Name', 'Units', 'Value']}
            isSpecificationsTableExpanded={isSpecificationsTableExpanded} // Control data visibility
            data={isSpecificationsTableExpanded ? specifications : []} // Only show data if expanded
            selectedRows={selectedRows}
            onRowSelection={(index) => setSelectedRows([index])}
            onDeleteRow={handleDeleteRow}
            onInputChange={handleInputChange}
          />
        </div>
        {vButtonVisible && (
          <>
            <div className={code.Vbtn}>
              <button 
              className={code.btn} 
              onClick={handleExpandCollapse}>
                { isSpecificationsTableExpanded ? '⋀' : '⋁' }
              </button>
            </div>
          </>
        )}
      </div>
      { isSpecificationsTableExpanded && (
        <div className={code.plusMinus}>
        <div>
          <button className={code.btn} onClick={handleAddSpecification}>+</button>
        </div>
        <div>
          <button className={code.btn} onClick={handleDeleteRow}>-</button>
        </div>
      </div>
      )}
      <div className={code.buttonContainer}>
        {isSpecificationsTableExpanded && ( // Only show buttons when table is expanded
          <>
            <div><button className={code.btn} onClick={handleSave}>Save</button></div>
          </>
        )}
      </div>
      {error && (
        <div className={styles.error}>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
}

export default SpecificationDetails;
