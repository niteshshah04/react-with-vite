import React, { useMemo } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from "@mui/material";
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MovingIcon from '@mui/icons-material/Moving';
import { IBullishOIData } from "../Dashboard/types";
import './BullishOITable.css';
// import '@n8n/chat/style.css';
// import { createChat } from '@n8n/chat';

interface BullishOITableProps {
  order: "asc" | "desc";
  orderBy: string;
  handleSort: (col: string) => void;
  bullishOIData: IBullishOIData[];
  getProcessedData: (data: any) => any[];
  filterData: (data: any) => any[];
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  callSelecteddata: any;
}

const TABLE_HEADERS = [
  "id",
  "stock", "ltp", "active", "time",
  "PE_SB",
  "CE_SC",
  "CE_LB", 
  "CE_LU",
  "CE_SB",
  "PE_LB",
  "PE_LU",
  "PE_SC"
] as const;

const TableHeader: React.FC<{
  order: "asc" | "desc";
  orderBy: string;
  handleSort: (col: string) => void;
}> = React.memo(({ order, orderBy, handleSort }) => (
  <TableHead>
    <TableRow>
      {TABLE_HEADERS.map((col) => (
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
));

const TableRowComponent: React.FC<{
  data: IBullishOIData;
  onRowClick: (data: IBullishOIData) => void;
}> = React.memo(({ data, onRowClick }) => {
  const highlightClass = Number(data?.PE_SB) > 80 ? "bullish-highlight-row" : "";
  const resultStockClass = data?.resultToday ? "result-stock" : "";

  return (
    <TableRow hover onClick={() => onRowClick(data)} className={`table-row  ${resultStockClass} ${highlightClass}`}>
      <TableCell>{data?.id}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <span>{data?.stock}</span>
          {data?.resultToday && (
            <InsertChartOutlinedOutlinedIcon
              className="result-icon"
              style={{ color: "green" }}
              titleAccess="Result Today"
            />
          )}
          {data?.trendReversal && (
            <TrendingUpIcon
              className="result-icon"
              style={{ color: "green" }}
              titleAccess="Indicates a bullish trend reversal."
            />
          )}
          {data?.nearTrendReversal && (
            <MovingIcon
              className="result-icon"
              style={{ color: "orange" }}
              titleAccess="Close to a bullish trend reversal."
            />
          )}

        </div>
      </TableCell>
      <TableCell>{data?.ltp}</TableCell>
      <TableCell>{data?.active.toString()}</TableCell>
      {/* <TableCell>{data?.resultToday?.toString()}</TableCell> */}
      {/* <TableCell>
        {data?.count}{" "}
        {data?.active ? (
          <ArrowUpward
            className="arrow-icon arrow-icon-up"
          />
        ) : (
          <ArrowDownwardIcon
            className="arrow-icon arrow-icon-down"
          />
        )}
      </TableCell> */}
      <TableCell>{data?.time}</TableCell>
      <TableCell>{data?.PE_SB} 
        {data?.PE_SB > data?.CE_SC ? (
          <ArrowUpward
            className="arrow-icon arrow-icon-up"
          />
        ) : null}
      </TableCell>      
      <TableCell>{data?.CE_SC}</TableCell>
      <TableCell>{data?.CE_LB}</TableCell>
      <TableCell>{data?.CE_LU}</TableCell>
      <TableCell>{data?.CE_SB}</TableCell>
      <TableCell>{data?.PE_LB}</TableCell>
      <TableCell>{data?.PE_LU}</TableCell>
      <TableCell>{data?.PE_SC}</TableCell>
    </TableRow>
  );
});

const BullishOITable: React.FC<BullishOITableProps> = ({
  order,
  orderBy,
  handleSort,
  bullishOIData,
  getProcessedData,
  filterData,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  callSelecteddata
}) => {
  const processedData = useMemo(
    () => getProcessedData(bullishOIData),
    [bullishOIData, getProcessedData]
  );

  const filteredDataLength = useMemo(
    () => filterData(bullishOIData).length,
    [bullishOIData, filterData]
  );

  // useEffect(() => {
  //   // Only create the chat widget once
  //   createChat({
  //     webhookUrl: 'http://127.0.0.1:5678/webhook/4d9b0cf9-027a-4769-bac9-555fdba05a2a/chat',
  //     target: '#n8n-chat',
  //     mode: 'popup',
  //     chatInputKey: 'chatInput',
  //     chatSessionKey: 'sessionId',
  //     metadata: {},
  //     showWelcomeScreen: false,
  //     defaultLanguage: 'en',
  //     initialMessages: [
  //       'Welcome to the chat! How can I assist you today?'
  //     ]
  //   });
  // }, []);

  return (
    <Box p={2}>
      {/* n8n chat widget will be injected globally by createChat */}
      <TableContainer component={Paper} sx={{ width: "100%", boxShadow: 3 }}>
        <Table>
          <TableHeader
            order={order}
            orderBy={orderBy}
            handleSort={handleSort}
          />
          <TableBody>
            {processedData.length > 0 ? (
              processedData.map((data: IBullishOIData) => (
                <TableRowComponent
                  key={data?.id}
                  data={data}
                  onRowClick={callSelecteddata}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={TABLE_HEADERS.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredDataLength}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default React.memo(BullishOITable);
