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
    product.specifications=specifications;
    
    console.log('Saving data...', product);
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
<<<<<<< Updated upstream
        className="dynamic-table"
        headers={['col1', 'col2', 'col3']}
        data={specifications}
=======
        className={styles.dynamicTable}
        headers={['Name', 'Units', 'Value']}
        data={specifications.map(spec => [spec.name, spec.units, spec.value])}
>>>>>>> Stashed changes
        selectedRows={selectedRows}
        onRowSelection={(index) => setSelectedRows([index])}
        onDeleteRow={handleDeleteRow}
        onInputChange={handleInputChange}
      />
      <button onClick={handleAddSpecification}>Add Specification</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDeleteRow}>delete</button>
    </div>
  );
}

export default SpecificationDetails;
