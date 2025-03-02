// OvalStepper.js
import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import { steps, StepperContainer, getScaleAnimation } from './StepperStyles';


const CustomStepLabel = styled(StepLabel)(({ theme, activeStep, index }) => ({
    [`& .${StepLabel.label}`]: {
        ...getScaleAnimation(theme,activeStep, index), // Додаємо анімацію збільшення
        padding: '8px 16px', // Відступи
        borderRadius: '25px', // Заокруглення для овальної форми
        border: `2px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300]}`,
        ...(activeStep === index && {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            fontWeight: 'bold',
        }),
        ...(activeStep > index && {  // Завершені кроки
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
            color: 'white',
        }),
    },
}));

function OvalStepper({ activeStep, handleNext, handleBack }) {
    return (
        <StepperContainer>
            <Stepper activeStep={activeStep} alternativeLabel>
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

export default OvalStepper;