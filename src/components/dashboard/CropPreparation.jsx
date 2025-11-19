import React, { useState } from 'react';
import { Plus, MapPin, Calendar, Droplets, Sun, Sprout, ArrowLeft } from 'lucide-react';

// Crop database with detailed information
const CROP_DATABASE = {
  'Winter Wheat': {
    varieties: ['Bell', 'Cherry', 'Walla Walla', 'Premium Gold'],
    botanicalName: 'Triticum aestivum',
    daysToEmerge: 5,
    plantSpacing: 7.62,
    rowSpacing: 7.62,
    plantingDepth: 5.08,
    averageHeight: 91.44,
    germRate: 100,
    seedsPerCell: 1,
    lightProfile: 'Full Sun',
    soilConditions: 'Low water',
    daysToFlower: 0,
    daysToMaturity: 240,
    harvestWindow: 0,
    estimatedLoss: 0.0,
    harvestUnits: 'bales'
  },
  'Spring Wheat': {
    varieties: ['Red Fife', 'Marquis', 'Glenn', 'Stoa'],
    botanicalName: 'Triticum aestivum',
    daysToEmerge: 4,
    plantSpacing: 7.5,
    rowSpacing: 7.5,
    plantingDepth: 4.5,
    averageHeight: 85.0,
    germRate: 98,
    seedsPerCell: 1,
    lightProfile: 'Full Sun',
    soilConditions: 'Moderate water',
    daysToFlower: 0,
    daysToMaturity: 100,
    harvestWindow: 7,
    estimatedLoss: 0.0,
    harvestUnits: 'bales'
  },
  'Corn': {
    varieties: ['Sweet Gold', 'Silver Queen', 'Bodacious', 'Honey Select'],
    botanicalName: 'Zea mays',
    daysToEmerge: 7,
    plantSpacing: 30.0,
    rowSpacing: 76.0,
    plantingDepth: 5.0,
    averageHeight: 200.0,
    germRate: 95,
    seedsPerCell: 1,
    lightProfile: 'Full Sun',
    soilConditions: 'High water',
    daysToFlower: 60,
    daysToMaturity: 80,
    harvestWindow: 14,
    estimatedLoss: 5.0,
    harvestUnits: 'bushels'
  },
  'Soybeans': {
    varieties: ['Envy', 'Williams 82', 'Asgrow', 'Pioneer 93M11'],
    botanicalName: 'Glycine max',
    daysToEmerge: 5,
    plantSpacing: 10.0,
    rowSpacing: 50.0,
    plantingDepth: 3.8,
    averageHeight: 75.0,
    germRate: 92,
    seedsPerCell: 1,
    lightProfile: 'Full Sun',
    soilConditions: 'Moderate water',
    daysToFlower: 45,
    daysToMaturity: 120,
    harvestWindow: 10,
    estimatedLoss: 3.0,
    harvestUnits: 'bushels'
  },
  'Tomatoes': {
    varieties: ['Beefsteak', 'Roma', 'Cherry', 'Heirloom'],
    botanicalName: 'Solanum lycopersicum',
    daysToEmerge: 8,
    plantSpacing: 60.0,
    rowSpacing: 90.0,
    plantingDepth: 1.5,
    averageHeight: 150.0,
    germRate: 85,
    seedsPerCell: 1,
    lightProfile: 'Full Sun',
    soilConditions: 'High water',
    daysToFlower: 50,
    daysToMaturity: 80,
    harvestWindow: 30,
    estimatedLoss: 10.0,
    harvestUnits: 'kg'
  }
};

