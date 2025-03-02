// StepperStyles.js
import { styled } from '@mui/system';
import { StepConnector, StepLabel } from '@mui/material';

export const steps = [
    { label: 'Вхід', description: 'Увійдіть в особистий кабінет або зареєструйтесь.' },
    { label: 'Вибір товару', description: 'Виберіть товари, які бажаєте придбати.' },
    { label: 'Кошик', description: 'Перегляньте та відредагуйте ваше замовлення.' },
    { label: 'Оплата', description: 'Оберіть спосіб оплати та здійсніть платіж.' },
    { label: 'Доставка', description: 'Вкажіть адресу доставки та оберіть спосіб доставки.' },
];

// Загальний контейнер для всіх степперів
export const StepperContainer = styled('div')({
    width: '100%',
    maxWidth: '800px', // Обмеження максимальної ширини
    margin: '0 auto',  // Центрування
    padding: '20px',
});

// Функція для анімації збільшення
export const getScaleAnimation = (theme, activeStep, index) => ({
    transition: theme.transitions.create(['transform'], {
        duration: theme.transitions.duration.shortest,
    }),
    ...(activeStep === index && {
        transform: 'scale(1.2)',
    }),
});