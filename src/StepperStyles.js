// StepperStyles.js
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

export const steps = [
    { label: 'Нова', description: 'Заявка створена' },
    { label: 'В обробці', description: 'Заявка розглядається' },
    { label: 'Підтверджена', description: 'Заявка підтверджена' },
    { label: 'Виконується', description: 'Заявка в процесі виконання' },
    { label: 'Завершена', description: 'Заявка успішно виконана' },
];

// Загальний контейнер для всіх степперів
export const StepperContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '8px 16px',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 16
}));

// Функція для анімації збільшення (зберігаємо для сумісності)
export const getScaleAnimation = (theme, activeStep, index) => ({
    transition: theme.transitions.create(['transform', 'color'], {
        duration: theme.transitions.duration.shortest,
    }),
    ...(activeStep === index && {
        transform: 'scale(1.1)',
        fontWeight: 'bold'
    }),
});