import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper'
import ReactDOM from 'react-dom';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PhoneIcon from '@material-ui/icons/Phone';
import makeStyles from "@material-ui/core/styles/makeStyles";
import purple from '@material-ui/core/colors/purple';
import GroupIcon from '@material-ui/icons/Group'
import MainFrame from "./MainFrame";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Advisors from "./Advisors";
import Register from "./Register";
import Contact from "./Contact";
export default class NavTabs extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value : 2,
            swipe : 1
        }

    }

    render(){
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main :  '#00bcd4'
                },
                secondary: {
                    main : '#ff4081'
                }
            }
        });
      // const [value, setValue] = React.useState(0);
      const handleChange = (event, newValue) => {
          this.setState({
              value : newValue,
          });
      };
        const handleChangeIndex = index => {
            this.setState({
               value : index

            });
        };

    return (
        <MuiThemeProvider theme={theme}>
        <div style={{backgroundColor : '#FFFC' }} >
      <Tabs style={{backgroundColor : 'white' , opacity : 1 ,position : 'fixed' , top:0 , right : 0 , width : '100%',zIndex : 10}}
          value={this.state.value}
          onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
          <Tab  label="مشاوران" icon={<GroupIcon/>}  aria-label="person" />
          <Tab label="ثبت نام" icon={<PersonPinIcon />} aria-label="register" />
          <Tab label="صفحه اصلی" icon={<HomeIcon />} aria-label="main" />
      </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={this.state.value}
                onChangeIndex={handleChangeIndex}
            >
                <Advisors value={this.state.value} index={0} />
                <Register value={this.state.value} index={1} />
                <MainFrame value={this.state.value} index={2} />
            </SwipeableViews>
    </div>
    

            </MuiThemeProvider>
    );
  }
}
if(document.getElementById('navbar')){
  ReactDOM.render(<NavTabs /> , document.getElementById('navbar'));
}
