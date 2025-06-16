import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from "axios";
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Beauté");
  const [subCategory, setSubCategory] = useState("Soins visage");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Catégories et sous-catégories généralistes
  const categories = [
    "Beauté",
    "Bien-être",
    "Maison",
    "Accessoires",
    "Électronique",
    "Mode",
    "Nutrition",
    "Sport"
  ];

  const subCategories = [
    "Soins visage",
    "Huiles",
    "Gadgets",
    "Vêtements",
    "Ustensiles",
    "Compléments",
    "Bijoux",
    "Autre"
  ];

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName(""); setDescription(""); setPrice("");
        setImage1(false); setImage2(false); setImage3(false); setImage4(false);
        setSizes([]); setCategory(categories[0]); setSubCategory(subCategories[0]);
        setBestSeller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      {/* Images */}
      <div>
        <p className='mb-2'>Images du produit</p>
        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((img, i) => (
            <label key={i} htmlFor={`image${i + 1}`}>
              <img className='w-20' src={!img ? assets.upload_area : URL.createObjectURL(img)} alt="" />
              <input onChange={(e) => eval(`setImage${i + 1}`)(e.target.files[0])} type="file" id={`image${i + 1}`} hidden />
            </label>
          ))}
        </div>
      </div>

      {/* Nom */}
      <div className='w-full'>
        <p className='mb-2'>Nom du produit</p>
        <input value={name} onChange={(e) => setName(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Nom du produit' required />
      </div>

      {/* Description */}
      <div className='w-full'>
        <p className='mb-2'>Description</p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2' placeholder='Décrivez brièvement ce produit' required />
      </div>

      {/* Catégorie / sous-catégorie / prix */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Catégorie</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <p className='mb-2'>Sous-catégorie</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            {subCategories.map((sub, idx) => <option key={idx} value={sub}>{sub}</option>)}
          </select>
        </div>
        <div>
          <p className='mb-2'>Prix</p>
          <input value={price} onChange={(e) => setPrice(e.target.value)} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='Prix en F CFA' required />
        </div>
      </div>

      {/* Tailles */}
      <div>
        <p className='mb-2'>Tailles disponibles</p>
        <div className='flex gap-3'>
          {["S", "M", "L", "XL"].map(size => (
            <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? "bg-green-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Best Seller */}
      <div className='flex gap-2 mt-2'>
        <input type="checkbox" id='bestSeller' checked={bestSeller} onChange={() => setBestSeller(prev => !prev)} />
        <label className='cursor-pointer' htmlFor="bestSeller">Mettre en avant (meilleure vente)</label>
      </div>

      <button className='w-28 py-3 mt-4 bg-green-700 hover:bg-green-900 text-white' type='submit'>AJOUTER</button>
    </form>
  );
};

export default Add;
