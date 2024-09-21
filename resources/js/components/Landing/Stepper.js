import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));
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

function getSteps() {
  return ['  ثبت اطلاعات  دانش آموز  '  , '   تایید شماره تلفن همراه   ', '  اتمام ثبت نام  '];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `اطلاعات خود را به صورت کامل و دقیق وارد کنید `
    case 1:
      return 'لطفا کد شش رقمی پیامک شده به تلفن همراه خود را وارد کنید';
    case 2:
      return `ثبت نام شما با موفقیت پایان یافت 
              میتوانید از طریق صفحه اصلی سایت وارد پنل کاربری خود شوید`;
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper(props) {
  const {activeStep , setActiveStep} = props;
  const classes = useStyles();
  const steps = getSteps();
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    // props.decide(0);
  };

  return (
      
          <MuiThemeProvider theme={theme}>
    <Paper variant="outlined" className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled
                    onClick={handleBack}
                    className={classes.button}
                  >
                    مرحله قبل
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>ثبت نام با موفقیت پایان یافت</Typography>
        </Paper>
      )}
    </Paper>
    </MuiThemeProvider>
    
  );
}