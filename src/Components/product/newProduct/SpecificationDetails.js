import React, { useState } from 'react';
import DynamicTable from './DynamicTable';
import styles from '../product.module.css'

function SpecificationDetails({product}) {
  const [specifications, setSpecifications] = useState([
    [{ value: '', type: 'input' },
    { value: '', type: 'input' },
    { value: "", type: 'input' }]
  ]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleAddSpecification = () => {
    setSpecifications([...specifications, [{ value: '', type: 'input' },
    { value: '', type: 'input' },
    { value: "", type: 'input' }]]);
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
  }
  const handleInputChange = (event, rowIndex, cellIndex) => {
    // console.log(event.target.value)
    const updatedSpecifications = [...specifications];
    updatedSpecifications[rowIndex][cellIndex].value = event.target.value; // Update the 'value' property
    setSpecifications(updatedSpecifications);
  };
  return (
    <div>
      <DynamicTable
        className="dynamic-table"
        headers={['col1', 'col2', 'col3']}
        data={specifications}
        selectedRows={selectedRows}
        onRowSelection={(index) => setSelectedRows([index])}
        onDeleteRow={handleDeleteRow}
        onInputChange={handleInputChange}
      />
      <div className={styles.buttonGroup}>
        <div><button className={styles.btn2} onClick={handleAddSpecification}>Add Specification</button></div>
        <div><button className={styles.btn2} onClick={handleSave}>Save</button></div>
        <div><button className={styles.btn2} onClick={handleDeleteRow}>delete</button></div>
      </div>
    </div>
  );
}

export default SpecificationDetails;