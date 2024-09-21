import React from 'react';
import Constants from './../../../Constants';
import { Grid } from '@material-ui/core';
import {baseUrl} from './../../../Constants';
export default class Footer extends React.Component{
    render(){
            return (
            <div className="my-footer">
                <Grid container >
                <Grid item md={6} xs={12} style={{padding : 20}}>
                    <img src={baseUrl+"/images/Domino.png"} style={{width : "70%" , height : "auto"}} />
                </Grid>
                <Grid container item md={6} xs={12}>
                    <Grid container style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}}>
                        <p style={{color : 'white' , fontSize : 14,textAlign : "center"}}>ما را در رسانه های اجتماعی دنبال کنید</p>
                    </Grid>
                    <Grid container>
                    <Grid item xs={3} sm={3} md={3}>
                        <a href="https://instagram.com/mozaffari_moshavere"><img style={{width : '40%' , height : 'auto'}} src={baseUrl+"/images/instagram.svg"} /></a>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                    <a href="https://t.me/mozaffari_moshavere"><img style={{width : '40%' , height : 'auto'}} src={baseUrl+"/images/telegram.svg"} /></a>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                    <a href="mailto:omiddavar@yahoo.com"><img style={{width : '40%' , height : 'auto'}} src={baseUrl+"/images/inbox.svg"} /></a>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                    <a href="https://wa.me/989162754502"><img style={{width : '40%' , height : 'auto'}} src={baseUrl+"/images/whatsapp.svg"} /></a>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <p style={{color : 'gray' , fontSize : 12}}> ©تمامی حقوق سایت متعلق به مرکز مشاوره دومینو کنکور و محفوظ میباشد</p>
            </div>
            );
    }
}