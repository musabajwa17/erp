// "use client";
// import { useState } from "react";
// import {
//   Sprout, Leaf, Package, ChevronDown, TrendingUp, X, Menu,
//   Wheat, FlaskConical, Droplets, CloudSun, Boxes, Users,
//   Truck, PackageCheck, Warehouse,
//   BarChart3, Handshake, Brain, Settings, Bell
// } from "lucide-react";
// import Image from "next/image";

// export default function Header() {
//   const [open, setOpen] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activeMobile, setActiveMobile] = useState(null);

//   const menu = [
//     { label: "Home", link: "/" },

//     {
//       label: "Pre-Season",
//       icon: Sprout,
//       color: "from-emerald-500 to-teal-600",
//       dropdown: [
//         {
//           label: "Soil Management",
//           link: "/soilManagement",
//           desc: "Optimize soil health",
//           icon: FlaskConical,
//         },
//       ],
//     },

//     {
//       label: "In-Season",
//       icon: Leaf,
//       color: "from-green-500 to-emerald-600",
//       dropdown: [
//         { label: "Crop Sowing", link: "/cropSowing", desc: "Track planting progress", icon: Wheat },
//         { label: "Irrigation Management", link: "/irrigationManagement", desc: "Water optimization", icon: Droplets },
//         { label: "Weather Forecasting", link: "/weatherForecasting", desc: "Real-time weather data", icon: CloudSun },
//         { label: "Inventory Management", link: "/inventaryManagement", desc: "Resource tracking", icon: Boxes },
//         { label: "Labor Management", link: "/laborManagement", desc: "Workforce planning", icon: Users },
//       ],
//     },

//     {
//       label: "Harvest Season",
//       icon: Package,
//       color: "from-amber-500 to-orange-600",
//       dropdown: [
//         { label: "Farm Shipping", desc: "Logistics management", icon: Truck },
//         { label: "Packaging", desc: "Product preparation", icon: PackageCheck },
//         { label: "Warehouse Management", desc: "Storage solutions", icon: Warehouse },
//       ],
//     },

//     {
//       label: "Post-Harvest Season",
//       icon: TrendingUp,
//       color: "from-blue-500 to-indigo-600",
//       dropdown: [
//         { label: "Farm Insights", desc: "Analytics & reports", icon: BarChart3 },
//         { label: "Contract Farming", desc: "Partnership management", icon: Handshake },
//         { label: "Farm.Ai", desc: "AI-powered insights", icon: Brain },
//         { label: "Settings", desc: "System configuration", icon: Settings },
//         { label: "Notifications", desc: "Alert management", icon: Bell },
//       ],
//     },
//   ];

//   return (
//     <header className="bg-[#f7f7f7] sticky top-0 z-50 shadow-sm border-b border-gray-100">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-1">

//         <Image
//           src="/logo2.jpg"
//           alt="Logo"
//           width={220}
//           height={20}
//           className="object-contain"
//         />

//         {/* DESKTOP MENU */}
//         <nav className="hidden md:flex gap-1">
//           {menu.map((item, idx) => (
//             <div key={idx} className="relative">

//               {item.dropdown ? (
//                 <div
//                   className="group"
//                   onMouseEnter={() => setOpen(idx)}
//                   onMouseLeave={() => setOpen(null)}
//                 >
//                   <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-all duration-200">
//                     {item.icon && <item.icon size={16} className="opacity-70" />}
//                     <span>{item.label}</span>

//                     <ChevronDown
//                       size={16}
//                       className={`transition-transform duration-200 ${open === idx ? "rotate-180" : ""}`}
//                     />
//                   </button>

//                   {open === idx && (
//                     <div className="absolute left-0 top-full w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

//                       <div className={`h-1 bg-gradient-to-r ${item.color}`} />

//                       <div className="p-2">
//                         {item.dropdown.map((option, i) => (
//                           <a
//                             key={option.label}
//                             href={option.link || "#"}
//                             className="group/item flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200"
//                           >
//                             <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center group-hover/item:scale-110 transition-transform`}>
//                               {option.icon && <option.icon size={16} className="text-white" />}
//                             </div>

