import React from "react";
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { createMuiTheme, makeStyles , MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RTL from "./../RTL";
import {baseUrl , Levels , Fields} from "./../../Constants";
import MenuItem from '@material-ui/core/MenuItem';
export default class Information extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            level : null,
            field : null,
            username : '',
            password : '',
            name : '',
            email : '',
            nationalCode : '',
            phoneNumber : '',
            avg : '',
            confirm : '',
            error : null

        }
        axios({
            url : baseUrl+'/api/student/get',
            method : 'get',
            headers :{
                'Authorization' : 'Bearer '+localStorage.getItem('student_token')
            }
        }).then(function (response){
            if(response.data.status === 's'){
                this.setState({
                    username : response.data.data.student.username,
                    name : response.data.data.student.name,
                    email : response.data.data.student.email,
                    nationalCode : response.data.data.student.national_code,
                    phoneNumber : response.data.data.student.phone_number,
                    avg : response.data.data.student.avg,
                    level:response.data.data.level,
                    field:response.data.data.field
                });


            }
        }.bind(this)).catch(function(error){

        });
        
    }
    render() {
        const setError = (message) => {
            this.setState({
            error : <Alert severity="error">{message}</Alert>
            });
        }
        const setSuccess = (message) => {
            this.setState({
                error : <Alert severity="success">{message}</Alert>
                });
        }
        const register = (name , username , password , email , avg , field , level , phoneNumber , nationalCode , confirm)=>{
                if(password !== confirm) {
                  setError('رمز عبور با تایید رمز عبور مطابقت ندارد');
                }
                this.setState({
                    error : null
                });
                const avgCorrect = avg.replace('/','.');
                axios({
                    url : baseUrl+'/api/student/update',
                    method : 'post',
                    data : {
                        name , username , password , email , avg , field , level , phone_number : phoneNumber , national_code : nationalCode
                    },
                    headers :{
                        'Authorization' : 'Bearer '+localStorage.getItem('student_token')
                    }
                }).then(function (response){
                    if(response.data.status === 's'){
                        setSuccess('مشخصات جدبد شما با موفقیت ثبت شد')
                    }
                }).catch(function(error){
                    const r = error.response;
              if(r.status === 422){
                if(r.data.errors.level)
                setError(r.data.errors.level);
                if(r.data.errors.avg)
                  setError(r.data.errors.avg);
                if(r.data.errors.username)
                  setError(r.data.errors.username);          
                if(r.data.errors.password)
                  setError(r.data.errors.password);          
                if(r.data.errors.email)
                  setError(r.data.errors.email);          
                if(r.data.errors.name)
                  setError(r.data.errors.name);           
                if(r.data.errors.national_code)
                  setError(r.data.errors.national_code);           
                if(r.data.errors.phone_number)
                  setError(r.data.errors.phone_number);           
                if(r.data.errors.field)
                  setError(r.data.errors.field);           
                
                
              }
              else{
              setError('مشکلی در ثبت اطلاعات شما به وجود آمده است در صورت تداوم مشکل لطفا به ما اطلاع دهید');
              }
                    
                });
          }
        const handleLevelChange = (event) => {
            this.setState({
                level : event.target.value
            })
        }
        const handleFieldChange  = (event) => {
            this.setState({
                field : event.target.value
            })
        }
        const theme = createMuiTheme({
            direction: 'rtl',
            palette: {
                primary: {
                    main :  '#00bcd4'
                },
                secondary: {
                    main : '#ff4081'
                }
            },
            typography: {
                fontFamily: ['SahelBlack'],
                fontSize : 12
            }
        });
        const classes = makeStyles({
            root: {
                minWidth: 275,
                direction : 'rtl',
                marginTop : this.props.type === 'admin' ? 20 : 0,
            },
            title: {
                fontSize: 14,
            },
        });
        return(
            <>
            <h1>تغییر مشخصات</h1>
                <p>دقت کنید که اطلاعات قبلی بعد از ثبت اطلاعات جدید در دسترس نحواهد بود</p><br/>
                <RTL>
               <MuiThemeProvider theme={theme}>
            <Card dir="rtl" className={classes.root} variant="outlined">
                <CardContent>
                    <h5 style={{color : '#00bcd4'}} className={classes.title} >
                        ویرایش مشخصات دانش آموز
                    </h5>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="نام کاربری" variant="outlined" fullWidth value={ this.state.username} onChange={
                        (event) => {
                           
                           this.setState({
                                username : event.target.value
                           });
                            
                        }
                    } />
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="نام و نام خانوادگی" variant="outlined" fullWidth value={ this.state.name} onChange={
                        (event) =>{
                            this.setState({
                            name : event.target.value
                           });
                        }
                    }/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="کد ملی" variant="outlined" fullWidth value={ this.state.nationalCode} onChange={
                        (event) =>{
                            this.setState({
                                nationalCode : event.target.value
                           });
                        }}/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="شماره تماس" variant="outlined" fullWidth value={ this.state.phoneNumber} onChange={
                        (event) =>{
                            this.setState({
                                phoneNumber : event.target.value
                           });
                        }}/>
                    <TextField style={{marginBottom : 10 , marginRight : 10}}
                        id="standard-select-currency"
                        select
                        label="مقطع تحصیلی"
                        value={this.state.level}
                        onChange={handleLevelChange}
                        helperText="لطفا مقطع تحصیلی خود را از لیست زیر انتخاب نمایید"
                    >
                        {Levels.map(option => (
                            <MenuItem key={option.key} value={option.key}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField style={{marginBottom : 10 , marginRight : 10}}
                               id="standard-select-currency"
                               select
                               label="رشته تحصیلی"
                               value={this.state.field}
                               onChange={handleFieldChange}
                               helperText="لطفا رشته تحصیلی خود را انتخاب نمایید"
                    >
                        {Fields.map(option => (
                            <MenuItem key={option.key} value={option.key}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="ایمیل" variant="outlined" fullWidth value={ this.state.email} onChange={
                        (event) =>{
                            this.setState({
                                email : event.target.value
                           });
                        }}/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="رمز عبور" type="password" variant="outlined" fullWidth value={ this.state.password} onChange={
                        (event) =>{
                            this.setState({
                                password : event.target.value
                           });
                        }}/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="تکرار رمز عبور" type="password" variant="outlined" fullWidth value={ this.state.confirm} onChange={
                        (event) => {
                            this.setState({
                                confirm : event.target.value
                           });
                        }
                    }/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="معدل" variant="outlined" value={ this.state.avg} onChange={
                        (event) => {
                            this.setState({
                                avg : event.target.value
                           });
                        }
                    }/>
                </CardContent>
                <CardActions>
                <Button style={{padding : 30}} color="primary" size="large" onClick={()=>{
                register(this.state.name , this.state.username,this.state.password ,this.state.email , this.state.avg ,this.state.field , this.state.level , this.state.phoneNumber , this.state.nationalCode , this.state.confirm);
            }}>ثبت مشخصات جدید</Button>
                </CardActions>
                {this.state.error}
            </Card>
               </MuiThemeProvider>
            </RTL>

            </>
        )
    }

}
