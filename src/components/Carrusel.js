import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'Micro carretera',
    imgPath:
      'https://fotos.perfil.com/2020/07/16/0716micros-987234.jpg',
  },
  {
    label: 'micro estacionado',
    imgPath:
      'https://3.bp.blogspot.com/-ROu3hhV5Wr8/WGvpG-YZCFI/AAAAAAAAAdc/f733eSSKviooqtbUfkWqUunhoSRkFP7owCLcB/s1600/volvo-bus.jpg',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://eterdigital.com.ar/wp-content/uploads/2016/11/unidades4-989x480.jpg',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://quedigital.com.ar/web/wp-content/uploads/2020/03/TERMINAL-1.jpg',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 2000,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 445,
    display: 'block',
    // maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  // const maxSteps = tutorialSteps.length;

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        {/* <Typography>{tutorialSteps[activeStep].label}</Typography> */}
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  );
}

export default SwipeableTextMobileStepper;

