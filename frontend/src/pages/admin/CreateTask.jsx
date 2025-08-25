import { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createTaskApi } from "../../api/tasks";

export default function CreateTask() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "medium",
    points: 10,
    dependencies: "",
    fontSize: "",
    fontFamily: "",
  });

  const [uiImage, setUiImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [images, setImages] = useState([]);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!uiImage) {
      setErr("UI Image is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("difficulty", form.difficulty);
      formData.append("points", form.points);
      formData.append("fontSize", form.fontSize);
      formData.append("fontFamily", form.fontFamily);

      if (form.dependencies) {
        form.dependencies
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean)
          .forEach((dep) => formData.append("dependencies[]", dep));
      }

      formData.append("uiImage", uiImage);
      if (logo) formData.append("logo", logo);
      images.forEach((img) => formData.append("images", img));
    for (let [key, value] of formData.entries()) {
  console.log(key, value);
}


      await createTaskApi(formData, true);
      nav("/admin/dashboard");
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <form className="space-y-6 max-w-3xl mx-auto p-6 bg-white x" onSubmit={submit}>
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      {err && <p className="text-red-600">{err}</p>}

            {/* UI Image */}
      <div>
        <label className="block font-semibold mb-1">UI Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setUiImage(e.target.files[0])}
        />
        {uiImage && (
          <img
            src={URL.createObjectURL(uiImage)}
            alt="UI Preview"
            className="mt-2 h-full w-full object-contain "
          />
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Enter task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          rows="6"
          placeholder="Enter task description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* Difficulty & Points */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Difficulty</label>
    <StatusSelect
  value={form.difficulty}
  onChange={(val) => setForm({ ...form, difficulty: val })}
  options={["easy", "medium", "hard"]}
/>

        </div>
        <div>
          <label className="block font-semibold mb-1">Points</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            placeholder="10"
            value={form.points}
            onChange={(e) => setForm({ ...form, points: e.target.value })}
          />
        </div>
      </div>

      {/* Dependencies */}
      <div>
        <label className="block font-semibold mb-1">Dependencies</label>
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Comma-separated task IDs"
          value={form.dependencies}
          onChange={(e) => setForm({ ...form, dependencies: e.target.value })}
        />
      </div>



      {/* Logo */}
      <div>
        <label className="block font-semibold mb-1">Logo (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
        />
        {logo && (
          <img
            src={URL.createObjectURL(logo)}
            alt="Logo Preview"
            className="mt-2 h-full w-full object-contain  "
          />
        )}
      </div>

      {/* Additional Images */}
      <div>
        <label className="block font-semibold mb-1">Additional Images (optional)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
        />
        {images.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt={`Additional ${idx}`}
                className="h-full w-full object-contain"
              />
            ))}
          </div>
        )}
      </div>

      {/* Font Settings */}
      <div className="grid grid-cols-2 gap-4">
        {/* <div>
          <label className="block font-semibold mb-1">Font Size</label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="16px"
            value={form.fontSize}
            onChange={(e) => setForm({ ...form, fontSize: e.target.value })}
          />
        </div> */}
        <div>
          <label className="block font-semibold mb-1">Font Family</label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Arial, sans-serif"
            value={form.fontFamily}
            onChange={(e) => setForm({ ...form, fontFamily: e.target.value })}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-5 py-2 rounded-full bg-black text-white font-semibold "
      >
        Create Task
      </button>
    </form>
  );
}


function StatusSelect({ value, onChange, options = ["pending", "evaluating", "passed", "failed"] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="relative w-full font-chewy " ref={ref}>
      {/* Selected value button */}
      <button
        type="button"
        className=" px-3 py-2 w-full bg-white border  rounded px-3 py-1 text-left flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <span>{value || "Select status"}</span>
   
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt}
              className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${opt === value ? "bg-gray-200 font-semibold" : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
