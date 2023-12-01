import * as React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { useGet } from 'src/service/useGet';



// eslint-disable-next-line react/prop-types
export default function CandidateList({onCandidateSelect}) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [selectedOption, setSelectedOption] = React.useState(null);
    const { data: fetchedPositions, isFetching: isLoadingPositions } = useGet('/api/v1/users');
  
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
        setSelectedOption(newValue);
    
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
        isOptionEqualToValue={(option, value) => option.fullName === value.fullName}
        getOptionLabel={(option) => option.fullName}
        options={options}
        loading={isLoadingPositions}
        value={selectedOption}
      onChange={handleSelectChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="User"
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
  

