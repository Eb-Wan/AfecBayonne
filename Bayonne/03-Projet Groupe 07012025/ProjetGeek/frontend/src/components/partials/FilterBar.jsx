import React from "react";

const FilterBar = (props) => {
  return (
    <div>
      <div className="container mt-4">
        <div className="field">
          <label className="label">Filtrer par type</label>
          <div className="control">
            <div className="select">
              <select onChange={(e) => props.function(e.target.value)}>
                <option value="">Tous</option>
                <option value="vente">Vente</option>
                <option value="don">Don</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
