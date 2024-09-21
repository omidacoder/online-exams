import React from "react";
import Container from "@material-ui/core/Container";
import {Paper} from "@material-ui/core";
import {createMuiTheme ,  MuiThemeProvider} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RTL from "../RTL";
import axios from 'axios';
import {baseUrl} from './../../Constants';
export default class LoginContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : ''
        }
    }

    render() {
       const handleClick = () => {
               localStorage.setItem('admin_username',this.state.username);
               localStorage.setItem('admin_password',this.state.password);
               localStorage.setItem('X_API_TOKEN','$2y$10$309yZBzcvuyEq9zJZFRZuOVfXShe2KCT/oqXAjGnNMgbNLqezLxWi');
            axios.post(baseUrl+'/administrator/login', {
                admin_username: this.state.username,
                admin_password: this.state.password,
                X_API_TOKEN : '$2y$10$309yZBzcvuyEq9zJZFRZuOVfXShe2KCT/oqXAjGnNMgbNLqezLxWi'
            })
                .then(function (response) {
                    if(response.data.status === 's'){
                        window.location.href  = (baseUrl+"/administrator/panel");
                    }
                })
                .catch(function (error) {
                });
        };
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

        return(

            <RTL>
                <MuiThemeProvider theme={theme}>
          <Container style={{display: 'flex',flexDirection: 'column' , justifyContent : "center" , alignItems : 'center',marginTop : '10%'}}>
              <Grid container>
                  <Grid item sm={3}>

                  </Grid>
                  <Grid item sm={6} xs={12}>
                      <Paper dir='rtl' style={{padding: 20}}>
                          <h3 style={{textAlign : 'right',marginBottom: 20}}>ورود مدیر</h3>
                          <TextField style={{marginBottom : 10}} id="outlined-basic" label="نام کاربری" variant="outlined" fullWidth value={this.state.username}
                          onChange={(event)=>{
                              this.setState({
                                  username : event.target.value
                              })
                          }}/>
                          <TextField style={{marginBottom : 10}} id="outlined-basic" label="رمز عبور" variant="outlined" fullWidth value={this.state.password}
                                     onChange={(event)=>{
                                         this.setState({
                                             password : event.target.value
                                         })
                                     }}/>
                          <Button onClick={handleClick} style={{padding : 30}} color="primary" size="large">ورود</Button>
                      </Paper>
                  </Grid>
                  <Grid item sm={3}>

                  </Grid>
              </Grid>
          </Container>
                </MuiThemeProvider>
            </RTL>
        );
    }
}