const CropPreparationSystem = () => {
  const [view, setView] = useState('locations'); // locations, addCrop, addLocation, plantingDetails
  const [crops, setCrops] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currentCrop, setCurrentCrop] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [step, setStep] = useState(1);

  // Form states
  const [cropForm, setCropForm] = useState({
    type: '',
    variety: '',
    internalId: ''
  });

  const [locationForm, setLocationForm] = useState({
    name: '',
    internalId: '',
    electronicId: '',
    locationType: 'Field',
    plantingFormat: 'Planted in Beds',
    numBeds: 5,
    bedLength: 100,
    bedWidth: 3,
    status: 'Active',
    lightProfile: '',
    grazingRestDays: '',
    description: ''
  });

  const [plantingForm, setPlantingForm] = useState({
    cropType: '',
    location: '',
    amount: '',
    startDate: '',
    startMethod: 'Direct Sow',
    plantingDetails: '',
    pruningDetails: '',
    isPerennial: false,
    autoTasks: true
  });

  // Add new crop
  const handleAddCrop = () => {
    if (!cropForm.type || !cropForm.variety) {
      alert('Please select crop type and variety');
      return;
    }

    const cropData = CROP_DATABASE[cropForm.type];
    const newCrop = {
      id: Date.now(),
      type: cropForm.type,
      variety: cropForm.variety,
      internalId: cropForm.internalId || `${cropForm.type.substring(0, 4).toUpperCase()}`,
      botanicalName: cropData.botanicalName,
      ...cropData
    };

    setCrops([...crops, newCrop]);
    console.log('Crop Added:', newCrop);
    
    // Reset form
    setCropForm({ type: '', variety: '', internalId: '' });
    setView('locations');
  };

  // Add new location
  const handleAddLocation = () => {
    if (!locationForm.name) {
      alert('Please enter location name');
      return;
    }

    const newLocation = {
      id: Date.now(),
      ...locationForm,
      areaSqm: locationForm.numBeds * locationForm.bedLength * locationForm.bedWidth
    };

    setLocations([...locations, newLocation]);
    console.log('Location Added:', newLocation);
    
    // Reset form
    setLocationForm({
      name: '',
      internalId: '',
      electronicId: '',
      locationType: 'Field',
      plantingFormat: 'Planted in Beds',
      numBeds: 5,
      bedLength: 100,
      bedWidth: 3,
      status: 'Active',
      lightProfile: '',
      grazingRestDays: '',
      description: ''
    });
    setView('locations');
  };

  // Start planting process
  const handleStartPlanting = (location, crop) => {
    setCurrentLocation(location);
    setCurrentCrop(crop);
    
    const cropData = CROP_DATABASE[crop.type];
    const today = new Date();
    const expectedHarvest = new Date(today);
    expectedHarvest.setDate(today.getDate() + cropData.daysToMaturity);

    setPlantingForm({
      cropType: crop.type,
      variety: crop.variety,
      location: location.name,
      amount: `${(location.areaSqm / (cropData.plantSpacing * cropData.rowSpacing / 10000)).toFixed(2)} sqm (100.0 bed m)`,
      startDate: today.toISOString().split('T')[0],
      expectedHarvest: expectedHarvest.toISOString().split('T')[0],
      startMethod: 'Direct Sow',
      plantingDetails: cropData.soilConditions,
      pruningDetails: '',
      isPerennial: false,
      autoTasks: true,
      ...cropData
    });

    setView('plantingDetails');
    setStep(1);
  };

  // Create planting plan
  const handleCreatePlan = () => {
    const planData = {
      crop: currentCrop,
      location: currentLocation,
      planting: plantingForm,
      createdAt: new Date().toISOString()
    };

    console.log('Planting Plan Created:', planData);
    alert('Planting plan created successfully! Check console for details.');
    
    // Reset and go back
    setView('locations');
    setCurrentCrop(null);
    setCurrentLocation(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sprout className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-800">Crop Preparation System</h1>
            </div>
            <div className="flex gap-3">
              {view === 'locations' && (
                <>
                  <button
                    onClick={() => setView('addCrop')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    <Plus className="w-5 h-5" />
                    New Crop Type
                  </button>
                  <button
                    onClick={() => setView('addLocation')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <MapPin className="w-5 h-5" />
                    Add Location
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Add Crop View */}
        {view === 'addCrop' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setView('locations')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">New Crop Type</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Type *
                </label>
                <select
                  value={cropForm.type}
                  onChange={(e) => setCropForm({ ...cropForm, type: e.target.value, variety: '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Search for Type</option>
                  {Object.keys(CROP_DATABASE).map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              {cropForm.type && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Variety/Strain
                    </label>
                    <select
                      value={cropForm.variety}
                      onChange={(e) => setCropForm({ ...cropForm, variety: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select variety</option>
                      {CROP_DATABASE[cropForm.type].varieties.map(variety => (
                        <option key={variety} value={variety}>{variety}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Internal ID
                    </label>
                    <input
                      type="text"
                      value={cropForm.internalId}
                      onChange={(e) => setCropForm({ ...cropForm, internalId: e.target.value })}
                      placeholder="Optional"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={() => setView('locations')}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCrop}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Save & New
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Location View */}
        {view === 'addLocation' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setView('locations')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">New Grow Location</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={locationForm.name}
                  onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                  placeholder="Example: Northwest Field"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Internal ID
                  </label>
                  <input
                    type="text"
                    value={locationForm.internalId}
                    onChange={(e) => setLocationForm({ ...locationForm, internalId: e.target.value })}
                    placeholder="Example: F001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Electronic ID
                  </label>
                  <input
                    type="text"
                    value={locationForm.electronicId}
                    onChange={(e) => setLocationForm({ ...locationForm, electronicId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Type
                </label>
                <select
                  value={locationForm.locationType}
                  onChange={(e) => setLocationForm({ ...locationForm, locationType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Field">Field</option>
                  <option value="Greenhouse">Greenhouse</option>
                  <option value="Tunnel">Tunnel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Planting Format
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setLocationForm({ ...locationForm, plantingFormat: 'Planted in Beds' })}
                    className={`p-4 border-2 rounded-lg text-left transition ${
                      locationForm.plantingFormat === 'Planted in Beds'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        ≡
                      </div>
                      <span className="font-semibold">Planted in Beds</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Distinct number of beds for diverse crops. Often in 100m length.
                    </p>
                  </button>
                  <button
                    onClick={() => setLocationForm({ ...locationForm, plantingFormat: 'Row Crop' })}
                    className={`p-4 border-2 rounded-lg text-left transition ${
                      locationForm.plantingFormat === 'Row Crop'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        ▦
                      </div>
                      <span className="font-semibold">Row Crop</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      One crop planted in rows wide enough to traverse with machinery.
                    </p>
                  </button>
                </div>
              </div>

              {locationForm.plantingFormat === 'Planted in Beds' && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Beds
                    </label>
                    <input
                      type="number"
                      value={locationForm.numBeds}
                      onChange={(e) => setLocationForm({ ...locationForm, numBeds: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bed Length (Meters)
                    </label>
                    <input
                      type="number"
                      value={locationForm.bedLength}
                      onChange={(e) => setLocationForm({ ...locationForm, bedLength: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bed Width (Meters)
                    </label>
                    <input
                      type="number"
                      value={locationForm.bedWidth}
                      onChange={(e) => setLocationForm({ ...locationForm, bedWidth: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={locationForm.description}
                  onChange={(e) => setLocationForm({ ...locationForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={() => setView('locations')}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLocation}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Locations List View */}
        {view === 'locations' && (
          <div className="space-y-6">
            {/* My Crops Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">My Crops</h2>
              {crops.length === 0 ? (
                <div className="text-center py-12">
                  <Sprout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No crops yet?</p>
                  <button
                    onClick={() => setView('addCrop')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Add a new crop type and it will show up here
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {crops.map(crop => (
                    <div key={crop.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Sprout className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{crop.type}, {crop.variety}</h3>
                          <p className="text-sm text-gray-500 italic">{crop.botanicalName}</p>
                          <p className="text-xs text-gray-400 mt-1">ID: {crop.internalId}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Grow Locations Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Grow Locations</h2>
              {locations.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No locations yet</p>
                  <button
                    onClick={() => setView('addLocation')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Add Location
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {locations.map(location => (
                    <div key={location.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{location.name}</h3>
                          <p className="text-sm text-gray-500">
                            {location.plantingFormat} • {location.areaSqm.toFixed(2)} sqm
                          </p>
                          {location.internalId && (
                            <p className="text-xs text-gray-400 mt-1">ID: {location.internalId}</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          location.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {location.status}
                        </span>
                      </div>

                      {crops.length > 0 && (
                        <div className="border-t pt-4">
                          <p className="text-sm font-medium text-gray-700 mb-3">Select crop to plant:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {crops.map(crop => (
                              <button
                                key={crop.id}
                                onClick={() => handleStartPlanting(location, crop)}
                                className="flex items-center gap-2 px-4 py-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition text-left"
                              >
                                <Sprout className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 truncate">
                                    {crop.type}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">{crop.variety}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Planting Details View */}
        {view === 'plantingDetails' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setView('locations')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">New Planting Details</h2>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium">Plant Type & Variety</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300 mx-2" />
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium">Planting Details</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300 mx-2" />
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  ✓
                </div>
                <span className="text-sm font-medium">Complete</span>
              </div>
            </div>

            {/* Step 1: Type & Variety */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Crop:</strong> {currentCrop.type}, {currentCrop.variety}
                  </p>
                  <p className="text-sm text-blue-800 mt-1">
                    <strong>Location:</strong> {currentLocation.name}
                  </p>
                  <p className="text-sm text-blue-800 mt-1">
                    <strong>Botanical Name:</strong> {currentCrop.botanicalName}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Next, Planting Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Planting Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-800 font-medium mb-2">
                    ✓ Auto-predicted planting details based on {currentCrop.type}
                  </p>
                  <p className="text-xs text-green-700">
                    All values have been automatically calculated. You can modify them if needed.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Crop Type
                    </label>
                    <input
                      type="text"
                      value={plantingForm.cropType}
                      readOnly
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Variety / Strain
                    </label>
                    <input
                      type="text"
                      value={plantingForm.variety}
                      readOnly
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={plantingForm.location}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Days To Emerge
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={plantingForm.daysToEmerge}
                        onChange={(e) => setPlantingForm({ ...plantingForm, daysToEmerge: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                        days
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plant Spacing
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={plantingForm.plantSpacing}
                        onChange={(e) => setPlantingForm({ ...plantingForm, plantSpacing: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                        cm
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Row Spacing
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={plantingForm.rowSpacing}
                        onChange={(e) => setPlantingForm({ ...plantingForm, rowSpacing: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                        cm
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Planting Depth
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={plantingForm.plantingDepth}
                        onChange={(e) => setPlantingForm({ ...plantingForm, plantingDepth: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                        cm
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Height
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={plantingForm.averageHeight}
                        onChange={(e) => setPlantingForm({ ...plantingForm, averageHeight: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                        cm
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Method
                    </label>
                    <select
                      value={plantingForm.startMethod}
                      onChange={(e) => setPlantingForm({ ...plantingForm, startMethod: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="Direct Sow">Direct Sow</option>
                      <option value="Transplant">Transplant</option>
                      <option value="Seed Started">Seed Started</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Germination Rate
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={plantingForm.germRate}
                        onChange={(e) => setPlantingForm({ ...plantingForm, germRate: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                        %
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seeds Per Hole/Cell
                    </label>
                    <input
                      type="number"
                      value={plantingForm.seedsPerCell}
                      onChange={(e) => setPlantingForm({ ...plantingForm, seedsPerCell: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Light Profile
                    </label>
                    <select
                      value={plantingForm.lightProfile}
                      onChange={(e) => setPlantingForm({ ...plantingForm, lightProfile: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="Full Sun">Full Sun</option>
                      <option value="Partial Sun">Partial Sun</option>
                      <option value="Shade">Shade</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Soil Conditions
                    </label>
                    <select
                      value={plantingForm.plantingDetails}
                      onChange={(e) => setPlantingForm({ ...plantingForm, plantingDetails: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="Low water">Low water</option>
                      <option value="Moderate water">Moderate water</option>
                      <option value="High water">High water</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Planting Details
                  </label>
                  <textarea
                    value={plantingForm.plantingDetails}
                    onChange={(e) => setPlantingForm({ ...plantingForm, plantingDetails: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pruning Details
                  </label>
                  <textarea
                    value={plantingForm.pruningDetails}
                    onChange={(e) => setPlantingForm({ ...plantingForm, pruningDetails: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={plantingForm.isPerennial}
                      onChange={(e) => setPlantingForm({ ...plantingForm, isPerennial: e.target.checked })}
                      className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Plant is Perennial</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={plantingForm.autoTasks}
                      onChange={(e) => setPlantingForm({ ...plantingForm, autoTasks: e.target.checked })}
                      className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Automatically create tasks for new plantings
                    </span>
                  </label>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Harvest Details</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Days To Flower
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={plantingForm.daysToFlower}
                          onChange={(e) => setPlantingForm({ ...plantingForm, daysToFlower: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                          days
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Days To Maturity
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={plantingForm.daysToMaturity}
                          onChange={(e) => setPlantingForm({ ...plantingForm, daysToMaturity: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                          Days
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Harvest Window
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={plantingForm.harvestWindow}
                          onChange={(e) => setPlantingForm({ ...plantingForm, harvestWindow: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                          Days
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Loss Rate
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={plantingForm.estimatedLoss}
                          onChange={(e) => setPlantingForm({ ...plantingForm, estimatedLoss: parseFloat(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Harvest Units
                      </label>
                      <select
                        value={plantingForm.harvestUnits}
                        onChange={(e) => setPlantingForm({ ...plantingForm, harvestUnits: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="bales">bales</option>
                        <option value="bushels">bushels</option>
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                        <option value="tons">tons</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Revenue
                      </label>
                      <div className="flex gap-2">
                        <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-l-lg">
                          Rs
                        </span>
                        <input
                          type="number"
                          placeholder="0.00"
                          className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Review Plan
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Complete/Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Planting Plan Ready!</h3>
                      <p className="text-sm text-gray-600">Review your plan before creating it</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Crop Information */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Sprout className="w-5 h-5 text-green-600" />
                      Crop Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{plantingForm.cropType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Variety:</span>
                        <span className="font-medium">{plantingForm.variety}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Method:</span>
                        <span className="font-medium">{plantingForm.startMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Location
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{plantingForm.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-medium">{plantingForm.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Format:</span>
                        <span className="font-medium">{currentLocation.plantingFormat}</span>
                      </div>
                    </div>
                  </div>

                  {/* Planting Details */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Sun className="w-5 h-5 text-yellow-600" />
                      Planting Specifications
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plant Spacing:</span>
                        <span className="font-medium">{plantingForm.plantSpacing} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Row Spacing:</span>
                        <span className="font-medium">{plantingForm.rowSpacing} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Depth:</span>
                        <span className="font-medium">{plantingForm.plantingDepth} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Days to Emerge:</span>
                        <span className="font-medium">{plantingForm.daysToEmerge} days</span>
                      </div>
                    </div>
                  </div>

                  {/* Harvest Plan */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      Harvest Plan
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plant Date:</span>
                        <span className="font-medium">{new Date(plantingForm.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected Harvest:</span>
                        <span className="font-medium">{new Date(plantingForm.expectedHarvest).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Days to Maturity:</span>
                        <span className="font-medium">{plantingForm.daysToMaturity} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Harvest Units:</span>
                        <span className="font-medium">{plantingForm.harvestUnits}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-cyan-600" />
                    Growing Conditions
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 block mb-1">Light Profile:</span>
                      <span className="font-medium">{plantingForm.lightProfile}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Soil Conditions:</span>
                      <span className="font-medium">{plantingForm.plantingDetails}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Germination Rate:</span>
                      <span className="font-medium">{plantingForm.germRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {plantingForm.autoTasks ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-gray-400">✗</span>
                      )}
                      <span className="text-gray-700">Automatic task creation enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {plantingForm.isPerennial ? (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          Perennial
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                          Annual
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Back to Edit
                  </button>
                  <button
                    onClick={handleCreatePlan}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition font-semibold shadow-lg"
                  >
                    Create Planting Plan
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPreparationSystem;