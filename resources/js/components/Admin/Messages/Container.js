import React from 'react';
import { MuiThemeProvider, Grid } from '@material-ui/core';
import RTL from '../../RTL';
import ChatList from './ChatList';
import MessageList from './MessageList';
import {theme} from '../../../Constants';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles'
export default class Messages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search : ''
        }
    }
    searchStudent(){

    }
    render(){
        const classes = makeStyles(theme => ({
            margin: {
                margin: theme.spacing(1),
            },
        }));
        return(
            <>
            <RTL>
                <MuiThemeProvider theme={theme}>
                    <h1>پیامرسانی</h1><br/>
                    <h3>ارسال پیام خصوصی</h3>
                    <Grid container>
                        <Grid container>
                        <FormControl style={{marginBottom : 20}} dir="rtl" className={classes.margin} >
                    <InputLabel style={{textAlign : 'right'}} dir="rtl" htmlFor="input-with-icon-adornment">جستجوی دانش آموزان</InputLabel>
                    <Input
                        dir="rtl"
                        id="input-with-icon-adornment"
                        value={this.state.search}
                        onChange={(event)=>{
                            this.setState({
                                search : event.target.value
                            });
                        }}
                        startAdornment={
                            <InputAdornment position="start">

                            </InputAdornment>
                        }
                    />
                </FormControl>
                <IconButton variant="outlined" color="primary" onClick={()=>{this.searchStudent()}}>
                <Search />
                </IconButton>
                        </Grid>
                    <Grid item md={4} sm={12} xs={12} >
                        <ChatList />
                    </Grid>
                    <Grid item md={8} sm={12} xs={12} >
                        <MessageList />
                    </Grid>
                    </Grid>
                </MuiThemeProvider>
            </RTL>
            </>
        );
    }
}