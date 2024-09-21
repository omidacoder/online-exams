import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "./Navbar";
export default class Contain extends React.Component{
    constructor(props){
        super(props);
        
    }


    render() {
        const classes = makeStyles(theme => ({
            backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
            },
        }));
        return(
            <div>
                    <Navbar />
                
            </div>
        )
    }
}
