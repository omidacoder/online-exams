import React from 'react';
import {createMuiTheme ,  MuiThemeProvider,makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Sure from './Sure';
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility';
import EditStudentDialog from './EditStudentDialog';
import {baseUrl} from './../../Constants';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

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



export default function AcccessibleTable(props) {
    const [errors , setErrors] = React.useState(false);
    const [success , setSuccess] = React.useState(false);
    const [message , setMessage] = React.useState('');
    const [edit , setEdit] = React.useState(null);
    const [sure , setSure] = React.useState(null);
    const classes = useStyles();
    const rows = props.data;
    const closeEditDialog =()=>{
        setEdit(null);
    }
    const closeSureDialog = ()=>{
        setSure(null);
    }
    const handleEdit = (row) =>{
        setEdit(<EditStudentDialog all={row} closeCallback={closeEditDialog} />);
    };
    const deleteSure = (id) => {
        const fun = ()=>{
            handleDelete(id);
        };
        setSure(<Sure open={true} success={fun} parent={this} closeCallback={closeSureDialog}/>);   
    };
    const handleDelete = (id) => {
        axios({
           method : 'get',
           url :baseUrl+'/api/administrator/student/delete/'+id,
           headers : {
               admin_username: localStorage.getItem('admin_username'),
               admin_password:localStorage.getItem('admin_password'),
               X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
           }
       }).then(function (response) {
                   setMessage('دانش آموز با موفقیت حذف شد');
                   setSuccess(true);
                   
               
           }.bind(success , setSuccess,setMessage))
           .catch(function (error) {
               return [];
           });
    };
    const handleSend = (id) => {

    };
    const handleSnackClose= ()=>{
        setSuccess(false);
        props.settings.componentDidMount();
    }
    const handleSnackeClose= ()=>{
        setErrors(false);
    }
    const showField = (field)=>{
        switch(field){
            case 'math' : return 'ریاضی'
            case 'science' : return 'تجربی'
            case 'lit' : return 'انسانی'
            default :return field;
        }
        }
    
    const showLevel = (level) => {
        switch(level){
            case 1: return 'دهم'
            case 2: return 'یازدهم'
            case 3: return 'دوازدهم'
            case 4:return 'پشت کنکوری'
            default :return level;
        }
        
    };
    return (
        <MuiThemeProvider theme={theme}>
        <TableContainer  variant="outlined" component={Paper}>
            <Table dir="rtl" className={classes.table} aria-label="caption table">
                <caption style={{textAlign : 'right'}}>اطلاعات دانش آموزان ثبت شده در سیستم را میتوانید در بالا مشاهده کنید و آنها را حذف و یا ویرایش کنید</caption>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">نام و نام خانوادگی</TableCell>
                        <TableCell align="right">کد ملی</TableCell>
                        <TableCell align="right">رشته</TableCell>
                        <TableCell align="right">شماره همراه</TableCell>
                        <TableCell align="right">مقطع نحصیلی</TableCell>
                        <TableCell align="right">نام کاربری</TableCell>
                        <TableCell align="right">معدل</TableCell>
                        <TableCell align="right">ویرایش</TableCell>
                        <TableCell align="right">حذف</TableCell>
                        <TableCell align="right">مشاهده ی نتایج</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row  => (
                        <TableRow key={row.username}>
                            <TableCell component="th" scope="row" align="right">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.national_code}</TableCell>
                            <TableCell align="right">{showField(row.field)}</TableCell>
                            <TableCell align="right">{row.phone_number}</TableCell>
                            <TableCell align="right">{showLevel(row.level)}</TableCell>
                            <TableCell align="right">{row.username}</TableCell>
                            <TableCell align="right">{row.avg}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={()=>{handleEdit(row)}}  color="primary" size="large"><Create /></IconButton>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={()=>{deleteSure(row.id)}}  color="primary" size="large"><Delete /></IconButton>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={()=>{props.settings.showResults(row.id)}} color="primary" size="large"><Visibility /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity="success">
                        {message}
                    </Alert>
                </Snackbar>
                <Snackbar open={errors} autoHideDuration={6000} onClose={handleSnackeClose}>
                    <Alert onClose={handleSnackeClose} severity="error">
                        {message}
                    </Alert>
                </Snackbar>
                {sure}
                {edit}
        </MuiThemeProvider>
    );
}
