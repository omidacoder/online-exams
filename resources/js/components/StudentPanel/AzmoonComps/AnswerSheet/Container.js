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
import BubbleButton from "./BubbleButton";
import Container from "@material-ui/core/Container";
import axios from 'axios';
import { StepContent } from '@material-ui/core';
import CountdownTimer from "react-component-countdown-timer";
import {baseUrl, ClientId , ClientSecret} from './../../../../Constants';
// import AwesomeButton from 'react-awesome-button/src/components/AwesomeButton';
//functional component


let tutorialSteps = [];
let answers = {};
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

    const [count , setCount] = React.useState(null);
    const [counter , setCounter] = React.useState(false);
    const [content , setContent] = React.useState([]);
    const classes = useStyles();
    const theme = useTheme();
    const [maxSteps , setMaxSteps] = React.useState(1);
    const [activeStep, setActiveStep] = React.useState(0);
    const endExam =()=>{
        const eqs = [];
        for(let key in answers){
            eqs[eqs.length]={id:key,choice:answers[key]};
        }

        axios({
            url : baseUrl+'/api/student/exam/end',
            method : 'post',
            data : {
                exam_id : localStorage.getItem('starting_exam_id'),
                se_id : localStorage.getItem('se_id'),
                exam_questions : eqs
            },
            headers :{
                'Authorization' : 'Bearer '+localStorage.getItem('student_token')
            }

        }).then(function(response){
            if(response.data.status === 's'){
                //do the login again
                axios({
                    url : baseUrl+'/student/login',
                    mathod : 'get',
                    headers : {
                        'Authorization' : 'Bearer '+localStorage.getItem('student_token')
                    }
                }).then(function (finalresponse){
                    if(finalresponse.status === 200)
                    window.location.replace(baseUrl+'/student/panel?examEnded=true');
                }).catch(function (finalerror){
                   
                })
                
            }
        }).catch(function(error){
            // console.log(error.response);
        })
    }
    const settings = {
        hideDay : true,
        hideHours : true,
        onEnd : () => {
             endExam();
        },
}
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStepChange = step => {
        setActiveStep(step);
    };
    const mark = (target , id) => {
        document.getElementById(id+"_1").style.backgroundColor = '#00bcd4';
        document.getElementById(id+"_2").style.backgroundColor = '#00bcd4';
        document.getElementById(id+"_3").style.backgroundColor = '#00bcd4';
        document.getElementById(id+"_4").style.backgroundColor = '#00bcd4';
        target.style.backgroundColor = 'green';
        target.style.borderRadius = '1000px';
    }
    const unMark = (id)=>{
        document.getElementById(id+"_1").style.backgroundColor = '#00bcd4';
        document.getElementById(id+"_2").style.backgroundColor = '#00bcd4';
        document.getElementById(id+"_3").style.backgroundColor = '#00bcd4';
        document.getElementById(id+"_4").style.backgroundColor = '#00bcd4';
    }
    const enterAnswers= () =>{
        answers = JSON.parse(localStorage.getItem('answers'));
        Object.keys(answers).map(function(key, index) {
            mark(document.getElementById(key+"_"+answers[key]) , key);
          });


    };
    if(!counter){
        if(localStorage.getItem('student_refresh_token') != null)
        axios({
            url : baseUrl+'/oauth/token',
            method : 'post',
            data : {
                "grant_type" : "refresh_token",
                "refresh_token" : localStorage.getItem('student_refresh_token'),
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
                 localStorage.setItem('student_refresh_token' , response.data.refresh_token);
                 localStorage.setItem('student_token' , response.data.access_token);
                 axios({
                    url : baseUrl+'/api/student/exam/start/'+localStorage.getItem('starting_exam_id'),
                    method : 'get',
                    headers :{
                        'Authorization' : 'Bearer '+localStorage.getItem('student_token')
                    }
                }).then(function(response){
                    setCounter(true);
                    if(response.status === 200){
                        if(response.data.status === 's'){
                            setCount(<CountdownTimer count={response.data.data.time} {...settings} />)
                            localStorage.removeItem('answers');
                            localStorage.setItem('se_id' , response.data.data.se_id);
                            localStorage.setItem('starting_exam_id' , response.data.data.exam_id);
                            tutorialSteps = [...response.data.data.exam_questions];
                            setMaxSteps(tutorialSteps.length);
                            setContent(response.data.data);
        
                        }
                        if(response.data.status === 'm'){
                            setCount(<CountdownTimer count={response.data.data.time} {...settings} />)
                            //means page refreshed we need to bring back what student had
                            tutorialSteps = [...response.data.data.exam_questions];
                            setMaxSteps(tutorialSteps.length);
                            setContent(response.data.data);
                            enterAnswers();
        
                        }
                        if(response.data.status === 'u'){
                            endExam()
                            alert("زمان آزمون شما به پایان رسیده است شما میتوانید از مشاور خود بخواهید که دوباره در این آزمون شرکت کنید")
                        }
                        if(response.data.status === 'g'){
                            alert(response.data.message);
                        }
                    }
                },classes,theme).catch(function(error){
            //         console.log(JSON.stringify(error.response));
            // console.log("im here");
                })
        }).catch(function(error){

        });
        
    }
    const chooseFirst = (eq_id ) =>{
        if(answers[eq_id] == 1){
            delete answers[eq_id];
            localStorage.setItem('answers' , JSON.stringify(answers));
            unMark(eq_id);
            return false;
        }
        answers[eq_id] = 1;
        localStorage.setItem('answers' , JSON.stringify(answers));
        enterAnswers();

    }
    const chooseSecond = (eq_id) =>{
        if(answers[eq_id] == 2){
            delete answers[eq_id];
            localStorage.setItem('answers' , JSON.stringify(answers));
            unMark(eq_id);
            return false;
        }
        answers[eq_id] = 2;
        localStorage.setItem('answers' , JSON.stringify(answers));
        enterAnswers();

    }
    const chooseThird = (eq_id) =>{
        if(answers[eq_id] == 3){
            delete answers[eq_id];
            localStorage.setItem('answers' , JSON.stringify(answers));
            unMark(eq_id);
            return false;
        }
        answers[eq_id] = 3;
        localStorage.setItem('answers' , JSON.stringify(answers));
        enterAnswers();

    }
    const chooseFourth = (eq_id) =>{
        if(answers[eq_id] == 4){
            delete answers[eq_id];
            localStorage.setItem('answers' , JSON.stringify(answers));
            unMark(eq_id);
            return false;
        }
        answers[eq_id] = 4;
        localStorage.setItem('answers' , JSON.stringify(answers));
        enterAnswers();

    }


    return (
        <div>
            {<div className={classes.root}>
                        <Paper square elevation={0} className={classes.header}>

    <Typography style={{fontFamily:'SahelBlack'}}>زمان باقی مانده : {count}</Typography>
                            <img src={baseUrl+"/images/Domino.png"} style={{height : '80%', alignSelf : 'center' , width : 'auto'}} />
                            <Button color="primary" onClick={()=>{endExam()}} >پایان آزمون و ثبت پاسخ ها</Button>
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
                                            <BubbleButton step={step.eq_id+"_1"} step_id={step.eq_id} title={step.first_ans} style={{alignSelf : 'center'}} handleClick={()=>{chooseFirst(step.eq_id); }} />
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12} style={{display : 'flex' , justifyContent : 'center', marginTop : 60 , alignItems : 'center'}}>
                                            <BubbleButton step={step.eq_id+"_2"} step_id={step.eq_id} title={step.second_ans} style={{alignSelf : 'center'}} handleClick={()=>{chooseSecond(step.eq_id ); }}/>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12} style={{display : 'flex' , justifyContent : 'center', marginTop : 60 , alignItems : 'center'}}>
                                            <BubbleButton step={step.eq_id+"_3"} step_id={step.eq_id} title={step.third_ans} style={{alignSelf : 'center'}} handleClick={()=>{chooseThird(step.eq_id ); }}/>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12} style={{display : 'flex' , justifyContent : 'center', marginTop : 60 , alignItems : 'center'}}>
                                            <BubbleButton step={step.eq_id+"_4"} step_id={step.eq_id} title={step.fourth_ans} style={{alignSelf : 'center'}} handleClick={()=>{chooseFourth(step.eq_id); }}/>
                                            </Grid>
                                            </Grid>
                                        </div>
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
