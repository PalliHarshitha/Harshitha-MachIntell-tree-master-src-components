import React, { useEffect, useState } from "react";
import SpecificationDetails from "./SpecificationDetails";
import styles from "./newProduct.module.css";
import code from "./ProductDetails.module.css";

function ProductDetails({ productName, fileLocation }) {
  const [mainFunction, setMainFunction] = useState("");
  const [error, setError] = useState('');
  const [product, setProduct] = useState({
    productName: productName,
    fileLocation: fileLocation,
    mainFunction: '',
    secondaryFunction: [],
    specifications: [],
  });
  const [secondaryFunctions, setSecondaryFunctions] = useState([""]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [productId, setProductId] = useState("");

  const [isSaveBtnClicked, setIsSaveBtnClicked] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [isProductTableExpanded, setIsProductTableExpanded] = useState(true);
  const [isBtnCollapse, setIsBtnCollapse] = useState(true);
  const [vButtonVisible, setVButtonVisible] = useState(false);

  useEffect(() => {
    generateProductId(productName);
  }, [productName]);

  const generateProductId = (productName) => {
    if (productName.length >= 2) {
      const firstTwoChars = productName.substring(0, 2).toUpperCase();
      const date = new Date();
      const month = ('0' + ((date.getMonth() + 1))).slice(-2);
      const year = date.getFullYear().toString().slice(-2);
      const specialChars = "!@#$&()_[]{}|";
      const specialChar = specialChars.charAt(Math.floor(Math.random() * specialChars.length));
      const orderNumber = ('00' + Math.floor(Math.random() * 1000)).slice(-3);;
      const generatedId = firstTwoChars + month + year + specialChar + orderNumber;
      setProductId(generatedId);
    }
  }

  const handleMainFunctionChange = (event) => {
    setMainFunction(event.target.value);
  };

  const handleAddSecondary = () => {
    setSecondaryFunctions([...secondaryFunctions, ""]);
  };

  const handleSecondaryFunctionChange = (index, value) => {
    const updatedSecondaryFunctions = [...secondaryFunctions];
    updatedSecondaryFunctions[index] = value;
    setSecondaryFunctions(updatedSecondaryFunctions);
  };

  const handleExpandCollapse = () => {
    setIsProductTableExpanded(!isProductTableExpanded);
  };

  const handleAddSpecification = () => {
    setShowSpecs(true);
    setIsBtnCollapse(false);
  };

  const handleSave = () => {
    console.log('Saving data...', mainFunction, secondaryFunctions);

    if (validation()) {
      setIsProductTableExpanded(false);
      setVButtonVisible(true);
      setIsSaveBtnClicked(true);
    } else {
      console.log('Validation failed');
    }
  };

  const validation = () => {
    let isValid = true;
    let errorMessage = '';

    if (mainFunction.trim() === '') {
      errorMessage += 'Please enter Main Function.\n';
      isValid = false;
    }

    if (secondaryFunctions.some(sf => sf.trim() === '')) {
      errorMessage += 'Please enter all Secondary Functions.\n';
      isValid = false;
    }

    setError(errorMessage);
    return isValid;
  };

  const handleDelete = () => {
    let updatedSecondaryFunctions;
    if (selectedRows.length === 0) {
      updatedSecondaryFunctions = [...secondaryFunctions];
      updatedSecondaryFunctions.pop();
    } else {
      updatedSecondaryFunctions = secondaryFunctions.filter((_, index) => !selectedRows.includes(index));
    }
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
    <div>
      <div className={code.productForm}>
        <div aria-label="productAdded" className={styles.form}>
          <div>
            <table className={code.table1}>
              <thead>
                <tr>
                  <th className={styles.th}>Name of the Product</th>
                  <td className={styles.td}>{productName}</td>
                </tr>
                {isProductTableExpanded && (
                  <>
                    <tr>
                      <th className={styles.th}>Product ID</th>
                      <td className={styles.td}>{productId}</td>
                    </tr>
                    <tr>
                      <th className={styles.th}>Main Functions</th>
                      <td className={styles.td}>
                        <textarea className={styles.input} value={mainFunction} onChange={handleMainFunctionChange} />
                      </td>
                    </tr>
                    <tr>
                      <th className={styles.th} colSpan="2">
                        <h4 style={{ textAlign: 'center' }}>Add secondary function</h4>
                      </th>
                    </tr>
                  </>
                )}
              </thead>
              {isProductTableExpanded && (
                <tbody>
                  {secondaryFunctions.map((secondaryFunction, index) => (
                    <tr style={{ backgroundColor: isRowSelected(index) ? "lightgray" : "white" }}>
                      <th className={styles.th} key={index} onClick={() => toggleRowSelection(index)}>Secondary function {index + 1}</th>
                      <td className={styles.th}>
                        <input className={styles.input} type="text" value={secondaryFunction} onChange={(event) => handleSecondaryFunctionChange(index, event.target.value)} onFocus={(event) => event.preventDefault()} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {isProductTableExpanded && (
              <div className={code.plusMinus}>
                <div><button className={code.btn} onClick={handleAddSecondary}>+</button></div>
                <div><button className={code.btn} onClick={handleDelete}>-</button></div>
              </div>
            )}
          </div>
        </div>
        {vButtonVisible && (
          <div className={code.Vbtn}>
            <div>
              <button className={code.btn} onClick={handleExpandCollapse}>{isProductTableExpanded ? '⋀' : '⋁'}</button>
            </div>
          </div>
        )}
      </div>
      {error && (
        <div className={styles.error}>
          <pre>{error}</pre>
        </div>
      )}
      {isBtnCollapse && (
        <div className={code.buttonContainer}>
          {isProductTableExpanded && (
            <div>
              <button className={`${code.btn} ${code.saveBtn}`} onClick={handleSave}>Save</button>
            </div>
          )}
          {vButtonVisible && (
            <div>
              <button className={`${code.btn} ${code.saveBtn}`} onClick={handleAddSpecification}>Add Specification</button>
            </div>
          )}
        </div>
      )}
      {showSpecs && (
        <div>
          <SpecificationDetails product={product} />
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
