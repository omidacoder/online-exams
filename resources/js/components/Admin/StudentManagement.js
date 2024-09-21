import React from 'react';
import DataShow from "./StudentShow";
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
import AddEditStudentDialog from './AddStudentDialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';
import StudentExamStatus from './StudentExamStatus';
import {baseUrl} from './../../Constants';
export default class StudentManagement extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            students : <LinearProgress />,
            data : [],
            success : false,
            error : false,
            message : '',
            results : []
        }
    }
    showResults(studentId){
        this.setState({
            results : [<LinearProgress />]
        },function(){
            this.setState({
                results : [<StudentExamStatus studentId={studentId} parent={this} />]
            });
        });
        
    }
    componentDidMount(){
            this.setState({
                students : <LinearProgress />
            });
            //send request and call this.createData()
              const data = [];
               axios({
                  method : 'get',
                  url :baseUrl+'/api/administrator/student/all',
                  headers : {
                      admin_username: localStorage.getItem('admin_username'),
                      admin_password:localStorage.getItem('admin_password'),
                      X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
                  }
              }).then(function (response) {
                      const createData = (name , national_code , field , phone_number , level , username,avg , id , email) => {
                          return { name , national_code , field , phone_number , level , username,avg , id ,email};
                      };
                      if(response.data.status === 's') {
                          const r = response.data.data.students;
                          for (let i = 0; i < r.length; i++) {
                              data[data.length] = createData(r[i].name, r[i].national_code, r[i].field, r[i].phone_number, r[i].level, r[i].username, r[i].avg, r[i].id , r[i].email);
                          }
                          this.setState({
                              students : <DataShow data={data} settings={this}  />,
                              data
                          })
                      }
                      else{
                          //handle others
                      }
                  }.bind(this))
                  .catch(function (error) {
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
                <h4>مدیریت دانش آموزان</h4>
                <FormControl style={{marginBottom : 20}} dir="rtl" className={classes.margin} >
                    <InputLabel style={{textAlign : 'right'}} dir="rtl" htmlFor="input-with-icon-adornment">جستجوی دانش آموزان</InputLabel>
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
                {this.state.students}
                <AddEditStudentDialog type='add' students={this} data={this.state.data} />
                {this.state.results}
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
                </MuiThemeProvider>
            </RTL>
        );
    }
}
