import React from 'react';
import { Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';

const Signup1 = () => {
    const {handleSubmit,control,formState: { errors },reset,watch,} = useForm();

    const password = watch('password', '');

    const postingUserData = async (data) => {
        if (data.password !== data.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        
        let newData =JSON.stringify({...data})
        
        let reqOptions = {
            method :'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: newData
        }
        let userData = await fetch('http://localhost:5000/employee/postingEmployeeDetails',reqOptions);
        try {
         let response = await userData.json();
         if(response.status === "success"){
           alert(response.message);
           reset();
         }else if(response.status === "failed"){
            alert(response.message);
         }   
        } catch (error) {
            console.log('error occured ')
        }
    };

    return (
        <form onSubmit={handleSubmit(postingUserData)}>
            {/* Name */}
            <div>
                <label htmlFor="name">Name:</label>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Name is required',
                        minLength: {
                            value: 3,
                            message: 'Name should be at least 3 characters long',
                        },
                    }}
                    render={({ field }) => <input {...field} id="name" type="text" />}
                />
                {errors.name && <p className='cautionpara'>{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email">Email:</label>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Invalid email address',
                        },
                    }}
                    render={({ field }) => <input {...field} id="email" type="email" />}
                />
                {errors.email && <p className='cautionpara'>{errors.email.message}</p>}
            </div>

            {/* Mobile Number */}
            <div>
                <label htmlFor="mobile">Mobile Number:</label>
                <Controller
                    name="mobile"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Mobile number is required',
                        pattern: {
                            value: /^\d{10}$/,
                            message: 'Mobile number should be 10 digits',
                        },
                    }}
                    render={({ field }) => <input {...field} id="mobile" type="text" />}
                />
                {errors.mobile && <p className='cautionpara'>{errors.mobile.message}</p>}
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password">Password:</label>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password should be at least 6 characters long',
                        },
                    }}
                    render={({ field }) => <input {...field} id="password" type="password" />}
                />
                {errors.password && <p className='cautionpara'>{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Please confirm your password',
                        validate: (value) =>
                            value === password || "Passwords don't match",
                    }}
                    render={({ field }) => (
                        <input {...field} id="confirmPassword" type="password" />
                    )}
                />
                {errors.confirmPassword && <p className='cautionpara'>{errors.confirmPassword.message}</p>}
            </div>
            <div style={{ paddingTop: '1rem', textAlign: 'right' }}>
                <Button type="submit" >Submit</Button>
            </div>

        </form>
    );
};

export default Signup1;


