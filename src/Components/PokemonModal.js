import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ProgressBar from 'react-bootstrap/ProgressBar'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    setOpen(false);
    props.rerender()
  };


 

  return (
    <div>
  
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
   

          <div className="row">
            <div className="">
               <img src={props.imgsrc} className="img-fluid rounded-start" alt={} />
            </div>

            <div className="">

          { props.stats.map((val)=>{
            return(<div className="row">
                  <p>{val.stat.name}</p> 
                   <ProgressBar animated now={val.base_stat} label={val.base_stat}/>
                 </div>)
    
          })}

             
            </div>
          </div>



          
       
        </DialogContent>
    
      </BootstrapDialog>
    </div>
  );
}