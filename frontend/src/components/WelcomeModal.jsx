import React, { useEffect } from "react";

const WelcomeModal = ({ show, onClose }) => {
  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
          aria-label="Fermer"
        >&times;</button>
        <div className="text-3xl mb-2">🎉 Bienvenue sur <b>Sunu Bio & Co</b> ! 🛍️</div>
        <div className="mb-4 text-gray-700">
          Découvrez une large gamme de produits : bien-être, beauté, accessoires, maison, et plus encore !
        </div>
        <div className="text-left mb-4">
          <b>🔐 Pourquoi créer un compte ?</b>
          <ul className="list-disc ml-6 mt-2 text-sm">
            <li>Accédez à toutes nos catégories de produits</li>
            <li>Suivez facilement vos commandes</li>
            <li>Bénéficiez d’offres exclusives et de promotions</li>
          </ul>
        </div>
        <div className="mb-4">
          👉 <b>Inscription rapide et gratuite !</b><br />
          Créez un compte pour profiter d’une expérience d’achat fluide et personnalisée.
        </div>
        <div className="mb-2">
          🛒 <b>Rejoignez la communauté Sunu Bio & Co maintenant !</b>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
        >
          Continuer
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
