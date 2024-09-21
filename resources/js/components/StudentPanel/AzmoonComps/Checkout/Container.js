import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import {baseUrl} from './../../../../Constants';


// import AwesomeButton from 'react-awesome-button/src/components/AwesomeButton';
//functional component


let tutorialSteps = [];
const useStyles = makeStyles(theme => ({
    root: {

        width : '100%',
        height : '100%',
        top : 0
    },
    header: {
        display : 'flex',
        alignItems: 'center',
        height: 50,
        position : 'fixed',
        top:0,
        left : 0,
        right: 0 ,
        zIndex :10,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        justifyContent : 'space-between'
    },
    img: {
        height : 'auto',
        display: 'block',
        overflow: 'hidden',
        width : '80%',
        marginTop : 60,
        flex : 0.3
    },
    question : {
        textAlign : 'center'
    }
}));




function SwipeableTextMobileStepper() {


    const classes = useStyles();
    const theme = useTheme();
    const [maxSteps , setMaxSteps] = React.useState(1);
    const [activeStep, setActiveStep] = React.useState(0);
    if(localStorage.getItem('access_type') == 'admin')
    axios({
        url : baseUrl+'/api/administrator/checkout/start/'+localStorage.getItem('checkout_se_id'),
        method : 'get',
        headers : {
            admin_username: localStorage.getItem('admin_username'),
            admin_password:localStorage.getItem('admin_password'),
            X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
        }

    }).then(function(response){
        if(response.data.status === 's'){
            tutorialSteps = response.data.data.exam_questions;
            setMaxSteps(tutorialSteps.length);
        }

    }).catch(function(error){

    });
    if(localStorage.getItem('access_type') == 'student')
    axios({
        url : baseUrl+'/api/checkout/start/'+localStorage.getItem('checkout_se_id'),
        method : 'get',
        headers :{
            'Authorization' : 'Bearer '+localStorage.getItem('student_token')
        }
    }).then(function(response){
        if(response.data.status === 's'){
            tutorialSteps = response.data.data.exam_questions;
            setMaxSteps(tutorialSteps.length);
        }

    }).catch(function(error){

    });
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStepChange = step => {
        setActiveStep(step);
    };

    const getStyles = (option , correct , choice) =>{
        if(option == correct){
            return { backgroundColor : 'green'}
        }
        if(option == choice){
            return {backgroundColor : 'red'}
        }
        return {}
    }
    return (
        <div>
            {<div className={classes.root}>
                        <Paper square elevation={0} className={classes.header}>

    <Typography style={{fontFamily:'SahelBlack'}}>بررسی پاسخ های آزمون</Typography>
                            <img src={baseUrl+"/images/Domino.png"} style={{height : '80%', alignSelf : 'center' , width : 'auto'}} />
                            <Button color="primary" onClick={()=>{window.location.replace(baseUrl+'/student/panel')}} >پایان بررسی</Button>
                        </Paper>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}

                        >
                            {tutorialSteps.map((step, index) => (
                                <div key={index}>
                                        <div style={{backgroundColor : 'white',display : 'flex' , justifyContent : 'center',flexDirection : 'column' , alignItems : 'center' }}>
                                        <img className={classes.img} src={baseUrl+'/storage/'+step.path} alt={step.description} />
                                        <Grid container style={{ marginBottom : 60}}>
                                        <Grid item md={3} sm={12} xs={12} style={{display : 'flex' , justifyContent : 'center', marginTop : 60 , alignItems : 'center'}}>
                                                <a className={"HOVER"} style={getStyles(1,step.correct,step.choice)}>
                                                    <span></span>
                                                    <text>{step.first_ans}</text>
                                                </a>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12} style={{display : 'flex' , justifyContent : 'center', marginTop : 60 , alignItems : 'center'}}>
                                            <a className={"HOVER"} style={getStyles(2,step.correct,step.choice)}>
                                                    <span></span>
                                                    <text>{step.second_ans}</text>
                                                </a>                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12} style={{display : 'flex' , justifyContent : 'center', marginTop : 60 , alignItems : 'center'}}>
                                            <a className={"HOVER" } style={getStyles(3,step.correct,step.choice)}>
                                                    <span></span>
                                                    <text>{step.third_ans}</text>
                                                </a>                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12} style={{display : 'flex' , justifyContent : 'center', marginTop : 60 , alignItems : 'center'}}>
                                            <a className={"HOVER"} style={getStyles(4,step.correct,step.choice)}>
                                                    <span></span>
                                                    <text>{step.fourth_ans}</text>
                                                </a>                                            </Grid>
                                            </Grid>
                                        </div>
                                        {step.choice != undefined ?  <p style={{textAlign : 'center'}}> شما به این سوال پاسخ داده اید</p> :  <p style={{textAlign : 'center'}}> شما به این سوال پاسخ نداده اید</p>}
                                        <br/>
                                        {step.choice != undefined ? (step.choice !== step.correct ? <p style={{textAlign : 'center',marginBottom : 40}}> گزینه نا درست انتخاب شده است</p> : <p style={{textAlign : 'center' , marginBottom : 40}}> گزینه درست انتخاب شده است</p>) : null}

                                </div>
                            ))}
                        </SwipeableViews>
                        <MobileStepper
                            style={{position : 'fixed',bottom : 0,left : 0,width:'100%'}}
                            steps={maxSteps}
                            position="static"
                            variant="text"
                            activeStep={activeStep}
                            nextButton={
                                <Button color="primary" size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                   سوال بعدی
                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>
                            }
                            backButton={
                                <Button color="primary" size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                    سوال قبلی
                                </Button>
                            }
                        />
                    </div>}
        </div>
    );
}

export default SwipeableTextMobileStepper;
