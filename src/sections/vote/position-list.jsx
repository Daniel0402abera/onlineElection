import * as React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { useGet } from 'src/service/useGet';



// eslint-disable-next-line react/prop-types
export default function PositionList({onPositionSelect}) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const { data: fetchedPositions, isFetching: isLoadingPositions } = useGet('/api/v1/positions');
  
    React.useEffect(() => {
      let active = true;
  
      if (!open) {
        setOptions([]);
      }
  
      if (open && active) {
        setOptions([...fetchedPositions]);
      }
  
      return () => {
        active = false;
      };
    }, [open, fetchedPositions]);

    const handleSelectChange = (event, newValue) => {
        onPositionSelect(newValue);
        
      };
  
    return (
      <Autocomplete
        sx={{ width: "100%" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={isLoadingPositions}
      onChange={handleSelectChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Position"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoadingPositions ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    );
  }
  

