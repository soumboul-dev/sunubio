import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = ({ products }) => {
  // Définir les catégories et sous-catégories possibles
  const categoriesMap = {
    bio: ["Soins visage", "Huiles essentielles", "Compléments", "Autres"],
    tech: ["Imprimantes", "Accessoires", "Smartphones"],
    accessoires: ["Bijoux", "Sacs", "Montres"],
  };

  // États
  const [category, setCategory] = useState("all"); // "all" = toutes catégories
  const [selectedSousCategories, setSelectedSousCategories] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // Récupérer les sous-catégories en fonction de la catégorie
  const sousCategories =
    category === "all" ? [] : categoriesMap[category] || [];

  // Fonction pour gérer la sélection/déselection des sous-catégories
  const toggleSousCategory = (e) => {
    const value = e.target.value;
    setSelectedSousCategories((prev) => {
      if (prev.includes(value)) {
        return prev.filter((c) => c !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Filtrer les produits par catégorie et sous-catégorie
  const filteredProducts = products.filter((p) => {
    // Filtre catégorie
    if (category !== "all" && p.category !== category) return false;

    // Filtre sous-catégories si sélectionnées
    if (
      selectedSousCategories.length > 0 &&
      !selectedSousCategories.includes(p.subCategory)
    )
      return false;

    return true;
  });

  // Trier les produits selon le critère choisi
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === "low-high") {
      return a.price - b.price;
    }
    if (sortType === "high-low") {
      return b.price - a.price;
    }
    // Pertinence par défaut (ici pas de critère particulier, on garde l'ordre)
    return 0;
  });

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* FILTRES */}
      <div className="w-full md:w-60 border border-gray-300 p-4 rounded">
        {/* Choix catégorie */}
        <div className="mb-5">
          <p className="font-semibold mb-2">CATÉGORIES</p>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSelectedSousCategories([]); // reset sous-catégories à chaque changement catégorie
            }}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="all">Toutes catégories</option>
            {Object.keys(categoriesMap).map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sous-catégories */}
        {category !== "all" && sousCategories.length > 0 && (
          <div>
            <p className="mb-3 text-sm font-medium">SOUS-CATÉGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700 max-h-48 overflow-auto">
              {sousCategories.map((sous, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    value={sous}
                    checked={selectedSousCategories.includes(sous)}
                    onChange={toggleSousCategory}
                  />
                  {sous}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AFFICHAGE DES PRODUITS */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <Title
            text1={"TOUS"}
            text2={
              category === "all"
                ? "LES PRODUITS"
                : `LES PRODUITS ${category.toUpperCase()}`
            }
          />
          {/* TRI */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2 py-1 rounded"
            value={sortType}
          >
            <option value="relevant">Trier : Pertinence</option>
            <option value="low-high">Trier : Prix croissant</option>
            <option value="high-low">Trier : Prix décroissant</option>
          </select>
        </div>

        {/* LISTE DES PRODUITS */}
        {sortedProducts.length === 0 ? (
          <p>Aucun produit trouvé.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {sortedProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={
                  Array.isArray(item.image) && item.image.length > 0
                    ? item.image[0]
                    : ""
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = ({ products }) => {
  // Définir les catégories et sous-catégories possibles
  const categoriesMap = {
    bio: ["Soins visage", "Huiles essentielles", "Compléments", "Autres"],
    tech: ["Imprimantes", "Accessoires", "Smartphones"],
    accessoires: ["Bijoux", "Sacs", "Montres"],
  };

  // États
  const [category, setCategory] = useState("all"); // "all" = toutes catégories
  const [selectedSousCategories, setSelectedSousCategories] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // Récupérer les sous-catégories en fonction de la catégorie
  const sousCategories =
    category === "all" ? [] : categoriesMap[category] || [];

  // Fonction pour gérer la sélection/déselection des sous-catégories
  const toggleSousCategory = (e) => {
    const value = e.target.value;
    setSelectedSousCategories((prev) => {
      if (prev.includes(value)) {
        return prev.filter((c) => c !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Filtrer les produits par catégorie et sous-catégorie
  const filteredProducts = products.filter((p) => {
    // Filtre catégorie
    if (category !== "all" && p.category !== category) return false;

    // Filtre sous-catégories si sélectionnées
    if (
      selectedSousCategories.length > 0 &&
      !selectedSousCategories.includes(p.subCategory)
    )
      return false;

    return true;
  });

  // Trier les produits selon le critère choisi
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === "low-high") {
      return a.price - b.price;
    }
    if (sortType === "high-low") {
      return b.price - a.price;
    }
    // Pertinence par défaut (ici pas de critère particulier, on garde l'ordre)
    return 0;
  });

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* FILTRES */}
      <div className="w-full md:w-60 border border-gray-300 p-4 rounded">
        {/* Choix catégorie */}
        <div className="mb-5">
          <p className="font-semibold mb-2">CATÉGORIES</p>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSelectedSousCategories([]); // reset sous-catégories à chaque changement catégorie
            }}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="all">Toutes catégories</option>
            {Object.keys(categoriesMap).map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sous-catégories */}
        {category !== "all" && sousCategories.length > 0 && (
          <div>
            <p className="mb-3 text-sm font-medium">SOUS-CATÉGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700 max-h-48 overflow-auto">
              {sousCategories.map((sous, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    value={sous}
                    checked={selectedSousCategories.includes(sous)}
                    onChange={toggleSousCategory}
                  />
                  {sous}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AFFICHAGE DES PRODUITS */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <Title
            text1={"TOUS"}
            text2={
              category === "all"
                ? "LES PRODUITS"
                : `LES PRODUITS ${category.toUpperCase()}`
            }
          />
          {/* TRI */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2 py-1 rounded"
            value={sortType}
          >
            <option value="relevant">Trier : Pertinence</option>
            <option value="low-high">Trier : Prix croissant</option>
            <option value="high-low">Trier : Prix décroissant</option>
          </select>
        </div>

        {/* LISTE DES PRODUITS */}
        {sortedProducts.length === 0 ? (
          <p>Aucun produit trouvé.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {sortedProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={
                  Array.isArray(item.image) && item.image.length > 0
                    ? item.image[0]
                    : ""
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
