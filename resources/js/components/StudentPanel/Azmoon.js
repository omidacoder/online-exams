import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import FirstPage from "./AzmoonComps/FirstPage";
export default class Azmoon extends React.Component{
    //this is just a switcher
    constructor(props){
        super(props);
        this.state ={
            section : <FirstPage AzmoonRoot={this} />
        }
    }
    render() {
        return(
            <>
                {this.state.section}
                </>
        )
    }

}
