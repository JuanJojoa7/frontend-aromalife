import React from "react";

export default function ForbiddenPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#FBF9F5' }}>
      <div style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', textAlign: 'center', maxWidth: 400 }}>
        <h1 style={{ fontSize: '2rem', color: '#D32F2F', marginBottom: '1rem' }}>Ups...</h1>
        <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: '1.5rem' }}>
          No tienes permisos suficientes para estar aquí.
        </p>
        <a href="/" style={{ color: '#8FA889', textDecoration: 'underline', fontWeight: 500 }}>Volver al inicio</a>
      </div>
    </div>
  );
}
