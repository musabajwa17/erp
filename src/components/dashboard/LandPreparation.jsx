"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Sprout,
  Tractor,
  Calendar,
  Clock,
  Fuel,
  MapPin,
  Trash2,
  CheckCircle,
  Info,
} from "lucide-react";
import CROP_DATABASE from "../../data/crops";

export default function LandPreparation() {
  const [fields, setFields] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const ALL_PREPARATION_TYPES = [
    "Ploughing",
    "Harrowing",
    "Leveling / Laser Leveling",
    "Ridging",
    "Bed Preparation",
    "Deep Tillage",
    "Rotavator",
    "Chiseling",
    "Disc Plough",
    "Cultivator",
    "Transplanting",
  ];

  const ALL_MACHINERY_TYPES = [
    "Tractor",
    "Laser Leveler",
    "Rotavator",
    "Cultivator",
    "Disc Harrow",
    "Ridger",
    "Chisel Plough",
    "Bed Shaper",
    "Seeder",
    "Transplanter",
  ];

  const recommendedPrep = {
    Wheat: "Leveling / Laser Leveling",
    Rice: "Transplanting",
    Maize: "Ridging",
    Cotton: "Ridging",
    Potato: "Bed Preparation",
    Onion: "Transplanting",
    Sesame: "Harrowing",
    Sorghum: "Harrowing",
  };

  const recommendedMachinery = {
    Wheat: "Laser Leveler",
    Rice: "Transplanter",
    Maize: "Ridger",
    Cotton: "Ridger",
    Potato: "Bed Shaper",
    Onion: "Transplanter",
    Sesame: "Cultivator",
    Sorghum: "Cultivator",
  };

  // Map preparation type to machinery if user changes prep type manually
  const prepToMachinery = {
    "Ploughing": "Tractor",
    "Harrowing": "Cultivator",
    "Leveling / Laser Leveling": "Laser Leveler",
    "Ridging": "Ridger",
    "Bed Preparation": "Bed Shaper",
    "Deep Tillage": "Chisel Plough",
    "Rotavator": "Rotavator",
    "Chiseling": "Chisel Plough",
    "Disc Plough": "Disc Harrow",
    "Cultivator": "Cultivator",
    "Transplanting": "Transplanter",
  };

  const seasonOptions = ["Rabi", "Kharif", "Zaid"];

  const initialForm = {
    field: "",
    season: "",
    crop: "",
    variety: "",
    landPrepType: "",
    machineryType: "",
    ownership: "Own",
    estimatedHours: "",
    fuelEstimate: "",
    startDate: "",
    endDate: "",
  };

  const [form, setForm] = useState(initialForm);

  // Fetch Fields
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch(
          "https://earthscansystems.com/farmerdatauser/userfarm/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        const data = await response.json();
        setFields(data);
      } catch (err) {
        console.error("Error fetching fields:", err);
      }
    };
    fetchFields();
  }, []);

  // Load Stored Tasks
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("scheduledTasks")) || [];
    setTasks(stored);
  }, []);

  // Automatically calculate end date based on start date & crop/variety
  const calculateEndDate = (startDate) => {
    if (!startDate) return "";
    // Example: default duration = 2 days for all tasks (can be adjusted per crop)
    const duration = 2; 
    const start = new Date(startDate);
    start.setDate(start.getDate() + duration);
    return start.toISOString().split("T")[0];
  };

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "field") {
      const selected = fields.find(
        (f) => f.id === Number(value) || f.id === value
      );
      const area = selected ? Number(selected.area / 4046.86).toFixed(2) : "";
      setForm({ ...form, field: value, area });
      return;
    }

    if (name === "crop") {
      setForm({
        ...form,
        crop: value,
        variety: "",
        landPrepType: recommendedPrep[value] || "",
        machineryType: recommendedMachinery[value] || "",
      });
      return;
    }

    if (name === "landPrepType") {
      // Update machinery based on prep type
      setForm({
        ...form,
        landPrepType: value,
        machineryType: prepToMachinery[value] || "",
      });
      return;
    }

    if (name === "startDate") {
      setForm({
        ...form,
        startDate: value,
        endDate: calculateEndDate(value),
      });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  // Submit & Save Task
  const handleSubmit = () => {
    if (
      !form.field ||
      !form.season ||
      !form.crop ||
      !form.variety ||
      !form.landPrepType ||
      !form.machineryType
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (form.startDate && form.endDate && form.startDate > form.endDate) {
      alert("Start date cannot be after end date");
      return;
    }

    const newTask = {
      id: Date.now(),
      ...form,
    };

    console.log("📌 Submitted Task:", newTask); // full form data

    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem("scheduledTasks", JSON.stringify(updated));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);

    setForm(initialForm);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    localStorage.setItem("scheduledTasks", JSON.stringify(updated));
  };

  const generalTasks = useMemo(
    () => tasks.filter((t) => t.landPrepType),
    [tasks]
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 md:p-10">
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top">
          <div className="bg-white rounded-xl shadow-xl p-4 flex items-center gap-3 border-l-4 border-green-600">
            <CheckCircle className="text-green-600 w-6 h-6" />
            <span className="font-semibold text-gray-800">
              Task scheduled successfully!
            </span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-10">
        <div className="bg-white/90 shadow-xl rounded-3xl p-8 backdrop-blur-xl border border-white/20">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 flex items-center gap-2">
            <Tractor className="w-7 h-7 text-green-600" />
            Land Preparation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Field */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 text-green-600" />
                Field
              </label>
              <select
                name="field"
                value={form.field}
                onChange={handleChange}
                className="w-full p-4 border-2 rounded-xl bg-white focus:ring-green-500"
              >
                <option value="">Select field...</option>
                {fields.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.farm_name} ({(f.area / 4046.86).toFixed(2)} acres)
                  </option>
                ))}
              </select>
            </div>

            {/* Season */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-green-600" />
                Season
              </label>
              <select
                name="season"
                value={form.season}
                onChange={handleChange}
                className="w-full p-4 border-2 rounded-xl bg-white focus:ring-green-500"
              >
                <option value="">Select season...</option>
                {seasonOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Crop */}
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Crop
              </label>
              <select
                name="crop"
                value={form.crop}
                onChange={handleChange}
                className="w-full p-4 border-2 rounded-xl bg-white focus:ring-green-500"
              >
                <option value="">Select crop...</option>
                {Object.keys(CROP_DATABASE)
                  .filter(
                    (c) =>
                      form.season === "" ||
                      CROP_DATABASE[c].season.includes(form.season)
                  )
                  .map((c) => (
                    <option key={c}>{c}</option>
                  ))}
              </select>
            </div>

            {/* Variety */}
            {form.crop && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Variety/Strain *
                </label>
                <select
                  value={form.variety}
                  name="variety"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                >
                  <option value="">Select variety</option>
                  {CROP_DATABASE[form.crop].varieties.map((variety) => (
                    <option key={variety} value={variety}>
                      {variety}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Preparation Type */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <Tractor className="w-4 h-4 text-green-600" />
                Preparation Type
              </label>
              <select
                name="landPrepType"
                value={form.landPrepType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              >
                <option value="">Select preparation type</option>
                {ALL_PREPARATION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Machinery */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <Tractor className="w-4 h-4 text-green-600" />
                Machinery
              </label>
              <select
                name="machineryType"
                value={form.machineryType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              >
                <option value="">Select machinery</option>
                {ALL_MACHINERY_TYPES.map((mach) => (
                  <option key={mach} value={mach}>
                    {mach}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full p-4 border-2 rounded-xl focus:ring-green-500"
                min={today}
              />
            </div>

            {/* End Date */}
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full p-4 border-2 rounded-xl focus:ring-green-500"
                min={form.startDate || today}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all"
          >
            Schedule Task
          </button>
        </div>

        {/* Scheduled Tasks section remains the same */}
        <div className="bg-white/90 shadow-xl rounded-3xl p-8 backdrop-blur-xl border border-white/20">
          <h3 className="text-2xl font-bold flex items-center gap-3 text-gray-700 mb-6">
            <CheckCircle className="w-7 h-7 text-green-600" />
            Scheduled Tasks
          </h3>

          {generalTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              No tasks scheduled yet.
            </div>
          ) : (
            <div className="space-y-5 max-h-[600px] overflow-y-auto pr-2">
              {generalTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl border-2 border-blue-200 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex justify-between mb-3">
                    <h4 className="font-bold text-blue-800">
                      {fields.find((f) => f.id === Number(task.field))
                        ?.farm_name || "Field"}
                    </h4>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:bg-red-100 p-2 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-sm text-gray-700 space-y-2">
                    <p className="flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-blue-600" />
                      {task.crop} ({task.variety})
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {task.landPrepType} - {task.machineryType}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      {task.season}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      {task.estimatedHours} | {task.fuelEstimate}
                    </p>
                    {task.startDate && task.endDate && (
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        {task.startDate} → {task.endDate}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

