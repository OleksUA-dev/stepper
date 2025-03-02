// LineStepper.js
import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tooltip from '@mui/material/Tooltip';
import { StepConnector } from '@mui/material';
import { styled } from '@mui/system';
import { steps, StepperContainer, getScaleAnimation } from './StepperStyles';


const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${StepConnector.root}`]: {
        top: 10,
        left: 'calc(-50% + 20px)',  // Зміщення для коректного відображення
        right: 'calc(50% + 20px)',
    },
    [`&.${StepConnector.active}, &.${StepConnector.completed}`]: {
        [`& .${StepConnector.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },
    [`& .${StepConnector.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300],
        borderTopWidth: 3,
        borderRadius: 1,
        transition: theme.transitions.create('border-color', {
            duration: theme.transitions.duration.shortest,
        }),
    },
}));


const CustomStepLabel = styled(StepLabel)(({ theme, activeStep, index }) => ({
    [`& .${StepLabel.label}`]: {
        ...getScaleAnimation(theme, activeStep, index),
    },
}));


function LineStepper({ activeStep, handleNext, handleBack }) {
    return (
        <StepperContainer>
            <Stepper activeStep={activeStep} alternativeLabel connector={<CustomStepConnector />}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <Tooltip title={step.description} placement="top">
                            <CustomStepLabel activeStep={activeStep} index={index}>{step.label}</CustomStepLabel>
                        </Tooltip>
                    </Step>
                ))}
            </Stepper>
        </StepperContainer>
    );
}

export default LineStepper;