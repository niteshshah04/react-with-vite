import { useState } from 'react';

interface UseDataProcessingProps {
  initialRowsPerPage?: number;
  initialOrder?: 'asc' | 'desc';
  initialOrderBy?: string;
}

export const useDataProcessing = ({
  initialRowsPerPage = 5,
  initialOrder = 'asc',
  initialOrderBy = 'id'
}: UseDataProcessingProps = {}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);
  const [order, setOrder] = useState<'asc' | 'desc'>(initialOrder);
  const [orderBy, setOrderBy] = useState<string>(initialOrderBy);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setSearchText("");
    setPage(0);
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowActiveOnly(event.target.checked);
  };

  const sortData = (data: any[], currentOrderBy: string, currentOrder: 'asc' | 'desc') => {
    if (!currentOrderBy || !currentOrder) {
      return data;
    }
  
    return data.sort((a: any, b: any) => {
      if (a[currentOrderBy] < b[currentOrderBy]) return currentOrder === 'asc' ? -1 : 1;
      if (a[currentOrderBy] > b[currentOrderBy]) return currentOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filterData = (data: any[]) => {
    return data.filter((row: any) =>
      (showActiveOnly ? row.active === true : true) &&
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const getProcessedData = (data: any[]) => {
    return sortData(filterData([...data]), orderBy, order).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  return {
    tabIndex,
    page,
    rowsPerPage,
    order,
    orderBy,
    showActiveOnly,
    searchText,
    setSearchText,
    handleSort,
    handleTabChange,
    handleChangePage,
    handleChangeRowsPerPage,
    handleCheckboxChange,
    filterData,
    getProcessedData
  };
};