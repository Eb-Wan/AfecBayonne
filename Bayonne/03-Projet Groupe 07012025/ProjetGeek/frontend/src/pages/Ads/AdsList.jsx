import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";
import axios from "axios";
import FilterBar from "../../components/partials/FilterBar";
import AdList from "../../components/partials/AdList";
const API_URL = process.env.REACT_APP_API_URL;

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const ListAnnonce = async (e) => {
      try {
        const response = await axios.get(`${API_URL}/api/ads/`);

        // Vérification de la réponse HTTP
        if (response.status < 200 || response.status >= 300) {
          throw new Error(
            `Erreur HTTP: ${response.status} ${response.statusText}`
          );
        }

        // Traitement des données si la réponse est valide
        console.log(response.data);
        setAds(response.data);
      } catch (error) {
        console.error("Une erreur s'est produite:", error.message);
      }
    };
    ListAnnonce();
  }, []);

  const filteredAds = filter ? ads.filter((ad) => ad.type === filter) : ads;

  return (
    <>
      <FilterBar function={setFilter} />
      <AdList filtre={filteredAds} />
    </>
  );
};

export default AdsList;