//                             <div className="flex-1">
//                               <div className="font-medium text-gray-900 text-sm group-hover/item:text-green-600 transition-colors">
//                                 {option.label}
//                               </div>

//                               {option.desc && (
//                                 <div className="text-xs text-gray-500 mt-0.5">
//                                   {option.desc}
//                                 </div>
//                               )}
//                             </div>
//                           </a>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <a
//                   href={item.link}
//                   className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-all duration-200"
//                 >
//                   {item.label}
//                 </a>
//               )}

//             </div>
//           ))}
//         </nav>

//         {/* MOBILE MENU BUTTON */}
//         <button
//           className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           onClick={() => setMobileOpen(!mobileOpen)}
//         >
//           {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* MOBILE MENU DROPDOWN */}
//       {mobileOpen && (
//         <div className="md:hidden bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top duration-300">
//           <nav className="flex flex-col p-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">

//             {menu.map((item, idx) => (
//               <div key={idx}>
//                 {item.dropdown ? (
//                   <div className="bg-white rounded-lg overflow-hidden shadow-sm">

//                     <button
//                       className="flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
//                       onClick={() => setActiveMobile(activeMobile === idx ? null : idx)}
//                     >
//                       <div className="flex items-center gap-2">
//                         {item.icon && (
//                           <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
//                             <item.icon size={16} className="text-white" />
//                           </div>
//                         )}
//                         <span>{item.label}</span>
//                       </div>

//                       <ChevronDown
//                         size={16}
//                         className={`transition-transform duration-200 ${activeMobile === idx ? "rotate-180" : ""}`}
//                       />
//                     </button>

//                     {activeMobile === idx && (
//                       <div className="bg-gray-50 px-4 pb-2 animate-in slide-in-from-top duration-200">
//                         {item.dropdown.map((option, i) => (
//                           <a
//                             key={option.label}
//                             href={option.link || "#"}
//                             className="flex items-start gap-3 py-3 border-t border-gray-200 hover:text-green-600 transition-colors"
//                           >
//                             <div className="flex-1">
//                               <div className="text-sm font-medium text-gray-900">
//                                 {option.label}
//                               </div>

//                               {option.desc && (
//                                 <div className="text-xs text-gray-500 mt-1">
//                                   {option.desc}
//                                 </div>
//                               )}
//                             </div>
//                           </a>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <a
//                     href={item.link}
//                     className="block px-4 py-3 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-50 shadow-sm"
//                   >
//                     {item.label}
//                   </a>
//                 )}
//               </div>
//             ))}

//           </nav>
//         </div>
//       )}

//     </header>
//   );
// }

