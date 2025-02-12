import { TextField, FormControlLabel, Checkbox, Box } from "@mui/material";

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
    <Box p={2} display="flex" alignItems="center">
      {tabIndex !== 5 && (
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}
      {tabIndex !== 4 && tabIndex !== 5 && (
        <Box ml={2}>
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