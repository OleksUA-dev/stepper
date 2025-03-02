import React, { useState } from 'react';
import RectangleStepper from './RectangleStepper'; // Використовуємо новий компонент
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function App() {
    const [activeStep, setActiveStep] = useState(0); // Початковий крок "Нова"
    const [isClickable, setIsClickable] = useState(true);

    // Обробка кліків по крокам
    const handleStepClick = (step) => {
        // Завжди дозволяємо перехід на будь-який крок, якщо isClickable=true
        if (isClickable) {
            setActiveStep(step);
            console.log("Крок змінено на:", step); // Для відладки
        }
    };

    // Перемикач режиму
    const toggleClickable = () => {
        setIsClickable(!isClickable);
    };

    const steps = [
        { label: 'Нова', description: 'Заявка створена' },
        { label: 'В обробці', description: 'Заявка розглядається' },
        { label: 'Підтверджена', description: 'Заявка підтверджена' },
        { label: 'Виконується', description: 'Заявка в процесі виконання' },
        { label: 'Завершена', description: 'Заявка успішно виконана' },
    ];

    return (
        <div>
            <Box sx={{ bgcolor: '#f5f5f5', py: 1, px: 2, mb: 2 }}>
                <Typography variant="subtitle1">CRM Система / Заявки / Заявка #1234</Typography>
            </Box>

            <RectangleStepper
                activeStep={activeStep}
                handleStepClick={handleStepClick}
                isClickable={isClickable}
            />

            <Box sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
                <Typography variant="h5" gutterBottom>
                    Заявка №1234 - {steps[activeStep].label}
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isClickable}
                                onChange={toggleClickable}
                                name="clickable"
                                color="primary"
                            />
                        }
                        label="Дозволити ручну зміну статусу"
                    />
                </Box>

                <Typography paragraph>
                    Поточний статус: <strong>{steps[activeStep].label}</strong>
                </Typography>
                <Typography paragraph>
                    {steps[activeStep].description}
                </Typography>
            </Box>
        </div>
    );
}

export default App;