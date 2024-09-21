import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography,Button} from "@material-ui/core";
import {baseUrl} from './../../../Constants'
export default class ReadyPage extends React.Component{
    constructor(props){
        super(props);
    }
    startWithMoney(){
        window.location.href = (baseUrl+'/payment/initialize?exam_id='+localStorage.getItem('starting_exam_id')+'&TOKEN='+encodeURIComponent(localStorage.getItem('student_token')));
    }
    startWithoutMoney(){
        window.location.replace(baseUrl+'/exam/start');
    }
    render() {
        return(
            <div className="ready-container">
                <h2>آیا برای آزمون آماده هستید؟</h2><br/>
                <h6>پس از کلیک بر روی شروع آزمون زمان آزمون برای شما محاسبه خواهد شد </h6>
                <Card  className="zoom" style={{marginBottom : 20}} >
                        <CardContent>
                            <Typography gutterBottom variant="h5" style={{fontFamily : 'SahelBlack'}} >
                                مشخصات آزمون انتخابی
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{fontFamily : 'SahelBlack'}} >
                                {"توضیحات آزمون : " + this.props.exam.description}
                                <br/>
                                {"نام آزمون : " + this.props.exam.name}
                                <br/>
                                {"زمان آزمون : " + this.props.exam.time + 'دقیقه'}
                                <br/>
                                {"تعداد سوالات : " + this.props.exam.number_of_questions}
                            </Typography>
                        </CardContent>
                </Card>
        {this.props.purchased == true ?  <Button onClick={()=>{this.startWithoutMoney()}} style={{padding : 30}}>{ this.props.exam.running ? 'ادامه ی آزمون'  : 'شروع آزمون'}</Button> : <Button onClick={()=>{this.startWithMoney()}} style={{padding : 30}}>پرداخت و شروع آزمون</Button> }
            </div>
        )
    }

}
