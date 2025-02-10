import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bulma/css/bulma.min.css";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const AdDetails = () => {
  const { id } = useParams();
  const [ad, setAd] = useState([]);

  useEffect(() => {
    const DetailsAnnonce = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/ads/${id.trim()}`);
        // Vérification de la réponse HTTP
        if (response.status < 200 || response.status >= 300) {
          throw new Error(
            `Erreur HTTP: ${response.status} ${response.statusText}`
          );
        }

        // Traitement des données si la réponse est valide
        console.log(response.data);
        setAd(response.data);
      } catch (error) {
        console.error("Une erreur s'est produite:", error.message);
      }
    };
    DetailsAnnonce();
  });

  return (
    <div>
      <div className="column is-one-third" key={ad._id}>
        <div className="card">
          <div className="card-content">
            <img src={ad.urlImage} alt="" />
            <p className="title">{ad.title}</p>
            <p className="subtitle">{ad.type}</p>
            <p>{ad.price}</p>
            <p>{ad.categorie}</p>
            <p>{ad.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetails;
