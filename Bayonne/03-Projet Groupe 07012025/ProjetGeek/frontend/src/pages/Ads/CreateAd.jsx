import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/Form/FormInput";

const API_URL = process.env.REACT_APP_API_URL;

function CreateAd() {
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState("jeux");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("vente");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const createAdSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("categorie", categorie);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("price", price);
      if (image) {
        formData.append("imageFile", image);
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/api/ads/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });

      alert("Annonce créée avec succès !");
      navigate("/ads");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      console.error();

      alert("Erreur lors de la création de l'annonce.");
    }
  };

  return (
    <div className="background-create-ad">
      <h1 className="title">Créer une annonce</h1>
      <form onSubmit={createAdSubmit} encType="multipart/form-data">
        <FormInput
          label={"Titre"}
          type={"text"}
          placeholder={"Entrez le titre de l'annonce"}
          value={title}
          function={setTitle}
        />
        <FormInput
          label={"Description"}
          type={"text"}
          placeholder={"Entrez la description"}
          value={description}
          function={setDescription}
        />
        <label>Catégorie :</label>
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        >
          <option value="jeux">Jeux</option>
          <option value="manga">Manga</option>
          <option value="autres">Autres</option>
        </select>

        <label>Type :</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="vente">Vente</option>
          <option value="don">Don</option>
        </select>

        <FormInput
          label={"Prix"}
          type={"number"}
          placeholder={"Entrez le prix"}
          value={price}
          function={setPrice}
        />

        <label>Image :</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <div className="field">
          <button className="button-create-ad" type="submit">
            Publier l'annonce
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAd;
