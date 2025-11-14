"use client";

import React, { useState } from "react";
import { Upload, Leaf, TrendingUp, AlertCircle, CheckCircle2, FileText } from "lucide-react";

export default function SoilHealthTracker() {
  const [mode, setMode] = useState("manual");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    pH: "",
    EC: "",
    N: "",
    P: "",
    K: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.pH || formData.pH < 0 || formData.pH > 14) {
      newErrors.pH = "pH must be between 0 and 14";
    }
    if (!formData.EC || formData.EC < 0) {
      newErrors.EC = "EC must be a positive number";
    }
    if (!formData.N || formData.N < 0) {
      newErrors.N = "Nitrogen must be a positive number";
    }
    if (!formData.P || formData.P < 0) {
      newErrors.P = "Phosphorus must be a positive number";
    }
    if (!formData.K || formData.K < 0) {
      newErrors.K = "Potassium must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['.csv', '.xlsx', '.xls'];
      const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
      
      if (!validTypes.includes(fileExtension)) {
        alert("Please upload a valid CSV or Excel file (.csv, .xlsx, .xls)");
        e.target.value = null;
        return;
      }

      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        e.target.value = null;
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const onSubmitManual = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResult = {
        status: "success",
        data: {
          pH: parseFloat(formData.pH),
          EC: parseFloat(formData.EC),
          N: parseFloat(formData.N),
          P: parseFloat(formData.P),
          K: parseFloat(formData.K)
        },
        analysis: {
          soilHealth: calculateSoilHealth(formData),
          recommendations: getRecommendations(formData)
        },
        timestamp: new Date().toISOString()
      };
      
      setResult(mockResult);
      
      // Reset form
      setFormData({ pH: "", EC: "", N: "", P: "", K: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to submit soil data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitFile = async () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    setLoading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("mode", "upload");

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockResult = {
        status: "success",
        fileName: file.name,
        recordsProcessed: 15,
        analysis: {
          averagePH: 6.8,
          soilHealth: "Good",
          recommendations: [
            "Maintain current nutrient levels",
            "Monitor pH regularly",
            "Consider organic matter addition"
          ]
        },
        timestamp: new Date().toISOString()
      };

      setResult(mockResult);
      setFile(null);
      setFileName("");
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = null;
      
    } catch (error) {
      console.error(error);
      alert("Failed to upload soil file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateSoilHealth = (data) => {
    const ph = parseFloat(data.pH);
    const n = parseFloat(data.N);
    const p = parseFloat(data.P);
    const k = parseFloat(data.K);

    let score = 0;
    
    // pH scoring (optimal 6.0-7.5)
    if (ph >= 6.0 && ph <= 7.5) score += 25;
    else if (ph >= 5.5 && ph <= 8.0) score += 15;
    else score += 5;

    // NPK scoring (simplified)
    if (n >= 20 && n <= 50) score += 25;
    else if (n >= 10 && n <= 60) score += 15;
    else score += 5;

    if (p >= 15 && p <= 40) score += 25;
    else if (p >= 8 && p <= 50) score += 15;
    else score += 5;

    if (k >= 100 && k <= 300) score += 25;
    else if (k >= 50 && k <= 350) score += 15;
    else score += 5;

    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  const getRecommendations = (data) => {
    const recommendations = [];
    const ph = parseFloat(data.pH);
    const n = parseFloat(data.N);
    const p = parseFloat(data.P);
    const k = parseFloat(data.K);

    if (ph < 6.0) recommendations.push("Apply lime to increase pH");
    if (ph > 7.5) recommendations.push("Apply sulfur to decrease pH");
    if (n < 20) recommendations.push("Add nitrogen-rich fertilizer");
    if (p < 15) recommendations.push("Apply phosphorus fertilizer");
    if (k < 100) recommendations.push("Add potassium fertilizer");
    
    if (recommendations.length === 0) {
      recommendations.push("Soil health is optimal. Maintain current practices.");
    }

    return recommendations;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Soil Health Tracker</h1>
          <p className="text-gray-600">Monitor and analyze your soil's nutrient levels</p>
        </div> */}

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Mode Selection */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6">
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setMode("manual");
                  setResult(null);
                }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  mode === "manual"
                    ? "bg-white text-green-600 shadow-lg scale-105"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                Track Manually
              </button>
              <button
                onClick={() => {
                  setMode("upload");
                  setResult(null);
                }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  mode === "upload"
                    ? "bg-white text-blue-600 shadow-lg scale-105"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <Upload className="w-5 h-5" />
                Upload Lab Report
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Manual Form */}
            {mode === "manual" && (
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      pH Level
                    </label>
                    <input
                      type="number"
                      name="pH"
                      step="0.01"
                      value={formData.pH}
                      onChange={handleInputChange}
                      placeholder="0.00 - 14.00"
                      className={`w-full border-2 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                        errors.pH ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.pH && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.pH}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      EC (Electrical Conductivity)
                    </label>
                    <input
                      type="number"
                      name="EC"
                      step="0.01"
                      value={formData.EC}
                      onChange={handleInputChange}
                      placeholder="dS/m"
                      className={`w-full border-2 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                        errors.EC ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.EC && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.EC}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nitrogen (N)
                    </label>
                    <input
                      type="number"
                      name="N"
                      step="0.01"
                      value={formData.N}
                      onChange={handleInputChange}
                      placeholder="mg/kg"
                      className={`w-full border-2 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                        errors.N ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.N && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.N}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phosphorus (P)
                    </label>
                    <input
                      type="number"
                      name="P"
                      step="0.01"
                      value={formData.P}
                      onChange={handleInputChange}
                      placeholder="mg/kg"
                      className={`w-full border-2 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                        errors.P ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.P && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.P}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Potassium (K)
                    </label>
                    <input
                      type="number"
                      name="K"
                      step="0.01"
                      value={formData.K}
                      onChange={handleInputChange}
                      placeholder="mg/kg"
                      className={`w-full border-2 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                        errors.K ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.K && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.K}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmitManual(e);
                  }}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Analyze Soil Health
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Upload Form */}
            {mode === "upload" && (
              <div className="space-y-5">
                <div className="border-3 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-all duration-300 bg-gray-50">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Upload your lab report in CSV or Excel format
                  </p>
                  <input
                    type="file"
                    accept=".csv, .xlsx, .xls"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all cursor-pointer"
                  >
                    Choose File
                  </label>
                  {fileName && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">{fileName}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-4">
                    Supported formats: CSV, XLSX, XLS (Max 5MB)
                  </p>
                </div>

                <button
                  onClick={onSubmitFile}
                  disabled={!file || loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Submit File
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Result Display */}
            {result && (
              <div className="mt-8 p-6 border-2 border-green-200 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 animate-fadeIn">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-800">Analysis Results</h3>
                </div>

                {mode === "manual" && result.analysis && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-600 mb-1">Soil Health Status</p>
                      <p className={`text-2xl font-bold ${
                        result.analysis.soilHealth === "Excellent" ? "text-green-600" :
                        result.analysis.soilHealth === "Good" ? "text-blue-600" :
                        result.analysis.soilHealth === "Fair" ? "text-yellow-600" :
                        "text-red-600"
                      }`}>
                        {result.analysis.soilHealth}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Recommendations:</p>
                      <ul className="space-y-2">
                        {result.analysis.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <span className="text-green-500 font-bold">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {mode === "upload" && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow text-center">
                        <p className="text-sm text-gray-600 mb-1">Records Processed</p>
                        <p className="text-2xl font-bold text-blue-600">{result.recordsProcessed}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow text-center">
                        <p className="text-sm text-gray-600 mb-1">Average pH</p>
                        <p className="text-2xl font-bold text-green-600">{result.analysis.averagePH}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow text-center">
                        <p className="text-sm text-gray-600 mb-1">Soil Health</p>
                        <p className="text-2xl font-bold text-green-600">{result.analysis.soilHealth}</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Recommendations:</p>
                      <ul className="space-y-2">
                        {result.analysis.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <span className="text-green-500 font-bold">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Quick Reference Guide
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>
              <p className="font-semibold">Optimal pH:</p>
              <p>6.0 - 7.5</p>
            </div>
            <div>
              <p className="font-semibold">Nitrogen (N):</p>
              <p>20-50 mg/kg</p>
            </div>
            <div>
              <p className="font-semibold">Phosphorus (P):</p>
              <p>15-40 mg/kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}