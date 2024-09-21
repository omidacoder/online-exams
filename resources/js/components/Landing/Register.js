import React from "react";
import Grid from '@material-ui/core/Grid';
import SignUp from "./RegisterComponents/SignUp";
import axios from 'axios';
import Stepper from './Stepper';
import Verify from "./Verify";
import Finished from "./Finished";
import LinearProgress from '@material-ui/core/LinearProgress';
import {Paper} from "@material-ui/core";
import {baseUrl} from './../../Constants';

export default function Register(props){
    // const [handleStepperNext , setHandleStepperNext] = React.useState();

    const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

    const [usernameError , setUsernameError] = React.useState('');
    const [passwordError , setPasswordError] = React.useState('');
    const [nameError , setNameError] = React.useState('');
    const [phoneNumberError , setPhoneNumberError] = React.useState('');
    const [emailError , setEmailError] = React.useState('');
    const [nationalCodeError , setNationalCodeError] = React.useState('');
    const [avgError , setAvgError] = React.useState('');
    const [fieldError , setFieldError] = React.useState('');
    const [levelError , setLevelError] = React.useState('');
    const [confirm , setConfirm] = React.useState('');
    const [confirmError , setConfirmError] = React.useState('');
    const [otherError , setOtherError] = React.useState('');
    const [errors , setErrors] = React.useState('');
    const [verifyError , setVerifyError] = React.useState('');
    

      
      
      const register = (name , username , password , email , avg , field , level , phoneNumber , nationalCode , confirm)=>{
        decideLeftSection(-1)
        //setting back all errors
        setUsernameError('');
        setPasswordError('');
        setLevelError('');
        setFieldError('');
        setConfirmError('');
        setEmailError('');
        setNameError('');
        setAvgError('');
        setPhoneNumberError('');
        setNationalCodeError('');

            if(password !== confirm) {
              setErrors(true);
              setConfirmError('رمز عبور با تایید رمز عبور مطابقت ندارد');
            }
           const avgCorrect = avg.replace('/','.');
           axios({
                url : baseUrl+'/api/student/create',
                method : 'post',
                data : {
                    name , username , password , email , avg : avgCorrect , field , level , phone_number : phoneNumber , national_code : nationalCode
                }
            }).then(function (response){
                if(response.data.status === 's'){
                    //sending student to verify page
                    setErrors(false)
                    decideLeftSection(1,response.data.data.studentId);
                    
                }
            }).catch(function(error){
                const r = error.response;
          if(r.status === 422){
            decideLeftSection(0);
            setErrors(true);
            // setErrors(r.data.errors);
            if(r.data.errors.level)
            setLevelError(r.data.errors.level);
            if(r.data.errors.avg)
              setAvgError(r.data.errors.avg);
            if(r.data.errors.username)
              setUsernameError(r.data.errors.username);          
            if(r.data.errors.password)
              setPasswordError(r.data.errors.password);          
            if(r.data.errors.email)
              setEmailError(r.data.errors.email);          
            if(r.data.errors.name)
              setNameError(r.data.errors.name);           
            if(r.data.errors.national_code)
              setNationalCodeError(r.data.errors.national_code);           
            if(r.data.errors.phone_number)
              setPhoneNumberError(r.data.errors.phone_number);           
            if(r.data.errors.field)
              setFieldError(r.data.errors.field);           
            
            
          }
          else{
          setOtherError('مشکلی در ثبت اطلاعات شما به وجود آمده است در صورت تداوم مشکل لطفا به ما اطلاع دهید');
          }
                
            });
      }
      const handleSnackClose = () => {
        setErrors(false);
    }
    
    const [leftSection , setLeftSection] = React.useState( <SignUp  type="student" Register={register}/>)
    const decideLeftSection = (inneractiveStep , id = -1)=>{
      if(inneractiveStep == 0){
        setLeftSection(<SignUp  type="student" Register={register}/>);
        setActiveStep(inneractiveStep);
      }
      if(inneractiveStep == 1){
        setLeftSection(<Verify setVerifyError={()=>{setVerifyError()}} setErrors={()=>{setErrors()}} decide={decideLeftSection} id={id} />)
        setActiveStep(inneractiveStep);
      }
      if(inneractiveStep == 2){
        setLeftSection(<Finished />)
        setActiveStep(inneractiveStep);
      }
      if(inneractiveStep == -1){
        setLeftSection(<LinearProgress />);
      }
      setActiveStep(inneractiveStep);
    }
    
        return (
          <>
            <Grid container spacing={4} style={{padding : 10,marginTop: 50 , backgroundColor : 'f1f1f1'}} >
                
                <Grid item md={6} sm={12} xs={12} >
                    <Stepper activeStep={activeStep} setActiveStep={setActiveStep} decide={()=>{decideLeftSection() }} />
                    <Paper variant="outlined"  style={!errors ? {padding : 20 , display : 'block' , marginTop : 20 } : {padding : 20 , display : 'none' , marginTop : 20}}>
                          <p style={{textAlign : 'right'}}>لطفا به نکات زیر دقت کنید</p>
                          <ul dir="rtl">
                          <li>نام کاربری فقط میتواند شامل حروف لاتین و اعداد باشد</li>
                            <li>شماره تلفن همراه شما باید با 09 شروع شود</li>
                            <li>رمز عبور شما باید حداقل 8 رقم و حداکثر 32 رقمی باشد</li>
                            <li>اگر پیامک های تبلیغاتی تلفن همراه خود را بسته اید ممکن است پیامک فعالسازی برای شما ارسال نشود</li>
                            <li>فیلد ایمیل اجباری نیست و در صورت تمایل میتوانید آن را خالی بگذارید</li>
                          </ul>
                    </Paper>
                    <Paper  variant="outlined"  style={errors ? {padding : 20 , display : 'block' , marginTop : 20 } : {padding : 20 , display : 'none' , marginTop : 20}}>
                        <p style={{textAlign : 'right'}}>لطفا موارد زیر را برطرف کنید</p>
                        <p className={usernameError !== '' ? 'errorField' : ''}>{usernameError}</p>
                        <p className={passwordError !== '' ? 'errorField' : ''}>{passwordError}</p>
                        <p className={phoneNumberError !== '' ? 'errorField' : ''}>{phoneNumberError}</p>
                        <p className={nationalCodeError !== '' ? 'errorField' : ''}>{nationalCodeError}</p>
                        <p className={levelError !== '' ? 'errorField' : ''}>{levelError}</p>
                        <p className={fieldError !== '' ? 'errorField' : ''}>{fieldError}</p>
                        <p className={nameError !== '' ? 'errorField' : ''}>{nameError}</p>
                        <p className={emailError !== '' ? 'errorField' : ''}>{emailError}</p>
                        <p className={avgError !== '' ? 'errorField' : ''}>{avgError}</p>
                        <p className={confirmError !== '' ? 'errorField' : ''}>{confirmError}</p>
                        <p className={verifyError !== '' ? 'errorField' : ''}>{verifyError}</p>
                        <p className={otherError !== '' ? 'errorField' : ''}>{otherError}</p>
                    </Paper>
                </Grid>
                <Grid item md={6} sm={12} xs={12}  >
                    {leftSection}
                </Grid>
            </Grid>
            
            </>

        );
}
