"use client";
import React, { useState, FormEvent } from 'react';
import { useUser } from "@/app/providers/user-context";
import { changeUserPassword } from "@/services/user.service";
import styles from './UserProfilePage.module.css'; // Crearemos este archivo CSS
import Image from 'next/image'; // Para el avatar y los iconos de contraseña

// Asumiendo que tienes estas imágenes en tu carpeta public/images
const imageBaseUrl = '/images'; // Cambiado de /icons a /imagesto

export default function UserProfilePage() {
  const { user, setUser } = useUser(); // Obtener usuario del contexto

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    general: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const validatePasswordForm = () => {
    const newErrors = { currentPassword: '', newPassword: '', confirmNewPassword: '', general: '' };
    let isValid = true;

    if (!currentPassword) {
      newErrors.currentPassword = 'La contraseña actual es obligatoria';
      isValid = false;
    }
    if (!newPassword) {
      newErrors.newPassword = 'La nueva contraseña es obligatoria';
      isValid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'La nueva contraseña debe tener al menos 8 caracteres';
      isValid = false;
    }
    if (!confirmNewPassword) {
      newErrors.confirmNewPassword = 'Debes confirmar la nueva contraseña';
      isValid = false;
    } else if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = 'Las nuevas contraseñas no coinciden';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handlePasswordChangeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrors({ currentPassword: '', newPassword: '', confirmNewPassword: '', general: '' });

    if (validatePasswordForm()) {
      if (!user) {
        setErrors(prev => ({ ...prev, general: 'Usuario no autenticado.' }));
        return;
      }
      try {
        await changeUserPassword({
          userId: user.id,
          currentPassword,
          newPassword,
        });
        setSuccessMessage('Contraseña actualizada con éxito. Por seguridad, debes iniciar sesión nuevamente.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        // Cerrar sesión y redirigir a login
        setTimeout(() => {
          setUser(null);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.location.href = '/login';
        }, 2000); // Espera 2 segundos para mostrar el mensaje
      } catch (error: any) {
        setErrors(prev => ({ ...prev, general: error.message || 'Ocurrió un error inesperado.' }));
      }
    }
  };

  if (!user) {
    // Podrías redirigir a login o mostrar un spinner/mensaje
    return <div className={styles.pageContainer}><p>Cargando perfil...</p></div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <div className={styles.profileHeader}>
          {/* Puedes añadir un avatar si lo tienes */}
          {/* <Image src={user.avatarUrl || `${imageBaseUrl}/default-avatar.png`} alt="Avatar" width={80} height={80} className={styles.avatar} /> */}
          <div className={styles.avatarPlaceholder}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h1 className={styles.userName}>{user.name || 'Nombre de Usuario'}</h1>
          <p className={styles.userEmail}>{user.email || 'email@ejemplo.com'}</p>
        </div>

        <div className={styles.divider}></div>

        <h2 className={styles.sectionTitle}>Cambiar Contraseña</h2>
        <form onSubmit={handlePasswordChangeSubmit}>
          {errors.general && <p className={styles.errorTextGlobal}>{errors.general}</p>}
          {successMessage && <p className={styles.successTextGlobal}>{successMessage}</p>}

          <div>
            <label htmlFor="currentPassword" className={styles.label}>Contraseña Actual</label>
            <div className={styles.passwordFieldContainer}>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                id="currentPassword"
                placeholder="••••••••"
                className={styles.inputField}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.togglePasswordButton}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                aria-label={showCurrentPassword ? 'Ocultar contraseña actual' : 'Mostrar contraseña actual'}
              >
                <Image
                  src={`${imageBaseUrl}/${showCurrentPassword ? 'visible.png' : 'closed.png'}`}
                  alt={showCurrentPassword ? 'Ocultar' : 'Mostrar'}
                  width={20}
                  height={20}
                  className={styles.passwordIcon}
                />
              </button>
            </div>
            {errors.currentPassword && <p className={styles.errorText}>{errors.currentPassword}</p>}
          </div>

          <div>
            <label htmlFor="newPassword" className={styles.label}>Nueva Contraseña</label>
            <div className={styles.passwordFieldContainer}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                placeholder="••••••••"
                className={styles.inputField}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.togglePasswordButton}
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={showNewPassword ? 'Ocultar nueva contraseña' : 'Mostrar nueva contraseña'}
              >
                <Image
                  src={`${imageBaseUrl}/${showNewPassword ? 'visible.png' : 'closed.png'}`}
                  alt={showNewPassword ? 'Ocultar' : 'Mostrar'}
                  width={20}
                  height={20}
                  className={styles.passwordIcon}
                />
              </button>
            </div>
            {errors.newPassword && <p className={styles.errorText}>{errors.newPassword}</p>}
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className={styles.label}>Confirmar Nueva Contraseña</label>
            <div className={styles.passwordFieldContainer}>
              <input
                type={showConfirmNewPassword ? 'text' : 'password'}
                id="confirmNewPassword"
                placeholder="••••••••"
                className={styles.inputField}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.togglePasswordButton}
                onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                aria-label={showConfirmNewPassword ? 'Ocultar confirmación de contraseña' : 'Mostrar confirmación de contraseña'}
              >
                <Image
                  src={`${imageBaseUrl}/${showConfirmNewPassword ? 'visible.png' : 'closed.png'}`}
                  alt={showConfirmNewPassword ? 'Ocultar' : 'Mostrar'}
                  width={20}
                  height={20}
                  className={styles.passwordIcon}
                />
              </button>
            </div>
            {errors.confirmNewPassword && <p className={styles.errorText}>{errors.confirmNewPassword}</p>}
          </div>
          
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
      
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} AromaLife. Todos los derechos reservados</p>
      </footer>
    </div>
  );
}