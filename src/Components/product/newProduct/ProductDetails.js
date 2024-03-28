import React, { useEffect, useState, useRef } from "react";
import SpecificationDetails from "./SpecificationDetails";
import styles from "./newProduct.module.css";
import code from "./ProductDetails.module.css"

function ProductDetails({ productName, fileLocation }) {
  const [mainFunction, setMainFunction] = useState("");
  const [error, setError] = useState('');
  const [product, setProduct] = useState({
    productName: productName,
    fileLocation: fileLocation,
    mainFunction:'',
    secondaryFunction:[], specifications:[],
  });
  const [secondaryFunctions, setSecondaryFunctions] = useState([""]); // State to store secondary functions
  const [selectedRows, setSelectedRows] = useState([]); // State to store selected row indices
  const [selectedRow, setSelectedRow] = useState(null); // State to store selected row index(singular)
  const [productId, setProductId] = useState("");
  useEffect( () => {
    generateProductId(productName);
  }, [productName]);

  const [isSaveBtnClicked,  setIsSaveBtnClicked] = useState(false); //State  for tracking whether the save button has been clicked or not
  const [showSpecs, setShowSpecs] = useState(false); // State to control specifications table visibility
  const [isProductTableExpanded, setIsProductTableExpanded] = useState(true); // New state for table expansion
  const [isBtnCollapse,  setIsBtnCollapse] = useState(true); // State for button collapse functionality of save/add secondary function buttons
  const [vButtonVisible, setVButtonVisible] = useState(false); // State to control "V" button visibility
  const tableRef = useRef(null); // Reference for the table component


  useEffect(() => {
    if (tableRef.current){
      const tableBody = tableRef.current.querySelector("tbody");
      tableBody.addEventListener("DOMNodeInseted", handleRowInserted); // Add event listener for row insertion
    }

    return () => {
      if (tableRef.current) {
        const tableBody = tableRef.current.querySelector("tbody");
        tableBody.removeEventListener("DOMNodeInserted", handleRowInserted); // Remove event listener on cleanup
      }
    };
  }, [tableRef]); // Run effect only when tableRef changes

  const handleRowInserted = () => {
    const tableBody = tableRef.current.querySelector("tbody");
    const lastRow = tableBody.querySelector("tr:last-child"); // Get the last row
    if (lastRow) {
      lastRow.scrollIntoView({ behavior: "smooth" }); // Scroll to the last row smoothly
    }
  };

  const generateProductId = (productName) => {
    if (productName.length >= 2){
      const firstTwoChars = productName.substring(0,2).toUpperCase();
      const date = new Date();
      const month = ('0' + ((date.getMonth()+1))).slice(-2);
      const year = date.getFullYear().toString().slice(-2);
      const specialChars = "!@#$%^&*()_[]{}|";
      const specialChar = specialChars.charAt(Math.floor(Math.random() * specialChars.length));
      const orderNumber = ('00' + Math.floor(Math.random() * 1000)).slice(-3);;      
      const generateProductId = firstTwoChars + month + year + specialChar + orderNumber;
      setProductId(generateProductId);
    }
  }

  const handleMainFunctionChange = (event) => {
    setMainFunction(event.target.value);
  };

  const handleAddSecondary = () => {
    setSecondaryFunctions([...secondaryFunctions, ""]); // Add a new empty secondary function to the state
    setSelectedRow(null); // Deselect any previously selected row
  };

  const handleSecondaryFunctionChange = (index, value) => {
    const updatedSecondaryFunctions = [...secondaryFunctions];
    updatedSecondaryFunctions[index] = value;
    setSecondaryFunctions(updatedSecondaryFunctions);
  };

  const handleExpandCollapse = () => {
    setIsProductTableExpanded(!isProductTableExpanded);
  };
  
  const handleAddSpecification = () =>{
    setShowSpecs(true);
    setIsBtnCollapse(false); // Collapse the button
  }

  const handleSave = () => {
    console.log('Saving data...', mainFunction, secondaryFunctions);

    // Perform validation
    if (validation()) {
      setIsProductTableExpanded(false);//Hide all rows except "Name of the Product" Row
      setVButtonVisible(true);
      setIsSaveBtnClicked(true); //Mark  save Button as Clicked
    } else {
      console.log('Validation failed');
    }
  };

  const validation = () => {
    let isValid = true;
    let errorMessage = '';

    // Check if mainFunction is empty
    if (mainFunction.trim() === '') {
      errorMessage += 'Please enter Main Function.\n';
      isValid = false;
    }

    // Check if Secondary Function is empty
    if (secondaryFunctions.some(sf => sf.trim() === '')) {
      errorMessage += 'Please enter  all Secondary Functions.\n';
      isValid = false;
    }

    // Set error message
    setError(errorMessage);

    return isValid;
  };

  
  const handleDelete = () => {
    let updatedSecondaryFunctions;
    if (selectedRows.length === 0) {
      updatedSecondaryFunctions = [...secondaryFunctions];
      updatedSecondaryFunctions.pop();
    } else {
      updatedSecondaryFunctions = secondaryFunctions.filter(
        (_, index) => !selectedRows.includes(index)
      );
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
        {isProductTableExpanded && (
          <div className={`${code.plusMinus} ${code.plusMinusAligned}`}> {/* Apply both classes */}
            <div><button className={code.btn} onClick={handleAddSecondary}>+</button></div>
            <div><button className={code.btn} onClick={handleDelete}>-</button></div>
          </div>
        )}
        <div aria-label="productAdded" className={styles.form}>
            <div>
              <table className={code.table1} ref={tableRef}> {/* Attach ref to the table */}
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
                      <textarea className={styles.input}
                        value={mainFunction}
                        onChange={handleMainFunctionChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className={styles.th} colSpan="2">
                      Add secondary function
                    </th>
                  </tr>
                    </>
                  )}
                </thead>
                {isProductTableExpanded && (
                  <tbody>
                  {secondaryFunctions.map((secondaryFunction, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor: selectedRow === index
                          ? "lightgray"
                          : "white",
                      }}
                      onClick={() => setSelectedRow(selectedRow === index ? null : index)}
                    >
                      <th className={styles.th}>Secondary function {index + 1}</th>
                      <td className={styles.th}>
                        <input className={styles.input}
                          type="text"
                          value={secondaryFunction}
                          onChange={(event) =>
                            handleSecondaryFunctionChange(index, event.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                )}
              </table>
              {showSpecs && (
                <div>
                  <SpecificationDetails product={product} /> {/* Render SpecificationDetails conditionally */}
                </div>
              )}
            </div>
        </div>
        {vButtonVisible && ( // Conditionally render "V" button
        <div className={code.Vbtn}>
          <div><button className={code.btn} onClick={handleExpandCollapse}>V</button></div>
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
          <div className={code.btn}>
            <button onClick={handleSave}>Save</button>
          </div>
          <div className={code.btn}>
            <button onClick={handleAddSpecification} disabled={!isSaveBtnClicked}>Add Specification</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;