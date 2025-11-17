// "use client";
// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useImperativeHandle,
//   forwardRef
// } from "react";
// import "leaflet/dist/leaflet.css";
// import "leaflet-draw/dist/leaflet.draw.css";
// import {
//   GoogleMap,
//   DrawingManager,
//   useJsApiLoader,
//   Marker,
// } from "@react-google-maps/api";
// import { FaSquare, FaDrawPolygon, FaHandPaper, FaEdit } from "react-icons/fa";
// import {
//   FileText,
//   Copy,
//   Check,
//   MapPin,
//   Layers,
//   Save,
//   Trash2,
//   Lock,
// } from "lucide-react";
// // import Sidebar from "../../../components/sidebar/Sidebar";
// import ProtectedPage from "../contact/ProtectedPage/AuthorizedPage";

// const libraries = ["drawing", "geometry"];
// const containerStyle = { width: "100%", height: "100%", minHeight: "400px" };
// const initialCenter = { lat: 30.157, lng: 71.5249 };

// function km2ToHectares(km2) {
//   return km2 * 100;
// }
// function km2ToAcres(km2) {
//   return km2 * 247.105;
// }
// function getDistance(lat1, lng1, lat2, lng2) {
//   const R = 6371;
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLng = ((lng2 - lng1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLng / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }
// function generateFarmId(coords) {
//   if (!Array.isArray(coords) || coords.length === 0) return `F-${Date.now()}`;
//   const lat = coords[0].lat.toFixed(2);
//   const lng = coords[0].lng.toFixed(2);
//   const ts = Date.now().toString().slice(-4);
//   return `F-${lat.replace(".", "")}${lng.replace(".", "")}${ts}`;
// }

// function decodeJwt(token) {
//   if (!token || typeof window === "undefined") return null;
//   try {
//     const parts = token.split(".");
//     if (parts.length < 2) return null;
//     const payload = parts[1];
//     const b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
//     const json = decodeURIComponent(
//       atob(b64)
//         .split("")
//         .map(function (c) {
//           return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//         })
//         .join("")
//     );
//     return JSON.parse(json);
//   } catch (e) {
//     console.warn("Failed to decode JWT", e);
//     return null;
//   }
// }

// const FieldMapping = forwardRef(({ onAreaData, searchLocation }, ref) => {
//   const [loading, setLoading] = useState(false);
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
//     libraries,
//   });

//   const [areaInfo, setAreaInfo] = useState(null);
//   const [selectedTool, setSelectedTool] = useState("hand");
//   const [areaUnit, setAreaUnit] = useState("ac");
//   const [drawingManager, setDrawingManager] = useState(null);
//   const [mapCenter, setMapCenter] = useState(initialCenter);
//   const [searchMarker, setSearchMarker] = useState(null);
//   const mapRef = useRef(null);
//   const [lineLengthKm, setLineLengthKm] = useState(null);
//   const [shapeDate, setShapeDate] = useState(null);
//   const [kmlCoordinates, setKmlCoordinates] = useState(null);
//   const [selectedShape, setSelectedShape] = useState(null);
//   const [forms, setForms] = useState([]);
//   const kmlInputRef = useRef();

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     try {
//       const saved = localStorage.getItem("mapAreaInfo");
//       if (saved) setAreaInfo(JSON.parse(saved));
//     } catch (e) {
//       console.warn("Invalid mapAreaInfo in localStorage", e);
//     }
//     const savedUnit = localStorage.getItem("areaUnit");
//     if (savedUnit) setAreaUnit(savedUnit);
//   }, []);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     if (areaInfo) localStorage.setItem("mapAreaInfo", JSON.stringify(areaInfo));
//     else localStorage.removeItem("mapAreaInfo");
//   }, [areaInfo]);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     if (areaUnit) localStorage.setItem("areaUnit", areaUnit);
//   }, [areaUnit]);

//   const metersToLat = (meters) => meters / 111320;
//   const metersToLng = (meters, latitude) =>
//     meters / (111320 * Math.cos((latitude * Math.PI) / 180));

//   useEffect(() => {
//     if (searchLocation && mapRef.current) {
//       const { lat, lng } = searchLocation;
//       const newCenter = { lat, lng };
//       setMapCenter(newCenter);
//       setSearchMarker({
//         position: newCenter,
//         title: searchLocation.address || "Searched location",
//       });
//       mapRef.current.panTo(newCenter);
//       mapRef.current.setZoom(15);
//     }
//   }, [searchLocation]);

//   const onLoad = (map) => {
//     mapRef.current = map;
//     if (
//       areaInfo &&
//       Array.isArray(areaInfo.coordinates) &&
//       areaInfo.coordinates.length &&
//       isLoaded &&
//       typeof window !== "undefined"
//     ) {
//       try {
//         const bounds = new window.google.maps.LatLngBounds();
//         areaInfo.coordinates.forEach((c) => bounds.extend(c));
//         map.fitBounds(bounds);
//       } catch (e) {}
//     }
//   };

//   const onDrawingManagerLoad = (manager) => {
//     setDrawingManager(manager);
//   };

//   const handleToolChange = (tool) => {
//     setSelectedTool(tool);
//     if (!drawingManager || !isLoaded || typeof window === "undefined") return;
//     drawingManager.setDrawingMode(null);
//     if (tool === "rectangle")
//       drawingManager.setDrawingMode(
//         window.google.maps.drawing.OverlayType.RECTANGLE
//       );
//     else if (tool === "polygon")
//       drawingManager.setDrawingMode(
//         window.google.maps.drawing.OverlayType.POLYGON
//       );
//     else drawingManager.setDrawingMode(null);
//   };

//   const updatePolygonDetails = (polygon) => {
//     if (!isLoaded || typeof window === "undefined") return;
//     const path = polygon.getPath();
//     const coords = [];
//     for (let i = 0; i < path.getLength(); i++) {
//       const pt = path.getAt(i);
//       coords.push({ lat: pt.lat(), lng: pt.lng() });
//     }
//     const areaM2 = window.google.maps.geometry.spherical.computeArea(path);
//     const areaKm2 = areaM2 / 1_000_000;
//     let minLat = 90,
//       maxLat = -90,
//       minLng = 180,
//       maxLng = -180;
//     coords.forEach((p) => {
//       minLat = Math.min(minLat, p.lat);
//       maxLat = Math.max(maxLat, p.lat);
//       minLng = Math.min(minLng, p.lng);
//       maxLng = Math.max(maxLng, p.lng);
//     });
//     const approxWidth = getDistance(minLat, minLng, minLat, maxLng);
//     const approxHeight = getDistance(minLat, minLng, maxLat, minLng);
//     const farmId = generateFarmId(coords);

//     const data = {
//       type: "polygon",
//       coordinates: coords,
//       areaKm2,
//       areaHectares: km2ToHectares(areaKm2).toFixed(2),
//       areaAcres: km2ToAcres(areaKm2).toFixed(2),
//       width: approxWidth.toFixed(2),
//       height: approxHeight.toFixed(2),
//       farmId,
//     };
//     setAreaInfo(data);
//     if (onAreaData) onAreaData(data);
//     localStorage.setItem("mapAreaInfo", JSON.stringify(data));
//     placeDevicesInArea(coords, 1000);
//   };

//   const updateRectangleDetails = (rectangle) => {
//     if (!isLoaded || typeof window === "undefined") return;
//     const bounds = rectangle.getBounds();
//     const ne = bounds.getNorthEast();
//     const sw = bounds.getSouthWest();
//     const width = getDistance(sw.lat(), sw.lng(), sw.lat(), ne.lng());
//     const height = getDistance(sw.lat(), sw.lng(), ne.lat(), sw.lng());
//     const areaKm2 = width * height;
//     const coords = [
//       { lat: sw.lat(), lng: sw.lng() },
//       { lat: ne.lat(), lng: ne.lng() },
//     ];
//     const farmId = generateFarmId(coords);
//     const data = {
//       type: "rectangle",
//       width: width.toFixed(2),
//       height: height.toFixed(2),
//       areaKm2,
//       areaHectares: km2ToHectares(areaKm2).toFixed(2),
//       areaAcres: km2ToAcres(areaKm2).toFixed(2),
//       coordinates: coords,
//       farmId,
//     };
//     setAreaInfo(data);
//     if (onAreaData) onAreaData(data);
//     localStorage.setItem("mapAreaInfo", JSON.stringify(data));
//     placeDevicesInArea(
//       [
//         { lat: sw.lat(), lng: sw.lng() },
//         { lat: sw.lat(), lng: ne.lng() },
//         { lat: ne.lat(), lng: ne.lng() },
//         { lat: ne.lat(), lng: sw.lng() },
//       ],
//       1000
//     );
//   };

//   const handleRectangleComplete = (rectangle) => {
//     if (!isLoaded || typeof window === "undefined") return;
//     updateRectangleDetails(rectangle);
//     setSelectedShape(rectangle);
//     rectangle.addListener("click", () => {
//       if (selectedShape && selectedShape.setEditable)
//         selectedShape.setEditable(false);
//       setSelectedShape(rectangle);
//     });
//     rectangle.addListener("bounds_changed", () =>
//       updateRectangleDetails(rectangle)
//     );
//     rectangle.setEditable(false);
//   };

//   const handlePolygonComplete = (polygon) => {
//     if (!isLoaded || typeof window === "undefined") return;
//     updatePolygonDetails(polygon);
//     setSelectedShape(polygon);
//     polygon.addListener("click", () => {
//       if (selectedShape && selectedShape.setEditable)
//         selectedShape.setEditable(false);
//       setSelectedShape(polygon);
//     });
//     polygon
//       .getPath()
//       .addListener("set_at", () => updatePolygonDetails(polygon));
//     polygon
//       .getPath()
//       .addListener("insert_at", () => updatePolygonDetails(polygon));
//     polygon
//       .getPath()
//       .addListener("remove_at", () => updatePolygonDetails(polygon));
//     polygon.setEditable(false);
//   };

//   const handleKmlFileUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.name.endsWith(".kml")) {
//       alert("Please upload a .kml file");
//       return;
//     }
//     if (!isLoaded || typeof window === "undefined") {
//       alert("Map not ready");
//       return;
//     }
//     const text = await file.text();
//     const doc = new window.DOMParser().parseFromString(text, "text/xml");
//     const bounds = new window.google.maps.LatLngBounds();
//     let drawn = false;
//     let kmlAreaData = null;
//     let foundLine = false;
//     let foundPolygon = false;
//     let tempLineLengthKm = null;
//     let tempShapeDate = null;

//     doc.querySelectorAll("Polygon coordinates").forEach((tag) => {
//       foundPolygon = true;
//       const coords = tag.textContent
//         .trim()
//         .split(/\s+/)
//         .map((line) => {
//           const [lng, lat] = line.split(",").map(Number);
//           bounds.extend({ lat, lng });
//           return { lat, lng };
//         });
//       new window.google.maps.Polygon({
//         paths: coords,
//         strokeColor: "#FF0000",
//         fillColor: "#FF0000",
//         fillOpacity: 0.35,
//         map: mapRef.current,
//       });
//       drawn = true;
//       if (window.google && window.google.maps.geometry) {
//         const path = coords.map(
//           (c) => new window.google.maps.LatLng(c.lat, c.lng)
//         );
//         const areaM2 = window.google.maps.geometry.spherical.computeArea(path);
//         const areaKm2 = areaM2 / 1_000_000;
//         const farmId = generateFarmId(coords);
//         kmlAreaData = {
//           type: "polygon",
//           coordinates: coords,
//           areaKm2,
//           areaHectares: km2ToHectares(areaKm2).toFixed(2),
//           areaAcres: km2ToAcres(areaKm2).toFixed(2),
//           farmId,
//         };
//         setKmlCoordinates(coords);
//         placeDevicesInArea(coords, 1000);
//       }
//     });

//     doc.querySelectorAll("LineString coordinates").forEach((tag) => {
//       foundLine = true;
//       const coords = tag.textContent
//         .trim()
//         .split(/\s+/)
//         .map((line) => {
//           const [lng, lat] = line.split(",").map(Number);
//           bounds.extend({ lat, lng });
//           return { lat, lng };
//         });
//       new window.google.maps.Polyline({
//         path: coords,
//         strokeColor: "#0000FF",
//         map: mapRef.current,
//       });
//       drawn = true;
//       if (window.google && window.google.maps.geometry) {
//         const path = coords.map(
//           (c) => new window.google.maps.LatLng(c.lat, c.lng)
//         );
//         tempLineLengthKm =
//           window.google.maps.geometry.spherical.computeLength(path) / 1000;
//         setKmlCoordinates(coords);
//       }
//     });

//     doc.querySelectorAll("Point coordinates").forEach((tag) => {
//       const [lng, lat] = tag.textContent.trim().split(",").map(Number);
//       bounds.extend({ lat, lng });
//       new window.google.maps.Marker({
//         position: { lat, lng },
//         map: mapRef.current,
//       });
//       drawn = true;
//     });

//     doc.querySelectorAll("Placemark").forEach((placemark) => {
//       const timeTag = placemark.querySelector("TimeStamp when");
//       if (timeTag) tempShapeDate = timeTag.textContent.trim();
//     });

//     if (drawn) mapRef.current.fitBounds(bounds);
//     else alert("No supported shapes found in KML");

//     if (kmlAreaData) {
//       setAreaInfo(kmlAreaData);
//       localStorage.setItem("mapAreaInfo", JSON.stringify(kmlAreaData));
//     }
//     if (foundLine && !foundPolygon && tempLineLengthKm !== null)
//       setLineLengthKm(tempLineLengthKm);
//     else setLineLengthKm(null);

//     setShapeDate(tempShapeDate || null);

//     if (kmlInputRef.current) kmlInputRef.current.value = "";
//   };

//   useImperativeHandle(ref, () => ({
//     getMap: () => mapRef.current,
//     fitBounds: (bounds) => {
//       if (mapRef.current) mapRef.current.fitBounds(bounds);
//     },
//     clearShapes: () => {
//       setAreaInfo(null);
//       setKmlCoordinates(null);
//       setLineLengthKm(null);
//       if (mapRef.current && typeof window !== "undefined" && window.google) {
//       }
//     },
//     clearDrawingShapes: () => {
//       if (drawingManager) drawingManager.setDrawingMode(null);
//     },
//   }));

//   const getAreaValue = () => {
//     if (!areaInfo) return "";
//     if (areaUnit === "ha") return `${(areaInfo.areaKm2 * 100).toFixed(2)} ha`;
//     if (areaUnit === "ac")
//       return `${(areaInfo.areaKm2 * 247.105).toFixed(2)} ac`;
//     return `${areaInfo.areaKm2} km²`;
//   };

//   const postFields = async (payload) => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         "https://earthscansystems.com/farmerdatauser/userfarm/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("access")}`, // ✅ add this line
//           },

//           body: JSON.stringify(payload),
//         }
//       );
//       if (!res.ok) {
//         const e = await res.json().catch(() => null);
//         console.error("Backend response:", e || "bad status");
//         throw new Error("Failed to post fields");
//       }
//       const data = await res.json();
//       setForms((prev) => (Array.isArray(prev) ? [data, ...prev] : [data]));
//       return data;
//     } catch (err) {
//       console.error("Error posting fields:", err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isLoaded) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-700 font-semibold">Loading Map...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedPage>
//       <div className="flex w-full h-screen overflow-hidden bg-gray-50">
//         {/* <Sidebar/> */}

//         <div className="flex-1 flex flex-col overflow-hidden">

//           {/* Main Content Area */}
//           <div className="flex-1 overflow-y-auto p-6">
//             {/* Tools Bar */}
//             <div className="bg-white shadow-xl rounded-2xl p-4 mb-6 border border-gray-200">
//               <div className="flex items-center justify-between flex-wrap gap-4">
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleToolChange("hand")}
//                     className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
//                       selectedTool === "hand"
//                         ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     <FaHandPaper className="w-4 h-4" />
//                     <span>Pan</span>
//                   </button>
//                   <button
//                     onClick={() => handleToolChange("rectangle")}
//                     className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
//                       selectedTool === "rectangle"
//                         ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     <FaSquare className="w-4 h-4" />
//                     <span>Rectangle</span>
//                   </button>
//                   <button
//                     onClick={() => handleToolChange("polygon")}
//                     className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
//                       selectedTool === "polygon"
//                         ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     <FaDrawPolygon className="w-4 h-4" />
//                     <span>Polygon</span>
//                   </button>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <label
//                     htmlFor="kmlUpload"
//                     className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold  bg-[var(--color)]  text-white "
//                   >
//                     <FileText className="w-4 h-4" />
//                     <span>Upload KML</span>
//                   </label>
//                   <input
//                     id="kmlUpload"
//                     ref={kmlInputRef}
//                     type="file"
//                     accept=".kml"
//                     onChange={handleKmlFileUpload}
//                     className="hidden"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Map Container */}
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-6">
//               <div className="relative h-[600px]">
//                 <GoogleMap
//                   mapContainerStyle={containerStyle}
//                   center={mapCenter}
//                   zoom={13}
//                   onLoad={onLoad}
//                   options={{
//                     styles: [
//                       {
//                         featureType: "water",
//                         elementType: "geometry",
//                         stylers: [{ color: "#c1dff0" }],
//                       },
//                       {
//                         featureType: "landscape",
//                         elementType: "geometry",
//                         stylers: [{ color: "#f5f5f5" }],
//                       },
//                     ],
//                   }}
//                 >
//                   <DrawingManager
//                     onLoad={onDrawingManagerLoad}
//                     options={{
//                       drawingControl: false,
//                       rectangleOptions: {
//                         fillColor: "#10b981",
//                         strokeColor: "#059669",
//                         strokeWeight: 3,
//                         fillOpacity: 0.35,
//                         editable: true,
//                       },
//                       polygonOptions: {
//                         fillColor: "#3b82f6",
//                         strokeColor: "#2563eb",
//                         strokeWeight: 3,
//                         fillOpacity: 0.35,
//                         editable: true,
//                       },
//                     }}
//                     onRectangleComplete={handleRectangleComplete}
//                     onPolygonComplete={handlePolygonComplete}
//                   />
//                 </GoogleMap>
//               </div>
//             </div>

//             {/* Area Details Component */}
//             <MapDetail
//               mapAreaInfo={areaInfo || {}}
//               selectedUnit={areaUnit}
//               setSelectedUnit={(u) => setAreaUnit(u)}
//               areaBase={areaInfo?.areaKm2 ?? 0}
//               farmId={
//                 areaInfo?.farmId ??
//                 localStorage.getItem("farmId") ??
//                 `F-${Date.now()}`
//               }
//               getAreaInSelectedUnit={() => {
//                 if (!areaInfo) return 0;
//                 if (areaUnit === "ha")
//                   return (areaInfo.areaKm2 * 100).toFixed(2);
//                 if (areaUnit === "ac")
//                   return (areaInfo.areaKm2 * 247.105).toFixed(2);
//                 return areaInfo.areaKm2;
//               }}
//               forms={forms}
//               zoomToFarm={() => {}}
//               postFields={postFields}
//             />
//           </div>
//         </div>
//       </div>
//     </ProtectedPage>
//   );
// });

// export default FieldMapping;

// function MapDetail({
//   mapAreaInfo = {},
//   setSelectedUnit = () => {},
//   selectedUnit = "ac",
//   farmId = null,
//   getAreaInSelectedUnit = () => 0,
//   postFields = async () => {},
//   loading = false,
// }) {
//   const [finalPlace, setFinalPlace] = useState("");
//   const [field, setField] = useState(mapAreaInfo || {});
//   const [formData, setFormData] = useState({
//     farm_name: "",
//     notes: "",
//     area: getAreaInSelectedUnit(),
//     unit: selectedUnit,
//     farm_id: farmId,
//     user: 1,
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [parsedCoordinates, setParsedCoordinates] = useState([]);
//   const [copied, setCopied] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   useEffect(() => {
//     if (!parsedCoordinates?.length) return;

//     async function loadPlace() {
//       const center = getCentroid(parsedCoordinates);
//       const location = await getCustomPlace(center.lat, center.lng);
//       setFinalPlace(location);
//     }

//     loadPlace();
//   }, [JSON.stringify(parsedCoordinates)]);
//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       area: getAreaInSelectedUnit(),
//       unit: selectedUnit,
//       farm_id: farmId,
//     }));

//     if (mapAreaInfo?.coordinates) {
//       setParsedCoordinates(mapAreaInfo.coordinates);
//     }
//   }, [selectedUnit, farmId, mapAreaInfo]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };
//   const handleNotes = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!formData.farm_name) return alert("Please enter farm name");
//     console.log(formData);
//     const payload = {
//       ...formData,
//       shape_type: mapAreaInfo.type || "rectangle",
//       coordinates: parsedCoordinates,
//       width: mapAreaInfo.width || null,
//       height: mapAreaInfo.height || null,
//     };

//     try {
//       setSubmitting(true);
//       await postFields(payload);
//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 3000);
//       setFormData((p) => ({ ...p, farm_name: "" }));
//     } catch (err) {
//       alert("Submit failed");
//     } finally {
//       setSubmitting(false);
//     }
//     localStorage.removeItem("mapAreaInfo");
//     const interval = setInterval(() => {
//       window.location.reload();
//     }, 2000);
//     return () => {
//       clearInterval(interval);
//     };
//   };

//   const discard = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("mapAreaInfo");
//       window.location.reload();
//     }
//   };
//   const areaTypes = ["Flood", "ICP", "Trial", "Drip"];
//   const handleTypeChange = (e) => {
//     setField((prev) => ({ ...prev, type: e.target.value }));
//   };
//   return (
//     <>
//       {showSuccess && (
//         <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-down">
//           <Check className="w-6 h-6" />
//           <span className="font-semibold">Field saved successfully!</span>
//         </div>
//       )}
//       {mapAreaInfo && Object.keys(mapAreaInfo).length > 0 && (
//         <div className=" bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 rounded-3xl shadow-2xl border border-emerald-100 p-8 overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>

//           <div className="relative flex items-center justify-between border-b border-emerald-200 pb-6 mb-8">
//             <h2 className="font-bold text-3xl text-gray-800 flex items-center gap-3">
//               <span className="text-4xl">🌾</span>
//               <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
//                 Field Information
//               </span>
//             </h2>
//           </div>

//           {mapAreaInfo && Object.keys(mapAreaInfo).length > 0 ? (
//             <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="space-y-5">
//                 // {/* 🔹 Farm ID + Area (looped) */}
//                 {[
//                   {
//                     label: "Farm ID",
//                     value: mapAreaInfo.farmId ? `${mapAreaInfo.farmId}` : "-",
//                     icon: (
//                       <Lock width={18} height={18} className="text-gray-500" />
//                     ),
//                   },
//                   {
//                     label: "Area",
//                     value: mapAreaInfo.areaKm2
//                       ? selectedUnit === "ac"
//                         ? ` ${(mapAreaInfo.areaKm2 * 247.105).toFixed(2)} ac`
//                         : selectedUnit === "ha"
//                         ? `${(mapAreaInfo.areaKm2 * 100).toFixed(2)} ha`
//                         : `${mapAreaInfo.areaKm2} km²`
//                       : "-",
//                     icon: "📊",
//                   },
//                 ].map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-md hover:shadow-xl transition-all duration-300"
//                   >
//                     <span className="flex items-center gap-2 text-gray-600 font-medium">
//                       <span className="text-2xl">{item.icon}</span>
//                       {item.label}
//                     </span>
//                     <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
//                       {item.value}
//                     </span>
//                   </div>
//                 ))}
//                 // {/* 🔹 Type Dropdown */}
//                 <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-md hover:shadow-xl transition-all duration-300">
//                   <span className="flex items-center gap-2 text-gray-600 font-medium">
//                     <span className="text-2xl">🗺️</span>
//                     Type
//                   </span>

//                   <select
//                     value={field.type || ""}
//                     onChange={handleTypeChange}
//                     className="font-bold text-lg bg-transparent border-none focus:ring-0 outline-none text-emerald-700"
//                   >
//                     <option value="" disabled>
//                       Select Type
//                     </option>
//                     {["Flood", "ICP", "Trial", "Drip"].map((t) => (
//                       <option key={t} value={t}>
//                         {t}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <div className="flex items-center justify-between mb-3">
//                   <p className="text-sm text-gray-600 font-bold uppercase tracking-wider flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-emerald-600" />
//                     Place
//                   </p>
//                 </div>
//                 <div className="max-h-64 overflow-y-auto bg-gradient-to-br from-gray-50 to-emerald-50 p-2 rounded-2xl border border-emerald-200 shadow-inner">
//                   {parsedCoordinates?.length > 0 ? (
//                     <div className="flex flex-col py-3 text-sm hover:bg-white/50 rounded-lg px-2 transition-all border-b last:border-0">
//                       <span className="font-mono text-gray-700">
//                         {finalPlace ? (
//                           finalPlace
//                         ) : (
//                           <span className="text-gray-400 italic">
//                             loading place…
//                           </span>
//                         )}
//                       </span>
//                     </div>
//                   ) : (
//                     <span className="text-gray-400 italic block text-center py-8">
//                       No coordinates saved yet
//                     </span>
//                   )}
//                 </div>
//                 <div className="mt-3">
//                   <label className="text-sm text-gray-600 mb-2 ms-2 font-bold uppercase tracking-wider flex items-center gap-2">
//                     Notes
//                   </label>
//                   <input
//                     name="notes"
//                     value={formData.notes}
//                     onChange={handleNotes}
//                     className="block w-full rounded-2xl border-2 border-emerald-200 focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 p-4 text-base shadow-lg transition-all duration-300 hover:shadow-xl"
//                     placeholder="Enter any notes for your farm..."
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <div className="text-6xl mb-4 animate-bounce">🗺️</div>
//               <p className="text-gray-500 text-lg font-medium">
//                 Draw a shape or upload a KML to see field details
//               </p>
//             </div>
//           )}

//           <div className="relative mt-10 space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div className="col-span-1 sm:col-span-2">
//                 <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
//                   <span className="text-xl">🏡</span>
//                   Farm Name
//                 </label>
//                 <input
//                   name="farm_name"
//                   value={formData.farm_name}
//                   onChange={handleChange}
//                   className="block w-full rounded-2xl border-2 border-emerald-200 focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 p-4 text-base shadow-lg transition-all duration-300 hover:shadow-xl"
//                   placeholder="Enter your farm name..."
//                 />
//               </div>

//               <button
//                 onClick={() => {
//                   handleSubmit();
//                 }}
//                 disabled={submitting}
//                 className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl text-base font-bold shadow-xl hover:shadow-2xl hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {submitting ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Saving...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-5 h-5" />
//                     <span>Save Field</span>
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={discard}
//                 className="flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-gray-300 rounded-2xl text-base font-bold hover:bg-gray-50 hover:border-gray-400 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//               >
//                 <Trash2 className="w-5 h-5" />
//                 <span>Discard</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// async function getCustomPlace(lat, lng) {
//   const res = await fetch(
//     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//   );
//   const data = await res.json();
//   const addr = data.address;
//   console.log(addr);
//   console.log(addr.village, "and", addr.country);
//   const location = [addr.village, addr.county, addr.state, addr.country]
//     .filter(Boolean)
//     .join(", ");
//   return location;
// }

// function getCentroid(coords) {
//   let x = 0,
//     y = 0;

//   coords.forEach((pt) => {
//     x += pt.lat;
//     y += pt.lng;
//   });

//   return {
//     lat: x / coords.length,
//     lng: y / coords.length,
//   };
// }






"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup, Marker, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { FileText, Lock, MapPin, Check, Save, Trash2 } from "lucide-react";
import ProtectedPage from "../contact/ProtectedPage/AuthorizedPage";

const initialCenter = [30.157, 71.5249];

function km2ToHectares(km2) {
  return km2 * 100;
}
function km2ToAcres(km2) {
  return km2 * 247.105;
}

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function generateFarmId(coords) {
  if (!Array.isArray(coords) || coords.length === 0) return `F-${Date.now()}`;
  const lat = coords[0][0].toFixed(2);
  const lng = coords[0][1].toFixed(2);
  const ts = Date.now().toString().slice(-4);
  return `F-${lat.replace(".", "")}${lng.replace(".", "")}${ts}`;
}

// Utility to calculate polygon area in km²
function getPolygonArea(coords) {
  // Using simple planar approximation
  // For more precise geodesic area, can use leaflet-geodesy if needed
  if (!coords || coords.length < 3) return 0;
  let area = 0;
  const n = coords.length;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = coords[i];
    const [x2, y2] = coords[(i + 1) % n];
    area += x1 * y2 - x2 * y1;
  }
  return Math.abs(area) / 2 / 1_000_000; // convert m² to km²
}