"use client";
import { useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  BarChart2,
  Package,
  TrendingUp,
  Calendar,
  Truck,
  MapPin,
  Map,
  Leaf,
  Clipboard,
  Droplets,
  Users,
  CloudSun,
  Sprout,
  Archive,
  Bug,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(null);
  const [subOpen, setSubOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMobile, setActiveMobile] = useState(null);
  const [subActiveMobile, setSubActiveMobile] = useState(null);
  const router = useRouter();

  const menu = [
    { label: "Home", link: "/" },
    {
      label: "Solutions",
      icon: Leaf,
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      dropdown: [
        {
          label: "Pre-Season",
          icon: Sprout,
          color: "emerald",
          gradient: "from-emerald-400 to-teal-500",
          dropdown: [
            { label: "Field Mapping", link: "#", icon: Map }, // 🗺 → Map
            { label: "My Fields", link: "#", icon: MapPin }, // 🌾 → MapPin (location/plot)
            { label: "Soil Health", link: "#", icon: Leaf }, // 🌱 → Leaf
            { label: "Contract Mapping", link: "#", icon: Clipboard },
          ],
        },
        {
          label: "In-Season",
          icon: Leaf,
          color: "green",
          gradient: "from-green-400 to-emerald-600",
          dropdown: [
            { label: "Irrigation Management", link: "#", icon: Droplets }, // 💧 → Droplets
            { label: "Labor Management", link: "#", icon: Users }, // 👥 → Users
            { label: "Weather Forecast", link: "#", icon: CloudSun }, // 🌤 → CloudSun
            { label: "Crop Management", link: "#", icon: Sprout }, // 🌿 → Sprout
            { label: "Inventory Management", link: "#", icon: Archive }, // 📦 → Archive
            { label: "Pest Monitoring", link: "#", icon: Bug },
          ],
        },
        {
          label: "Harvest Season",
          icon: Package,
          color: "amber",
          gradient: "from-amber-400 to-orange-500",
          dropdown: [
            { label: "Harvest Scheduling", link: "#", icon: Calendar }, // 📅 → Calendar
            { label: "Shipping and Logistics", link: "#", icon: Truck },
          ],
        },
        {
          label: "Post-Harvest",
          icon: TrendingUp,
          color: "blue",
          gradient: "from-blue-400 to-indigo-500",
          dropdown: [
            { label: "Farm Analytics Dashboard", link: "#", icon: BarChart2 },
          ],
        },
      ],
    },
  ];

  const handleLogin = () => router.push("/login");
  const handleRegister = () => router.push("/register");

  return (
    <header className="bg-[#f7f7f7] sticky top-0 z-50 shadow-lg border-b-2 border-green-200">
      <div className="mx-10 flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3">
        {/* Logo */}
        {/* <div className="w-[250px] flex py-1"> */}
        <Image
          src="/logo2.jpg"
          alt="Logo"
          width={220}
          height={20}
          className="object-contain"
        />
        {/* </div> */}

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2">
          {menu.map((item, idx) => (
            <div key={idx} className="relative group">
              {item.dropdown ? (
                <div>
                  {/* Main button */}
                  <button
                    onClick={() => setOpen(open === idx ? null : idx)}
                    className="cursor-pointer flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-green-800 bg-transparent hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-300"
                  >
                    {item.icon && (
                      <item.icon size={18} className="text-green-600" />
                    )}
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 text-green-600 ${
                        open === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Level 1 Dropdown */}
                  {open === idx && (
                    <div className="absolute left-0 top-full mt-2 w-72 bg-white border-2 border-green-200 rounded-2xl shadow-2xl p-3 animate-in fade-in slide-in-from-top-4 duration-300">
                      <div
                        className={`h-2 bg-gradient-to-r ${item.gradient} rounded-t-xl mb-3`}
                      ></div>

                      {item.dropdown.map((option, i) => (
                        <div
                          key={i}
                          className="relative mb-1"
                          onClick={() => setSubOpen(subOpen === i ? null : i)}
                        >
                          <a
                            href={option.link || "#"}
                            className={`flex justify-between items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group/item bg-gradient-to-r from-${option.color}-50 to-white hover:from-${option.color}-100 hover:to-${option.color}-50 border border-${option.color}-200 hover:border-${option.color}-300 shadow-sm hover:shadow-md`}
                          >
                            <div className="flex items-center gap-3">
                              {option.icon && (
                                <div
                                  className={`w-9 h-9 bg-gradient-to-br ${option.gradient} rounded-lg flex items-center justify-center shadow-md group-hover/item:scale-110 transition-transform duration-300`}
                                >
                                  <option.icon size={18} className="text-white" />
                                </div>
                              )}
                              <span
                                className={`text-${option.color}-900 group-hover/item:text-${option.color}-700`}
                              >
                                {option.label}
                              </span>
                            </div>
                            {option.dropdown && (
                              <ChevronDown
                                size={16}
                                className="-rotate-90 opacity-70"
                              />
                            )}
                          </a>

                          {/* Level 2 Dropdown */}
                          {option.dropdown && subOpen === i && (
                            <div className="absolute left-[-280px] top-0 ml-2 w-64 bg-white border-2 border-green-200 rounded-xl shadow-2xl p-2 animate-in fade-in slide-in-from-left-4 duration-300">
                              <div
                                className={`h-1.5 bg-gradient-to-r ${option.gradient} rounded-t-lg mb-2`}
                              ></div>
                                {option.dropdown.map((sub, j) => (
                                <a
                                  key={j}
                                  href={sub.link || "#"}
                                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 rounded-lg transition-all duration-300 group/sub border border-transparent hover:border-green-200"
                                >
                                  {sub.icon && <sub.icon size={16} className="text-green-700" />}
                                  <span className="font-medium group-hover/sub:text-green-700">{sub.label}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.link}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-green-800 bg-transparent hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-300"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}

          {/* Buttons */}
          <button
            onClick={handleLogin}
            className="group cursor-pointer relative px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span>Login</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:animate-pulse" />
          </button>
          <button
            onClick={handleRegister}
            className="group cursor-pointer relative px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span>Sign Up</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:animate-pulse" />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2.5 rounded-xl bg-white border-2 border-green-200 hover:bg-green-50 transition-all duration-300 shadow-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X size={24} className="text-green-700" />
          ) : (
            <Menu size={24} className="text-green-700" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-gradient-to-b from-green-50 to-emerald-50 border-t-2 border-green-200">
          <nav className="flex flex-col p-4 space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto">
            {menu.map((item, idx) => (
              <div key={idx}>
                {item.dropdown ? (
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-green-200 mb-2">
                    <button
                      className="flex justify-between items-center w-full px-4 py-4 text-sm font-bold text-green-800 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300"
                      onClick={() =>
                        setActiveMobile(activeMobile === idx ? null : idx)
                      }
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && (
                          <div
                            className={`w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-md`}
                          >
                            <item.icon size={20} className="text-white" />
                          </div>
                        )}
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 text-green-600 ${
                          activeMobile === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeMobile === idx && (
                      <div className="bg-gradient-to-b from-green-50 to-white px-3 pb-3">
                        {item.dropdown.map((option, i) => (
                          <div key={i} className="mt-2">
                            {option.dropdown ? (
                              <div className="bg-white rounded-xl overflow-hidden border border-green-200 shadow-sm">
                                <button
                                  className="flex justify-between items-center w-full py-3 px-4 text-sm font-semibold text-gray-800 hover:bg-green-50 transition-all duration-300"
                                  onClick={() =>
                                    setSubActiveMobile(
                                      subActiveMobile === i ? null : i
                                    )
                                  }
                                >
                                  <div className="flex items-center gap-2">
                                    {option.icon && (
                                      <div
                                        className={`w-8 h-8 bg-gradient-to-br ${option.gradient} rounded-lg flex items-center justify-center shadow-sm`}
                                      >
                                        {typeof option.icon === "string" ? (
                                          <span className="text-white">
                                            {option.icon}
                                          </span>
                                        ) : (
                                          <option.icon
                                            size={16}
                                            className="text-white"
                                          />
                                        )}
                                      </div>
                                    )}
                                    {option.label}
                                  </div>
                                  <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 text-green-600 ${
                                      subActiveMobile === i ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>

                                {subActiveMobile === i && (
                                  <div className="bg-gradient-to-b from-green-50 to-white px-3 pb-2 border-t border-green-100">
                                    {option.dropdown.map((sub, j) => (
                                      <a
                                        key={j}
                                        href={sub.link || "#"}
                                        className="flex items-center gap-3 py-2.5 px-3 mt-2 text-sm text-gray-700 hover:text-green-700 bg-white hover:bg-green-50 rounded-lg transition-all duration-300 border border-green-100 hover:border-green-300"
                                      >
                                        <span className="text-lg">
                                          {sub.icon}
                                        </span>
                                        <span className="font-medium">
                                          {sub.label}
                                        </span>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <a
                                href={option.link || "#"}
                                className="block py-3 px-4 text-sm font-medium text-gray-800 bg-white hover:bg-green-50 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-300"
                              >
                                {option.label}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.link}
                    className="block px-4 py-4 text-sm font-bold text-green-800 bg-white rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 shadow-lg border-2 border-green-200 transition-all duration-300"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
