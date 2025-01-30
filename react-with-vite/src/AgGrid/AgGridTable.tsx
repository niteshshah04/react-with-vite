import { useState } from "react";
import { ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Import AG Grid styles (Important)
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Register required modules
import { ClientSideRowModelModule } from "ag-grid-community";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AgGridTable = () => {
  // Row Data
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  // Column Definitions
  const [colDefs] = useState([
    { field: "make", headerClass: 'ag-header-cell', cellClass: 'ag-cell' },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ width: "1000px", height: "500px" }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs}/>
    </div>
  );
};

export default AgGridTable;
