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
  TablePagination,
  TableSortLabel
} from "@mui/material";
import getBullishOIDEtails from '../Mock/getBullishOIDetails.json'
import { IBullishOIData, IBullishOIResponse } from './types';
import BullishOITable from '../BullishOIDetails/BullishOITable';
const productsData = [
  { id: 101, name: "Laptop", price: "$1000", category: "Electronics" },
  { id: 102, name: "Phone", price: "$500", category: "Electronics" },
];

const MuiTabsWithTables = () => {

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Show 3 rows per page
  const [order, setOrder] = useState<string>("asc");
  const [orderBy, setOrderBy] = useState<string>("id");
  const [bullishOIData, setBullishOIData] = useState<IBullishOIData[] | undefined>([]);

  const cleanData = (data: IBullishOIResponse) => {
    return Object.keys(data).map((key, index) => {
      const lastRecord = data[key].timeAndPrice[data[key].timeAndPrice.length - 1];
      return {
        id: index + 1,
        stock: key,
        count: data[key].count,
        active: data[key].active,
        ltp: lastRecord.ltp,
        time: lastRecord.time,
        CE_ShortBuildup: lastRecord.CE_ShortBuildup.toFixed(2),
        CE_LongBuildup: lastRecord.CE_LongBuildup.toFixed(2),
        PE_LongBuildUp: lastRecord.PE_LongBuildUp.toFixed(2),
        PE_LongUnwinding: lastRecord.PE_LongUnwinding.toFixed(2),
        PE_ShortBuildUp: lastRecord.PE_ShortBuildUp.toFixed(2),
        CE_ShortCovering: lastRecord.CE_ShortCovering.toFixed(2),
        PE_ShortCovering: lastRecord.PE_ShortCovering.toFixed(2),
        CE_LongUnwinding: lastRecord.CE_LongUnwinding.toFixed(2)
      };
    });
  };

  useEffect(() => {
    const bullishData: IBullishOIData[] = cleanData(getBullishOIDEtails)
    setBullishOIData(bullishData);
  }, [])

  // Handle Tab Change
  const handleTabChange = (event, newIndex: number) => {
    setTabIndex(newIndex);
    setSearchText(""); // Reset search on tab switch
    setPage(0); // Reset pagination when switching tabs
  };

  // Handle Sorting
  const handleSort = (property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
    console.log('jghas', data, searchText)
    return data.filter((row: any) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  // Handle Pagination Change
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Get paginated data
  const getPaginatedData = (data: any) => {
    return filterData(data).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

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
        <> 
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
          {/* <Box p={2}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>

                    {["id", "stock", "ltp", "active", 'count', 'time', 'CE_LB', 'CE_LU', 'CE_SB', 'CE_SC', 'PE_LB', 'PE_LU', 'PE_SB', 'PE_SC'].map((col) => (
                      <TableCell key={col}>
                        <TableSortLabel
                          active={orderBy === col}
                          direction={orderBy === col ? order : "asc"}
                          onClick={() => handleSort(col)}
                        >
                          {col.toUpperCase()}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bullishOIData && getProcessedData(bullishOIData).map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.stock}</TableCell>
                      <TableCell>{user.ltp}</TableCell>
                      <TableCell>{user.active.toString()}</TableCell>
                      <TableCell>{user.count}</TableCell>
                      <TableCell>{user.time}</TableCell>
                      <TableCell>{user.CE_LongBuildup}</TableCell>
                      <TableCell>{user.CE_LongUnwinding}</TableCell>
                      <TableCell>{user.CE_ShortBuildup}</TableCell>
                      <TableCell>{user.CE_ShortCovering}</TableCell>
                      <TableCell>{user.PE_LongBuildUp}</TableCell>
                      <TableCell>{user.PE_LongUnwinding}</TableCell>
                      <TableCell>{user.PE_ShortBuildUp}</TableCell>
                      <TableCell>{user.PE_ShortCovering}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filterData(bullishOIData).length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[3, 5, 10]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box> */}
        </>
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

export default MuiTabsWithTables;

