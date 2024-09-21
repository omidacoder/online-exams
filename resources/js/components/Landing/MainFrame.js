import React from 'react';
import ReactDom from 'react-dom';
import Slider from './HomePage/Slider';
import PowerPoints from './HomePage/Powerpoints';
import SiteFooter from './HomePage/Footer';
import { Grid } from '@material-ui/core';
import StudentLogin from './RegisterComponents/StudentLogin';
import AdvisorLogin from './RegisterComponents/AdvisorLogin';
export default class MainFrame extends React.Component {
    constructor(props){
        super(props);

    }
    render() {
        return(
          <div style={{marginTop : 50 , padding : 30}} className="main-frame">
              <Slider  />
              <PowerPoints />
              <h2 style={{marginTop : 60 , fontFamily : 'Lalehzar' , color : 'orange'}}>از قبل ثبت نام کردی؟</h2>
              <Grid container spacing={2} >
                  <Grid style={{marginTop : 30 , marginBottom : 20}} spacing={2} item md={6} sm={12}>
                        <StudentLogin />
                  </Grid>
                  <Grid style={{marginTop : 30 , marginBottom : 20}} spacing={2} item md={6} sm={12}>
                        <AdvisorLogin />
                      </Grid>
              </Grid>
              <SiteFooter />
          </div>
        );
    }
}
