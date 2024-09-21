import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import FolderShared from '@material-ui/icons/FolderShared';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import MenuBook from '@material-ui/icons/MenuBook';
import Equalizer from '@material-ui/icons/Message'
import Dashboard from './Dashboard';
import AzmoonManagement from "./AzmoonManagement";
import StudentManagement from "./StudentManagement";
import AdvisorManagement from "./AdvisorManagement";
import QuestionManagement from "./QuestionManagement";
import Messages from "./Messages/Container";
import {baseUrl} from './../../Constants';
export default class AdminPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected : null,
            leftComponent : <Dashboard />
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
                    leftComponent : <Dashboard />
                })
            }
            if(Target.id === "exams"){
                this.setState({
                    leftComponent : <AzmoonManagement />
                })
            }if(Target.id === "students"){
                this.setState({
                    leftComponent : <StudentManagement />
                })
            }
            if(Target.id === "advisors"){
                this.setState({
                    leftComponent : <AdvisorManagement />
                })
            }
            if(Target.id === "messages"){
                this.setState({
                    leftComponent : <Messages />
                })
            }
            if(Target.id === 'questions'){
                this.setState({
                    leftComponent : <QuestionManagement />
                })
            }
            if(Target.id === 'signout'){
                localStorage.removeItem('admin_username');
                localStorage.removeItem('admin_password');
                localStorage.removeItem('X_API_TOKEN');
                window.location.href = (baseUrl+'/administrator');
            }


        };
        return(
            <div>
                    <Paper dir="rtl" elevation={3} square >
                        <Grid container  spacing={2} style={{padding : 10 , backgroundColor : 'f1f1f1'}} >
                            <Grid item md={3} sm={12} xs={12} >
                                <Paper variant="outlined" square>
                                    <MenuList >
                                        <MenuItem onClick={handleClick}  id="dashboard" selected style={{backgroundColor : '#00bcd4' , height : 60}}>
                                            <ListItemIcon>
                                                <DashboardIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">داشبورد</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleClick}  id="exams" selected style={{backgroundColor : 'white' , height : 60}}>
                                        <ListItemIcon>
                                            <LibraryBooks fontSize="small" />
                                        </ListItemIcon>
                                        <Typography variant="inherit">مدیریت آزمون ها</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleClick}  id="questions" selected style={{backgroundColor : 'white' , height : 60}}>
                                            <ListItemIcon>
                                                <MenuBook fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">مدیریت سوالات</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleClick}  id="students" selected style={{backgroundColor : 'white' , height : 60}}>
                                            <ListItemIcon>
                                                <AssignmentInd fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">مدیریت دانش آموزان</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleClick}  id="advisors" selected style={{backgroundColor : 'white' , height : 60}}>
                                            <ListItemIcon>
                                                <FolderShared fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">مدیریت مشاوران</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleClick}  id="messages" selected style={{backgroundColor : 'white' , height : 60}}>
                                            <ListItemIcon>
                                                <Equalizer fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">مدیریت پیام ها</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleClick}  id="signout" selected style={{backgroundColor : 'white' , height : 60}}>
                                            <ListItemIcon>
                                                <ExitToAppIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">خروج از سیستم</Typography>
                                        </MenuItem>


                                    </MenuList>
                                </Paper>
                            </Grid>
                            <Grid item md={9} sm={12} xs={12}>
                                <Paper style={{padding : 20}} variant="outlined">
                                    {this.state.leftComponent}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                <Backdrop className={classes.backdrop} timeout={1000} open={this.state.open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        )
    }
}
