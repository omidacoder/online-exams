import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import ReadyPage from "./ReadyPage";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {baseUrl} from './../../../Constants';
import GetApp from '@material-ui/icons/GetApp';
import IconButton from "@material-ui/core/IconButton";
import Create from '@material-ui/icons/Create';
import {makeStyles,createMuiTheme ,  MuiThemeProvider} from "@material-ui/core/styles";
export default class FirstPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ExamComponents : [<LinearProgress />],
            rows : []
        }
        
        axios({
            url : baseUrl+'/api/student/exams/get_suitable',
            method : 'get',
            headers :{
                'Authorization' : 'Bearer '+localStorage.getItem('student_token')
            }
        }).then(function(response){
                if(response.status === 200){
                    this.exams = response.data.data.exams;
                    const sorted = [];
                    //lets sort exams by level
                    for(let i = 1;i<5;i++)
                    for(let j = 0;j<this.exams.length;j++){
                        if(this.exams[j].level == i){
                            sorted.push(this.exams[j]);
                        }
                    }
                    this.exams = sorted;
                    let current = 0;
                    let temp = [];
                    for(let i = 0 ; i<this.exams.length ; i++){
                        if(current != this.exams[i].level){
                            temp[temp.length] = <br/>
                            temp[temp.length] = <h3 style={{marginRight : 20 , color:'orange'}} >{this.getSentence(this.exams[i].level)}</h3>
                            temp[temp.length] = <br/>
                            current = this.exams[i].level;
                        }
                        temp[temp.length]=(<Grid item sm={12} md={12} xs={12}><Card style={{marginTop : 20 , marginBottom : 20}} className="zoom" variant="outlined">
                        <CardActionArea onClick={()=>{this.handleClick(this.exams[i])}}>
                            <CardMedia
                                component="img"
                                alt={this.exams[i].name}
                                height="140"
                                image={baseUrl+"/storage/"+this.exams[i].path}
                                title={this.exams[i].name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" style={{fontFamily : 'SahelBlack'}} >
                                {this.exams[i].name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{fontFamily : 'SahelBlack'}} >
                                    {"توضیحات آزمون : " + this.exams[i].description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{fontFamily : 'SahelBlack'}} >
                                    {"تعداد سوالات آزمون : " + this.exams[i].number_of_questions}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{fontFamily : 'SahelBlack'}} >
                                    {"درس آزمون : " + this.exams[i].description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{fontFamily : 'SahelBlack' ,color : this.exams[i].price == 0 ? 'green' : '#00bcd4'}} >
                                    {"هزینه آزمون : " +(this.exams[i].price != 0) ? this.exams[i].price +' تومان ' : ' رایگان '}
                                </Typography>
                                {this.exams[i].purchased == true ?
                                    <Typography variant="body2" color="textSecondary" style={{fontFamily : 'SahelBlack' ,color : 'green'}} >
                                {'هزینه آزمون پرداخت شده است'}
                                    </Typography>
                                    : null
                                }
                                {this.exams[i].take_part == true ?
                                    <Typography variant="body2" color="textSecondary" style={{fontFamily : 'SahelBlack' ,color : '#00bcd4'}} >
                                {'شما قبلا در این آزمون شرکت کرده اید'}
                                    </Typography>
                                    : null
                                }
                                {this.exams[i].running == true ?
                                    <Typography variant="body2" color="textSecondary" style={{fontFamily : 'SahelBlack' ,color : 'orange'}} >
                                {'آزمون در حال برگزاری است میتوانید ادامه دهید'}
                                    </Typography>
                                    : null
                                }
                            </CardContent>
                        </CardActionArea>
                    </Card></Grid>)
                    }
                    this.setState({
                        ExamComponents : [...temp]
                    });
                }
        }.bind(this)).catch(function(error){
        });
        axios({
            url : baseUrl+'/api/student/corrections',
            method : 'get',
            headers :{
                'Authorization' : 'Bearer '+localStorage.getItem('student_token')
            }
        }).then(function(response){
            if(response.data.status == 's'){
                this.setState({
                    rows : response.data.data.exams
                });
            }
        }.bind(this)).catch(function(error){
        });
    }

     handleClick(exam) {
        //implement later based on backend
        localStorage.setItem('starting_exam_id' , exam.id);
        let purchased = exam.purchased;
        if(exam.price == 0) purchased = true;
        this.props.AzmoonRoot.setState({
            section : <ReadyPage exam={exam} purchased={purchased}/>,

        });

    };
    getSentence(level){
        if(level == 1) return 'آزمون های دهم';
        if(level == 2) return 'آزمون های یازدهم';
        if(level == 3) return 'آزمون های دوازدهم';
        if(level == 4) return 'آزمون های پشت کنکوری';
    }

    render() {
        const handleCheckout = (se_id) => {
            localStorage.setItem('checkout_se_id' , se_id);
            localStorage.setItem('access_type' , 'student');
            window.location.href = baseUrl+'/checkout';
        }
        const handleDownload = (id)=>{
           window.location.href =  baseUrl + '/student/exam/answer/get/'+id
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

        return(
            <div>
                <h1>آزمون های آنلاین</h1>
                <Card variant="outlined" style={{paddingBottom:20}}>

                    <CardMedia
                        component="img"
                        alt="آزمون آنلاین"
                        height="140"
                        image={baseUrl+"/images/Dashboard2.jpg"}
                        title="آرمون آنلاین"
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h5" style={{fontFamily : 'SahelBlack'}} >
                            آزمون های شما
                        </Typography>
                        <Typography variant="body2" color="textSecondary" style={{fontFamily : 'SahelBlack',marginBottom : 40}} >
                            آزمون مورد نظر خود را میتوانید از لیست زیر انتخاب کنید
                        </Typography>
                        <Grid container spacing={4}>
                           {this.state.ExamComponents}
                        </Grid>
                    </CardContent>
                </Card>
                <br/>
                <h3>نتایج آزمون های گذشته</h3>
                <MuiThemeProvider theme={theme}>
               
                <TableContainer  variant="outlined" component={Paper}>
            
            <Table dir="rtl"  aria-label="caption table">
                <caption style={{textAlign : 'right'}}>اطلاعات آزمون های گذشته خودتان را در این جدول مشاهده کنید </caption>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">نام آزمون</TableCell>
                        <TableCell align="right">تعداد سوالات</TableCell>
                        <TableCell align="right">تعداد درست</TableCell>
                        <TableCell align="right">تعداد نزده</TableCell>
                        <TableCell align="right">تعداد نادرست</TableCell>
                        <TableCell align="right">زمان پاسخگویی</TableCell>
                        <TableCell align="right">زمان استاندارد</TableCell>
                        <TableCell align="right">درصد</TableCell>
                        <TableCell align="right">بررسی پاسح ها</TableCell>
                    <TableCell align="right">پاسخنامه</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.rows.map(row  => (
                        <TableRow key={row.id}>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.number_of_questions}</TableCell>
                            <TableCell align="right">{row.number_of_corrects}</TableCell>
                            <TableCell align="right">{row.number_of_whites}</TableCell>
                            <TableCell align="right">{row.number_of_incorrects}</TableCell>
                            <TableCell align="right">{row.period+'ثانیه'}</TableCell>
                            <TableCell align="right">
                                {row.time+'دقیقه'}
                            </TableCell>
                    <TableCell align='right'>{row.score}</TableCell>
                    <TableCell align="right">
                    <IconButton onClick={()=>{handleCheckout(row.id)}}  color="primary" size="large"><Create /></IconButton>
                </TableCell>
                    {row.answer == null ? <TableCell align="right">پاسخنامه ای یافت نشد</TableCell>
                :<TableCell align="right">
                <IconButton onClick={()=>{handleDownload(row.id)}}  color="primary" size="large"><GetApp /></IconButton>
            </TableCell>
            }
                

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </MuiThemeProvider>

            </div>
        )
    }

}
