import React from 'react';
export default class Construction extends React.Component{
    render(){
        return(
            <div style={{width : '100%' , height : '100%' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' , alignSelf : 'center' , alignContent : 'center' , flexDirection : 'column'}}>
                <img src="https://dominokonkur.ir/images/Soon.png" style={{width : '80%' , height : 'auto'}} />
                <p style={{textAlign : 'center' , fontSize : 15 , marginTop : 30}}>این بخش به زودی طراحی میشود و قابل دسترس خواهد بود</p>
            </div>
        )
    }
}