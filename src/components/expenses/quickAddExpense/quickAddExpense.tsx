import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense, addRecurringExpense } from '../../../store/slices/expenseSlice';
import {
    QuickAddSection,
    QuickAddTitle,
    FormRow,
    FormGroup,
    Label,
    Input,
    Select,
    ActionButtons,
    Button,
}from './quickAddExpenseStyled';

export const QuickAddExpense: React.FC = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'one-time' as 'one-time' | 'recurring',
        frequency: 'monthly' as 'monthly' | 'weekly' | 'bi-weekly' | 'quarterly',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            description: '',
            amount: '',
            type: 'one-time',
            frequency: 'monthly',
        });
    };

    const validateForm = () => {
        if(!formData.description.trim()){
            alert('Please enter a description');
            return false;
        }
        if (!formData.amount || parseFloat(formData.amount) <= 0){
            alert('Please enter a valid amount');
            return false;
        }
        return true;
    };

    const handleAddExpense = () => {
        if (!validateForm()) return;

        const expenseData = {
            id: Date.now().toString(),
            description: formData.description.trim(),
            amount: parseFloat(formData.amount),
            date: new Date().toISOString().split('T')[0],
            isRecurring: formData.type === 'recurring',
            frequency: formData.type === 'recurring' ? formData.frequency : undefined,
        };

        if (formData.type === 'recurring') {
            const recurringData = {
                id: expenseData.id,
                description: expenseData.description,
                amount: expenseData.amount,
                frequency: formData.frequency,
                isActive: true,
                startDate: expenseData.date,
                nextPaymentDate: calculateNextPaymentDate(formData.frequency),
            };
            dispatch(addRecurringExpense(recurringData));
        } else {
            dispatch(addExpense(expenseData));
        }

        resetForm();
    };

    const calculateNextPaymentDate = (frequency: string): string => {
        const today = new Date();
        let nextDate = new Date(today);

        switch (frequency) {
            case 'weekly':
                nextDate.setDate(today.getDate() + 7);
                break;
            case 'bi-weekly':
                nextDate.setDate(today.getDate() + 14);
                break;
            case 'monthly':
                nextDate.setMonth(today.getMonth() + 1);
                break;
            case 'quarterly':
                nextDate.setMonth(today.getMonth() + 3);
                break;
        }

        return nextDate.toISOString().split('T')[0];
    };

    return (
        <QuickAddSection>
            <QuickAddTitle>Quick Add Expense</QuickAddTitle>
            <FormRow>
                <FormGroup>
                    <Label>Description</Label>
                    <Input
                        type="text"
                        name="description"
                        placeholder="Rent, groceries, utilities, etc."
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Amount</Label>
                    <Input
                        type="number"
                        name="amount"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        value={formData.amount}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Type</Label>
                    <Select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                    >
                        <option value="one-time">One-time</option>
                        <option value="recurring">Recurring</option>
                    </Select>
                </FormGroup>
                {formData.type === 'recurring' && (
                    <FormGroup>
                        <Label>Frequency</Label>
                        <Select
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleInputChange}
                        >
                            <option value="weekly">Weekly</option>
                            <option value="bi-weekly">Bi-weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                        </Select>
                    </FormGroup>
                )}
            </FormRow>
            <ActionButtons>
                <Button onClick={handleAddExpense}>
                    {formData.type === 'recurring' ? 'Add Recurring Expense' : 'Add Expense'}
                </Button>
            </ActionButtons>
        </QuickAddSection>
    );
};