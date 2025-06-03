"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth.service";
import { useUser } from "@/app/providers/user-context";
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const router = useRouter();
  const { setUser } = useUser();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    if (!email) newErrors.email = 'El correo electrónico es obligatorio';
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = await loginUser({ email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        router.push("/"); // Redirige a la homepage
      } catch (error: any) {
        setErrors({ ...errors, password: error.message });
      }
    }
  };

  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>Bienvenido</h1>
        <p className={styles.subtitle}>Inicia sesión en tu cuenta</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="nombre@ejemplo.com"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>
          <div className={styles.passwordFieldContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.togglePasswordButton}
              onClick={togglePasswordVisibility}
            >
              <img
                src={`${imageBaseUrl}/${showPassword ? 'visible.png' : 'closed.png'}`}
                alt={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className={styles.passwordIcon}
              />
            </button>
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
          </div>
          <a href="#" className={styles.link}>
            ¿Olvidaste tu contraseña?
          </a>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              Iniciar sesión
            </button>
          </div>
        </form>
        <div className={styles.separator}>
          <div className={styles.separatorLine}></div>
          <span className={styles.separatorText}>o regístrate</span>
          <div className={styles.separatorLine}></div>
        </div>
        <p>
          ¿No tienes una cuenta?{' '}
          <a href="/register" className={styles.link}>
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}