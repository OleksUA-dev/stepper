import React, { useState } from 'react';
import RectangleStepper from './RectangleStepper'; // Використовуємо модифікований компонент
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
    const [activeStep, setActiveStep] = useState(0); // Початковий крок "Нова"
    const [isClickable, setIsClickable] = useState(true);

    // Перевіряємо, чи це мобільний пристрій
    const isMobile = useMediaQuery('(max-width:768px)');

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
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: isMobile ? 1 : 2 }}>
            <Paper elevation={2} sx={{ mb: 3, overflow: 'hidden' }}>
                <Box sx={{ bgcolor: '#f5f5f5', py: 1, px: 2, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant={isMobile ? "body2" : "subtitle1"}>
                        CRM Система / Заявки / Заявка #1234
                    </Typography>
                </Box>

                <Box sx={{ p: isMobile ? 1 : 2 }}>
                    <RectangleStepper
                        activeStep={activeStep}
                        handleStepClick={handleStepClick}
                        isClickable={isClickable}
                    />
                </Box>
            </Paper>

            <Paper elevation={2}>
                <Box sx={{ p: isMobile ? 2 : 3, borderTop: '1px solid #e0e0e0' }}>
                    <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
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
                                    size={isMobile ? "small" : "medium"}
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

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
                        * Натисніть на іконку стрілки біля кожного етапу, щоб побачити детальні підетапи
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default App;