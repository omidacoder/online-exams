import React from 'react';
import ReactCodeInput from 'react-verification-code-input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CountdownTimer from "react-component-countdown-timer";
import axios from 'axios';
import {baseUrl} from './../../Constants';
export default class Verify extends React.Component{
    constructor(props){
        super(props);
        let settings = {
            count: 120,
            hideDay : true,
            hideHours : true,
            className : 'counter',
            onEnd : () => {
                this.setState({
                        sendAgain : {
                            disabled : false
                        },
                        verify : {
                            disabled : true
                        }
                });
            },
            style : {
                marginTop : 20
            }
          };
        this.state = {
            code : [],
            sendAgain : {
                disabled : true
            },
            verify : {
                disabled : false
            },
            message : '',
            counter : <CountdownTimer {...settings} />
            
        }
    }
    verifyPhone(){
            this.props.decide(-1);
            axios({
                method : 'post',
                url : baseUrl+'/api/student/verify/'+this.props.id,
                data : {
                    code : this.state.code,
                }
            }).then(function (response){
                    if(response.data.status === 's'){
                        this.props.decide(2);
                    }
                    if(response.data.status === 'f'){
                        this.props.decide(1);
                        this.props.setErrors(true);
                        this.props.setVerifyError('کد تایید وارد شده صحیح نمیباشد');
                    }
            }.bind(this)).catch(function (error){
            });

            
    }
    send(){
        axios({
            method : 'post',
            url : baseUrl+'/api/student/send/'+this.props.id,
            data : {
                
            }
        }).then(function (response){
                if(response.data.status === 's'){
                   this.setState({
                        message : 'پیامک شامل کد فعالسازی دوباره برای شما ارسال شد',
                        sendAgain : {
                            disabled : true
                        },
                        verify : {
                            disabled : false
                        },
                        counter : <CountdownTimer {...settings} />
                        
                   });
                }
        }.bind(this)).catch(function (error){

        });
    }
    render(){
        
          
        return(
            <Paper style={{padding : 20}}>            <div style={{display : 'flex' , flexDirection : 'column' , justifyContent: 'center' , alignItems : 'center'  }} >
                <img src={baseUrl+'/images/SMS.svg'} style={{marginBottom : 20 , width : '50%' , height : 'auto'}}/>
                <ReactCodeInput fields={6} values={this.state.code} onChange={(newCode)=>{
                    this.setState({
                        code : newCode
                    })
                
                }}/>
                {this.state.counter}

                <Button style={{padding : 30 ,marginTop : 20}} color="primary" {...this.state.verify} size="large" onClick={()=>{
                    this.verifyPhone();
            }}>تایید شماره تلفن</Button>
            <Button style={{marginTop : 20}} color="primary" variant="outlined" {...this.state.sendAgain} size="large" onClick={()=>{
                    this.send();
            }}>ارسال دوباره</Button>
            <p style={{marginTop : 20}}>{this.state.message}</p>
            </div>
            </Paper>

        );
    }
}