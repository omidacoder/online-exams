import React from 'react';
import { Grid , Paper ,Button , TextField} from '@material-ui/core';
import Message from './Message';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import RTL from './../../RTL';
import {theme} from './../../../Constants';
import axios from 'axios';
export default class MessageList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messageContent : ''
        };
    }

    handleSend(){

    }
    render(){
        return(
            <RTL>
                <MuiThemeProvider theme={theme}>
        <div id='messageList' style={{paddingRight:10 , paddingLeft : 10 , paddingBottom : 10}}>
            <Paper variant='outlined'>
            <Grid container style={{padding : 10}} spacing={2} >
                <Grid item md={12} sm={12} xs={12}>
                <div style={{overflowY : 'auto' , maxHeight: 500}}>
            <Grid item md={12} sm={12} xs={12} style={{marginTop : 20 , display:'flex' , flexDirection : 'column' , justifyContent : 'flex-end'}}>
             <Message type='received' content='سلام من امید داور هستم' /> 
            </Grid>
            <Grid item md={12} sm={12} xs={12}style={{marginTop : 20, display:'flex' , flexDirection : 'column' , justifyContent : 'flex-start'}}>
             <Message type='sent' content='سلام من مدیر هستم' /> 
            </Grid>
            </div>
            </Grid>
            <Grid  item md={12} sm={12} xs={12}>
            <TextField style={{marginBottom : 10}} id="outlined-basic" label="متن پیام" variant="outlined" fullWidth multiline rows={4} onChange={
                        (event) =>{
                            this.setState({
                                messageContent : event.target.value
                            });
                        }
                    }/>
            </Grid>
            
            <Grid item md={12} sm={12} xs={12}>
            <Button style={{width : '100%'}} variant="contained" color="primary" onClick={()=>{
                this.handleSend();
            }
            }>
                    ارسال پیام
            </Button>
            </Grid>
            </Grid>
            </Paper>
        </div>
        </MuiThemeProvider>
            </RTL> 
        );
    }
}