import { useState } from "react";
import { User, Eye, EyeOff } from "lucide-react";

export default function StudentRegister2() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstNm: "",
    lastNm: "",
    gender: "",
    dob: "",
    addr1: "",
    addr2: "",
    city: "",
    state: "",
    country: "",
    pin: "",
    emailId: "",
    mobileNum: "",
    password: "",
    emergencyContactNm: "",
    emergencyContactNum: "",
    profile_img: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile_img: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl border-4 border-teal-500 p-8">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-gray-600" />
          </div>
          <h1 className="text-3xl text-gray-900">Student Registration</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="firstNm"
              value={formData.firstNm}
              onChange={handleInputChange}
              placeholder="First Name"
              className="input"
            />
            <input
              name="lastNm"
              value={formData.lastNm}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="input"
            />
          </div>

          {/* Gender & DOB */}
          <div className="grid md:grid-cols-2 gap-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="input"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          {/* Address */}
          <input
            name="addr1"
            value={formData.addr1}
            onChange={handleInputChange}
            placeholder="Address Line 1"
            className="input"
          />
          <input
            name="addr2"
            value={formData.addr2}
            onChange={handleInputChange}
            placeholder="Address Line 2"
            className="input"
          />

          {/* City / State / Pin */}
          <div className="grid md:grid-cols-3 gap-4">
            <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="input" />
            <input name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="input" />
            <input name="pin" value={formData.pin} onChange={handleInputChange} placeholder="PIN" className="input" />
          </div>

          <input
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
            className="input"
          />

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
              placeholder="Email"
              className="input"
            />
            <input
              type="tel"
              name="mobileNum"
              value={formData.mobileNum}
              onChange={handleInputChange}
              placeholder="Mobile"
              className="input"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="input pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Emergency */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="emergencyContactNm"
              value={formData.emergencyContactNm}
              onChange={handleInputChange}
              placeholder="Emergency Name"
              className="input"
            />
            <input
              name="emergencyContactNum"
              value={formData.emergencyContactNum}
              onChange={handleInputChange}
              placeholder="Emergency Number"
              className="input"
            />
          </div>
      
          {/* File Upload */}
          <input type="file" accept="image/*" onChange={handleFileChange} className="input" />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg mx-auto"
            />
          )}

          {/* Submit */}
          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            Register
          </button>
        </form>
      </div>

      {/* Tailwind reusable class */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px 16px;
          background: #f3f4f6;
          border-radius: 8px;
          outline: none;
        }
      `}</style>
    </div>
  );
}