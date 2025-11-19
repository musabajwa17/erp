"use client";
import React, { useEffect, useState } from "react";
import { Sprout, Tractor, Calendar, Clock, Fuel, User, MapPin, Trash2, CheckCircle } from "lucide-react";

export default function LandPreparation() {
  const [mode, setMode] = useState("general");
  const [fields, setFields] = useState([]);
  const [form, setForm] = useState({
    field: "",
    area: "",
    season: "",
    landPrepType: "",
    machineryType: "",
    ownership: "Own",
    operator: "",
    estimatedHours: "",
    fuelEstimate: "",
    cropType: "",
    variety: "",
    startDate: "",
    endDate: "",
  });
  const [tasks, setTasks] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const cropOptions = [
    "Wheat",
    "Cotton",
    "Corn",
    "Soybean",
    "Potato",
    "Rice",
    "Barley",
    "Sugarcane",
    "Tomato",
    "Onion",
  ];
  const seasonOptions = ["Rabi", "Kharif", "Zaid"];

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

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("scheduledTasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "field") {
      const selectedField = fields.find((f) => f.id === value);
      const areaInAcres = selectedField
        ? (selectedField.area / 4046.86).toFixed(2)
        : "";
      setForm({ ...form, field: value, area: areaInAcres });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const newTask = { ...form, id: Date.now() };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("scheduledTasks", JSON.stringify(updatedTasks));
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    setForm({
      field: "",
      area: "",
      season: "",
      landPrepType: "",
      machineryType: "",
      ownership: "Own",
      operator: "",
      estimatedHours: "",
      fuelEstimate: "",
      cropType: "",
      variety: "",
      startDate: "",
      endDate: "",
    });
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("scheduledTasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 md:p-8">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 border-l-4 border-green-500">
            <CheckCircle className="text-green-500 w-6 h-6" />
            <span className="font-semibold text-gray-800">Task scheduled successfully!</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-12 animate-in fade-in duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-4 shadow-lg">
            <Sprout className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Land Preparation
          </h1>
          <p className="text-gray-600 text-lg">Prepare your fields with precision and care</p>
        </div> */}

        <div className="grid lg:grid-cols-1 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              {/* Mode Selection */}
              <div className="flex gap-3 mb-8">
                <button
                  type="button"
                  className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-100 cursor-pointer ${
                    mode === "general"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setMode("general")}
                >
                  <Tractor className="w-5 h-5 inline mr-2" />
                  General Prep
                </button>
                <button
                  type="button"
                  className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-100 cursor-pointer ${
                    mode === "crop"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setMode("crop")}
                >
                  <Sprout className="w-5 h-5 inline mr-2" />
                  Crop-Specific
                </button>
              </div>

              <div className="space-y-6">
                {/* Field Selection */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    Select Field
                  </label>
                  <select
                    name="field"
                    value={form.field}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 cursor-pointer p-4 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none bg-white"
                    required
                  >
                    <option value="">Choose your field...</option>
                    {fields.map((field) => (
                      <option key={field.id} value={field.id}>
                        {field.farm_name} ({(field.area / 4046.86).toFixed(2)} acres)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Season */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    Season
                  </label>
                  <select
                    name="season"
                    value={form.season}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 cursor-pointer p-4 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none bg-white"
                  >
                    <option value="">Select season...</option>
                    {seasonOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Land Prep Type or Crop */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    {mode === "general" ? <Tractor className="w-4 h-4 text-green-600" /> : <Sprout className="w-4 h-4 text-green-600" />}
                    {mode === "general" ? "Preparation Type" : "Crop Type"}
                  </label>
                  {mode === "general" ? (
                    <select
                      name="landPrepType"
                      value={form.landPrepType}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 cursor-pointer p-4 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none bg-white"
                      required
                    >
                      <option value="">Select type...</option>
                      <option>Ploughing</option>
                      <option>Harrowing</option>
                      <option>Leveling / Laser leveling</option>
                      <option>Deep tillage / subsoiling</option>
                      <option>Irrigation setup</option>
                    </select>
                  ) : (
                    <select
                      name="cropType"
                      value={form.cropType}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 cursor-pointer p-4 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none bg-white"
                      required
                    >
                      <option value="">Select crop...</option>
                      {cropOptions.map((crop) => (
                        <option key={crop} value={crop}>
                          {crop}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Machinery Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Tractor className="w-4 h-4 text-green-600" />
                    Machinery Type
                  </label>
                  <select
                    name="machineryType"
                    value={form.machineryType}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 cursor-pointer p-4 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none bg-white"
                  >
                    <option value="">Select machinery...</option>
                    {["Tractor", "Plough", "Rotavator", "Harrow", "Grader", "Laser-leveler", "Ridger"].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ownership & Operator Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Ownership
                    </label>
                    <select
                      name="ownership"
                      value={form.ownership}
                      onChange={handleChange}
                      className="w-full border-2 cursor-pointer border-gray-200 p-4 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none bg-white"
                    >
                      <option>Own</option>
                      <option>Rented</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <User className="w-4 h-4 text-green-600" />
                      Operator
                    </label>
                    <input
                      type="text"
                      name="operator"
                      value={form.operator}
                      onChange={handleChange}
                      placeholder="Operator name..."
                      className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Hours & Fuel Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      Machine Hours
                    </label>
                    <select
                      name="estimatedHours"
                      value={form.estimatedHours}
                      onChange={handleChange}
                      className="w-full border-2 cursor-pointer border-gray-200 p-4 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none bg-white"
                    >
                      <option value="">Select hours...</option>
                      {Array.from({ length: 9 }, (_, i) => i + 1).map((h) => (
                        <option key={h} value={h}>
                          {h} hour{h > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Fuel className="w-4 h-4 text-green-600" />
                      Fuel Estimate
                    </label>
                    <select
                      name="fuelEstimate"
                      value={form.fuelEstimate}
                      onChange={handleChange}
                      className="w-full border-2 cursor-pointer border-gray-200 p-4 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none bg-white"
                    >
                      <option value="">Select fuel...</option>
                      {Array.from({ length: 8 }, (_, i) => (i + 1) * 5).map((f) => (
                        <option key={f} value={f}>
                          {f} Liters
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                      className="w-full border-2 cursor-pointer border-gray-200 p-4 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                      className="w-full border-2 cursor-pointer border-gray-200 p-4 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r cursor-pointer from-green-500 to-emerald-600 text-white font-bold py-5 rounded-2xl hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Schedule Task
                </button>
              </div>
            </div>
          </div>

          {/* Scheduled Tasks */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-green-600" />
                Scheduled Tasks
              </h3>
              
              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No tasks scheduled yet</p>
                </div>
              ) : (
               <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
  {/* General Land Preparation Tasks */}
  {tasks.filter(t => t.landPrepType).length > 0 && (
    <div>
      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <Tractor className="w-4 h-4" />
        General Preparation
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.filter(t => t.landPrepType).map((task, idx) => (
          <div
            key={task.id}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300 animate-in slide-in-from-bottom"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-blue-800">
                {fields.find((f) => f.id === task.field)?.farm_name || "Field"}
              </h4>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{task.area} acres</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>{task.season}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700">
                <Tractor className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">{task.landPrepType}</span>
              </div>
              
              {task.machineryType && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Tractor className="w-4 h-4 text-blue-600" />
                  <span>{task.machineryType} ({task.ownership})</span>
                </div>
              )}
              
              {task.operator && (
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>{task.operator}</span>
                </div>
              )}
              
              <div className="flex items-center gap-4 text-gray-700">
                {task.estimatedHours && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{task.estimatedHours}h</span>
                  </div>
                )}
                {task.fuelEstimate && (
                  <div className="flex items-center gap-1">
                    <Fuel className="w-4 h-4 text-blue-600" />
                    <span>{task.fuelEstimate}L</span>
                  </div>
                )}
              </div>
              
              {(task.startDate || task.endDate) && (
                <div className="pt-2 mt-2 border-t border-blue-200 text-xs text-gray-600">
                  {task.startDate} → {task.endDate}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Crop-Specific Tasks */}
  {tasks.filter(t => t.cropType).length > 0 && (
    <div>
      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <Sprout className="w-4 h-4" />
        Crop-Specific
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.filter(t => t.cropType).map((task, idx) => (
          <div
            key={task.id}
            className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all duration-300 animate-in slide-in-from-bottom"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-green-800">
                {fields.find((f) => f.id === task.field)?.farm_name || "Field"}
              </h4>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>{task.area} acres</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-green-600" />
                <span>{task.season}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700">
                <Sprout className="w-4 h-4 text-green-600" />
                <span className="font-semibold">{task.cropType}</span>
              </div>
              
              {task.machineryType && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Tractor className="w-4 h-4 text-green-600" />
                  <span>{task.machineryType} ({task.ownership})</span>
                </div>
              )}
              
              {task.operator && (
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4 text-green-600" />
                  <span>{task.operator}</span>
                </div>
              )}
              
              <div className="flex items-center gap-4 text-gray-700">
                {task.estimatedHours && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>{task.estimatedHours}h</span>
                  </div>
                )}
                {task.fuelEstimate && (
                  <div className="flex items-center gap-1">
                    <Fuel className="w-4 h-4 text-green-600" />
                    <span>{task.fuelEstimate}L</span>
                  </div>
                )}
              </div>
              
              {(task.startDate || task.endDate) && (
                <div className="pt-2 mt-2 border-t border-green-200 text-xs text-gray-600">
                  {task.startDate} → {task.endDate}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}