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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name , setName] = React.useState('');
  const [lesson , setLesson] = React.useState('');
  const [path , setPath] = React.useState(null);
  const [description , setDescription] = React.useState('');
  const [numberOfQuestions , setNumberOfQuestions] = React.useState('');
  const [field , setField] = React.useState('');
  const [level , setLevel] = React.useState('');
  const [verified , setVerified] = React.useState(false);
  const [price , setPrice] = React.useState('');
  const [time , setTime] = React.useState('');
  const [errors , setErrors] = React.useState(false);
  const [success , setSuccess] = React.useState(false);
  const [message , setMessage] = React.useState('');
  const all = {
      time , setTime , price , setPrice, name , setName , field , setField , level , setLevel ,lesson , setLesson , path , setPath , description , setDescription , numberOfQuestions , setNumberOfQuestions , verified , setVerified
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    formData.append('name' , name);
    formData.append('lesson' , lesson);
    formData.append('description' , description);
    formData.append('field' , field);
    formData.append('level' , level);
    formData.append('number_of_questions' , numberOfQuestions);
    formData.append('verified' , verified);
    formData.append('price' , price);
    formData.append('time' , time);
    formData.append('image' , path);

    axios({
        method : 'post',
        url : baseUrl+'/api/administrator/exam/create',
        data : formData,
        headers : {
                      admin_username: localStorage.getItem('admin_username'),
                      admin_password:localStorage.getItem('admin_password'),
                      X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
        }
    }).then(function (response) {
          console.log(response)
            if(response.data.status === 's'){
                setSuccess(true);
                props.data.componentDidMount();
                
            }else if(response.status == 200 && response.data.status==='f'){
              setMessage(response.data.message);
                setErrors(true);
            }
            else{
              
                setMessage('مشکلی در ثبت آزمون جدید به وجود آمده');
                setErrors(true);

            }
        }).catch(function (error) {
          const r = error.response;
          if(r.status === 422){
            if(r.data.errors.name){
              setMessage(r.data.errors.name[0]);
            }
            if(r.data.errors.lesson){
              setMessage(r.data.errors.lesson[0]);
            }
            if(r.data.errors.description){
              setMessage(r.data.errors.description[0]);
            }
            if(r.data.errors.number_of_questions){
              setMessage(r.data.errors.number_of_questions[0]);
            }
            if(r.data.errors.image){
              setMessage(r.data.errors.image[0]);
            }
            if(r.data.errors.field){
              setMessage(r.data.errors.field[0]);
            }
            if(r.data.errors.level){
              setMessage(r.data.errors.level[0]);
            }
            if(r.data.errors.avg){
              setMessage(r.data.errors.avg[0]);
            }
            if(r.data.errors.time){
              setMessage(r.data.errors.time[0]);
            }
            if(r.data.errors.price){
              setMessage(r.data.errors.price[0]);
            }
          }
          else{
          setMessage('مشکلی در ثبت آزمون جدید به وجود آمده');
          }
                setErrors(true);
        });
};

  return (
    <div style={{padding : 20}}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      <Add />
        اضافه کردن آزمون جدید
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">اضافه کردن آزمون</DialogTitle>
        <DialogContent>
          <DialogContentText>
              لطفا قرم زیر را با دقت پر کنید و دقت داشته باشید که آزمون های تعریف شده تا زمانی که توسط شما تایید نشوند برای دانش آموزان قابل مشاهده نخواهند بود
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