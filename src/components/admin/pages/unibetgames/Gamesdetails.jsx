import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../common/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Gamesdetails = () => {
  const { id } = useParams(); // Get game ID from URL params
  const [formData, setFormData] = useState({
    gameName: "",
    minInvest: "",
    maxInvest: "",
    winChance: "",
    image: null,
    description: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch game details on component mount
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/game/id/${id}`);
        const game = response.data;
        setFormData({
          gameName: game.gameName,
          minInvest: game.minInvest,
          maxInvest: game.maxInvest,
          winChance: game.winChance,
          image: game.image, // Keep existing image
          description: game.description,
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch game data");
      }
    };

    if (id) {
      fetchGame();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.gameName.trim()) newErrors.gameName = "Game name is required";
    if (!formData.minInvest || formData.minInvest <= 0) newErrors.minInvest = "Enter valid amount";
    if (!formData.maxInvest || formData.maxInvest <= 0 || formData.maxInvest < formData.minInvest)
      newErrors.maxInvest = "Maximum amount must be greater than minimum";
    if (!formData.winChance || formData.winChance < 0 || formData.winChance > 100)
      newErrors.winChance = "Win chance must be between 0-100";
    if (!formData.description.trim()) newErrors.description = "Game description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    const data = new FormData();
    data.append("gameName", formData.gameName);
    data.append("minInvest", formData.minInvest);
    data.append("maxInvest", formData.maxInvest);
    data.append("winChance", formData.winChance);
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }
    data.append("description", formData.description);

    try {
      await axios.put(`http://localhost:8080/admin/update-game/${id}`, data);
      toast.success("Game updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update game");
    }
  };

  return (
    <section className="w-full overflow-y-auto h-[100vh]">
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen">
        <Toaster />
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Edit Game</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6">
          <div className="mb-6">
            <label className="block text-gray-700 font-[500] mb-2">Game Name *</label>
            <input
              type="text"
              name="gameName"
              value={formData.gameName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-[5px] border-gray-300 outline-[#F0B100]"
            />
            {errors.gameName && <p className="text-red-500 text-sm">{errors.gameName}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Image</label>
            <div
              className="border border-gray-300 rounded-lg p-4  py-[20px] flex justify-center items-center relative bg-gray-50 cursor-pointer"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              {formData.image ? (
                <img
                  src={formData.image instanceof File ? URL.createObjectURL(formData.image) : `http://localhost:8080/images/${formData.image}`}
                  alt="Uploaded"
                  className="w-52 h-52 object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-500">No Image Selected</p>
              )}
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                onChange={handleImageUpload}
              />
              <FaCloudUploadAlt className="absolute bottom-2 right-2 text-indigo-600 text-3xl" />
            </div>
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-[1px] border-gray-300 p-6 rounded-[10px]">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">Bet Amount & Number</h3>
              <label className="block text-sm mb-2 text-gray-700">Minimum Invest *</label>
              <input
                type="number"
                name="minInvest"
                value={formData.minInvest}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border-[1px] border-gray-300 outline-[#F0B100]"
              />
              {errors.minInvest && <p className="text-red-500 text-sm">{errors.minInvest}</p>}
              <label className="block text-sm mt-4 mb-2 text-gray-700">Maximum Invest *</label>
              <input
                type="number"
                name="maxInvest"
                value={formData.maxInvest}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border-[1px] border-gray-300 outline-[#F0B100]"
              />
              {errors.maxInvest && <p className="text-red-500 text-sm">{errors.maxInvest}</p>}
            </div>
            <div className="rounded-[10px] border-[1px] border-gray-300 text-white p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">Losing Chance</h3>
              <label className="block text-sm mb-2 text-gray-700">Losing Chance</label>
              <input
                type="number"
                name="winChance"
                value={formData.winChance}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg text-gray-900 border-[1px] border-gray-300 outline-[#F0B100]"
              />
              {errors.winChance && <p className="text-red-500 text-sm">{errors.winChance}</p>}
            </div>
          </div>

          <div className="mb-6 mt-4">
            <label className="block text-gray-700 font-medium mb-2">Game Description *</label>
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              className="bg-white border border-gray-300 rounded-lg h-60"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <button className="mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg w-full">
            Update Game
          </button>
        </form>
      </div>
    </section>
  );
};

export default Gamesdetails;
