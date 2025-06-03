import React from 'react';

const FloatingWhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/573126986165"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "40px",
        zIndex: 1000,
      }}
      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600"
    >
      <img
        src="/images/whatsapp-icon.png"
        alt="WhatsApp"
        className="w-10 h-10"
      />
    </a>
  );
};

export default FloatingWhatsAppButton;
