import { TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import '../Dashboard.css';

interface TableControlsProps {
  tabIndex: number;
  searchText: string;
  showActiveOnly: boolean;
  setSearchText: (text: string) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableControls = ({ 
  tabIndex, 
  searchText, 
  showActiveOnly, 
  setSearchText, 
  handleCheckboxChange 
}: TableControlsProps) => {
  return (
    <Box className="table-controls-container">
      {tabIndex !== 5 && tabIndex !== 6 && tabIndex !== 7 && tabIndex !== 8 && tabIndex !== 9 && (
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}
      {tabIndex !== 4 && tabIndex !== 5 && tabIndex !== 6 && tabIndex !== 7 && tabIndex !== 8 && tabIndex !== 9 && (
        <Box className="checkbox-container">
          <FormControlLabel
            control={
              <Checkbox
                checked={showActiveOnly}
                onChange={handleCheckboxChange}
                name="showActiveOnly"
                color="primary"
              />
            }
            label="Active"
          />
        </Box>
      )}
    </Box>
  );
};

export default TableControls;