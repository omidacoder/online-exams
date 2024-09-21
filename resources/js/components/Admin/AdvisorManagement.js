import React from 'react';
import {Paper} from "@material-ui/core";
import Build from '@material-ui/icons/Build';
export default class AdvisorManagement extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div><h1>مدیریت مشاوران</h1>
            <p style={{fontSize:12}}><Build style={{marginTop:10}} fontSize="large" /> این بحش از سایت هنوز طراحی نشده است و  به زودی قابل دسترس خواهد بود</p>
            
            </div>
        );
    }
}
