import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {createMuiTheme, makeStyles ,  MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import RTL from "./../RTL";
import {Levels , Fields} from "./../../Constants";
import MenuItem from '@material-ui/core/MenuItem';
import Dropzone from 'react-dropzone';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {baseUrl} from './../../Constants';
export default class SignUp extends React.Component{
    constructor(props){
        super(props);
        const handleToggle= () => {
            axios({
                method : 'get',
                url : baseUrl+'/api/administrator/exam/toggle/'+this.props.id,
                headers : {
                              admin_username: localStorage.getItem('admin_username'),
                              admin_password:localStorage.getItem('admin_password'),
                              X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
                }
            }).then(function (response) {
              
                if(response.data.status == 's'){
                    console.log(this.props.data.verified);
                    if(response.data.data.signal == '1'){
                        this.setState({
                            hideButton : <Button onClick={handleToggle} color="primary">
                            آشکار ساختن آزمون برای دانش آموزان
                          </Button>
                        })
                    }
                    else{
                        this.setState({
                            hideButton : <Button onClick={handleToggle} color="secondry">
                            پنهان کردن آزمون از دید دانش آموزان
                             </Button>
                        })
                    }
                }
                }.bind(this));
        }
        this.state = {
            level : null,
            field : null,
            fileName : '',
            hideButton : this.props.data.verified == 1 ? 
            <Button onClick={handleToggle} color="secondry">
         پنهان کردن آزمون از دید دانش آموزان
          </Button>
          :
          <Button onClick={handleToggle} color="primary">
     آشکار ساختن آزمون برای دانش آموزان
   </Button>
        
        }
    }
    
    render() {
        
        const handleLevelChange = (event) => {
            this.props.data.setLevel(event.target.value);
            this.setState({
                level : event.target.value
            })
        }
        const handleFieldChange  = (event) => {
            this.props.data.setField(event.target.value);
            this.setState({
                field : event.target.value
            })
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
                        اضافه کردن آزمون
                    </h5>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="توضیحات آزمون" variant="outlined" fullWidth value={this.props.data.description} onChange={
                        (event) => {
                            this.props.data.setDescription(event.target.value);
                        }
                    } />
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="نام آزمون" variant="outlined" fullWidth value={this.props.data.name} onChange={
                        (event) =>{
                            this.props.data.setName(event.target.value);
                        }
                    }/>
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
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="درس" variant="outlined" fullWidth value={this.props.data.lesson} onChange={
                        (event) =>{
                            this.props.data.setLesson(event.target.value);
                        }}/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="تعداد سوالات" variant="outlined" value={this.props.data.NumberOfQuestions} onChange={
                        (event) => {
                            this.props.data.setNumberOfQuestions(event.target.value);
                        }
                    }/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="هزینه آزمون به تومان" variant="outlined" fullWidth value={this.props.data.price} onChange={
                        (event) => {
                            this.props.data.setPrice(event.target.value);
                        }
                    }/>
                    <TextField style={{marginBottom : 10}} id="outlined-basic" label="زمان آزمون به دقیقه" variant="outlined" fullWidth value={this.props.data.time} onChange={
                        (event) => {
                            this.props.data.setTime(event.target.value);
                        }
                    }/>
                    
                    
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
                        <div style={{border : 'dashed' , borderColor : '#00bcd4'}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p style={{textAlign : 'center' , color : '#00bcd4'}}>لطفا فایل عکس خود را به اینجا بکشید</p>
                        </div>
                        </section>
                    )}
                    </Dropzone>
                    <p style={{fontSize: 12}}>{this.state.fileName}</p>
                </CardContent>
                <CardActions>
                   {this.state.hideButton}
                </CardActions>
            </Card>
               </MuiThemeProvider>
            </RTL>
        )
    }
}
