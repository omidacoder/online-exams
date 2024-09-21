import React from "react";
import {GridList , Grid  , Card ,CardActionArea , CardMedia ,CardContent ,Typography} from "@material-ui/core";
import axios from 'axios';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {baseUrl} from './../../Constants';
export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : localStorage.getItem('student_name')
        }
    }
    componentWillMount(){
        axios({
            url : baseUrl+'/api/student/get',
            mathod : 'get',
            headers : {
                'Authorization' : 'Bearer '+localStorage.getItem('student_token')
            }
        }).then(function (finalresponse){
            if(finalresponse.status === 200){
            localStorage.setItem('student_name' , finalresponse.data.data.student.name);
            localStorage.setItem('student_username' , finalresponse.data.data.student.username);
            localStorage.setItem('student_email' , finalresponse.data.data.student.email);
            localStorage.setItem('student_phone_number' , finalresponse.data.data.student.phone_number);
            localStorage.setItem('student_national_code' , finalresponse.data.data.student.national_code);
            localStorage.setItem('student_field' , finalresponse.data.data.student.field);
            localStorage.setItem('student_level' , finalresponse.data.data.student.level);
            localStorage.setItem('student_avg' , finalresponse.data.data.student.avg);
            this.setState({
                name : localStorage.getItem('student_name')
            })
            }
        }.bind(this)).catch(function (finalerror){
        })
    }
    render() {
        return(
            <>
                <h1> به پنل دانش آموز خوش آمدید </h1>
                <Grid container spacing={2}>
                    <Grid md={4}>
                        <Card className="zoom" variant="outlined">
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="پنل کاربری"
                                    height="140"
                                    image={baseUrl+"/images/dashboard.png"}
                                    title="پنل کاربری"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" style={{fontFamily : 'SahelBlack'}} >
                                        {this.state.name+" عزیز"}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" style={{fontFamily : 'SahelBlack'}} >
                                        بسیاری از قبلیت های وب سایت هنوز طراحی نشده است و به زودی در دسترس خواهد بود . در حال حاضر میتوانید در آزمون های غیر حضوری شرکت کنید. از صبر شما سپاسگذاریم
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid md={1}>

                    </Grid>
                    <Grid md={7}>
                        <Card className="zoom" variant="outlined">
                            <CardActionArea onClick={()=>{
                                this.props.exam();

                                }}>
                                <CardMedia
                                    component="img"
                                    alt="آزمون آنلاین"
                                    height="140"
                                    image={baseUrl+"/images/Dashboard2.jpg"}
                                    title="آرمون آنلاین"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" style={{fontFamily : 'SahelBlack'}} >
                                        آزمون های آنلاین
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" style={{fontFamily : 'SahelBlack'}} >
                                       شما میتوانید در آزمون های آنلاین مرکز مشاوره تحصیلی محمد حسین مظفری شرکت کنید و خود را بسنجید
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                </Grid>
                </>
        )


    }

}
