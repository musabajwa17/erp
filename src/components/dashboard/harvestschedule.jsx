"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2 } from 'lucide-react';

const API_BASE_URL = 'https://earthscansystems.com/erp';

const HarvestScheduling = () => {
  const [startDate, setStartDate] = useState({ month: 6, year: 2024, day: 5 });
  const [endDate, setEndDate] = useState({ month: 7, year: 2024, day: 7 });
  const [formData, setFormData] = useState({
    crop: '',
    field: '',
    estimated_yield: '',
    crew: '',
    machinery: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [harvestData, setHarvestData] = useState([]);
  const [loading, setLoading] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const fetchHarvestSchedules = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/harvest-schedules/`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      // If using DRF ViewSet with DefaultRouter, result is likely an array
      setHarvestData(Array.isArray(result) ? result : result.data || []);
    } catch (error) {
      console.error('Error fetching harvest schedules:', error);
      alert('Failed to fetch harvest schedules: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchHarvestSchedules();
  }, []);

  // Date handling functions (keep your existing functions)
  const handleDateClick = (month, day, isStart) => {
    if (isStart) setStartDate({ ...startDate, month, day });
    else setEndDate({ ...endDate, month, day });
  };

  const handlePrevMonth = (isStart) => {
    if (isStart) {
      const newMonth = startDate.month === 0 ? 11 : startDate.month - 1;
      const newYear = startDate.month === 0 ? startDate.year - 1 : startDate.year;
      setStartDate({ ...startDate, month: newMonth, year: newYear });
    } else {
      const newMonth = endDate.month === 0 ? 11 : endDate.month - 1;
      const newYear = endDate.month === 0 ? endDate.year - 1 : endDate.year;
      setEndDate({ ...endDate, month: newMonth, year: newYear });
    }
  };

  const handleNextMonth = (isStart) => {
    if (isStart) {
      const newMonth = startDate.month === 11 ? 0 : startDate.month + 1;
      const newYear = startDate.month === 11 ? startDate.year + 1 : startDate.year;
      setStartDate({ ...startDate, month: newMonth, year: newYear });
    } else {
      const newMonth = endDate.month === 11 ? 0 : endDate.month + 1;
      const newYear = endDate.month === 11 ? endDate.year + 1 : endDate.year;
      setEndDate({ ...endDate, month: newMonth, year: newYear });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Create or Update Harvest Schedule
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // convert JS date parts to proper ISO (YYYY-MM-DD)
    const start_date = new Date(startDate.year, startDate.month, startDate.day)
      .toISOString()
      .split('T')[0];
    const end_date = new Date(endDate.year, endDate.month, endDate.day)
      .toISOString()
      .split('T')[0];
  
    const payload = {
      crop: formData.crop,
      field: formData.field,
      estimated_yield: formData.estimated_yield,
      start_date,
      end_date,
      crew: formData.crew,
      machinery: formData.machinery,
      status: "Scheduled", // optional, backend default is same
    };
  
    try {
      const url = editingId
        ? `${API_BASE_URL}/harvest-schedules/${editingId}/`
        : `${API_BASE_URL}/harvest-schedules/`;
  
      const method = editingId ? "PUT" : "POST";
  
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errData = await response.json();
        console.error("Server error:", errData);
        alert("Failed to save harvest schedule:\n" + JSON.stringify(errData));
        return;
      }
  
      await fetchHarvestSchedules();
      resetForm();
      alert(editingId ? "Harvest schedule updated!" : "Harvest schedule added!");
    } catch (error) {
      console.error("Error saving harvest schedule:", error);
      alert("Something went wrong while saving the schedule.");
    }
  };
  

  // Delete Harvest Schedule
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this harvest schedule?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/harvest-schedules/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}` // Replace YOUR_AUTH_TOKEN with your actual token
        }
      });

      if (response.ok) {
        alert('Harvest schedule deleted successfully!');
        fetchHarvestSchedules();
      } else {
        alert('Failed to delete harvest schedule');
      }
    } catch (error) {
      console.error('Error deleting harvest schedule:', error);
      alert('Failed to delete harvest schedule');
    }
  };

  // Edit Harvest Schedule
  const handleEdit = (harvest) => {
    setFormData({
      crop: harvest.crop,
      field: harvest.field,
      estimated_yield: harvest.estimated_yield,
      crew: harvest.crew,
      machinery: harvest.machinery
    });

    // Parse dates for calendar
    const start = new Date(harvest.start_date);
    const end = new Date(harvest.end_date);

    setStartDate({
      month: start.getMonth(),
      year: start.getFullYear(),
      day: start.getDate()
    });

    setEndDate({
      month: end.getMonth(),
      year: end.getFullYear(),
      day: end.getDate()
    });

    setEditingId(harvest.id);
  };

  const resetForm = () => {
    setFormData({
      crop: '',
      field: '',
      estimated_yield: '',
      crew: '',
      machinery: ''
    });
    setEditingId(null);
    // Reset to current dates or default dates
    setStartDate({ month: 6, year: 2024, day: 5 });
    setEndDate({ month: 7, year: 2024, day: 7 });
  };

  // Keep your existing CalendarMonth component
  const CalendarMonth = ({ dateObj, isStart }) => {
    const { month, year, day: selectedDay } = dateObj;
    const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (m, y) => new Date(y, m, 1).getDay();

    const daysInMonth = getDaysInMonth(month, year);
    const startDay = getFirstDayOfMonth(month, year);

    const renderDays = () => {
      const days = [];
      for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-10"></div>);
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = day === selectedDay;
        let className = "h-10 flex items-center justify-center cursor-pointer rounded-lg transition-colors";
        if (isSelected) className += " bg-green-500 text-white font-semibold";
        else className += " hover:bg-green-100";
        days.push(
          <div
            key={day}
            className={className}
            onClick={() => handleDateClick(month, day, isStart)}
          >
            {day}
          </div>
        );
      }
      return days;
    };

    return (
      <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={() => handlePrevMonth(isStart)} className="p-2 rounded-full hover:bg-green-100">
            <ChevronLeft size={18} />
          </button>
          <h3 className="font-bold text-lg text-gray-900">
            {monthNames[month]} {year}
          </h3>
          <button type="button" onClick={() => handleNextMonth(isStart)} className="p-2 rounded-full hover:bg-green-100">
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="font-semibold text-gray-600 pb-2">
              {d}
            </div>
          ))}
          {renderDays()}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Harvest Scheduling & Yield Capture</h1>
        <p className="text-gray-600">Plan optimal harvest windows, allocate resources, and capture yield data.</p>
      </header>

      <div className="border-b border-green-300 mb-8">
        <nav className="flex space-x-8 -mb-px">
          <a href="#" className="py-4 px-1 border-b-2 border-green-500 text-gray-900 font-semibold">Schedule</a>
          <a href="#" className="py-4 px-1 border-b-2 border-transparent text-gray-600 hover:border-green-300 hover:text-gray-900">Yield Maps</a>
          <a href="#" className="py-4 px-1 border-b-2 border-transparent text-gray-600 hover:border-green-300 hover:text-gray-900">Harvest Records</a>
        </nav>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm mb-8">
        <h2 className="text-2xl font-bold mb-6">
          {editingId ? 'Edit Harvest Schedule' : 'Add New Harvest Schedule'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {[
              { key: 'crop', label: 'Crop' },
              { key: 'field', label: 'Field' },
              { key: 'estimated_yield', label: 'Estimated Yield' },
              { key: 'crew', label: 'Crew' },
              { key: 'machinery', label: 'Machinery' }
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-semibold mb-2">{label}</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-green-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  required
                />
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4">Select Harvest Window</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <div>
              <p className="text-sm font-semibold mb-2">
                Start Date: {monthNames[startDate.month]} {startDate.day}, {startDate.year}
              </p>
              <CalendarMonth dateObj={startDate} isStart={true} />
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">
                End Date: {monthNames[endDate.month]} {endDate.day}, {endDate.year}
              </p>
              <CalendarMonth dateObj={endDate} isStart={false} />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg"
              >
                Cancel Edit
              </button>
            )}
            <button type="submit" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg">
              <Plus size={20} />
              {editingId ? 'Update Harvest Schedule' : 'Add Harvest Schedule'}
            </button>
          </div>
        </form>
      </div>

      {/* Harvest Table */}
      <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upcoming Harvests</h2>
          {loading && <span className="text-green-600">Loading...</span>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-green-200 bg-green-50">
                <th className="p-4 font-semibold">Crop</th>
                <th className="p-4 font-semibold">Field</th>
                <th className="p-4 font-semibold">Estimated Yield</th>
                <th className="p-4 font-semibold">Harvest Window</th>
                <th className="p-4 font-semibold">Crew</th>
                <th className="p-4 font-semibold">Machinery</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {harvestData.map((harvest) => (
                <tr key={harvest.id} className="border-b border-green-100 hover:bg-green-50">
                  <td className="p-4 font-medium">{harvest.crop}</td>
                  <td className="p-4">{harvest.field}</td>
                  <td className="p-4">{harvest.estimated_yield}</td>
                  <td className="p-4">{harvest.harvest_window}</td>
                  <td className="p-4">{harvest.crew}</td>
                  <td className="p-4">{harvest.machinery}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">
                      {harvest.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(harvest)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(harvest.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HarvestScheduling;