import React from "react";
import Construction from "../../Construction";
export default class Charts extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <>
            <h1>نمودار های پیشرفت</h1>
            <Construction />
            </>
        )
    }

}
