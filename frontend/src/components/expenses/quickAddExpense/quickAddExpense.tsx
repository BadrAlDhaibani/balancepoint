import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { createExpense } from '../../../store/slices/expenseSlice';
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

const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
};

export const QuickAddExpense: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: getTodayDate(),
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
            date: getTodayDate(),
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

    const handleAddExpense = async () => {
        if (!validateForm()) return;

        const payload = {
            description: formData.description.trim(),
            amount: parseFloat(formData.amount),
            date: formData.date,
            is_recurring: formData.type === 'recurring',
            frequency: formData.type === 'recurring' ? formData.frequency : undefined,
        };

        try {
            await dispatch(createExpense(payload)).unwrap();
            resetForm();
        } catch (error) {
            console.error('Failed to create expense:', error);
            alert('Failed to add expense. Please try again.');
        }
    };

    return (
        <QuickAddSection id="quick-add">
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
                    <Label>Date</Label>
                    <Input
                        type="date"
                        name="date"
                        value={formData.date}
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