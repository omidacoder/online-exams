import React from 'react';
import RTL from "../RTL";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import axios from 'axios'
import {createMuiTheme ,  MuiThemeProvider,makeStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import DataShow from './QuestionShow';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';
import QuestionAdd from './QuestionAdd';
import {baseUrl} from './../../Constants';
export default class AzmoonManagement extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            questions : <LinearProgress />,
            data : []
        }
    }
    componentDidMount(){
        this.setState({
            questions : <LinearProgress />
        });
        //send request and call this.createData()
          const data = [];
           axios({
              method : 'get',
              url :baseUrl+'/api/administrator/question/all',
              headers : {
                  admin_username: localStorage.getItem('admin_username'),
                  admin_password:localStorage.getItem('admin_password'),
                  X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
              }
          }).then(function (response) {
                  const createData = (id , description , path , first_ans , second_ans , third_ans , fourth_ans) => {
                      return { id , description , path , first_ans , second_ans , third_ans , fourth_ans};
                  };
                  if(response.data.status === 's') {
                      const r = response.data.data.questions;
                      for (let i = 0; i < r.length; i++) {
                          data[data.length] = createData(r[i].id, r[i].description, r[i].path, r[i].first_ans, r[i].second_ans, r[i].third_ans, r[i].fourth_ans );
                      }
                    //   console.log(data);
                      this.setState({
                          questions : <DataShow data={data} settings={this}/>,
                          data
                      })
                  }
                  else{
                      //handle others
                  }
              }.bind(this))
              .catch(function (error) {
                  // handle error
                  console.log(error.response);
                  return [];
              });
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
        const classes = makeStyles(theme => ({
            margin: {
                margin: theme.spacing(1),
            },
        }));
        const handleSnackClose= ()=>{
            this.setState({
                success : false
            });
        }
        const handleSnackeClose= ()=>{
            this.setState({
                error : false
            });
        }
        return (
            <RTL>
                <MuiThemeProvider theme={theme}>
            <div><h1>مدیریت سوال ها</h1>
              <FormControl style={{marginBottom : 20}} dir="rtl" className={classes.margin} >
                    <InputLabel style={{textAlign : 'right'}} dir="rtl" htmlFor="input-with-icon-adornment">جستجوی سوال ها</InputLabel>
                    <Input
                        dir="rtl"
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <IconButton variant="outlined" color="primary" onClick={()=>{this.componentDidMount()}}>
                <Search />
                </IconButton>
                <IconButton variant="outlined" color="primary" onClick={()=>{this.componentDidMount()}}>
                        <Refresh />
                </IconButton>
                {this.state.questions}
                <QuestionAdd data={this} style={{marginBottom : 40}}/>
                
                <Snackbar open={this.state.success} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity="success">
                        {this.state.message}
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.error} autoHideDuration={6000} onClose={handleSnackeClose}>
                    <Alert onClose={handleSnackeClose} severity="error">
                        {this.state.message}
                    </Alert>
                </Snackbar>            
            </div>
            </MuiThemeProvider>
            </RTL>
        );
    }
}
