

// "use client";
// import { useState } from "react";
// import { 
//   Sprout, Leaf, Package,ChevronDown, TrendingUp,X,Menu,
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
//      {
//     label: "Pre-Season",
//     icon: Sprout,
//     color: "from-emerald-500 to-teal-600",
//     dropdown: [
//       { 
//         label: "Soil Management", 
//         link: "/soilManagement", 
//         desc: "Optimize soil health", 
//         icon: FlaskConical, // Soil testing & analysis
//       },
//     ],
//   },
//   {
//     label: "In-Season",
//     icon: Leaf,
//     color: "from-green-500 to-emerald-600",
//     dropdown: [
//       { 
//         label: "Crop Sowing", 
//         link: "/cropSowing", 
//         desc: "Track planting progress", 
//         icon: Wheat, // Sowing crops
//       },
//       { 
//         label: "Irrigation Management", 
//         link: "/irrigationManagement", 
//         desc: "Water optimization", 
//         icon: Droplets, // Water-related
//       },
//       { 
//         label: "Weather Forecasting", 
//         link: "/weatherForecasting", 
//         desc: "Real-time weather data", 
//         icon: CloudSun, // Weather symbol
//       },
//       { 
//         label: "Inventory Management", 
//         link: "/inventaryManagement", 
//         desc: "Resource tracking", 
//         icon: Boxes, // Inventory storage
//       },
//       { 
//         label: "Labor Management", 
//         link: "/laborManagement", 
//         desc: "Workforce planning", 
//         icon: Users, // Workforce icon
//       },
//     ],
//   },
//   {
//     label: "Harvest Season",
//     icon: Package,
//     color: "from-amber-500 to-orange-600",
//     dropdown: [
//       { 
//         label: "Farm Shipping", 
//         desc: "Logistics management", 
//         icon: Truck, // Transport & logistics
//       },
//       { 
//         label: "Packaging", 
//         desc: "Product preparation", 
//         icon: PackageCheck, // Packing icon
//       },
//       { 
//         label: "Warehouse Management", 
//         desc: "Storage solutions", 
//         icon: Warehouse, // Warehouse structure
//       },
//     ],
//   },
//   {
//     label: "Post-Harvest Season",
//     icon: TrendingUp,
//     color: "from-blue-500 to-indigo-600",
//     dropdown: [
//       { 
//         label: "Farm Insights", 
//         desc: "Analytics & reports", 
//         icon: BarChart3,
//       },
//       { 
//         label: "Contract Farming", 
//         desc: "Partnership management", 
//         icon: Handshake,
//       },
//       { 
//         label: "Farm.Ai", 
//         desc: "AI-powered insights", 
//         icon: Brain,
//       },
//       { 
//         label: "Settings", 
//         desc: "System configuration", 
//         icon: Settings,
//       },
//       { 
//         label: "Notifications", 
//         desc: "Alert management", 
//         icon: Bell,
//       },
//     ],
//   },
//   ];

//   return (
//     <header className="bg-[#f7f7f7] sticky top-0 z-50 shadow-sm border-b border-gray-100">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-1">
//         <Image
//           src="/logo2.jpg"
//           alt="Logo"
//           width={220} // you must provide width
//           height={20} // and height
//           className="object-contain"
//         />

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
//                       className={`transition-transform duration-200 ${open === idx ? 'rotate-180' : ''}`}
//                     />
//                   </button>

//                   {open === idx && (
//                     <div className="absolute left-0 top-full w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
//                       <div className={`h-1 bg-gradient-to-r ${item.color}`} />
//                       <div className="p-2">
//                         {item.dropdown.map((option, i) => (
//                           <a
//                             key={option.label || option}
//                             href={option.link || "#"}
//                             className="group/item flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200"
//                           >
//                             <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200`}>
//                               {item.icon && <option.icon size={16} className="text-white" />}
//                             </div>
//                             <div className="flex-1">
//                               <div className="font-medium text-gray-900 text-sm group-hover/item:text-green-600 transition-colors">
//                                 {option.label || option}
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

//         <button
//           className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           onClick={() => setMobileOpen(!mobileOpen)}
//         >
//           {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

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
//                         className={`transition-transform duration-200 ${activeMobile === idx ? 'rotate-180' : ''}`}
//                       />
//                     </button>

