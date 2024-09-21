import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {createMuiTheme, makeStyles ,  MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import RTL from "../../RTL";
import {Levels , Fields} from "../../../Constants";
import MenuItem from '@material-ui/core/MenuItem';
export default class SignUp extends React.Component{
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
            action : this.props.type === 'admin' ? null : <Button style={{padding : 30}} color="primary" size="large" onClick={()=>{
                this.props.Register(this.state.name , this.state.username,this.state.password ,this.state.email , this.state.avg ,this.state.field , this.state.level , this.state.phoneNumber , this.state.nationalCode , this.state.confirm);
            }}>ثبت نام</Button>

        }
        
        
    }
    
    render() {
        const handleLevelChange = (event) => {
            if(this.props.data !== undefined)this.props.data.setLevel(event.target.value);
            this.setState({
                level : event.target.value
            })
        }
        const handleFieldChange  = (event) => {
            if(this.props.data !== undefined) this.props.data.setField(event.target.value);
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
            <RTL>
               <MuiThemeProvider theme={theme}>
            <Card dir="rtl" className={classes.root} variant="outlined">
                <CardContent>
                    <h5 style={{color : '#00bcd4'}} className={classes.title} >
                        {this.props.type == 'admin' ? 'اضافه کردن دانش آموز' : 'ثبت نام دانش آموز'}
                    </h5>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="نام کاربری" variant="outlined" fullWidth value={ this.props.data !== undefined ? this.props.data.username : this.state.username} onChange={
                        (event) => {
                           if(this.props.data !== undefined) this.props.data.setUsername(event.target.value);
                           this.setState({
                                username : event.target.value
                           });
                            
                        }
                    } />
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="نام و نام خانوادگی" variant="outlined" fullWidth value={this.props.data !== undefined ? this.props.data.name : this.state.name} onChange={
                        (event) =>{
                            if(this.props.data !== undefined) this.props.data.setName(event.target.value);
                            this.setState({
                            name : event.target.value
                           });
                        }
                    }/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="کد ملی" variant="outlined" fullWidth value={this.props.data !== undefined ? this.props.data.nationalCode : this.state.nationalCode} onChange={
                        (event) =>{
                            if(this.props.data !== undefined) this.props.data.setNationalCode(event.target.value);
                            this.setState({
                                nationalCode : event.target.value
                           });
                        }}/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="شماره تماس" variant="outlined" fullWidth value={this.props.data !== undefined ? this.props.data.phoneNumber : this.state.phoneNumber} onChange={
                        (event) =>{
                            if(this.props.data !== undefined)  this.props.data.setPhoneNumber(event.target.value);
                            this.setState({
                                phoneNumber : event.target.value
                           });
                        }}/>
                    <TextField style={{marginBottom : 10 , marginRight : 10}}
                        id="standard-select-currency"
                        select
                        label="مقطع تحصیلی"
                        value={this.state.currency}
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
                               value={this.state.currency}
                               onChange={handleFieldChange}
                               helperText="لطفا رشته تحصیلی خود را انتخاب نمایید"
                    >
                        {Fields.map(option => (
                            <MenuItem key={option.key} value={option.key}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="ایمیل" variant="outlined" fullWidth value={this.props.data !== undefined ? this.props.data.email : this.state.email} onChange={
                        (event) =>{
                            if(this.props.data !== undefined) this.props.data.setEmail(event.target.value);
                            this.setState({
                                email : event.target.value
                           });
                        }}/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="رمز عبور" type="password" variant="outlined" fullWidth value={this.props.data !== undefined ? this.props.data.password : this.state.password} onChange={
                        (event) =>{
                            if(this.props.data !== undefined) this.props.data.setPassword(event.target.value);
                            this.setState({
                                password : event.target.value
                           });
                        }}/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="تکرار رمز عبور" type="password" variant="outlined" fullWidth value={this.props.data !== undefined ? this.props.data.confirm : this.state.confirm} onChange={
                        (event) => {
                            if(this.props.data !== undefined) this.props.data.setConfirm(event.target.value);
                            this.setState({
                                confirm : event.target.value
                           });
                        }
                    }/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="معدل" variant="outlined" value={this.props.data !== undefined ? this.props.data.avg : this.state.avg} onChange={
                        (event) => {
                            if(this.props.data !== undefined) this.props.data.setAvg(event.target.value);
                            this.setState({
                                avg : event.target.value
                           });
                        }
                    }/>
                </CardContent>
                <CardActions>
                    {this.state.action}
                </CardActions>
            </Card>
               </MuiThemeProvider>
            </RTL>
        )
    }
}
