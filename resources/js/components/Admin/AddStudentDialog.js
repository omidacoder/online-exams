import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Register from '../Landing/RegisterComponents/SignUp';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import {baseUrl} from './../../Constants';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [username , setUsername] = React.useState('');
  const [password , setPassword] = React.useState('');
  const [name , setName] = React.useState('');
  const [phoneNumber , setPhoneNumber] = React.useState('');
  const [email , setEmail] = React.useState('');
  const [nationalCode , setNationalCode] = React.useState('');
  const [avg , setAvg] = React.useState('');
  const [field , setField] = React.useState('');
  const [level , setLevel] = React.useState('');
  const [confirm , setConfirm] = React.useState('');
  const [errors , setErrors] = React.useState(false);
  const [success , setSuccess] = React.useState(false);
  const [message , setMessage] = React.useState('');
  const all = {
    username , setUsername , password , setPassword , name , setName , name , setName , phoneNumber , setPhoneNumber , email , setEmail
    ,nationalCode , setNationalCode , avg , setAvg , field , setField , level , setLevel , confirm , setConfirm
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
      if(confirm !== password) {
        setMessage('رمز عبور و تایید رمز عبور مطابقت ندارند');
        setErrors(true);
        return;
        
      }
      const avgCorrect = avg.replace('/','.');
    axios({
        method : 'post',
        url : baseUrl+'/api/administrator/student/create',
        data : {
            name , username , password , email , avg : avgCorrect , field , level , phone_number : phoneNumber , national_code : nationalCode
        },
        headers : {
                      admin_username: localStorage.getItem('admin_username'),
                      admin_password:localStorage.getItem('admin_password'),
                      X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
        }
    }).then(function (response) {
      
            if(response.data.status === 's'){
                setSuccess(true);
                const createData = (name , national_code , field , phone_number , level , username,avg , id) => {
                  return { name , national_code , field , phone_number , level , username,avg , id };
              };
              const r = response.data.data.student;
                props.students.componentDidMount();
                
            }
            else{
                setMessage('مشکلی در ثبت دانش آموز جدید به وجود آمده');
                setErrors(true);

            }
        }).catch(function (error) {
          const r = error.response;
          
          if(r.status === 422){
            if(r.data.errors.username){
              setMessage(r.data.errors.username[0]);
            }
            if(r.data.errors.password){
              setMessage(r.data.errors.password[0]);
            }
            if(r.data.errors.email){
              setMessage(r.data.errors.email[0]);
            }
            if(r.data.errors.name){
              setMessage(r.data.errors.name[0]);
            }
            if(r.data.errors.national_code){
              setMessage(r.data.errors.national_code[0]);
            }
            if(r.data.errors.phone_number){
              setMessage(r.data.errors.phone_number[0]);
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
          }
          else{
          setMessage('مشکلی در ثبت دانش آموز جدید به وجود آمده');
          }
                setErrors(true);
        });
};

  return (
    <div style={{padding : 20}}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      <Add />
        اضافه کردن دانش آموز جدید
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">اضافه کردن دانش آموز</DialogTitle>
        <DialogContent>
          <DialogContentText>
            لطفا فرم زیر را پر کنید و دقت داشته باشید که دانش آموزانی که از طریق این پنل اضافه میشوند به تایید پیامکی و پرداخت نیازی ندارند
          </DialogContentText>
            <Register type="admin" data={all} />
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