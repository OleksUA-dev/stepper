// FlipSquareStepper.js
import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import { steps, StepperContainer } from './StepperStyles';
import { Typography } from '@mui/material';

const FlipSquareContainer = styled('div')(({ theme, active, completed }) => ({
    width: 80,
    height: 80,
    perspective: 1000, // Важливо для 3D-ефекту
    position: 'relative', // Для позиціювання внутрішнього контейнера
    cursor: 'pointer', // Вказівник при наведенні


    '& .flip-square-inner': {
        position: 'relative',
        width: '100%',
        height: '100%',
        transition: 'transform 0.8s',
        transformStyle: 'preserve-3d',

        // Поворот при активному кроці
        ...(active && {
            transform: 'rotateY(180deg)',
        }),
        ...(completed && {  // Завершені кроки
            transform: 'rotateY(180deg)',
        }),
    },

    '& .flip-square-front, & .flip-square-back': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden', // Приховує зворотній бік
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px', // Квадратна форма
        border: `2px solid ${theme.palette.grey[300]}`,
    },

    '& .flip-square-front': {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#fff',
        color: theme.palette.text.primary,
        ...(active && {
            borderColor: theme.palette.primary.main,
            borderWidth: '3px',
        }),
        ...(completed && {  // Завершені кроки
            borderColor: theme.palette.primary.main,
            borderWidth: '3px',
        }),

    },

    '& .flip-square-back': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        transform: 'rotateY(180deg)', // Зворотній бік повернутий
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

function FlipSquare({ active, completed, label, description }) {
    return (
        <Tooltip title={description} placement="top">
            <FlipSquareContainer active={active} completed={completed}>
                <div className="flip-square-inner">
                    <div className="flip-square-front">
                        <Typography variant="h6">{label}</Typography>
                    </div>
                    <div className="flip-square-back">
                        <Typography variant="h6">{label}</Typography>
                        <Typography variant="caption" sx={{textAlign: 'center'}}>{description}</Typography>
                    </div>
                </div>
            </FlipSquareContainer>
        </Tooltip>
    );
}

function FlipSquareStepper({ activeStep, handleNext, handleBack }) {
    return (
        <StepperContainer>
            <Stepper activeStep={activeStep} alternativeLabel style={{ display: 'flex', justifyContent: 'space-between' }}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <FlipSquare
                            active={index === activeStep}
                            completed={index < activeStep}
                            label={step.label}
                            description={step.description}
                        />
                    </Step>
                ))}
            </Stepper>
        </StepperContainer>
    );
}

export default FlipSquareStepper;