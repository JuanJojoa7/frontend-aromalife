import styles from './StepsSection.module.css';
import React from 'react';
// Actualización para reflejar la escala de verdes con transparencia
const steps = [
  {
    number: 1,
    title: "1. Seleccione un estilo",
    description: "Elija entre una selección de formas y tamaños de velas populares."
  },
  {
    number: 2,
    title: "2. Elige una fragancia",
    description: "Encuentra su aroma favorito o elige la combinación perfecta."
  },
  {
    number: 3,
    title: "3. Agregar una foto",
    description: "Sube uno que les encantará incluir en la etiqueta de la vela."
  },
  {
    number: 4,
    title: "4. Crea un mensaje",
    description: "Escribe un mensaje desde el corazón para que tu foto brille."
  }
];

export default function StepsSection() {
  return (
    <section className={styles.stepsSection}>
      {steps.map((step, index) => (
        <div key={index} className={styles.stepCard}>
          <div className={styles.stepNumber}>{step.number}</div>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <p className={styles.stepDescription}>{step.description}</p>
        </div>
      ))}
    </section>
  );
}
