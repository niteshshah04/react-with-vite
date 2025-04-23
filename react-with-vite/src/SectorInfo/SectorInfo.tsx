import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  TablePagination,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box
} from "@mui/material";

type RowData = {
  sector: string;
  value: number;
  name: string;
  compValue: number;
};

interface SectorInfoProps {
  sectorInfo: any[];
}

const parseData = (data: Record<string, string[]>) => {
  return Object.entries(data).flatMap(([sectorKey, companies]) => {
    const [sector, value] = sectorKey.split("_");
    return companies && companies.map((company: string) => {
      const [name, compValue] = company.split(" : ");
      return { sector, value: parseFloat(value), name, compValue: parseFloat(compValue) };
    });
  });
};
const MUITable = ({ sectorInfo }: SectorInfoProps) => {
  const [rows, setRows] = useState<RowData[]>(parseData(sectorInfo as unknown as Record<string, string[]>));
  const [orderBy, setOrderBy] = useState<keyof RowData>("sector");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selected, setSelected] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState({ sector: true, value: true, name: true, compValue: true });

  const handleSort = (column: keyof RowData) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
    const sortedRows = [...rows].sort((a, b) => 
      (a[column] < b[column] ? (isAsc ? -1 : 1) : a[column] > b[column] ? (isAsc ? 1 : -1) : 0)
    );
    setRows(sortedRows);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.sector.toLowerCase().includes(search.toLowerCase()) ||
      row.name.toLowerCase().includes(search.toLowerCase())
  );

//   const handleSelect = (name: string) => {
//     setSelected((prev: string[]) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
//   };

  const exportToCSV = () => {
    const csvContent = [
      ["Sector", "Sector Value", "Company", "Company Value"],
      ...filteredRows.map((row) => [row.sector, row.value?.toFixed(2), row.name, row.compValue?.toFixed(2)])
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <TextField 
            sx={{width: '20%'}}        
          label="Search Sector or Company" 
          variant="outlined" 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={exportToCSV}
        >
          Export to CSV
        </Button>
      </Box>
      <FormGroup row>
        {filteredRows.length > 0 && Object.keys(visibleColumns).map((col) => (
          <FormControlLabel
            key={col}
            control={<Checkbox checked={visibleColumns[col as keyof typeof visibleColumns]} onChange={() => setVisibleColumns({ ...visibleColumns, [col]: !visibleColumns[col as keyof typeof visibleColumns] })} />}
            label={col.replace("compValue", "Company Value").replace("value", "Sector Value")}
          />
        ))}
      </FormGroup>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Select</TableCell> */}
              {Object.keys(visibleColumns).map(
                (col) => visibleColumns[col as keyof typeof visibleColumns] && (
                  <TableCell key={col}>
                    <TableSortLabel active={orderBy === col} direction={orderBy === col ? (order as "asc" | "desc") : "asc"} onClick={() => handleSort(col as keyof RowData)}>
                      {col.replace("compValue", "Company Value").replace("value", "Sector Value")}
                    </TableSortLabel>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length > 0 && filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {visibleColumns.sector && <TableCell>{row.sector}</TableCell>}
                {visibleColumns.value && <TableCell sx={{ color: row.value < 0 ? "red" : "green" }}>{row.value?.toFixed(2)}</TableCell>}
                {visibleColumns.name && <TableCell>{row.name}</TableCell>}
                {visibleColumns.compValue && <TableCell sx={{ color: row.compValue < 0 ? "red" : "green" }}>{row.compValue?.toFixed(2)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredRows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(_, newPage) => setPage(newPage)} onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))} />
    </Paper>
  );
};

export default MUITable;
