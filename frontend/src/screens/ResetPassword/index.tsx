import React, { ReactElement, useState } from 'react';
import ResetPasswordComponent from '../../components/ResetPassword';

const ResetPassword: () => ReactElement = () => {
    const [form, setForm] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});

    const onChange = ({ name, value }) => {
        setForm({ ...form, [name]: value });

        if (value !== '') {
            if (name === 'password') {
                if (value.length < 6) {
                    setErrors(prev => {
                        return {
                            ...prev,
                            [name]: 'Password has to be at least 6 characters.',
                        };
                    });
                } else {
                    setErrors(prev => {
                        return { ...prev, [name]: null };
                    });
                }
            } else {
                setErrors(prev => {
                    return { ...prev, [name]: null };
                });
            }
        } else {
            setErrors(prev => {
                return { ...prev, [name]: 'This field is required.' };
            });
        }
    };

    const onSubmit = () => {
        if (!form.password) {
            setErrors(prev => {
                return { ...prev, password: 'This field is required.' };
            });
        }
        if (!form.confirmPassword) {
            setErrors(prev => {
                return { ...prev, password: 'This field is required.' };
            });
        }
        if (form.password !== form.confirmPassword) {
            setErrors(prev => {
                return { ...prev, confirmPassword: 'Passwords do not match.' };
            });
        }
    };
    return (
        <ResetPasswordComponent
            form={form}
            errors={errors}
            onSubmit={onSubmit}
            onChange={onChange}
        />
    );
};

export default ResetPassword;
