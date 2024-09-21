import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Register from './ExamRegisterForm';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {baseUrl} from './../../Constants';
import Add from '@material-ui/icons/Add';
import UploadAnswerForm from './UploadAnswerForm';
import { LinearProgress } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [path , setPath] = React.useState('');
  const [errors , setErrors] = React.useState(false);
  const [success , setSuccess] = React.useState(false);
  const [message , setMessage] = React.useState('');
  const [progress , setProgress] = React.useState(null);
  const all = {
    open , setOpen , path , setPath , errors , setErrors , success , setSuccess , message , setMessage
  }
  

  const handleClose = () => {
    setOpen(false);
    props.closeCallback();
  };
  const handleSnackClose = () => {
      setErrors(false);
  }
  const handleSnacksClose = () => {
    setSuccess(false);
    setOpen(false);
}
  const handleOk = () => {
      setProgress(<LinearProgress />)
    var formData = new FormData();
    formData.append('answer' , path);
    axios({
        method : 'post',
        url : baseUrl+'/api/administrator/exam/answer/upload/'+props.all.id,
        data : formData,
        headers : {
                      admin_username: localStorage.getItem('admin_username'),
                      admin_password:localStorage.getItem('admin_password'),
                      X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
        }
    }).then(function (response) {
        setProgress(null);
            if(response.data.status === 's'){
                setSuccess(true);
                props.data.componentDidMount();
                
            }else if(response.status == 200 && response.data.status==='f'){
              setMessage(response.data.message);
                setErrors(true);
            }
            else{
              
                setMessage('مشکلی در ثبت پاسخنامه به وجود آمده');
                setErrors(true);

            }
        }).catch(function (error) {
            setProgress(null);
          const r = error.response;
          if(r.status === 422){
            setMessage('فرمت فایل ورودی باید pdf باشد');
            setErrors(true)
          }
          else{
          setMessage('مشکلی در ثبت پاسخنامه به وجود آمده');
          }
                setErrors(true);
        });
};

  return (
    <div style={{padding : 20}}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">اضافه کردن پاسخنامه</DialogTitle>
        <DialogContent>
            <UploadAnswerForm data={all} />
            <Snackbar open={errors} autoHideDuration={6000} onClose={handleSnackClose}>
  <Alert onClose={handleSnackClose} severity="error">
    {message}
  </Alert>
</Snackbar>
<Snackbar open={success} autoHideDuration={6000} onClose={handleSnacksClose}>
  <Alert onClose={handleSnacksClose} severity="success">
    تغییرات شما با موفقیت اعمال شد
  </Alert>
</Snackbar>
        {progress}
        </DialogContent>
        <DialogActions>
        {progress}
          <Button onClick={handleClose} color="primary">
            لغو
          </Button>
          <Button onClick={handleOk} color="primary">
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}