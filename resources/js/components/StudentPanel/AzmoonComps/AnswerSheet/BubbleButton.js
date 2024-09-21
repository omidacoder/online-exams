import React from 'react';
import DoneAll from '@material-ui/icons/DoneAll';
export default class BubbleButton extends React.Component{
    constructor(props){
        super(props);
        
    }

    render() {
        
        return(
                <button  id='bubble-button' className="learn-more">
    <span onMouseDown={(event)=>{this.props.handleClick()} } id={this.props.step} className="circle" aria-hidden="true">
      <span className="icon arrow"></span>
    </span>
                    <span onMouseDown={(event)=>{this.props.handleClick()} } className="button-text">{this.props.title}</span>
                </button>
        )
    }
}
