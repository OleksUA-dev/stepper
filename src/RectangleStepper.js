// RectangleStepper.js - адаптивна версія з підетапами
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// Розширені дані про кроки з підетапами
const steps = [
    {
        label: 'Нова',
        description: 'Заявка створена',
        substeps: [
            { label: 'Створення заявки', description: 'Заявка створена в системі' },
            { label: 'Перевірка даних', description: 'Перевірка коректності введених даних' },
            { label: 'Присвоєння номеру', description: 'Заявці присвоєно унікальний номер' }
        ]
    },
    {
        label: 'В обробці',
        description: 'Заявка розглядається',
        substeps: [
            { label: 'Перегляд менеджером', description: 'Заявка переглядається відповідальним менеджером' },
            { label: 'Оцінка вартості', description: 'Визначення вартості робіт/послуг' },
            { label: 'Формування пропозиції', description: 'Формування комерційної пропозиції' }
        ]
    },
    {
        label: 'Підтверджена',
        description: 'Заявка підтверджена',
        substeps: [
            { label: 'Узгодження умов', description: 'Узгодження умов з клієнтом' },
            { label: 'Підтвердження клієнтом', description: 'Отримання підтвердження від клієнта' },
            { label: 'Оформлення договору', description: 'Оформлення необхідної документації' }
        ]
    },
    {
        label: 'Виконується',
        description: 'Заявка в процесі виконання',
        substeps: [
            { label: 'Призначення виконавця', description: 'Призначення відповідального за виконання' },
            { label: 'Виконання робіт', description: 'Процес виконання робіт/надання послуг' },
            { label: 'Контроль якості', description: 'Перевірка якості виконання' }
        ]
    },
    {
        label: 'Завершена',
        description: 'Заявка успішно виконана',
        substeps: [
            { label: 'Перевірка результатів', description: 'Фінальна перевірка результатів роботи' },
            { label: 'Закриття заявки', description: 'Офіційне закриття заявки в системі' },
            { label: 'Зворотній зв\'язок', description: 'Отримання відгуку від клієнта' }
        ]
    },
];

// Основний контейнер степера
const StepperContainer = styled(Box)(({ isMobile }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    padding: '12px 0',
    ...(isMobile && {
        flexDirection: 'column',
        alignItems: 'stretch',
    })
}));

// Окремий крок
const StepItem = styled(Box)(({ isActive, isCompleted, isClickable, isMobile }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    width: isMobile ? '100%' : '100px',
    cursor: isClickable ? 'pointer' : 'default',
    ...(isMobile && {
        marginBottom: '16px',
        flexDirection: 'row',
        justifyContent: 'space-between',
    })
}));

// Контейнер для іконки та назви кроку
const StepContent = styled(Box)(({ isMobile }) => ({
    display: 'flex',
    width: '100%',
    ...(isMobile && {
        alignItems: 'center',
    })
}));

// Іконка кроку (прямокутна)
const StepIcon = styled(Box)(({ isActive, isCompleted, isMobile }) => ({
    width: isMobile ? 'auto' : '100%',
    minWidth: isMobile ? '120px' : '100%',
    height: '32px',
    borderRadius: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isCompleted ? '#1976d2' : isActive ? '#1976d2' : '#bdbdbd',
    color: (isCompleted || isActive) ? '#fff' : '#424242',
    fontSize: '14px',
    fontWeight: 500,
    padding: '0 12px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}));

// З'єднувач між кроками
const StepConnector = styled(Box)(({ isActive, isMobile }) => ({
    ...(isMobile ? {
        width: '2px',
        height: '16px',
        marginLeft: '60px',
    } : {
        height: '2px',
        width: '100%',
        flex: 1,
    }),
    backgroundColor: isActive ? '#1976d2' : '#bdbdbd'
}));

// Контейнер для підетапів
const SubstepsContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    marginTop: '8px',
    padding: '8px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
}));

// Окремий підетап
const Substep = styled(Box)(({ theme }) => ({
    padding: '4px 8px',
    margin: '4px 0',
    borderLeft: '2px solid #1976d2',
    backgroundColor: '#ffffff',
    fontSize: '14px',
}));

// Іконка розгортання/згортання
const ExpandIcon = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '8px',
    cursor: 'pointer',
    color: '#1976d2',
    fontSize: '12px',
    fontWeight: 'bold',
    width: '20px',
    height: '20px',
}));

function RectangleStepper({ activeStep, handleStepClick, isClickable = true }) {
    // Додаємо стан для відстеження, які кроки розгорнуті
    const [expandedSteps, setExpandedSteps] = useState({});

    // Перевіряємо, чи це мобільний пристрій
    const isMobile = useMediaQuery('(max-width:768px)');

    // Функція для розгортання/згортання підетапів
    const toggleExpand = (index, event) => {
        // Зупиняємо спливання події, щоб не активувався клік по всьому кроку
        event.stopPropagation();
        setExpandedSteps(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <StepperContainer isMobile={isMobile}>
            {steps.map((step, index) => {
                const isCompleted = index < activeStep;
                const isActive = index === activeStep;
                const isExpanded = expandedSteps[index];

                return (
                    <React.Fragment key={step.label}>
                        {/* З'єднувач відображається між кроками у десктопній версії
                            або перед кожним кроком (крім першого) у мобільній версії */}
                        {(isMobile && index > 0) && (
                            <StepConnector isActive={index <= activeStep} isMobile={isMobile} />
                        )}

                        <StepItem
                            isCompleted={isCompleted}
                            isActive={isActive}
                            isClickable={isClickable}
                            isMobile={isMobile}
                            onClick={() => isClickable && handleStepClick(index)}
                            title={step.description}
                        >
                            <StepContent isMobile={isMobile}>
                                <StepIcon isCompleted={isCompleted} isActive={isActive} isMobile={isMobile}>
                                    {step.label}
                                </StepIcon>

                                {/* Іконка для розгортання/згортання підетапів */}
                                <ExpandIcon
                                    onClick={(e) => toggleExpand(index, e)}
                                    title={isExpanded ? "Згорнути підетапи" : "Розгорнути підетапи"}
                                >
                                    {isExpanded ?
                                        "▲" :
                                        "▼"
                                    }
                                </ExpandIcon>
                            </StepContent>

                            {/* З'єднувач між кроками у десктопній версії */}
                            {(!isMobile && index < steps.length - 1) && (
                                <StepConnector isActive={index < activeStep} isMobile={isMobile} />
                            )}

                            {/* Розгорнутий список підетапів */}
                            {isExpanded && (
                                <SubstepsContainer>
                                    {step.substeps.map((substep, subIndex) => (
                                        <Substep key={subIndex} title={substep.description}>
                                            <Typography variant="body2" fontWeight="medium">
                                                {substep.label}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {substep.description}
                                            </Typography>
                                        </Substep>
                                    ))}
                                </SubstepsContainer>
                            )}
                        </StepItem>
                    </React.Fragment>
                );
            })}
        </StepperContainer>
    );
}

export default RectangleStepper;