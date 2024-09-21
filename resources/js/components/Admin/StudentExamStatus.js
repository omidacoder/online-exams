import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {baseUrl} from './../../Constants';
import Sure from './Sure';
import GetApp from '@material-ui/icons/GetApp';
export default class StudentExamStatus extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rows : [],
            progressBar : [],
            sure : []
        };
        axios({
            url : baseUrl+'/api/admin/corrections/'+this.props.studentId,
            method : 'get',
            headers :{
                admin_username: localStorage.getItem('admin_username'),
               admin_password:localStorage.getItem('admin_password'),
               X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
            }
        }).then(function(response){
            if(response.data.status == 's'){
                this.setState({
                    rows : response.data.data.exams
                });
                
            }
        }.bind(this)).catch(function(error){
        });
       
    }

    render(){
        const handleCheckout = (se_id) => {
            localStorage.setItem('checkout_se_id' , se_id);
            localStorage.setItem('access_type' , 'admin');
            window.location.href = baseUrl+'/checkout';
        }
        const handleDownload = (id)=>{
           window.location.href =  baseUrl + '/administrator/exam/answer/get/'+id
        }
        const handleDelete = (id)=>{
            //lets Bring Up SurePage
            const fun = ()=>{
                successDelete(id);
            };
            this.setState({
                sure : <Sure open={true} success={fun} parent={this}/>
            });   
        }
        const successDelete = (id)=>{
            axios({
                method : 'get',
                url :baseUrl+'/api/administrator/se/delete/'+id,
                headers : {
                    admin_username: localStorage.getItem('admin_username'),
                    admin_password:localStorage.getItem('admin_password'),
                    X_API_TOKEN: localStorage.getItem('X_API_TOKEN')
                }
            }).then(function (response) {
                        this.props.parent.setState({
                            success : true,
                            message : 'سابقه آزمون با موفقیت حذف شد'
                        })
                        this.props.parent.showResults(this.props.studentId);
                        
                    
                }.bind(this))
                .catch(function (error) {
                    this.props.parent.setState({
                        error : true,
                        message : 'در حذف مشکلی به وجود آمده'
                    })
                }.bind(this));
        }
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
        return(
            <>
            <h3>نتایج آزمون های گذشته</h3>
            {this.state.progressBar}
            <MuiThemeProvider theme={theme}>
            <TableContainer  variant="outlined" component={Paper}>
        <Table dir="rtl"  aria-label="caption table">
            <caption style={{textAlign : 'right'}}>اطلاعات آزمون های گذشته خودتان را در این جدول مشاهده کنید به زودی امکان مشاهده پاسخ ها اضافه خواهد شد</caption>
            <TableHead>
                <TableRow>
                    <TableCell align="right">نام آزمون</TableCell>
                    <TableCell align="right">تعداد سوالات</TableCell>
                    <TableCell align="right">تعداد درست</TableCell>
                    <TableCell align="right">تعداد نزده</TableCell>
                    <TableCell align="right">تعداد نادرست</TableCell>
                    <TableCell align="right">زمان پاسخگویی</TableCell>
                    <TableCell align="right">زمان استاندارد</TableCell>
                    <TableCell align="right">درصد</TableCell>
                    <TableCell align="right">بررسی پاسح ها</TableCell>
                    <TableCell align="right">پاسخنامه</TableCell>
                    <TableCell align="right">حذف</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.rows.map(row  => (
                    <TableRow key={row.id}>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.number_of_questions}</TableCell>
                        <TableCell align="right">{row.number_of_corrects}</TableCell>
                        <TableCell align="right">{row.number_of_whites}</TableCell>
                        <TableCell align="right">{row.number_of_incorrects}</TableCell>
                        <TableCell align="right">{row.period+'ثانیه'}</TableCell>
                        <TableCell align="right">
                            {row.time+'دقیقه'}
                        </TableCell>
                <TableCell align='right'>{row.score}</TableCell>
                <TableCell align="right">
                    <IconButton onClick={()=>{handleCheckout(row.id)}}  color="primary" size="large"><Create /></IconButton>
                </TableCell>
                {row.answer == null ? <TableCell align="right">پاسخنامه ای یافت نشد</TableCell>
                :<TableCell align="right">
                <IconButton onClick={()=>{handleDownload(row.id)}}  color="primary" size="large"><GetApp /></IconButton>
            </TableCell>
            }
                <TableCell align="right">
                    <IconButton onClick={()=>{handleDelete(row.id)}}  color="primary" size="large"><Delete /></IconButton>
                </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    {this.state.sure}
    </MuiThemeProvider>
    </>
        );
    }
}
