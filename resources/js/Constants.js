import {createMuiTheme } from '@material-ui/core/styles';
export  const Levels = [
    {
        key : '1',
        value : 'دهم'
    },
    {
        key : '2',
        value : 'یازدهم'
    },
    {
        key : '3',
        value : 'دوازدهم'
    },
    {
        key : '4',
        value : 'پشت کنکوری'
    }
];
export const Fields = [
    {
        key : "math",
        value : 'ریاضی',
    },
    {
        key : 'science',
        value : 'تجربی',

    },
    {
        key : 'lit',
        value : 'انسانی'
    }
];
export const Choices = [
    {
        key : "1",
        value : 'گزینه اول',
    },
    {
        key : '2',
        value : 'گزینه دوم',

    },
    {
        key : '3',
        value : 'گزینه سوم'
    },
    {
        key : '4',
        value : 'گزینه چهارم'
    },
];
export const PhoneNumber = "09391789010";
export const Address = "جهارراه طهماسب آباد";
export const Email = "omiddavar@yahoo.com";
export const Instagram = "MozaffariMoshavere";
export const Telegram = "MozaffariMoshavere";
export const ClientId = '4';
export const ClientSecret = 'HeWB9tUkjCcrau1pp1xFRcMc17GRcemn0TidkG1X';
export const baseUrl = 'https://dominokonkur.ir';
export const theme = createMuiTheme({
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
