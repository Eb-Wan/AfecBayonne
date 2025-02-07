import React from "react";
import { Link } from "react-router-dom";

const AdList = (props) => {
  return (
    <div>
      <div className="container mt-4">
        <div className="columns is-multiline">
          {props.filtre.map((ad) => (
            <div className="column is-one-third" key={ad._id}>
              <div className="card">
                <div className="card-content">
                  <img src={ad.urlImage} alt="" />
                  <p className="title">{ad.title}</p>
                  <p className="subtitle">{ad.type}</p>
                  <p>{ad.price}</p>
                  <p>{ad.categorie}</p>
                  <p>{ad.description}</p>
                  <Link to={`/ads/ ${ad._id}`} className="button is-info mt-2">
                    Voir les détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdList;
