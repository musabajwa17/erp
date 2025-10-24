// "use client";
// import { useState } from "react";
// import { Menu, X, ChevronDown } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { label, li } from "framer-motion/client";
// export default function Header() {
//   const [open, setOpen] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activeMobile, setActiveMobile] = useState(null);

//   const menu = [
//     { label: "Home", link: "/" },
//     // {
//     //   label: "Solution",
//     //   dropdown: [
//     //     { label: "ESS Official", link: "https://escan-systems.com/our-services/" },
//     //     { label: "ESS Green Bot" },
//     //     { label: "ESS Farming Link" },
//     //   ],
//     // },
//     {
//       label: "Pre-Season",
//       dropdown: [
//         // { label: "Farm Mapping (GIS)" },
//         { label: "Soil Management", link: "/soilManagement" },
//       ],
//     },
//     {
//       label: "In-Season",
//       dropdown: [
//         { label: "Crop Sowing", link: "/cropSowing" },
//         {label:"Irrigation Management", link:"/irrigationManagement"},
//         {label:"Weather Forecasting", link:"/weatherForecasting"},
//         {label:"Inventory Management", link:"/inventaryManagement"},
//         {label:"Labor Management", link:"/laborManagement"},
//       ],
//     },
//     {
//       label: "Harvest",
//       dropdown: ["Farm Shipping", "Packaging", "Warehouse Management"],
//     },
//     {
//       label: "Post-Harvest",
//       dropdown: [
//         "Farm Insights",
//         "Contract Farming",
//         "Farm.Ai",
//         "Settings",
//         "Notifications",
//       ],
//     },
//   ];

//   return (
//     <header className="bg-[#f7f7f7] sticky top-0 z-50 shadow">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-1">
//         <Image
//           src="/logo2.jpg"
//           alt="Logo"
//           width={220} // you must provide width
//           height={20} // and height
//           className="object-contain"
//         />
//         <nav className="hidden md:flex gap-8">
//           {menu.map((item, idx) => (
//             <div key={idx} className="relative content-center">
//               {item.dropdown ? (
//                 <div
//                   className="flex items-center gap-1 text-sm font-medium cursor-pointer hover:text-green-700"
//                   onMouseEnter={() => setOpen(idx)}
//                   onMouseLeave={() => setOpen(null)}
//                 >
//                   <span className="opacity-80">{item.label}</span>
//                   <ChevronDown size={16} />

//                   <AnimatePresence>
//                     {open === idx && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ duration: 0.2 }}
//                         className="absolute left-0 top-full mt-2 min-w-[12rem] bg-white rounded-lg shadow-lg border"
//                       >
//                         {/* {item.dropdown.map((option, i) => (
//                           <a
//                             key={i}
//                             href="#"
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           >
//                             {option}
//                           </a>
//                         ))} */}
//                         {item.dropdown.map((option, i) => (
//                           <a
//                             key={option.label || option}
//                             href={option.link || "#"}
//                             className={`block px-4 py-2 text-xs text-gray-800 hover:text-green-700 hover:underline cursor-pointer ${
//                               i !== item.dropdown.length - 1 ? "border-b" : ""
//                             }`}
//                             tabIndex={0}
//                             // open in same tab, so no target or rel
//                           >
//                             {option.label || option}
//                           </a>
//                         ))}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ) : (
//                 <a
//                   href={item.link}
//                   className="text-sm font-medium hover:text-green-700 opacity-80"
//                 >
//                   {item.label}
//                 </a>
//               )}
//             </div>
//           ))}
//         </nav>
//         <button
//           className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//           onClick={() => setMobileOpen(!mobileOpen)}
//         >
//           {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-white border-t shadow-md overflow-hidden"
//           >
//             <nav className="flex flex-col p-4 space-y-2">
//               {menu.map((item, idx) => (
//                 <div key={idx}>
//                   {item.dropdown ? (
//                     <div>
//                       <button
//                         className="flex justify-between items-center w-full py-2 text-sm font-medium hover:text-green-700"
//                         onClick={() =>
//                           setActiveMobile(activeMobile === idx ? null : idx)
//                         }
//                       >
//                         {item.label}
//                         <motion.div
//                           animate={{
//                             rotate: activeMobile === idx ? 180 : 0,
//                           }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <ChevronDown size={16} />
//                         </motion.div>
//                       </button>

