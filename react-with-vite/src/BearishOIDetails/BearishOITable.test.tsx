import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import BearishOITable from './BearishOITable';

describe('BearishOITable', () => {
  const mockData = [
    {
      id: 1,
      stock: 'AAPL',
      ltp: 150.5,
      active: true,
      count: 5,
      time: '10:00',
      CE_LB: 100,
      CE_LU: 50,
      CE_SB: 30,
      CE_SC: 20,
      PE_LB: 80,
      PE_LU: 40,
      PE_SB: 25,
      PE_SC: 15
    }
  ];

  const defaultProps = {
    order: 'asc' as const,
    orderBy: 'stock',
    handleSort: vi.fn(),
    bearishOIData: mockData,
    getProcessedData: vi.fn().mockReturnValue(mockData),
    filterData: vi.fn().mockReturnValue(mockData),
    page: 0,
    rowsPerPage: 5,
    handleChangePage: vi.fn(),
    handleChangeRowsPerPage: vi.fn(),
    callSelecteddata: vi.fn()
  };

  it('renders table with correct headers', () => {
    render(<BearishOITable {...defaultProps} />);
    
    const headers = ['ID', 'STOCK', 'LTP', 'ACTIVE', 'COUNT', 'TIME'];
    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('displays data correctly', () => {
    render(<BearishOITable {...defaultProps} />);

    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('150.5')).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('calls handleSort when clicking on column header', () => {
    render(<BearishOITable {...defaultProps} />);
    
    const stockHeader = screen.getByText('STOCK');
    fireEvent.click(stockHeader);
    
    expect(defaultProps.handleSort).toHaveBeenCalledWith('stock');
  });

  it('calls callSelecteddata when clicking on a row', () => {
    render(<BearishOITable {...defaultProps} />);
    
    const row = screen.getByText('AAPL').closest('tr');
    fireEvent.click(row!);
    
    expect(defaultProps.callSelecteddata).toHaveBeenCalledWith(mockData[0]);
  });
});