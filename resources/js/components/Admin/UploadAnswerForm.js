import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {createMuiTheme, makeStyles ,  MuiThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import RTL from "./../RTL";
import Dropzone from 'react-dropzone';

export default class UploadAnswer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fileName : '',
        }
    }  
    render() {
        const theme = createMuiTheme({
            direction: 'rtl',
            palette: {
                primary: {
                    main :  '#00bcd4'
                },
                secondary: {
                    main : '#ff4081'
                }
            },
            typography: {
                fontFamily: ['SahelBlack'],
                fontSize : 12
            }
        });
        const classes = makeStyles({
            root: {
                minWidth: 275,
                direction : 'rtl',
            },
            title: {
                fontSize: 14,
            },
        });
         
        return(
            <RTL>
               <MuiThemeProvider theme={theme}>
            <Card dir="rtl" className={classes.root} variant="outlined">
                <CardContent>
                    <h5 style={{color : '#00bcd4'}} className={classes.title} >
                        اضافه کردن پاسخنامه
                    </h5>
                    <Dropzone
                    maxSize={30000000}
                    multiple={false}
                     onDrop={acceptedFiles => {
                         console.log(acceptedFiles);
                         this.setState({
                            fileName : acceptedFiles[0].name
                        })
                         this.props.data.setPath(acceptedFiles[0]);
                        
                     }}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div style={{border : 'dashed' , borderColor : '#00bcd4'}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p style={{textAlign : 'center' , color : '#00bcd4'}}>لطفا فایل pdf خود را به اینجا بکشید</p>
                        </div>
                        </section>
                    )}
                    </Dropzone>
                    <p style={{fontSize: 12}}>{this.state.fileName}</p>
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
               </MuiThemeProvider>
            </RTL>
        )
    }
}
