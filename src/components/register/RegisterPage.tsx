"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Error al registrar usuario");
      }
      setSuccess("Usuario registrado exitosamente. Redirigiendo al login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main + " bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"}>
        <h2 className={styles.mainTitle + " mb-2 text-[#333333] text-center"}>
          Crear cuenta
        </h2>
        <p className={styles.mainSubtitle + " mb-6 text-center"}>
          Únete a nuestra comunidad aromática
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {success && <p className="text-green-700 text-center mb-4">{success}</p>}
          <div className="mb-4">
            <label className={styles.label} htmlFor="name">
              Nombre completo
            </label>
            <input
              className={styles.input + " w-full bg-[#FBF9F5] border-2 border-[#CCCCCC] rounded-md mt-1 focus:border-[#8FA889] focus:outline-none transition"}
              type="text"
              id="name"
              placeholder="Ingresa tu nombre completo"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className={styles.label} htmlFor="email">
              Correo electrónico
            </label>
            <input
              className={styles.input + " w-full bg-[#FBF9F5] border-2 border-[#CCCCCC] rounded-md mt-1 focus:border-[#8FA889] focus:outline-none transition"}
              type="email"
              id="email"
              placeholder="ejemplo@correo.com"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className={styles.label} htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <input
                className={styles.input + " w-full bg-[#FBF9F5] border-2 border-[#CCCCCC] rounded-md mt-1 pr-10 focus:border-[#8FA889] focus:outline-none transition"}
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Ingresa tu contraseña"
                required
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.eyeIcon + " absolute right-2 top-1/2 -translate-y-1/2"}
                onClick={togglePasswordVisibility}
                tabIndex={-1}
                aria-label={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <img
                  src={`${imageBaseUrl}/${passwordVisible ? 'visible.png' : 'closed.png'}`}
                  alt={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className={styles.passwordIcon}
                />
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className={styles.label} htmlFor="confirmPassword">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                className={styles.input + " w-full bg-[#FBF9F5] border-2 border-[#CCCCCC] rounded-md mt-1 pr-10 focus:border-[#8FA889] focus:outline-none transition"}
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirma tu contraseña"
                required
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.eyeIcon + " absolute right-2 top-1/2 -translate-y-1/2"}
                onClick={toggleConfirmPasswordVisibility}
                tabIndex={-1}
                aria-label={confirmPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <img
                  src={`${imageBaseUrl}/${confirmPasswordVisible ? 'visible.png' : 'closed.png'}`}
                  alt={confirmPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className={styles.passwordIcon}
                />
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label className={styles.checkboxContainer + " text-sm text-[#333333]"}>
              <input type="checkbox" className="mr-2" id="terms" required />
                Acepto los
              <a href="#" className="text-[#8FA889] underline ml-1">
                términos y condiciones
              </a>
            </label>
          </div>
          <button
            type="submit"
            className={styles.submitButton + " w-full bg-[#8FA889] text-[#FBF9F5] p-3 rounded-md font-semibold hover:bg-opacity-90 transition"}
          >
            Crear cuenta
          </button>
        </form>
        <div className="my-6 flex items-center">
          <hr className="flex-grow border-[#DDDDDD]" />
          <span className="px-2 text-sm text-[#888888]">o inicia sesión</span>
          <hr className="flex-grow border-[#DDDDDD]" />
        </div>
        <p className={styles.loginPrompt + " text-center"}>
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-[#8FA889] underline">
            Inicia sesión
          </Link>
        </p>
      </main>
    </div>
  );
};

export default RegisterPage;
