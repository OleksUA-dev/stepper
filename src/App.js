// App.js
import React from 'react';
import CircleStepper from './CircleStepper';
import LineStepper from './LineStepper';
import OvalStepper from './OvalStepper';
import FlipSquareStepper from './FlipSquareStepper';
import MyCustomStepper from './MyCustomStepper';
import { StepperContainer, steps } from './StepperStyles'; // Імпортуємо StepperContainer і steps
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function App() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => { // Додаємо функцію скидання
        setActiveStep(0);
    };

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Варіанти степперів
            </Typography>

            <StepperContainer>
                <Typography variant="h5">Степпер з кругами</Typography>
                <CircleStepper activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
                {activeStep === steps.length && (
                    <Button onClick={handleReset} variant="contained" color="primary">
                        Скинути
                    </Button>
                )}
            </StepperContainer>

            <StepperContainer>
                <Typography variant="h5">Степпер з лініями</Typography>
                <LineStepper activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
                {activeStep === steps.length && (
                    <Button onClick={handleReset} variant="contained" color="primary">
                        Скинути
                    </Button>
                )}
            </StepperContainer>

            <StepperContainer>
                <Typography variant="h5">Степпер з овалами</Typography>
                <OvalStepper activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
                {activeStep === steps.length && (
                    <Button onClick={handleReset} variant="contained" color="primary">
                        Скинути
                    </Button>
                )}
            </StepperContainer>

            <StepperContainer>
                <Typography variant="h5">Степпер з перекидними квадратами</Typography>
                <FlipSquareStepper activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
                {activeStep === steps.length && (
                    <Button onClick={handleReset} variant="contained" color="primary">
                        Скинути
                    </Button>
                )}
            </StepperContainer>

            <StepperContainer>
                <Typography variant="h5">Мій кастомний степпер</Typography>
                <MyCustomStepper activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
                {activeStep === steps.length && (
                    <Button onClick={handleReset} variant="contained" color="primary">
                        Скинути
                    </Button>
                )}
            </StepperContainer>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'center' }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Назад
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext} variant="contained">
                    {activeStep === steps.length - 1 ? 'Завершити' : 'Вперед'}
                </Button>
            </Box>
        </div>
    );
}

export default App;