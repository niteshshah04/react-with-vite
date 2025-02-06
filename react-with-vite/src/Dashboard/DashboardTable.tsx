import { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import getBullishOIDEtails from '../Mock/getBullishOIDetails.json'
import { IBullishOIData } from './types';
import BullishOITable from '../BullishOIDetails/BullishOITable';
import { useHandleChangeRowsPerPage, useCleanData, useHandleTabChange, useHandleSort } from './hooks/useBullishOITable';
const productsData = [
  { id: 101, name: "Laptop", price: "$1000", category: "Electronics" },
  { id: 102, name: "Phone", price: "$500", category: "Electronics" },
];

const DashboardTable = () => {

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Show 3 rows per page
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("id");
  const [bullishOIData, setBullishOIData] = useState<IBullishOIData[]>([]);

  // custom hooks for Clean Data
  const { cleanData } = useCleanData();
   
  const bullishData = cleanData(getBullishOIDEtails);
  useEffect(() => {
    setBullishOIData(bullishData);
  }, [bullishData])

  // custom hooks for Handle Tab Change 
  const handleTabChange = useHandleTabChange(setTabIndex, setSearchText, setPage);

  // custom hooks for Handle Sorting  
  const handleSort = useHandleSort(order, orderBy, setOrder, setOrderBy);

  // Sorting Function
  const sortData = (data: any) => {
    return data.sort((a: any, b: any) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Get sorted, filtered, and paginated data
  const getProcessedData = (data: any) => {
    return sortData(filterData([...data])).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  // Filter data based on search text
  const filterData = (data: any) => {
    return data.filter((row: any) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // custom hooks for Handle Change Rows Per Page
  const handleChangeRowsPerPage = useHandleChangeRowsPerPage(event, setRowsPerPage, setPage);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Bullish Data" />
        <Tab label="Bullish Trained Data" />
        <Tab label="Bearish Data" />
        <Tab label="Bearish Trained Data" />
      </Tabs>

      {/* Common Search Bar */}
      <Box p={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

      {/* Display Users Table */}
      {tabIndex === 0 && (
         <BullishOITable
          order={order}
          orderBy={orderBy}
          handleSort={handleSort}
          bullishOIData={bullishOIData}
          getProcessedData={getProcessedData}
          filterData={filterData}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage} />
      )}

      {/* Display Products Table */}
      {tabIndex === 1 && (
        <Box p={2}>
          <Typography variant="h6">Products Data</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData(productsData).map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default DashboardTable;

