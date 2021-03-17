import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Property from '../property/Property';
import AddFloors from '../property/AddFloors';
import ProjectFeatures from '../property/ProjectFeatures';
import AddUnits from '../property/AddUnits';
import Developers from '../property/Developers';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
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

  
  function getStepContent(step, steps) {
    if(step === 0)
    {
      return <Property propertyId="new" />;
    }
    if(step === 1) 
    {
      return <ProjectFeatures />;  
    } 
    if(step === 2) 
    {
      return <AddFloors />;
    } 
    if(step === 3) 
    {
      return <AddUnits />;
    } 
    else
    {
      return <Developers />;
    }
  }


function PropertiesTable(props) {
	const classes = useStyles();
    let floorproperties = useSelector(({ eCommerceApp }) => eCommerceApp.property);
    const [totaltabs, setTotaltabs] = useState({});
    const [currentstep, setCurrentstep] = useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    console.log("floorproperty1", floorproperties);
    console.log("floortype", typeof(floorproperties));
    console.log("checktype", Array.isArray(floorproperties));
    let floorvalues_array = [];
    let arraylength = 0;
    if (activeStep === 0)
    {
      floorproperties = null
    }
    if(activeStep === 1 && Array.isArray(floorproperties) === false)
    {
      floorproperties = null
    }
    console.log("floorproperty2", floorproperties);
    if(!(floorproperties === null))
    {
        const floorkeys = Object.values(floorproperties);
        console.log("keys", floorkeys);
        const countkeys = Object.keys(floorproperties);
        let countfloors = countkeys.length;
        //setTotaltabs(countfloors)
        //console.log("totaltabs", totaltabs);
        floorkeys.map((floor, index) => (

            floorvalues_array.push(floor.floor_name+" ")
        ));
    }
  arraylength = floorvalues_array.length;
  console.log("arraylength", arraylength);
  let steps=[]
  if(arraylength>0)
  {
      {console.log("insideif")}
      steps = ['Add Property', 'Project Features', 'Add Floors', ];
      for (var i = 0; i < arraylength; i++)
      {
        {console.log("insideloop")}
        steps.push(floorvalues_array[i])
        
      }
      steps.push('Developers')
  }
  else
  {
    {console.log("insideelse")}
    steps = ['Add Property', 'Project Features', 'Add Floors', 'Add Units', 'Developers'];
    
  }
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


	return (
		<div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index, steps)}</Typography>
              <div className={classes.actionsContainer}>
                  
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}


export default withRouter(PropertiesTable);
