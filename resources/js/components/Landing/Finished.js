import React from 'react';
import Paper from '@material-ui/core/Paper'
export default class Finished extends React.Component{
    
    render(){
        return(
          <Paper style={{padding : 30}} variant="outlined">
        <div style={{height : '60%' , width : '100%',display : 'flex' , flexDirection : 'column' , justifyContent : 'center' , alignItems : 'center'}}>
        <div class="success-checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>
      <p style={{marginTop : 20 , color : 'green'}}>ثبت نام شما با موفقیت انجام شد میتوانید از طریق صفحه اصلی سایت وارد شوید</p>
      </div>
      </Paper>
      );
    }
}