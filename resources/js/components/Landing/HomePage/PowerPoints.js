import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import RTL from "./../../RTL";
import { createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {baseUrl} from './../../../Constants';
export default class PowerPoints extends React.Component{
    render(){
        const classes = makeStyles({
            root: {
              maxWidth: 345,
            },
            media: {
              height: 350,
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
                fontFamily: ['Lalehzar'],
                fontSize : 12
            }
        });
        return(
            <RTL>
                <MuiThemeProvider theme={theme}>
            <h2 style={{marginTop : 60 , fontFamily : 'Lalehzar' , color : 'orange'}}> کار هایی که در آکادمی مشاوره محمد حسین مظفری برای شما انجام خواهیم داد </h2>
            <Grid container spacing={4}>
            <Grid style={{marginTop : 30}} item xs={12} md={4} spacing={2}>
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                component="img"
                image={baseUrl+"/images/phonecall.jpg"}
                title="تماس تلفنی"
                alt="پنل کاربری"
                height="350"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{color : '#00bcd4'}}>
                    تماس تلفنی
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
ارتباط تلفنی و جلسات مشاوره ای در طول هفته برای بررسی نقاط قوت و ضعف شما برقرار میشه طی تماس تلفنی میتونید هر سوالی که داشتید رو از مشاور خودتون بپرسید و مشاور پاسخگوی سوالات شما خواهد بود در این جلسات مشاوره از لحاظ انگیزشی با شما کار میشه تا بتونید همیشه با یک روحیه فوق العاده و سرشار از انرژی تا انتهای مسیر با قدرت پیش برید وضعیت درسی شما به طور کامل تحت کنترل هست و خیالتون از بابت همراه شدن با یک راهنمای با تجربه و موفق راحته
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
            </Grid>
            <Grid style={{marginTop : 30}} item xs={12} md={4} spacing={2}>
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                component="img"
                image={baseUrl+"/images/analyze.jpg"}
                title="آنالیز آزمون های آزمایشی بلافاصله بعد از آزمون"
                alt="پنل کاربری"
                height="350"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{color : '#00bcd4'}}>
                آنالیز آزمون های آزمایشی بلافاصله بعد از آزمون
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                خیلی از کنکوریها آرزوشون هست که در آزمونها ترازهای بالایی به دست بیارن اما نه تها هرگز به این آرزو نمیرسن بله روز به روز در آزمونها خودشون درجا میزنن تصور کن یک مشاور که خودش ترازهای بالایی در آزمونهای آزمایشی داشته راهکارهای افزایش تراز، تحلیل آزمون، مدیریت آزمون رو بهت یاد بده تا شما هم لذت کسب تراز های بالا رو تجربه کنی و خودتون رو بیشتر از قبل نزدیک به رشته مورد علاقه ات ببینی
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
            </Grid>
            <Grid style={{marginTop : 30}} item xs={12} md={4} spacing={2}>
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                component="img"
                image={baseUrl+"/images/report.jpg"}
                title="پیگیری و دریافت گزارش کار هر روز"
                alt="پنل کاربری"
                height="350"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{color : '#00bcd4'}}>
                    پیگیری و دریافت گزارش کار هر روز
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" >
                مشاور شما وضعیت درسی و نحوه اجرای برنامه ی روزانه شما رو هر روز کنترل میکنه و به سوالات و ابهامات شما پاسخ کامل میده. وضعیت درسی شما هر روز به طور جدی پیگیری میشه (پیگیری جدی = پیشرفت) و نکات کاربردی برای بهبود روند مطالعاتی شما در روز بعد توسط مشاور بهتون گوشزد میشه تو این قسمت مشاورین ما واقعا جدی هستن پس پیشنهاد میکنم اگر شما متعهد به اجرای برنامه نیستی اصلا با ما مشاوره بر نداری.حس خوبیه که بدونی کی نفر حواسش به تو هست و اجازه نمیده مسیر رو اشتباهی بری
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
            </Grid>
            </Grid>
            </MuiThemeProvider>
            </RTL>
        )
    }
}