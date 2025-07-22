'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/login.module.css';
import { user_login } from '@/lib/user_login';
import { useRouter } from 'next/navigation'; // optional for redirect

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { email, password };

        try {
            const res = await user_login(formData);
            setMessage(res.message || 'Login successful');

            // Optional: store token or user data
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));

            // Optional: redirect after login
            router.push('/');
        } catch (error) {
            console.error('Login error:', error);
            setMessage(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles['hotel-container-header']}>
                <Image src="/icons/Menu Container.svg" alt="menu" width={120} height={50} />
            </header>

            <div className={styles['login-container']}>
                <div className={styles['login-wrapper']}>
                    <div className={`${styles['login-img']} ${styles['border']}`}>
                        <Image src="/images/login-image.png" alt="login image" width={300} height={300} />
                    </div>

                    <div className={styles['login-form-container']}>
                        <form className={styles['login-form']} onSubmit={handleSubmit}>
                            <h3>Login</h3>
                            <p>Login to access your Vernost24 account</p>

                            <div className={styles['login-filds']}>
                                <div className={styles['form-field']}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="text"
                                        placeholder="Vernost24@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles['form-field']}>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        type={showPass ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <Image
                                        src="/icons/preview-close-one.svg"
                                        alt="toggle password"
                                        width={20}
                                        height={20}
                                        onClick={() => setShowPass((prev) => !prev)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>

                                <div className={styles['form-remember']}>
                                    <input type="checkbox" id="remember-checkbox" />
                                    <label htmlFor="remember-checkbox">Remember Me</label>
                                </div>

                                <button type="submit">Login</button>

                                {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}

                                <span>or</span>

                                <div className={styles['login-with-options']}>
                                    <Link href="#"><Image src="/icons/_Facebook.svg" alt="Facebook" width={38} height={38} /></Link>
                                    <Link href="#"><Image src="/icons/Apple.svg" alt="Apple" width={38} height={38} /></Link>
                                    <Link href="#"><Image src="/icons/Google.svg" alt="Google" width={38} height={38} /></Link>
                                </div>

                                <div className={styles['login-form-register-redirect']} >
                                    Don&apos;t have an account in Vernost24 yet?
                                    <Link href="/register"> Register</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
