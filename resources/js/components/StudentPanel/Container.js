import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from "@material-ui/core/Container";
import {Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import InboxIcon from '@material-ui/icons/Inbox';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dashboard from './Dashboard';
import Azmoon from "./Azmoon";
import Charts from "./Charts";
import Program from "./Program";
import Information from "./Information";
import Inbox from "./Inbox";
import {baseUrl} from './../../Constants';
export default class StudentPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected : null,
            leftComponent : <Dashboard exam={()=>{this.examElement.click();}}/>
        }
    }
    componentDidMount() {
            this.setState({
                open : false,
                selected : document.getElementById('dashboard')
            })
    }

    render() {
        const classes = makeStyles(theme => ({
            backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
            },
        }));
        const handleClick = (event) =>{
            let Target =  event.target;
            while(Target.tagName !== "LI"){
                Target = Target.parentNode;
            }
            this.state.selected.style.backgroundColor = 'white';
            this.setState({
                selected : Target
            });
            Target.style.backgroundColor = '#00bcd4';
            //changing content of left side here
            if(Target.id === "dashboard"){
                this.setState({
                    leftComponent : <Dashboard exam={()=>{this.examElement.click();}}/>
                })
            }
            if(Target.id === "exams"){
                this.setState({
                    leftComponent : <Azmoon />
                })
            }
            if(Target.id === "charts"){
                this.setState({
                    leftComponent : <Charts />
                })
            }
            if(Target.id === "inbox"){
                this.setState({
                    leftComponent : <Inbox />
                })
            }
            if(Target.id === "program"){
                this.setState({
                    leftComponent : <Program />
                })
            }
            if(Target.id === "info"){
                this.setState({
                    leftComponent : <Information />
                })
            }
            if(Target.id === 'logout'){
                localStorage.removeItem('student_username');
                localStorage.removeItem('student_token');
                localStorage.removeItem('student_phone_number');
                localStorage.removeItem('student_national_code');
                localStorage.removeItem('student_name');
                localStorage.removeItem('student_level');
                localStorage.removeItem('student_field');
                localStorage.removeItem('student_email');
                localStorage.removeItem('student_avg');
                if(localStorage.getItem('starting_exam_id'))
                localStorage.removeItem('starting_exam_id');
                if(localStorage.removeItem('se_id'))
                localStorage.removeItem('se_id');
                if(localStorage.removeItem('answers'))
                localStorage.removeItem('answers');
                window.location.replace(baseUrl);
            }


        };
        return(
            <div>
                    <Paper dir="rtl" elevation={3} square >
                        <Grid container  spacing={2} style={{padding : 10 , backgroundColor : 'f1f1f1'}} >
                            <Grid item md={4}  sm={12} xs={12} >
                                <Paper variant="outlined" square>
                                    <MenuList >
                                        <MenuItem onClick={handleClick}   id="dashboard" selected style={{backgroundColor : '#00bcd4' , height : 80}}>
                                            <ListItemIcon>
                                                <DashboardIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">داشبورد</Typography>
                                        </MenuItem>
                                        <MenuItem ref={input => this.examElement = input} id="exams" onClick={handleClick}  style={{ height : 80}}>
                                            <ListItemIcon>
                                                <BorderColorIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">آزمون ها</Typography>
                                        </MenuItem>
                                        <MenuItem id="charts" onClick={handleClick} style={{ height : 80}}>
                                            <ListItemIcon>
                                                <ShowChartIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">
                                                نمودار پیشرفت
                                            </Typography>
                                        </MenuItem >
                                        <MenuItem id="inbox" onClick={handleClick} style={{ height : 80}}>
                                            <ListItemIcon>
                                                <InboxIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">
                                                پیام ها
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem id="program" onClick={handleClick} style={{ height : 80}}>
                                            <ListItemIcon>
                                                <EventAvailableIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">
                                                برنامه ریزی تحصیلی
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem id="info" onClick={handleClick} style={{ height : 80}}>
                                            <ListItemIcon>
                                                <CreditCardIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">
                                                مشخصات
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem id="logout" onClick={handleClick} style={{ height : 80}}>
                                            <ListItemIcon>
                                                <ExitToAppIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">
                                                خروج از سیستم
                                            </Typography>
                                        </MenuItem>
                                    </MenuList>
                                </Paper>
                            </Grid>
                            <Grid item md={8} sm={12} xs={12} >
                                <Paper style={{padding : 20}} variant="outlined">
                                    {this.state.leftComponent}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>


            </div>
        )
    }
}
