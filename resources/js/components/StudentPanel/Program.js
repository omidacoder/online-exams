import React from "react";
import Construction from './../../Construction';
export default class Program extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <>
            <h1>برنامه ی پیش و رو</h1>
            <Construction />
            </>
        )
    }

}
