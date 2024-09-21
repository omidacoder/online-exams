import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import InboxIcon from '@material-ui/icons/Inbox';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
export default class Options extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected : null
        }
    }
    componentDidMount() {
        this.setState({
            selected : document.getElementById('dashboard')
        });
    }

    render() {
        const handleClick = (event) =>{
            const Target = event.target.tagName === "LI" ? event.target : event.target.parentNode;
            this.state.selected.style.backgroundColor = 'white';
            this.setState({
                selected : Target
            });
            Target.style.backgroundColor = '#00bcd4';
            //here change content of left side
        };
        return(
            <Paper variant="outlined" square>
            <MenuList >
                <MenuItem onClick={handleClick}  id="dashboard" selected style={{backgroundColor : '#00bcd4' , height : 80}}>
                    <ListItemIcon>
                        <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">داشبورد</Typography>
                </MenuItem>
                <MenuItem onClick={handleClick}  style={{ height : 80}}>
                    <ListItemIcon>
                        <BorderColorIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">آزمون ها</Typography>
                </MenuItem>
                <MenuItem  onClick={handleClick} style={{ height : 80}}>
                    <ListItemIcon>
                        <ShowChartIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">
                       نمودار پیشرفت
                    </Typography>
                </MenuItem >
                <MenuItem  onClick={handleClick} style={{ height : 80}}>
                    <ListItemIcon>
                        <InboxIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">
                        پیام ها
                    </Typography>
                </MenuItem>
                <MenuItem  onClick={handleClick} style={{ height : 80}}>
                    <ListItemIcon>
                        <EventAvailableIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">
                        برنامه ریزی تحصیلی
                    </Typography>
                </MenuItem>
                <MenuItem  onClick={handleClick} style={{ height : 80}}>
                    <ListItemIcon>
                        <CreditCardIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">
                        مشخصات
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClick} style={{ height : 80}}>
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">
                        خروج از سیستم
                    </Typography>
                </MenuItem>
            </MenuList>
            </Paper>
        )
    }
}
