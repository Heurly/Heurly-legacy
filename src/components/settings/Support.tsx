"use client";
import React, { useState } from "react";

const Support: React.FunctionComponent = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Ajoutez ici le code pour envoyer le message ou effectuer l'action souhaitée

    // Réinitialisez le contenu du textarea
    setMessage("");
  };

  return (
    <>
      <div className="mt-6">
        <text className="text-white font-semibold">Faire une remarque</text>
        <div className="mt-4 mb-8">
          <textarea
            id="about"
            name="about"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-black text-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm text-black-900 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-grey w-32"
            onClick={handleSendMessage} // Gestionnaire d'événement pour le bouton
          >
            Envoyer
          </button>
        </div>

        <div className="mt-8 mb-8">
          <hr className="border-gray-600" />
        </div>
      </div>
    </>
  );
};

export default Support;
