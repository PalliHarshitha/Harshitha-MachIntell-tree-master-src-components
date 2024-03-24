import React, { useState } from 'react';
import DynamicTable from './DynamicTable';

function SpecificationDetails() {
  const [specifications, setSpecifications] = useState([{ name: '', units: '', value: '' }]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { name: '', units: '', value: '' }]);
  };

  const handleDeleteRow = (index) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications.splice(index, 1);
    setSpecifications(updatedSpecifications);
    setSelectedRows([]);
  };

  const handleSave = () => {
    console.log('Saving data...');
  };

  return (
    <div>
      <DynamicTable
        className="dynamic-table"
        headers={['Name', 'Units', 'Value']}
        data={specifications.map(spec => [spec.name, spec.units, spec.value])}
        selectedRows={selectedRows}
        onRowSelection={(index) => setSelectedRows([index])}
        onDeleteRow={handleDeleteRow}
      />
      <button onClick={handleAddSpecification}>Add Specification</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default SpecificationDetails;
