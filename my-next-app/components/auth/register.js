'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/register.module.css';
import '../../styles/globals.css';
import { useRouter } from 'next/navigation';
import { user_register } from '@/lib/user_register'; // ✅ Import your register API

export default function RegisterForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [message, setMessage] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!agreeTerms) {
            setMessage('You must agree to the terms and privacy policy');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const payload = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password
            };

            console.log(payload);
            

            const res = await user_register(payload);

            setMessage(res.message || 'Registered successfully');
            localStorage.setItem('token', res.token);
            router.push('/login');
        } catch (err) {
            console.error('Registration error:', err);
            setMessage(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles['hotel-container-header']}>
                <Image src="/icons/Menu Container.svg" alt="menu" width={120} height={50} />
            </header>

            <div className={`${styles['register-container']}`}>
                <div className={styles['register-card']}>

                    {/* Left image */}
                    <div className={styles['login-img']}>
                        <Image src="/images/login-image.png" alt="login visual" width={300} height={300} />
                    </div>

                    {/* Right form */}
                    <div className={`${styles['register-form-container']}`}>
                        <form className={styles['register-form']} onSubmit={handleSubmit}>
                            <h3>Register</h3>

                            <div className={styles['register-fields']}>

                                <div className={`${styles['form-field']} ${styles['double']}`}>
                                    <div>
                                        <label htmlFor="firstName">First Name</label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder="Vernost24"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="User"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles['form-field']}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Vernost24@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={`${styles['form-field']} ${styles['password-field']}`}>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="********"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Image
                                        src="/icons/preview-close-one.svg"
                                        alt="toggle visibility"
                                        width={20}
                                        height={20}
                                        onClick={() => setShowPassword(prev => !prev)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>

                                <div className={`${styles['form-field']} ${styles['password-field']}`}>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirm ? 'text' : 'password'}
                                        placeholder="********"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Image
                                        src="/icons/preview-close-one.svg"
                                        alt="toggle visibility"
                                        width={20}
                                        height={20}
                                        onClick={() => setShowConfirm(prev => !prev)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>

                                <div className={` ${styles['checkbox-field']}`}>
                                    <input
                                        className='border'
                                        type="checkbox"
                                        id="terms-checkbox"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                    />
                                    <label htmlFor="terms-checkbox" className=''>
                                        I agree to all the Terms and Privacy Policies
                                    </label>
                                </div>

                                <button type="submit">Register Now</button>

                                {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}

                                <div className={styles['login-form-register-redirect']}>
                                    Already have an account?
                                    <Link href="/login"> Login</Link>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
