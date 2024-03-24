import React, { useState } from "react";
import styles from "../product.module.css";
import Mainassemblies from "./Mainassemblies";

const SubAssembly = () => {
  const [SubAssembly, setsubAssemblyName] = useState("");
  const [fileLocation, setFileLocation] = useState("");
  const [form, setForm] = useState("");

  const handleSubAssemblyNameChange = (event) => {
    setsubAssemblyName(event.target.value);
  };

  const handleFileLocationChange = (event) => {
    setFileLocation(event.target.value);
  };

  const handleSave = () => {
    console.log(isSubassembliesComponents);
    setForm("subassemblyAdded"); // Set the form state to 'subassemblyAdded' to display ProductDetails
  };
  const [isSubassembliesComponents,setIsSubassemliesComponents] = useState("No");
  const [isBoughtup,setIsBoughtup] = useState("No");
  
 const handleMainFunction = () =>{
  setForm("MainFunction");
 }
  return (
    <>
      <div aria-label="SubAssembly">
        {form === "SubAssembly" ? (
          <Mainassemblies />
        ) : (
          <form>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th style={code.th}>Name of sub-assembly</th>
                  <td style={code.td}>
                    <input
                      type="text"
                      value={SubAssembly}
                      onChange={handleSubAssemblyNameChange}
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
                <tr>
                  <th style={code.th}>Is it completely bought up</th>
                  <td style={code.td}>
                    {/* <Dropdown autoClose="inside">
                         <Dropdown.Toggle variant="success" id="dropdown-basic" autoClose="inside">
                           Yes/No
                         </Dropdown.Toggle>
                   
                         <Dropdown.Menu>
                           <Dropdown.Item href="#/action-1">Yes</Dropdown.Item>
                           <Dropdown.Item href="#/action-2">No</Dropdown.Item>
                         </Dropdown.Menu>
                       </Dropdown> */}
                    <select
                      value={isBoughtup} // ...force the select's value to match the state variable...
                      onChange={(e) => setIsBoughtup(e.target.value)} // ... and update the state variable on any change!
                    
                    >
                      <option value="Yes" onClick={handleMainFunction}>Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th style={code.th}>
                    Do you wish to add its subassemblies/components information?
                  </th>
                  <td style={code.td}>
                    {/* <Dropdown >
                         <Dropdown.Toggle variant="success" id="dropdown-basic" autoClose="inside">
                           Yes/No
                         </Dropdown.Toggle>
                   
                         <Dropdown.Menu className={styles.btn} >
                           <Dropdown.Item href="#/action-1">Yes</Dropdown.Item>
                           <Dropdown.Item href="#/action-2">No</Dropdown.Item>
                         </Dropdown.Menu>
                       </Dropdown> */}
                    {/* <select>
                      <option value="Yes">Yes</option>

                      <option value="No">No</option>
                    </select> */}
                    <select
                      value={isSubassembliesComponents} // ...force the select's value to match the state variable...
                      onChange={(e) => setIsSubassemliesComponents(e.target.value)} // ... and update the state variable on any change!
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
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
    </>
  );
};
const code = {
  th: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  },
  td: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  },
};

export default SubAssembly;