//                     {activeMobile === idx && (
//                       <div className="bg-gray-50 px-4 pb-2 animate-in slide-in-from-top duration-200">
//                         {item.dropdown.map((option, i) => (
//                           <a
//                             key={option.label || option}
//                             href={option.link || "#"}
//                             className="flex items-start gap-3 py-3 border-t border-gray-200 hover:text-green-600 transition-colors"
//                           >
//                             <div className="flex-1">
//                               <div className="text-sm font-medium text-gray-900">
//                                 {option.label || option}
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
  Sprout, Leaf, Package, ChevronDown, TrendingUp, X, Menu,
  Wheat, FlaskConical, Droplets, CloudSun, Boxes, Users, 
  Truck, PackageCheck, Warehouse, 
  BarChart3, Handshake, Brain, Settings, Bell 
} from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMobile, setActiveMobile] = useState(null);

  const menu = [
    { label: "Home", link: "/" },

    {
      label: "Pre-Season",
      icon: Sprout,
      color: "from-emerald-500 to-teal-600",
      dropdown: [
        { 
          label: "Soil Management", 
          link: "/soilManagement", 
          desc: "Optimize soil health", 
          icon: FlaskConical
        },
      ],
    },

    {
      label: "In-Season",
      icon: Leaf,
      color: "from-green-500 to-emerald-600",
      dropdown: [
        { label: "Crop Sowing", link: "/cropSowing", desc: "Track planting progress", icon: Wheat },
        { label: "Irrigation Management", link: "/irrigationManagement", desc: "Water optimization", icon: Droplets },
        { label: "Weather Forecasting", link: "/weatherForecasting", desc: "Real-time weather data", icon: CloudSun },
        { label: "Inventory Management", link: "/inventaryManagement", desc: "Resource tracking", icon: Boxes },
        { label: "Labor Management", link: "/laborManagement", desc: "Workforce planning", icon: Users },
      ],
    },

    {
      label: "Harvest Season",
      icon: Package,
      color: "from-amber-500 to-orange-600",
      dropdown: [
        { label: "Farm Shipping", desc: "Logistics management", icon: Truck },
        { label: "Packaging", desc: "Product preparation", icon: PackageCheck },
        { label: "Warehouse Management", desc: "Storage solutions", icon: Warehouse },
      ],
    },

    {
      label: "Post-Harvest Season",
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-600",
      dropdown: [
        { label: "Farm Insights", desc: "Analytics & reports", icon: BarChart3 },
        { label: "Contract Farming", desc: "Partnership management", icon: Handshake },
        { label: "Farm.Ai", desc: "AI-powered insights", icon: Brain },
        { label: "Settings", desc: "System configuration", icon: Settings },
        { label: "Notifications", desc: "Alert management", icon: Bell },
      ],
    },
  ];

  return (
    <header className="bg-[#f7f7f7] sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-1">
        
        <Image
          src="/logo2.jpg"
          alt="Logo"
          width={220}
          height={20}
          className="object-contain"
        />

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-1">
          {menu.map((item, idx) => (
            <div key={idx} className="relative">
              {item.dropdown ? (
                <div
                  className="group"
                  onMouseEnter={() => setOpen(idx)}
                  onMouseLeave={() => setOpen(null)}
                >
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-all">
                    {item.icon && <item.icon size={16} className="opacity-70" />}
                    <span>{item.label}</span>

                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${open === idx ? "rotate-180" : ""}`}
                    />
                  </button>

                  {open === idx && (
                    <div className="absolute left-0 top-full w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className={`h-1 bg-gradient-to-r ${item.color}`} />

                      <div className="p-2">
                        {item.dropdown.map((option, i) => (
                          <a
                            key={i}
                            href={option.link || "#"}
                            className="group/item flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all"
                          >
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                              <option.icon size={16} className="text-white" />
                            </div>

                            <div className="flex-1">
                              <div className="font-medium text-gray-900 text-sm group-hover/item:text-green-600">
                                {option.label}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {option.desc}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.link}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-all"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-100">
          <nav className="flex flex-col p-4 space-y-1">
            {menu.map((item, idx) => (
              <div key={idx}>
                {item.dropdown ? (
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm">

                    <button
                      className="flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                      onClick={() => setActiveMobile(activeMobile === idx ? null : idx)}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && (
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                            <item.icon size={16} className="text-white" />
                          </div>
                        )}
                        <span>{item.label}</span>
                      </div>

                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${activeMobile === idx ? "rotate-180" : ""}`}
                      />
                    </button>

                    {activeMobile === idx && (
                      <div className="bg-gray-50 px-4 pb-2 animate-in slide-in-from-top duration-200">
                        {item.dropdown.map((option, i) => (
                          <a
                            key={i}
                            href={option.link || "#"}
                            className="flex items-start gap-3 py-3 border-t border-gray-200 hover:text-green-600"
                          >
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">
                                {option.label}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {option.desc}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.link}
                    className="block px-4 py-3 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-50 shadow-sm"
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
