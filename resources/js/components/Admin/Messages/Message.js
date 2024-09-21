import React from 'react';
import Paper from '@material-ui/core/Paper';
export default class Message extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
                
                <Paper style={{alignSelf : this.props.type == 'received' ? 'flex-end' : 'flex-start',backgroundColor : this.props.type == 'sent' ? '#00bcd4' : 'orange' ,borderTopLeftRadius : 100 , borderTopRightRadius : 100 , borderBottomLeftRadius : this.props.type == 'sent' ? 100 : 0 , borderBottomRightRadius : this.props.type == 'received' ? 100 : 0 , padding : 5,paddingLeft : 15 , paddingRight : 15 , maxWidth : '60%'}} >
                    <p style={{textAlign:this.props.type == 'sent' ? 'right' : 'left' , color : 'white',fontSize : 12}}>{this.props.content}</p>
                </Paper>

            
        );
    }
}