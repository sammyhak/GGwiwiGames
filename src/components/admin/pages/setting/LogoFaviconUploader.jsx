import { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import Header from "../../common/Header";
import { toast, Toaster } from "react-hot-toast";

export default function LogoFaviconUploader() {
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [currentLogo, setCurrentLogo] = useState("");
  const [currentFavicon, setCurrentFavicon] = useState("");
  const [upload_logo, set_uploadlogo] = useState("");
  const [upload_favicon, set_favicon] = useState("");

  // Base URL for image fetching
  const imageBaseUrl = "http://localhost:8080/images/";

  // Fetch current logo and favicon from the backend
  useEffect(() => {
    const fetchLogoFavicon = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/get-logo-favicon`);
        if (response.data.logo) {
          setCurrentLogo(`${imageBaseUrl}${response.data.logo}`);
        }
        if (response.data.favicon) {
          setCurrentFavicon(`${imageBaseUrl}${response.data.favicon}`);
        }
      } catch (error) {
        toast.error("Error fetching logo and favicon");
        console.error("Error fetching logo and favicon:", error);
      }
    };

    fetchLogoFavicon();
  }, []);

  // Set favicon dynamically
  useEffect(() => {
    if (currentFavicon) {
      const linkTag = document.querySelector("link[rel='icon']");
      if (linkTag) {
        linkTag.href = currentFavicon; // Update the favicon href
      } else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = currentFavicon;
        document.head.appendChild(link); // Add the favicon link if not already present
      }
    }
  }, [currentFavicon]); // Update when currentFavicon changes

  // Handle File Upload
  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file && (file.type.includes("png") || file.type.includes("jpeg") || file.type.includes("jpg"))) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "logo") {
          setLogo(reader.result);
          set_uploadlogo(file);
        }
        if (type === "favicon") {
          setFavicon(reader.result);
          set_favicon(file);
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Invalid file type! Please upload a .png, .jpg, or .jpeg file.");
    }
  };

  // Handle form submission to update logo and favicon
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (upload_logo) formData.append("logo", upload_logo); // Send logo file
    if (upload_favicon) formData.append("favicon", upload_favicon); // Send favicon file

    try {
      const response = await axios.post(`http://localhost:8080/admin/upload-logo-favicon`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Logo and favicon uploaded successfully!");
      setCurrentLogo(`${imageBaseUrl}${response.data.logo}`); // Update logo URL after upload
      setCurrentFavicon(`${imageBaseUrl}${response.data.favicon}`); // Update favicon URL after upload
    } catch (error) {
      toast.error("Error uploading logo and favicon");
      console.error("Error:", error);
    }
  };

  return (
    <section className="w-full font-bai overflow-y-auto min-h-[100vh]">
      <Header />
      <Toaster />
      <div className="p-6 bg-gray-100 w-full flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Logo & Favicon</h2>

        {/* Info Message */}
        <div className="bg-white border-l-[3px] border-indigo-600 text-indigo-800 p-3 w-full text-[16px] px-[10px] text-left">
          If the logo and favicon are not changed after you update from this page, please{" "}
          <a href="#" className="text-blue-500 underline">
            clear the cache
          </a>{" "}
          from your browser. As we keep the filename the same after the update, it may show the old image for the cache.
          Usually, it works after clearing the cache, but if you still see the old logo or favicon, it may be caused by
          server-level or network-level caching. Please clear them too.
        </div>

        {/* Upload Section */}
        <div className="bg-white shadow-md rounded-md p-6 mt-6 w-full">
          <div className="grid grid-cols-2 gap-6">
            {/* Logo Upload */}
            <div className="py-4 rounded-md flex flex-col items-center justify-center relative w-full">
              <h3 className="text-lg font-medium mb-2 absolute top-[-20px] left-0 text-gray-800">Logo</h3>
              <label
                htmlFor="logo-upload"
                className="relative w-full h-full cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md overflow-hidden"
              >
                {currentLogo || logo ? (
                  <img src={logo || currentLogo} alt="Logo Preview" className="w-full h-[180px] rounded-md object-cover" />
                ) : (
                  <FaCloudUploadAlt className="text-blue-600 text-6xl" />
                )}
              </label>
              <input
                type="file"
                id="logo-upload"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={(e) => handleFileChange(e, "logo")}
              />
              <p className="text-[16px] text-gray-500 mt-[10px]">Supported Files: <b>.png, .jpg, .jpeg</b></p>
            </div>

            {/* Favicon Upload */}
            <div className="py-4 rounded-md flex flex-col items-center justify-center relative w-full h-64">
              <h3 className="text-lg font-medium mb-2 absolute top-[-20px] left-0 text-gray-800">Favicon</h3>
              <label
                htmlFor="favicon-upload"
                className="relative w-full h-full cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md overflow-hidden"
              >
                {currentFavicon || favicon ? (
                  <img src={favicon || currentFavicon} alt="Favicon Preview" className="w-32 h-32 object-cover" />
                ) : (
                  <FaCloudUploadAlt className="text-blue-600 text-6xl" />
                )}
              </label>
              <input
                type="file"
                id="favicon-upload"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={(e) => handleFileChange(e, "favicon")}
              />
              <p className="text-[16px] text-gray-500 mt-[10px]">Supported Files: <b>.png, .jpg, .jpeg</b></p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-[#FFB805] text-white py-3 rounded-md mt-6 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}
