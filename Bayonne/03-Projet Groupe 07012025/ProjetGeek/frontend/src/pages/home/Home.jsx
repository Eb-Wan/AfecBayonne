import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./home.css";
import axios from "axios";
import FilterBar from "../../components/partials/FilterBar";
import AdList from "../../components/partials/AdList";
import Banner from "../../components/partials/Banner";
const API_URL = process.env.REACT_APP_API_URL;

function Home() {
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
    <div className="background-home">
      <Banner />
      <FilterBar function={setFilter} />

      <div className="container mt-4">
        <h3>Les dernieres annonces :</h3>
        <div className="columns is-multiline">
          <AdList filtre={filteredAds.slice(-3)} />
        </div>
        <Link to={`/ads/`}>Voir toute les annonces</Link>
      </div>

      <div className="container mt-4 has-text-centered">
        <Link to="/ads/create" className="button is success">
          Créer une annonce
        </Link>
      </div>
    </div>
  );
}

export default Home;
