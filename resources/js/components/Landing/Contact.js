import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import RTL from "../RTL";
import TextField from "@material-ui/core/TextField";
export default class Contact extends React.Component{
    constructor(props){
        super(props)
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
                marginTop : 40
            },

            title: {
                fontSize: 14,
            },
        });
        return(
            <RTL>
                <MuiThemeProvider theme={theme}>
                    <Card dir="rtl" className={classes.root} variant="outlined" style={{marginBottom : 10}}>
                        <CardContent>
                            <h5 style={{color : '#00bcd4'}} className={classes.title} >
                                ارسال نظرات شما عزیزان
                            </h5>
                            <TextField style={{marginBottom : 10}} id="outlined-basic" label="نام شما" variant="outlined" fullWidth />
                            <TextField style={{marginBottom : 10}} id="outlined-basic" label="متن پیام" type="password" variant="outlined" fullWidth multiline
                                       rowsMax="4" />
                        </CardContent>
                        <CardActions>
                            <Button style={{padding : 30}} color="primary" size="large">ارسال</Button>
                        </CardActions>
                    </Card>
                </MuiThemeProvider>
            </RTL>
        )
    }
}

