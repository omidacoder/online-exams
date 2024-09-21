import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Register from './QuestionRegisterForm';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import Add from '@material-ui/icons/Add';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [description , setDescription] = React.useState(props.all.description);
  const [first_ans , setFirst_ans] = React.useState(props.all.first_ans);
  const [second_ans , setSecond_ans] = React.useState(props.all.second_ans);
  const [third_ans , setThird_ans] = React.useState(props.all.third_ans);
  const [fourth_ans , setFourth_ans] = React.useState(props.all.fourth_ans);
  const [exam_ids , setExam_ids] = React.useState('');
  const [correct , setCorrect] = React.useState(null);
  const [path , setPath] = React.useState(null);
  const [errors , setErrors] = React.useState(false);
  const [success , setSuccess] = React.useState(false);
  const [message , setMessage] = React.useState('');
  const all = {
         path , setPath , description , setDescription,exam_ids , setExam_ids ,first_ans , setFirst_ans , second_ans , setSecond_ans , third_ans , setThird_ans , fourth_ans , setFourth_ans , correct , setCorrect
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

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
    var formData = new FormData();
    formData.append('first_ans' , first_ans);
    formData.append('second_ans' , second_ans);
    formData.append('third_ans' , third_ans);
    formData.append('fourth_ans' , fourth_ans);
    formData.append('description' , description);
    formData.append('exam_ids' , exam_ids);
    formData.append('correct' , correct);
    formData.append('image' , path);
    axios({
        method : 'post',
        url : baseUrl+'/api/administrator/question/update/'+props.all.id,
        data : formData,
        headers : {
                      admin_username: localStorage.getItem('admin_username'),
                      admin_password:localStorage.getItem('admin_password'),
                      X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
        }
    }).then(function (response) {
      
            if(response.data.status === 's'){
                setSuccess(true);
                props.data.componentDidMount();
                
            }else if(response.status == 200 && response.data.status==='f'){
              setMessage(response.data.message);
                setErrors(true);
            }
            else{
              
                setMessage('مشکلی در ثبت سوال جدید به وجود آمده');
                setErrors(true);

            }
        }).catch(function (error) {
          const r = error.response;
          if(r.status === 422){
            if(r.data.errors.first_ans){
              setMessage(r.data.errors.first_ans[0]);
            }
            if(r.data.errors.second_ans){
              setMessage(r.data.errors.second_ans[0]);
            }
            if(r.data.errors.description){
              setMessage(r.data.errors.description[0]);
            }
            if(r.data.errors.third_ans){
              setMessage(r.data.errors.third_ans[0]);
            }
            if(r.data.errors.image){
              setMessage(r.data.errors.image[0]);
            }
            if(r.data.errors.fourth_ans){
              setMessage(r.data.errors.fourth_ans[0]);
            }
            if(r.data.exam_ids){
              setMessage(r.data.errors.exam_ids[0]);
            }
          }
          else{
          setMessage('مشکلی در ثبت سوال جدید به وجود آمده');
          }
                setErrors(true);
        });
};

  return (
    <div style={{padding : 20}}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ویرایش سوال</DialogTitle>
        <DialogContent>
          <DialogContentText>
              با استفاده از این فرم ابتدا سوالات را ویرایش و آنها را به آزمون های مورد نظر اضافه کنید 
          </DialogContentText>
            <Register data={all} />
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
        </DialogContent>
        <DialogActions>
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