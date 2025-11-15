import { useState } from "react";

export default function LandPreparation() {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    machinery: "",
    operator: "",
    status: "Pending",
  });

  const [tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.description || !form.machinery || !form.operator) return;
    setTasks([...tasks, { ...form, id: Date.now() }]);
    setForm({ title: "", description: "", machinery: "", operator: "", status: "Pending" });
  };

  const updateStatus = (id, newStatus) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
    if (selected?.id === id) setSelected({ ...selected, status: newStatus });
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6 min-h-screen bg-gray-100">

      {/* LEFT SIDE FORM */}
      <div className="col-span-1 space-y-4 bg-white p-4 rounded-2xl shadow-md border">
        <h2 className="font-bold text-xl mb-3">Create Land Preparation Work Order</h2>

        <input name="title" value={form.title} onChange={handleChange} placeholder="Work Order Title" className="w-full p-2 border rounded-xl mb-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded-xl mb-2" />
        <input name="machinery" value={form.machinery} onChange={handleChange} placeholder="Machinery Assigned" className="w-full p-2 border rounded-xl mb-2" />
        <input name="operator" value={form.operator} onChange={handleChange} placeholder="Operator Name" className="w-full p-2 border rounded-xl mb-2" />

        <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded-xl mb-3">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button className="w-full p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700" onClick={handleSubmit}>Create Work Order</button>

        <hr className="my-4" />

        <h3 className="font-semibold text-lg mb-2">Work Orders</h3>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {tasks.map((task) => (
            <div key={task.id} className={`cursor-pointer p-3 rounded-xl border bg-gray-50 hover:bg-gray-100 transition ${selected?.id === task.id ? "border-blue-500 bg-blue-50" : ""}`} onClick={() => setSelected(task)}>
              <h3 className="font-semibold text-base">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE DETAILS */}
      <div className="col-span-2">
        {!selected ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg">Select a work order to view details</div>
        ) : (
          <div className="p-6 rounded-2xl shadow-xl bg-white border">
            <h2 className="text-2xl font-bold mb-4">{selected.title}</h2>
            <p className="text-gray-700 mb-4">{selected.description}</p>

            <div className="grid grid-cols-2 gap-4 text-gray-800 mb-6">
              <div><p className="font-semibold">Machinery:</p><p>{selected.machinery}</p></div>
              <div><p className="font-semibold">Operator:</p><p>{selected.operator}</p></div>
              <div><p className="font-semibold">Status:</p><p>{selected.status}</p></div>
            </div>

            {/* Intelligent Status Update System */}
            <div className="flex gap-2">
              <button onClick={() => updateStatus(selected.id, "Pending")} className="px-4 py-2 rounded-xl bg-yellow-500 text-white">Mark Pending</button>
              <button onClick={() => updateStatus(selected.id, "In Progress")} className="px-4 py-2 rounded-xl bg-blue-600 text-white">Start</button>
              <button onClick={() => updateStatus(selected.id, "Completed")} className="px-4 py-2 rounded-xl bg-green-600 text-white">Complete</button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
