import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import BearishTrainedOITable from './BearishTrainedOITable';

describe('BearishTrainedOITable', () => {
  const mockData = [
    {
      id: 1,
      stock: 'AAPL',
      active: true,
      count: 10,
      added_time: '2024-03-20 10:00:00',
      removed_time: '2024-03-20 11:00:00'
    },
    {
      id: 2,
      stock: 'GOOGL',
      active: false,
      count: 5,
      added_time: '2024-03-20 09:00:00',
      removed_time: '2024-03-20 10:00:00'
    }
  ];

  const defaultProps = {
    order: 'asc' as const,
    orderBy: 'stock',
    handleSort: vi.fn(),
    bearishTrainedOIData: mockData,
    getProcessedData: vi.fn().mockReturnValue(mockData),
    filterData: vi.fn().mockReturnValue(mockData),
    page: 0,
    rowsPerPage: 5,
    handleChangePage: vi.fn(),
    handleChangeRowsPerPage: vi.fn(),
    callSelecteddata: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table headers correctly', () => {
    render(<BearishTrainedOITable {...defaultProps} />);
    
    const headers = ['ID', 'STOCK', 'ACTIVE', 'COUNT', 'ADDED TIME', 'REMOVED TIME'];
    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('renders table data correctly', () => {
    render(<BearishTrainedOITable {...defaultProps} />);
    
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('GOOGL')).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('calls handleSort when clicking on column header', () => {
    render(<BearishTrainedOITable {...defaultProps} />);
    
    const stockHeader = screen.getByText('STOCK');
    fireEvent.click(stockHeader);
    
    expect(defaultProps.handleSort).toHaveBeenCalledWith('stock');
  });

  it('calls callSelecteddata when clicking on a row', () => {
    render(<BearishTrainedOITable {...defaultProps} />);
    
    const firstRow = screen.getByText('AAPL').closest('tr');
    fireEvent.click(firstRow!);
    
    expect(defaultProps.callSelecteddata).toHaveBeenCalledWith(mockData[0]);
  });

  it('renders pagination correctly', () => {
    render(<BearishTrainedOITable {...defaultProps} />);
    
    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
    expect(screen.getByText('1–2 of 2')).toBeInTheDocument();
  });

  it('displays correct arrow icons based on active status', () => {
    render(<BearishTrainedOITable {...defaultProps} />);
    
    const upArrows = document.getElementsByClassName('arrow-icon-up');
    const downArrows = document.getElementsByClassName('arrow-icon-down');
    
    expect(upArrows.length).toBe(1);
    expect(downArrows.length).toBe(1);
  });
});