//                       <AnimatePresence>
//                         {activeMobile === idx && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="pl-4 flex flex-col space-y-1"
//                           >
//                             {item.dropdown.map((option, i) => (
//                               <a
//                                 key={option.label || option}
//                                 href={option.link || "#"}
//                                 className="block py-1 text-sm text-gray-700 hover:text-green-700"
//                                 target={option.link ? "_blank" : undefined}
//                                 rel={
//                                   option.link
//                                     ? "noopener noreferrer"
//                                     : undefined
//                                 }
//                               >
//                                 {option.label || option}
//                               </a>
//                             ))}
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   ) : (
//                     <a
//                       href={item.link}
//                       className="block text-sm font-medium hover:text-green-700"
//                     >
//                       {item.label}
//                     </a>
//                   )}
//                 </div>
//               ))}
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }


"use client";
import { useState } from "react";
import { 
  Sprout, Leaf, Package,ChevronDown, TrendingUp,X,Menu,
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
        icon: FlaskConical, // Soil testing & analysis
      },
    ],
  },
  {
    label: "In-Season",
    icon: Leaf,
    color: "from-green-500 to-emerald-600",
    dropdown: [
      { 
        label: "Crop Sowing", 
        link: "/cropSowing", 
        desc: "Track planting progress", 
        icon: Wheat, // Sowing crops
      },
      { 
        label: "Irrigation Management", 
        link: "/irrigationManagement", 
        desc: "Water optimization", 
        icon: Droplets, // Water-related
      },
      { 
        label: "Weather Forecasting", 
        link: "/weatherForecasting", 
        desc: "Real-time weather data", 
        icon: CloudSun, // Weather symbol
      },
      { 
        label: "Inventory Management", 
        link: "/inventaryManagement", 
        desc: "Resource tracking", 
        icon: Boxes, // Inventory storage
      },
      { 
        label: "Labor Management", 
        link: "/laborManagement", 
        desc: "Workforce planning", 
        icon: Users, // Workforce icon
      },
    ],
  },
  {
    label: "Harvest Season",
    icon: Package,
    color: "from-amber-500 to-orange-600",
    dropdown: [
      { 
        label: "Farm Shipping", 
        desc: "Logistics management", 
        icon: Truck, // Transport & logistics
      },
      { 
        label: "Packaging", 
        desc: "Product preparation", 
        icon: PackageCheck, // Packing icon
      },
      { 
        label: "Warehouse Management", 
        desc: "Storage solutions", 
        icon: Warehouse, // Warehouse structure
      },
    ],
  },
  {
    label: "Post-Harvest Season",
    icon: TrendingUp,
    color: "from-blue-500 to-indigo-600",
    dropdown: [
      { 
        label: "Farm Insights", 
        desc: "Analytics & reports", 
        icon: BarChart3,
      },
      { 
        label: "Contract Farming", 
        desc: "Partnership management", 
        icon: Handshake,
      },
      { 
        label: "Farm.Ai", 
        desc: "AI-powered insights", 
        icon: Brain,
      },
      { 
        label: "Settings", 
        desc: "System configuration", 
        icon: Settings,
      },
      { 
        label: "Notifications", 
        desc: "Alert management", 
        icon: Bell,
      },
    ],
  },
  ];

  return (
    <header className="bg-[#f7f7f7] sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-1">
        <Image
          src="/logo2.jpg"
          alt="Logo"
          width={220} // you must provide width
          height={20} // and height
          className="object-contain"
        />

        <nav className="hidden md:flex gap-1">
          {menu.map((item, idx) => (
            <div key={idx} className="relative">
              {item.dropdown ? (
                <div
                  className="group"
                  onMouseEnter={() => setOpen(idx)}
                  onMouseLeave={() => setOpen(null)}
                >
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-all duration-200">
                    {item.icon && <item.icon size={16} className="opacity-70" />}
                    <span>{item.label}</span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${open === idx ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {open === idx && (
                    <div className="absolute left-0 top-full w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className={`h-1 bg-gradient-to-r ${item.color}`} />
                      <div className="p-2">
                        {item.dropdown.map((option, i) => (
                          <a
                            key={option.label || option}
                            href={option.link || "#"}
                            className="group/item flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200"
                          >
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200`}>
                              {item.icon && <option.icon size={16} className="text-white" />}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 text-sm group-hover/item:text-green-600 transition-colors">
                                {option.label || option}
                              </div>
                              {option.desc && (
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {option.desc}
                                </div>
                              )}
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-all duration-200"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
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
                        className={`transition-transform duration-200 ${activeMobile === idx ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {activeMobile === idx && (
                      <div className="bg-gray-50 px-4 pb-2 animate-in slide-in-from-top duration-200">
                        {item.dropdown.map((option, i) => (
                          <a
                            key={option.label || option}
                            href={option.link || "#"}
                            className="flex items-start gap-3 py-3 border-t border-gray-200 hover:text-green-600 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">
                                {option.label || option}
                              </div>
                              {option.desc && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {option.desc}
                                </div>
                              )}
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