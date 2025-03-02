// RectangleStepper.js (фінальна версія)
import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

// Дані про кроки
const steps = [
    { label: 'Нова', description: 'Заявка створена' },
    { label: 'В обробці', description: 'Заявка розглядається' },
    { label: 'Підтверджена', description: 'Заявка підтверджена' },
    { label: 'Виконується', description: 'Заявка в процесі виконання' },
    { label: 'Завершена', description: 'Заявка успішно виконана' },
];

// Основний контейнер степера
const StepperContainer = styled(Box)({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    padding: '12px 0'
});

// Окремий крок
const StepItem = styled(Box)(({ isActive, isCompleted, isClickable }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    width: '100px',
    cursor: isClickable ? 'pointer' : 'default',
}));

// Іконка кроку (прямокутна)
const StepIcon = styled(Box)(({ isActive, isCompleted }) => ({
    width: '100%',
    height: '32px',
    borderRadius: '0px', // Без закруглення - прямокутник
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isCompleted ? '#1976d2' : isActive ? '#1976d2' : '#bdbdbd',
    color: (isCompleted || isActive) ? '#fff' : '#424242',
    fontSize: '14px',
    fontWeight: 500,
    padding: '0 4px',  // Додаємо відступи для тексту
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'  // Якщо текст не поміщається, додаємо три крапки
}));

// З'єднувач між кроками
const StepConnector = styled(Box)(({ isActive }) => ({
    height: '2px',
    width: '100%',
    flex: 1,
    backgroundColor: isActive ? '#1976d2' : '#bdbdbd'
}));

function RectangleStepper({ activeStep, handleStepClick, isClickable = true }) {
    return (
        <StepperContainer>
            {steps.map((step, index) => {
                const isCompleted = index < activeStep;
                const isActive = index === activeStep;

                return (
                    <React.Fragment key={step.label}>
                        {index > 0 && (
                            <StepConnector isActive={index <= activeStep} />
                        )}

                        <StepItem
                            isCompleted={isCompleted}
                            isActive={isActive}
                            isClickable={isClickable}
                            onClick={() => isClickable && handleStepClick(index)}
                            title={step.description} // Підказка при наведенні
                        >
                            <StepIcon isCompleted={isCompleted} isActive={isActive}>
                                {step.label}
                            </StepIcon>
                            {/* Прибрано StepLabel з дублюванням назви */}
                        </StepItem>
                    </React.Fragment>
                );
            })}
        </StepperContainer>
    );
}

export default RectangleStepper;