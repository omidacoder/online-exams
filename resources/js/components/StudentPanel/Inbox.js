import React from "react";
import Construction from "../../Construction";
export default class Inbox extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <>
            <h1>پیام های شما</h1>
            <Construction />
            </>
        )
    }

}
