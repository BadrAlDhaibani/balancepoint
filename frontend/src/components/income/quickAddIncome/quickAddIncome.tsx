import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIncome } from '../../../store/slices/incomeSlice';
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
}from './quickAddIncomeStyled';

export const QuickAddIncome: React.FC = () => {
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

    const handleAddIncome = () => {
        if (!validateForm()) return;

        const newIncome = {
            id: Date.now().toString(),
            description: formData.description.trim(),
            amount: parseFloat(formData.amount),
            date: new Date().toISOString().split('T')[0],
            is_recurring: formData.type === 'recurring',
            frequency: formData.type === 'recurring' ? formData.frequency : undefined,
        };

        dispatch(addIncome(newIncome));
        resetForm();
    };

    return (
        <QuickAddSection id="quick-add">
            <QuickAddTitle>Quick Add Income</QuickAddTitle>
            <FormRow>
                <FormGroup>
                    <Label>Description</Label>
                    <Input
                        type="text"
                        name="description"
                        placeholder="Salary, Freelance work, etc."
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
                <Button onClick={handleAddIncome}>
                    {formData.type === 'recurring' ? 'Add Recurring Income' : 'Add Income'}
                </Button>
            </ActionButtons>
        </QuickAddSection>
    );
};