// Centroid
function getCentroid(coords) {
  let x = 0,
    y = 0;
  coords.forEach(([lat, lng]) => {
    x += lat;
    y += lng;
  });
  return {
    lat: x / coords.length,
    lng: y / coords.length,
  };
}

// Reverse geocoding
async function getCustomPlace(lat, lng) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
  );
  const data = await res.json();
  const addr = data.address;
  const location = [addr.village, addr.county, addr.state, addr.country]
    .filter(Boolean)
    .join(", ");
  return location;
}

const LeafletMap = forwardRef(({ onAreaData, searchLocation }, ref) => {
  const [areaInfo, setAreaInfo] = useState(null);
  const [selectedTool, setSelectedTool] = useState("hand");
  const [areaUnit, setAreaUnit] = useState("ac");
  const [parsedCoordinates, setParsedCoordinates] = useState([]);
  const [kmlCoordinates, setKmlCoordinates] = useState(null);
  const [lineLengthKm, setLineLengthKm] = useState(null);
  const [shapeDate, setShapeDate] = useState(null);
  const mapRef = useRef();
  const featureGroupRef = useRef();
  const kmlInputRef = useRef();

  // Load localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mapAreaInfo");
    if (saved) setAreaInfo(JSON.parse(saved));
    const savedUnit = localStorage.getItem("areaUnit");
    if (savedUnit) setAreaUnit(savedUnit);
  }, []);

  useEffect(() => {
    if (areaInfo) localStorage.setItem("mapAreaInfo", JSON.stringify(areaInfo));
    else localStorage.removeItem("mapAreaInfo");
  }, [areaInfo]);

  useEffect(() => {
    if (areaUnit) localStorage.setItem("areaUnit", areaUnit);
  }, [areaUnit]);

  useEffect(() => {
    if (searchLocation && mapRef.current) {
      const { lat, lng } = searchLocation;
      mapRef.current.setView([lat, lng], 15);
      L.marker([lat, lng]).addTo(mapRef.current);
    }
  }, [searchLocation]);

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
  };

  const handleShapeCreated = (e) => {
    const layer = e.layer;
    let coords = [];
    let areaKm2 = 0;
    if (layer instanceof L.Polygon) {
      coords = layer.getLatLngs()[0].map((p) => [p.lat, p.lng]);
      areaKm2 =
        Math.abs(L.GeometryUtil.geodesicArea(layer.getLatLngs()[0])) / 1_000_000;
    } else if (layer instanceof L.Rectangle) {
      const bounds = layer.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      coords = [
        [sw.lat, sw.lng],
        [sw.lat, ne.lng],
        [ne.lat, ne.lng],
        [ne.lat, sw.lng],
      ];
      const width = getDistance(sw.lat, sw.lng, sw.lat, ne.lng);
      const height = getDistance(sw.lat, sw.lng, ne.lat, sw.lng);
      areaKm2 = width * height;
    }
    const farmId = generateFarmId(coords);
    const data = {
      type: layer instanceof L.Polygon ? "polygon" : "rectangle",
      coordinates: coords,
      areaKm2,
      areaHectares: km2ToHectares(areaKm2).toFixed(2),
      areaAcres: km2ToAcres(areaKm2).toFixed(2),
      farmId,
    };
    setAreaInfo(data);
    setParsedCoordinates(coords);
    if (onAreaData) onAreaData(data);
    localStorage.setItem("mapAreaInfo", JSON.stringify(data));
  };

  const handleKmlFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".kml")) {
      alert("Please upload a .kml file");
      return;
    }
    const text = await file.text();
    const doc = new window.DOMParser().parseFromString(text, "text/xml");
    const coords = [];
    let kmlAreaData = null;

    doc.querySelectorAll("Polygon coordinates").forEach((tag) => {
      const points = tag.textContent
        .trim()
        .split(/\s+/)
        .map((line) => {
          const [lng, lat] = line.split(",").map(Number);
          return [lat, lng];
        });
      coords.push(...points);
      kmlAreaData = {
        type: "polygon",
        coordinates: points,
        areaKm2:
          Math.abs(L.GeometryUtil.geodesicArea(points.map((p) => L.latLng(p[0], p[1])))) /
          1_000_000,
        areaHectares: km2ToHectares(
          Math.abs(L.GeometryUtil.geodesicArea(points.map((p) => L.latLng(p[0], p[1])))) /
            1_000_000
        ).toFixed(2),
        areaAcres: km2ToAcres(
          Math.abs(L.GeometryUtil.geodesicArea(points.map((p) => L.latLng(p[0], p[1])))) /
            1_000_000
        ).toFixed(2),
        farmId: generateFarmId(points),
      };
    });

    if (coords.length && mapRef.current) {
      const latlngs = coords.map((p) => L.latLng(p[0], p[1]));
      L.polygon(latlngs, { color: "#2563eb", fillOpacity: 0.35 }).addTo(mapRef.current);
      mapRef.current.fitBounds(L.latLngBounds(latlngs));
      setAreaInfo(kmlAreaData);
      setParsedCoordinates(coords);
      localStorage.setItem("mapAreaInfo", JSON.stringify(kmlAreaData));
    }
    if (kmlInputRef.current) kmlInputRef.current.value = "";
  };

  useImperativeHandle(ref, () => ({
    getMap: () => mapRef.current,
    clearShapes: () => {
      setAreaInfo(null);
      setParsedCoordinates([]);
      if (featureGroupRef.current) featureGroupRef.current.clearLayers();
    },
  }));

  return (
    <ProtectedPage>
      <div className="flex w-full h-screen overflow-hidden bg-gray-50">
        <div className="flex-1 flex flex-col overflow-hidden p-6">
          {/* Tools */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => handleToolChange("hand")}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Pan
            </button>
            <button
              onClick={() => handleToolChange("polygon")}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Polygon
            </button>
            <button
              onClick={() => handleToolChange("rectangle")}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Rectangle
            </button>

            <label className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded">
              Upload KML
              <input
                ref={kmlInputRef}
                type="file"
                accept=".kml"
                onChange={handleKmlFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Map */}
          <MapContainer
            center={initialCenter}
            zoom={13}
            style={{ height: "600px", width: "100%" }}
            whenCreated={(map) => (mapRef.current = map)}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FeatureGroup ref={featureGroupRef}>
              <EditControl
                position="topright"
                onCreated={handleShapeCreated}
                draw={{
                  rectangle: selectedTool === "rectangle",
                  polygon: selectedTool === "polygon",
                  circle: false,
                  circlemarker: false,
                  polyline: false,
                  marker: false,
                }}
                edit={{ remove: true }}
              />
            </FeatureGroup>
            {parsedCoordinates?.length > 0 && (
              <Marker position={getCentroid(parsedCoordinates)} />
            )}
          </MapContainer>
        </div>
      </div>
    </ProtectedPage>
  );
});

export default LeafletMap;


