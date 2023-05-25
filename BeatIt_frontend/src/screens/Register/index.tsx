import React, {ReactElement, useState} from 'react';
import RegisterComponent from '../../components/Register';

const Register: () => ReactElement = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});

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
            return {...prev, [name]: null};
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: null};
        });
      }
    } else {
      setErrors(prev => {
        return {...prev, [name]: 'This field is required.'};
      });
    }
  };

  const onSubmit = () => {
    if (!form.username) {
      setErrors(prev => {
        return {...prev, username: 'This field is required.'};
      });
    }
    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: 'This field is required.'};
      });
    }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: 'This field is required.'};
      });
    }
    if (form.password !== form.confirmPassword) {
      setErrors(prev => {
        return {...prev, confirmPassword: 'Passwords do not match.'};
      });
    }
  };
  return (
    <RegisterComponent
      form={form}
      errors={errors}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
};

export default Register;
