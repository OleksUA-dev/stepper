// CircleStepper.js
import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import { steps, StepperContainer, getScaleAnimation } from './StepperStyles';

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundColor: theme.palette.primary.main,
    }),
    ...getScaleAnimation(theme, ownerState.activeStep, ownerState.index),
}));

function CustomStepIcon(props) {
    const { active, completed, className, icon, activeStep, index } = props;

    return (
        <CustomStepIconRoot ownerState={{ completed, active, activeStep, index }} className={className}>
            {icon}
        </CustomStepIconRoot>
    );
}

function CircleStepper({ activeStep, handleNext, handleBack }) {
    return (
        <StepperContainer>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <Tooltip title={step.description} placement="top">
                            <StepLabel StepIconComponent={(props) => <CustomStepIcon {...props} activeStep={activeStep} index={index}/>}>{step.label}</StepLabel>
                        </Tooltip>
                    </Step>
                ))}
            </Stepper>
        </StepperContainer>
    );
}

export default CircleStepper;