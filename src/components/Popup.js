import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Popup(props) {

  const{ title , text , open ,setOpen , textOnly} = props;
  

  return (
    <div>
      
      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth 
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!textOnly && 
            <Button onClick={()=>setOpen(false)} color="primary" variant="contained">
            Close
          </Button>
          }
          
         
        </DialogActions>
      </Dialog>
    </div>
  );
}