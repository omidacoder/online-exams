import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from "@material-ui/core/TextField";
import RTL from "../../RTL";
import axios from 'axios';
import {baseUrl} from './../../../Constants';
import {ClientId , ClientSecret} from './../../../Constants';
export default class StudentLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            errorMessage : '',
            progressbar : null
        }
    }
    Login(){
        //first we need to do oAuth
        this.setState({
            progressbar : <LinearProgress />
        });
        axios({
            url : baseUrl+'/oauth/token',
            method : 'post',
            data : {
                "username": this.state.username.toLowerCase(),
                "password":this.state.password,
                "grant_type" : "password",
                "client_id": ClientId,
                "client_secret" : ClientSecret,
                "provider" : "students"
            },
            headers : {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=UTF-8',
                'Cache-Control': 'no-cache'
            }
        }).then(function (response){
            if(response.status === 200){
                console.log(response);
                localStorage.setItem('student_token' , response.data.access_token);
                if(response.data.refresh_token != undefined)
                localStorage.setItem('student_refresh_token' , response.data.refresh_token);
                //now we need to send request to login api
                axios({
                    url : baseUrl+'/student/login',
                    mathod : 'get',
                    headers : {
                        'Authorization' : 'Bearer '+response.data.access_token
                    }
                }).then(function (finalresponse){
                    if(finalresponse.status === 200)
                    window.location.href  = (baseUrl+'/student/panel')
                }).catch(function (finalerror){
                    this.setState({
                        progressbar : null
                    });
                })
            }
        }).catch(function(error){
            if(error.response.data.error==='invalid_grant'){
                this.setState({
                    errorMessage : 'نام کاربری و یا رمز عبور اشتباه است',
                    progressbar : null
                });
                return;
            }
            if(error.response.data.error==='invalid_client'){
                this.setState({
                    errorMessage : 'مشکلی در درخواست شما وجود دارد',
                    progressbar : null
                });
                return;
            }
            this.setState({
                errorMessage : 'لطفا اتصال خود را بررسی کنید',
                progressbar : null
            });


        }.bind(this))
    }
    render() {
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
            },

            title: {
                fontSize: 14,
            },
        });
        return(
            <RTL>
                <MuiThemeProvider theme={theme}>
                    <Card dir="rtl" className={classes.root} variant="outlined" style={{marginBottom : 10 }} >
                <CardContent>
                    <h5 style={{color : '#00bcd4'}} className={classes.title} >
                        ورود دانش آموز
                    </h5>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="نام کاربری" variant="outlined" fullWidth value={this.state.username} onChange={
                        (event)=>{
                            this.setState({
                                username : event.target.value
                            });
                        }
                    } />
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="رمز عبور" type="password" variant="outlined" fullWidth value={this.state.password} onChange={
                        (event) => {
                            this.setState({
                                password : event.target.value
                            });
                        }
                    } />
                    <p className={this.state.errorMessage === '' ? '' : 'errorField'}>{this.state.errorMessage}</p>
                    {this.state.progressbar}
                </CardContent>
                <CardActions>
                    <Button style={{padding : 30}} color="primary" size="large" onClick={()=>{
                        this.Login();
                    }}>ورود</Button>
                </CardActions>
            </Card>
                </MuiThemeProvider>
            </RTL>
        )
    }
}
