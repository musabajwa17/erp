import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Lock,
  MapPin,
  Droplet,
  FileText,
  Users,
  Cloud,
  Layers,
  Bug,
  Package,
  TrendingUp,
  BarChart3,
  Shield,
  MessageSquare,
  User,
  Settings,
  LogOut,
  AreaChartIcon,
  LandPlot,
} from "lucide-react";
import Image from "next/image";
// dashboard content components
import dynamic from "next/dynamic";

// Leaflet map must only render on client
const FieldMapping = dynamic(
  () => import("@/components/dashboard/FieldMapping"),
  { ssr: false }
);
import Content from "../dashboard/Content";
import SoilHealth from "../dashboard/SoilHealth";
import ContractMapping from "../dashboard/ContractMapping";
import IrrigationManagement from "../dashboard/IrrigationManagement";
import Labormanagement from "../dashboard/Labormanagement";
import InventaryManagement from "../dashboard/InventaryManagement";
import WeatherForecast from "../dashboard/WeatherForecast";
import CropSowing from "../dashboard/CropSowing";
import PestManagement from "../dashboard/PestManagement";
import LandPreparation from "../dashboard/LandPreparation"
import Link from "next/link";
import Harvestschedule from "../dashboard/harvestschedule";
import Shippingandlogistics from "../dashboard/shippingandlogistics";
import FarmAnalyticsDashboard from "../dashboard/FarmAnalyticsDashboard";
import Fields from "../dashboard/Fields"
export default function Sidebar() {
  const [openStage, setOpenStage] = useState("Stage 1 (Pre-Season)");
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const userEmail = "musabajwa17@gmail.com";

  const stages = [
    {
      name: "Stage 1 (Pre-Season)",
      icon: MapPin,
      color: "emerald",
      items: [
        { name: "Field Mapping", icon: Layers },
        { name: "My Fields", icon: MapPin },
        { name: "Land Preparation", icon: AreaChartIcon },
        { name: "Soil Health", icon: Droplet },
        { name: "Contract Mapping", icon: FileText },
      ],
      
    },
    {
      name: "Stage 2 (In-Season)",
      icon: Cloud,
      color: "blue",
      items: [
        { name: "Irrigation Management", icon: Droplet },
        { name: "Labor Management", icon: Users },
        { name: "Weather Forecast", icon: Cloud },
        { name: "Crop Management", icon: Layers },
        { name: "Inventory Management", icon: Package },
        { name: "Pest Monitoring", icon: Bug },
      ],
    },
    {
      name: "Stage 3 (Harvest Season)",
      icon: TrendingUp,
      color: "amber",
      items: [
        { name: "Harvest Scheduling", icon: TrendingUp },
        { name: "Shipping and Logistics", icon: Package }
      ],
      // locked: true,
    },
    {
      name: "Stage 4 (Post Harvest)",
      icon: BarChart3,
      color: "purple",
      items: [
        { name: "Farm Analytics Dashboard", icon: BarChart3 },
      ],
      // locked: true,
    },
    {
      name: "GreenBot.AI",
      icon: MessageSquare,
      color: "teal",
      items: [{ name: "Chat with GreenBot", icon: MessageSquare }],
      // locked: true,
    },
  ];

  return (
    <div className="flex w-full items-start h-screen overflow-hidden">
      <aside className="w-80 h-full self-start bg-gradient-to-br from-slate-50 via-white to-slate-50 shadow-2xl flex flex-col overflow-hidden border-r border-slate-200/60">
        {/* Logo Section */}
        <div className="px-8 py-3 border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
          <div className=" gap-3">
            <div className="text-2xl font-bold tracking-wide">
              <Image src="/erplogo.png" alt="ERP Logo" width={220} height={50} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
          <div className="space-y-2">
            {stages.map((stage, index) => {
              const StageIcon = stage.icon;
              const isOpen = openStage === stage.name;
              const isLocked = stage.locked;

              return (
                <div key={index} className="mb-1">
                  {/* Stage Header */}
                  <button
                    onMouseEnter={() => {
                      if (!isLocked) {
                        setOpenStage(isOpen ? null : stage.name);
                      }
                    }}
                    disabled={isLocked}
                    className={`group w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${isLocked
                      ? "opacity-50 cursor-not-allowed bg-slate-100"
                      : isOpen
                        ? "bg-gradient-to-r from-emerald-50 to-teal-50 shadow-md border border-emerald-200/50"
                        : "hover:bg-slate-100/80 hover:shadow-sm"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 ${isLocked
                          ? "bg-slate-200"
                          : isOpen
                            ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30"
                            : "bg-slate-200 group-hover:bg-emerald-100"
                          }`}
                      >
                        <StageIcon
                          className={`w-4 h-4 ${isLocked
                            ? "text-slate-400"
                            : isOpen
                              ? "text-white"
                              : "text-slate-600 group-hover:text-emerald-600"
                            }`}
                        />
                      </div>
                      <span
                        className={`text-left ${isLocked ? "text-slate-400" : "text-slate-700"
                          }`}
                      >
                        {stage.name}
                      </span>
                    </div>

                    {isLocked ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-normal">
                          Coming Soon
                        </span>
                        <Lock className="w-4 h-4 text-slate-400" />
                      </div>
                    ) : (
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </button>

                  {/* Stage Items */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="ml-4 pl-4 border-l-2 border-slate-200 space-y-1">
                      {stage.items.map((item, i) => {
                        const ItemIcon = item.icon;
                        const isSelected = selected === item.name;

                        return (
                          <button
                            key={i}
                            onClick={() => setSelected(item.name)}
                            className={`group w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${isSelected
                              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 font-medium"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                              }`}
                          >
                            <ItemIcon
                              className={`w-4 h-4 transition-all duration-200 ${isSelected
                                ? "text-white"
                                : "text-slate-400 group-hover:text-emerald-500"
                                }`}
                            />
                            <span>{item.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200/60 px-6 py-4 bg-white/80 backdrop-blur-sm">
          {/* <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
            <span className="text-emerald-600 font-semibold text-sm">M</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-700 truncate">
              Musab Ajwa
            </p>
            <p className="text-xs text-slate-500">Active Account</p>
          </div>
        </div> */}
          <p className="text-xs text-center text-slate-400">
            © {new Date().getFullYear()} CropERP. All rights reserved.
          </p>
        </div>

        <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
      </aside>

      {/* Main area: header + content */}
      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10">
          {/* Dynamic page header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  {/* dynamic icon */}
                  {(() => {
                    const map = {
                      Dashboard: Layers,
                      "My Fields": MapPin,
                      "Field Mapping": Layers,
                      "Soil Health": Droplet,
                      "Contract Mapping": FileText,
                      "Irrigation Management": Droplet,
                      "Labor Management": Users,
                      "Weather Forecast": Cloud,
                      "Crop Management": Layers,
                      "Inventory Management": FileText,
                      "Pest Monitoring": Bug,
                      "Land Preparation": LandPlot,
                    };

                    const key = selected || "Dashboard";
                    const Icon = map[key] || Layers;
                    return <Icon className="w-6 h-6 text-white" />;
                  })()}
                </div>
                <div>
                  {/* dynamic title and description */}
                  {(() => {
                    const map = {
                      Dashboard: ["Dashboard", "Overview and quick insights"],
                      "My Fields": ["My Fields", "View and manage your fields"],
                      "Field Mapping": ["Field Mapping", "Draw and manage your agricultural fields"],
                      "Soil Health": ["Soil Health", "Monitor soil properties and reports"],
                      "Contract Mapping": ["Contract Mapping", "Manage contracts and assignments"],
                      "Irrigation Management": ["Irrigation Management", "Manage irrigation schedules and devices"],
                      "Labor Management": ["Labor Management", "Assign and track labor tasks"],
                      "Weather Forecast": ["Weather Forecast", "Latest weather predictions for your area"],
                      "Crop Management": ["Crop Management", "Plan and track sowing activities"],
                      "Inventory Management": ["Inventory Management", "Track inventory and supplies"],
                      "Pest Monitoring": ["Pest Monitoring", "Monitor pests and interventions"],
                      "Land Preparation": ["Land Preparation", "Prepare your Land with digital tech"],
                    };

                    const key = selected || "Dashboard";
                    const [title, desc] = map[key] || map["Dashboard"];
                    return (
                      <>
                        <h1 className="text-2xl font-bold text-white">{title}</h1>
                        <p className="text-emerald-50 text-sm">{desc}</p>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* profile / dropdown (bg white) */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 bg-white text-green-900 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                  <User size={18} />
                  <span className="text-sm">{userEmail}</span>
                  <ChevronDown size={16} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2  w-52 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-[9999]">
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      <User size={16} /> Profile
                    </button>
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Settings size={16} /> Settings
                    </button>
                    <Link
                      href={"/login"}
                      className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                      onClick={() => {
                        try {
                          if (typeof window !== "undefined") {
                            localStorage.removeItem("access");
                            localStorage.removeItem("refresh");
                          }
                        } catch (e) {
                          console.error("Error clearing auth tokens:", e);
                        }
                        setMenuOpen(false);
                        // router.replace("/login");
                      }}
                    >
                      <LogOut size={16} /> Sign Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white w-full h-[90vh] overflow-auto">
            {/* render selected content */}
            {(() => {
              switch (selected) {
                case "My Fields":
                  return <Fields />;
                case "Field Mapping":
                  return <FieldMapping />;
                case "Soil Health":
                  return <SoilHealth />;
                case "Contract Mapping":
                  return <ContractMapping />;
                case "Irrigation Management":
                  return <IrrigationManagement />;
                case "Labor Management":
                  return <Labormanagement />;
                case "Weather Forecast":
                  return <WeatherForecast />;
                case "Crop Management":
                  return <CropSowing />;
                case "Inventory Management":
                  return <InventaryManagement />;
                case "Pest Monitoring":
                return <PestManagement />;
                case "Harvest Scheduling":
                  return <Harvestschedule />
                case "Shipping and Logistics":
                  return <Shippingandlogistics />
                case "Farm Analytics Dashboard":
                  return <FarmAnalyticsDashboard/>
                case "Land Preparation":
                  return <LandPreparation />
                default:
                  return <Content />;
              }
            })()}
          </div>
        </div>
      </main>
    </div>
  );
}
