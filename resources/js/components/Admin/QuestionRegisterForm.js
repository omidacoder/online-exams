import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {createMuiTheme, makeStyles ,  MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import RTL from "./../RTL";
import {Levels , Fields , Choices} from "./../../Constants";
import MenuItem from '@material-ui/core/MenuItem';
import Dropzone from 'react-dropzone';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CircularProgress } from '@material-ui/core';
import {baseUrl} from './../../Constants';
export default class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fileName : '',
            level : '',
            field : '',
            examsTemplate : null,
            exams : [] ,
            ticks : []
        }
    }
    
    render() {
        const loadExams = () =>{
            this.setState({
                examSection : <CircularProgress />
            });
            let url = baseUrl+'/api/administrator/exam/search?';
            if(this.state.level){
                url += 'level='+this.state.level+'&';
            }
            if(this.state.field){
                url+= 'field='+this.state.field;
            }
            axios({
                method : 'get',
                url : url,
                headers : {
                    admin_username: localStorage.getItem('admin_username'),
                    admin_password:localStorage.getItem('admin_password'),
                    X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
                }
            }).then(function (response) {
                let exams = response.data.data.exams;
                for(let i = 0;i<exams.length;i++){
                    exams[i].ticked = false;
                }
                this.setState({
                    exams
                },()=>{
                    let checkboxes = [];
                    for(let i = 0;i<exams.length;i++){
                        checkboxes=[...checkboxes,<FormControlLabel style={{marginBottom : 20}}
                            control={<Checkbox
                                color='primary'
                                checked={this.state.ticks[i]}
                                onChange={()=>{
                                    let ticks = [...this.state.ticks];
                                    ticks[i] = !ticks[i];
                                    this.setState({
                                        ticks
                                    },()=>{
                                        //now lets set exam_ids
                                        let ids = [];
                                        for(let j = 0 ; j<ticks.length;j++){
                                            if(ticks[j]){
                                                ids[ids.length] = exams[j].id;
                                            }
                                        }
                                        this.props.data.setExam_ids(ids.join(','));

                                    });
                                    
                                    
                                }}
                                value="verified"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />} label={exams[i].name} />]
                    }
                     this.setState({
                        examSection : checkboxes,
                        
                     });       
                });
                
                    
                }.bind(this))
                .catch(function (error) {
                    // handle error
                    return [];
                });
        }
        const handleLevelChange = (event) => {
            this.setState({
                level : event.target.value
            },()=>{loadExams();});
                
           
        }
        const handleCorrectChange = (event) => {
            this.props.data.setCorrect(event.target.value);
                
           
        }
        const handleFieldChange  = (event) => {
            this.setState({
                field : event.target.value
            },()=>{loadExams();});
                
           
            
        }
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
                direction : 'rtl',
                marginTop : this.props.type === 'admin' ? 20 : 0,
            },
            title: {
                fontSize: 14,
            },
        });
        return(
            <RTL>
               <MuiThemeProvider theme={theme}>
            <Card dir="rtl" className={classes.root} variant="outlined">
                <CardContent>
                    <h5 style={{color : '#00bcd4'}} className={classes.title} >
                        اضافه کردن سوال
                    </h5>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="شناسه سوال" variant="outlined" fullWidth value={this.props.data.description} onChange={
                        (event) => {
                            this.props.data.setDescription(event.target.value);
                        }
                    } />
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="گزینه اول" variant="outlined" fullWidth value={this.props.data.first_ans} onChange={
                        (event) =>{
                            this.props.data.setFirst_ans(event.target.value);
                        }
                    }/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="گزینه دوم" variant="outlined" fullWidth value={this.props.data.second_ans} onChange={
                        (event) =>{
                            this.props.data.setSecond_ans(event.target.value);
                        }}/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="گزینه سوم" variant="outlined" fullWidth value={this.props.data.third_ans} onChange={
                        (event) => {
                            this.props.data.setThird_ans(event.target.value);
                        }
                    }/>
                     <TextField style={{marginBottom : 10}} id="outlined-basic" label="گزینه چهارم" variant="outlined" fullWidth value={this.props.data.fourth_ans} onChange={
                        (event) => {
                            this.props.data.setFourth_ans(event.target.value);
                        }
                    }/>
                    <TextField fullWidth style={{marginBottom : 10 , marginRight : 10}}
                               id="standard-select-currency"
                               select
                               label="گزینه صحیح"
                               value={this.state.currency}
                               onChange={handleCorrectChange}
                               helperText="گزینه صحیح را انتخاب کنید"
                    >
                        {Choices.map(option => (
                            <MenuItem key={option.key} value={option.key}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                <TextField style={{marginBottom : 10 , marginRight : 10}}
                        id="standard-select-currency"
                        select
                        label="مقطع تحصیلی"
                        value={this.state.currency}
                        onChange={handleLevelChange}
                        helperText="لطفا مقطع تحصیلی آزمون را از لیست زیر انتخاب نمایید"
                    >
                        {Levels.map(option => (
                            <MenuItem key={option.key} value={option.key}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField style={{marginBottom : 10 , marginRight : 10}}
                               id="standard-select-currency"
                               select
                               label="رشته تحصیلی"
                               value={this.state.currency}
                               onChange={handleFieldChange}
                               helperText="لطفا رشته تحصیلی آزمون را انتخاب نمایید"
                    >
                        {Fields.map(option => (
                            <MenuItem key={option.key} value={option.key}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                    <br/>
                    <p>ابتدا رشته و یا مقطع تحصیلی آزمون مورد نظر انتخاب کنید و سپس آزمون را انتخاب کنید</p>
                    {this.state.examSection}
                    <Dropzone
                    maxSize={1000000}
                    multiple={false}
                     onDrop={acceptedFiles => {
                         this.setState({
                            fileName : acceptedFiles[0].name
                        })
                         this.props.data.setPath(acceptedFiles[0]);
                        
                     }}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div style={{border : 'dashed',borderColor : '#00bcd4' }} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p style={{textAlign : 'center',color:'#00bcd4'}}>لطفا فایل عکس خود را به اینجا بکشید</p>
                        </div>
                        </section>
                    )}
                    </Dropzone>
                    <p style={{fontSize: 12}}>{this.state.fileName}</p>
                </CardContent>
                <CardActions>
                   
                </CardActions>
            </Card>
               </MuiThemeProvider>
            </RTL>
        )
    }
}
