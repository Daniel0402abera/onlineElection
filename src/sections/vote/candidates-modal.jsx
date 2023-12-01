import * as React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';

import PositionList from './position-list';
import CandidateList from './candidates-list';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CandidateModal() {
  const [open, setOpen] = React.useState(false);
  const [selectedPosition, setSelectedPosition] = React.useState(null);
  const [selectedCandidate, setSelectedCandidate] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePositionSelect = (selectedValue) => {
    setSelectedPosition(selectedValue);
    console.log(selectedPosition)
  };

  const handleCandidateSelect = (selectedValue) => {
    setSelectedCandidate(selectedValue);
    console.log(selectedCandidate)
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{
          width: '10%',
          margin: '5px',
          padding: '10px',
          backgroundColor: 'green',
          color: 'white',
        }}
      >
        Add Candidates
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
          <Typography align="center" style={{marginBottom:'20px'}} variant="h6" component="h2">
            Add New Candidates
          </Typography>

          <Container style={{display:'flex'}}>
          <Container>
          {/* <PositionList/> */}
          <PositionList onPositionSelect={handlePositionSelect} />
            
          </Container>
          <Container>
          {/* <CandidateList/> */}
          <CandidateList onCandidateSelect={handleCandidateSelect} />
          </Container>
          
          </Container>
          
          <Container style={{ display: 'flex',marginTop:'100px',justifyContent:'space-between'}}>
            <Button
              onClick={handleClose}
              variant="contained"
              style={{
                width: '30%',
                margin: '5px',
                padding: '10px',
                backgroundColor: 'red',
                color: 'white',
              }}
            >
              Cancle
            </Button>
            <Button
              onClick={handleOpen}
              variant="contained"
              style={{
                width: '30%',
                margin: '5px',
                padding: '10px',
                backgroundColor: 'green',
                color: 'white',
              }}
            >
              Add
            </Button>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
