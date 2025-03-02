// CrmStepper.js
import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import { steps } from './StepperStyles';

// Стилізований конектор кроків
const StyledStepper = styled(Stepper)(({ theme }) => ({
    padding: '8px 0',
    '& .MuiStepConnector-line': {
        borderColor: theme.palette.divider,
        borderTopWidth: 2,
    },
    '& .MuiStepConnector-active .MuiStepConnector-line': {
        borderColor: theme.palette.primary.main,
    },
    '& .MuiStepConnector-completed .MuiStepConnector-line': {
        borderColor: theme.palette.primary.main,
    }
}));

// Стилізована іконка для кроку
const StyledStepIcon = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: ownerState.active
        ? theme.palette.primary.main
        : ownerState.completed
            ? theme.palette.primary.light
            : theme.palette.grey[300],
    zIndex: 1,
    color: ownerState.active || ownerState.completed ? '#fff' : theme.palette.text.secondary,
    width: 28,
    height: 28,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 500,
    transition: theme.transitions.create(['background-color', 'color'], {
        duration: 200,
    }),
}));

function CustomStepIcon(props) {
    const { active, completed, className, icon, label } = props;

    // Використовуємо першу літеру назви кроку замість цифри
    const iconText = label ? label.charAt(0) : icon;

    return (
        <StyledStepIcon ownerState={{ active, completed }} className={className}>
            {iconText}
        </StyledStepIcon>
    );
}

function CrmStepper({ activeStep, handleStepClick, isClickable = true }) {
    return (
        <StyledStepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => {
                const stepProps = {};
                const labelProps = {};

                // Визначаємо компонент відображення кроку (клікабельний чи ні)
                const StepComponent = isClickable ? StepButton : StepLabel;

                // Визначаємо, чи можна перейти на цей крок
                // Важливо: дозволяємо перейти на будь-який крок, якщо включено ручне перемикання
                const canClick = isClickable;

                return (
                    <Step key={step.label} {...stepProps}>
                        <Tooltip title={step.description} placement="bottom">
                            <StepComponent
                                onClick={canClick ? () => handleStepClick(index) : undefined}
                                StepIconComponent={(iconProps) =>
                                    <CustomStepIcon {...iconProps} label={step.label} />
                                }
                                optional={null}
                                sx={{
                                    cursor: canClick ? 'pointer' : 'default',
                                    '& .MuiStepLabel-label': {
                                        fontSize: '0.85rem',
                                        ...(activeStep === index && {
                                            fontWeight: 'bold'
                                        })
                                    }
                                }}
                                {...labelProps}
                            >
                                {step.label}
                            </StepComponent>
                        </Tooltip>
                    </Step>
                );
            })}
        </StyledStepper>
    );
}

export default CrmStepper;