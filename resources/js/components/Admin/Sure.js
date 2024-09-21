import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(props.open);


  const handleClose = () => {
    setOpen(false);
    props.closeCallback();
  };
  const handleYes = () => {
    props.success();
  };
  const handleNo = () => {
    handleClose();
  };

  return (
    <div>
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"آیا از تغییرات اطمینان دارید؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            تغییرات اعمال شده به هیچ وجه قابل بازیابی نخواهند بود
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes} color="primary">
            بله
          </Button>
          <Button onClick={handleNo} color="primary" autoFocus>
            خیر
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}