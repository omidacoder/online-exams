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
import Send from '@material-ui/icons/Send';
import QuestionEdit from './QuestionEdit';
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
        setEdit(<QuestionEdit all={row} data={this} closeCallback={closeEditDialog} />);
    };
    const deleteSure = (id) => {
        const fun = ()=>{
            handleDelete(id);
        };
        setSure(<Sure open={true} success={fun} parent={this} closeCallback={closeSureDialog} />);   
    };
    const handleDelete = (id) => {
        axios({
           method : 'get',
           url :baseUrl+'/api/administrator/question/delete/'+id,
           headers : {
               admin_username: localStorage.getItem('admin_username'),
               admin_password:localStorage.getItem('admin_password'),
               X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
           }
       }).then(function (response) {
                   setMessage('سوال با موفقیت حذف شد');
                   setSuccess(true);
                   
               
           }.bind(success , setSuccess,setMessage))
           .catch(function (error) {
               // handle error
               return [];
           });
    };
    const handleSnackClose= ()=>{
        setSuccess(false);
        props.settings.componentDidMount();
    }
    const handleSnackeClose= ()=>{
        setErrors(false);
    }
    
    return (
        <MuiThemeProvider theme={theme}>
        <TableContainer  variant="outlined" component={Paper}>
            <Table dir="rtl" className={classes.table} aria-label="caption table">
                <caption style={{textAlign : 'right'}}>اطلاعات آزمون های ثبت شده در سیستم را میتوانید در بالا مشاهده کنید و آنها را حذف و یا ویرایش کنید</caption>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">عکس</TableCell>
                        <TableCell align="right">شناسه سوال</TableCell>
                        <TableCell align="right">گزینه اول</TableCell>
                        <TableCell align="right">گزینه دوم</TableCell>
                        <TableCell align="right">گزینه سوم</TableCell>
                        <TableCell align="right">گزینه چهارم</TableCell>
                        <TableCell align="right">ویرایش</TableCell>
                        <TableCell align="right">حذف</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row  => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row" align="right">
                            <img src={baseUrl+'/storage/'+row.path} alt="avatar" style={{width : 100 , height : '100'}} /> 
                            </TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.first_ans}</TableCell>
                            <TableCell align="right">{row.second_ans}</TableCell>
                            <TableCell align="right">{row.third_ans}</TableCell>
                            <TableCell align="right">{row.fourth_ans}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={()=>{handleEdit(row)}}  color="primary" size="large"><Create /></IconButton>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={()=>{deleteSure(row.id)}}  color="primary" size="large"><Delete /></IconButton>
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
