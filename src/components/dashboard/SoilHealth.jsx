"use client";
import React, { useState, useCallback, useRef } from "react";
import { Upload, FileText, ExternalLink, CheckCircle, X, AlertCircle } from "lucide-react";

export default function SoilHealthReportUpload() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Handle file validation
  const validateFile = useCallback((selectedFile) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!selectedFile) {
      setError("No file selected");
      return false;
    }
    
    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file only");
      return false;
    }
    
    if (selectedFile.size > maxSize) {
      setError("File size must be less than 10MB");
      return false;
    }
    
    setError("");
    return true;
  }, []);

  // Handle file change
  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setUploadSuccess(false);
    }
  }, [validateFile]);

  // Handle drag and drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      setUploadSuccess(false);
    }
  }, [validateFile]);

  // Handle file submit
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please select a PDF file before uploading");
      return;
    }

    setIsUploading(true);
    setError("");

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsUploading(false);
    setUploadSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => setUploadSuccess(false), 3000);
  }, [file]);

  // Remove file
  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setError("");
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="flex  items-center gap-3 justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 sm:p-6">
      
      {/* Info Cards */}
      <div className="mb-8 grid grid-cols-1  gap-7 w-[200px] max-w-lg">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
          <p className="text-3xl font-bold text-green-600">PDF</p>
          <p className="text-sm text-gray-600 mt-1">Supported Format</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
          <p className="text-3xl font-bold text-blue-600">10MB</p>
          <p className="text-sm text-gray-600 mt-1">Maximum Size</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
          <p className="text-3xl font-bold text-purple-600">Secure</p>
          <p className="text-sm text-gray-600 mt-1">Encrypted Upload</p>
        </div>
      </div>
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Soil Health Report
          </h2>
          <p className="text-gray-500 text-sm">Upload your PDF report for analysis</p>
        </div>

        <div className="space-y-6">
          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
              isDragging
                ? "border-green-500 bg-green-50 scale-105"
                : file
                ? "border-green-400 bg-green-50"
                : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
            }`}
          >
            <input
              ref={fileInputRef}
              id="pdfUpload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />

            {!file ? (
              <label
                htmlFor="pdfUpload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-700 font-medium mb-1">
                  Click to upload or drag & drop
                </p>
                <p className="text-gray-400 text-sm">PDF files only (Max 10MB)</p>
              </label>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-medium truncate">{file.name}</p>
                    <p className="text-gray-500 text-sm">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="ml-2 p-2 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  disabled={isUploading}
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {uploadSuccess && (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-green-700 text-sm">File uploaded successfully!</p>
            </div>
          )}

          {/* Upload Button */}
          <button
            type="submit"
            disabled={!file || isUploading}
            className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              !file || isUploading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            {isUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload Report
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* View Details Button */}
        <a
          href="/soil-report-details"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl w-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <ExternalLink className="w-5 h-5" />
          View Report Details
        </a>
      </div>

    </div>
  );
}
// "use client";

// import React, { useState, useEffect } from 'react';
// import Image from "next/image";
// import { 
//   MdPlayArrow, 
//   MdClose, 
//   MdTrendingUp, 
//   MdLocationOn, 
//   MdVerified,
//   MdArrowForward 
// } from 'react-icons/md';
// import { 
//   FaArrowRight, 
//   FaUsers, 
//   FaLeaf, 
//   FaStar,
//   FaQuoteLeft 
// } from 'react-icons/fa';
// import ProtectedPage from '@/components/contact/ProtectedPage/AuthorizedPage';

// function Home() {
//   const [videoOpen, setVideoOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <ProtectedPage>
//     <div className=' flex justify-center items-center bg-gradient-to-br from-blue-50 via-green-50 to-teal-50'>
//         {/* <Sidebar/> */}
//     <div className="min-h-screen bg-white overflow-hidden">
//       <DemoVideo videoOpen={videoOpen} setVideoOpen={setVideoOpen} />
//       {/* <Navigation /> */}
//       {/* <Nav/> */}
//       <HeroSection videoOpen={videoOpen} setVideoOpen={setVideoOpen} isVisible={isVisible} />
//       {/* <FeaturesSection /> */}
//     </div>
//     </div>
//     </ProtectedPage>
//   );
// }

// export default Home;

// // function Navigation() {
// //   return (
// //     <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-100 z-40">
// //       <div className="max-w-7xl mx-auto px-6 lg:px-8">
// //         <div className="flex justify-between items-center h-20">
// //           <div className="flex items-center space-x-3">
// //             <div className="w-10 h-10 rounded-xl flex items-center justify-center">
// //               {/* <FaLeaf className="text-white text-lg" /> */}
// //               <Image src="/esslogo.png" alt="ERP Logo" width={220} height={50} />
// //               </div>
// //             <span className="text-2xl font-bold text-gray-900">
// //               Crop <span className="text-[var(--color)]">Konnect</span>
// //             </span>
// //           </div>
          
// //           <div className="hidden md:flex items-center space-x-8">
        
          
// //             {/* <ButtonLinks lable={'Login'} icon={ <User size={16}/> } pY={10} pX={14} text={13}  linksUrl={'/login'}/> */}
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

// function HeroSection({ videoOpen, setVideoOpen, isVisible }) {
//   return (
//     <section className="relative h-161 flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald[var(--color)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto lg:px-8">
//         <div className="grid lg:grid-cols-2  gap-12 items-center">
//           {/* Content Section */}
//           <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             {/* Badge */}
//             <div className="inline-flex items-center px-4 py-2 bg-[var(--color)] rounded-full mt-4">
//               <div className="w-2 h-2 bg-white rounded-full mr-2 "></div>
//               <span className="text-white text-sm">Agricultural Innovation Platform</span>
//             </div>

//             {/* Main Heading */}
//             <div className='lg:order-1 order-2 '>
//               <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
//                 <span className="relative">
//                   <span className="text-[var(--color)]">
//                     Crop
//                   </span>
//                   {/* <div className="absolute -inset-1 bg-[var(--color)] rounded-lg blur opacity-20 group-hover:opacity-75 transition duration-1000"></div> */}
//                 </span>
//                 {' '}
//                 <span className="text-amber-800">Konnect</span>
//               </h1>
//               <p className="text-lg text-gray-600 mt-6 leading-relaxed max-w-2xl">
//                 Revolutionize your farming journey with our cutting-edge platform. 
//                 Connect with opportunities, enhance productivity, and build lasting 
//                 agricultural networks.
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 lg:order-2 order-1">
//               {/* <ButtonLinks lable={"Register Now"}  pY={10} pX={14} text={16} linksUrl={'/registration'} icon={<MdArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" />}/>
//               <Button lable={"Watch Demo"} icon={<MdPlayArrow className='text-2xl'/>}   onClick={() => setVideoOpen(true)}/>
//                */}
             
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
//               <div className="text-center group ">
//                 <div className="text-3xl font-bold text-[var(--color)]">10K+</div>
//                 <div className="text-gray-600 mt-1 font-medium">Active Farmers</div>
//               </div>
//               <div className="text-center group ">
//                 <div className="text-3xl font-bold text-[var(--color)]">50+</div>
//                 <div className="text-gray-600 mt-1 font-medium">Districts</div>
//               </div>
//               <div className="text-center group ">
//                 <div className="text-3xl font-bold text-[var(--color)]">95%</div>
//                 <div className="text-gray-600 mt-1 font-medium">Success Rate</div>
//               </div>
//             </div>
//           </div>

//           {/* Image Section */}
//           <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             <div className="relative">
//               {/* Decorative Elements */}
//               <div className="absolute -top-4 -left-4 w-72 h-72 bg-[var(--color)] rounded-3xl transform rotate-6 opacity-20"></div>
//               <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-amber-800 rounded-3xl transform -rotate-6 opacity-20"></div>
              
//               {/* Main Image */}
//               <div className="relative bg-white rounded-3xl shadow-2xl p-3  ">
//                 <img 
//                   src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop&crop=center" 
//                   alt="Modern Agriculture"
//                   className="w-full h-96 object-cover rounded-2xl"
//                 />
                
//                 {/* Floating Cards */}
//                 <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
//                   <div className="flex items-center space-x-2">
//                     <MdTrendingUp className="text-green-500 text-xl" />
//                     <div>
//                       <div className="text-sm font-semibold text-gray-900">+24%</div>
//                       <div className="text-xs text-gray-500">Yield Increase</div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
//                   <div className="flex items-center space-x-2">
//                     <MdVerified className="text-blue-500 text-xl" />
//                     <div>
//                       <div className="text-sm font-semibold text-gray-900">Verified</div>
//                       <div className="text-xs text-gray-500">Quality Assured</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function FeaturesSection() {
//   const features = [
//     {
//       icon: FaUsers,
//       title: "Connect & Network",
//       description: "Build meaningful connections with farmers, suppliers, and agricultural experts worldwide.",
//       color: "text-blue-500",
//       bgColor: "bg-blue-100"
//     },
//     {
//       icon: MdTrendingUp,
//       title: "Boost Productivity",
//       description: "Access cutting-edge tools and insights to maximize your agricultural output and efficiency.",
//       color: "text-green-500",
//       bgColor: "bg-green-100"
//     },
//     {
//       icon: MdLocationOn,
//       title: "Market Access",
//       description: "Discover new markets and opportunities to sell your products at competitive prices.",
//       color: "text-purple-500",
//       bgColor: "bg-purple-100"
//     }
//   ];

//   return (
//     <section id="features" className="py-24 bg-white">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Why Choose <span className="text-green-600">Crop Konnect</span>?
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Our platform combines innovative technology with agricultural expertise 
//             to deliver unmatched value to farmers across the globe.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div key={index} className="group p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-200">
//               <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
//                 <feature.icon className={`text-2xl ${feature.color}`} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
//               <p className="text-gray-600 leading-relaxed">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function TestimonialsSection() {
//   return (
//     <section className="py-24 bg-gradient-to-br from-green-50 to-emerald-50">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Trusted by <span className="text-green-600">Farmers Everywhere</span>
//           </h2>
//         </div>

//         <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <div className="flex-1">
//               <FaQuoteLeft className="text-3xl text-green-500 mb-4" />
//               <p className="text-xl text-gray-700 leading-relaxed mb-6">
//                 "Crop Konnect transformed my farming business completely. The connections 
//                 I've made and the knowledge I've gained have increased my yield by 40% 
//                 in just one season."
//               </p>
//               <div className="flex items-center">
//                 <img 
//                   src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" 
//                   alt="Testimonial"
//                   className="w-12 h-12 rounded-full mr-4"
//                 />
//                 <div>
//                   <div className="font-semibold text-gray-900">Ahmed Hassan</div>
//                   <div className="text-gray-500 text-sm">Wheat Farmer, Punjab</div>
//                 </div>
//                 <div className="ml-auto flex">
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar key={i} className="text-yellow-400 text-sm" />
//                   ))}
//                 </div>
//               </div>
//             </div>
            
//             <div className="w-full md:w-96">
//               <img 
//                 src="https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?w=400&h=300&fit=crop" 
//                 alt="Happy Farmer"
//                 className="w-full h-64 object-cover rounded-2xl shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function DemoVideo({ videoOpen, setVideoOpen }) {
//   if (!videoOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//       <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl">
//         <button
//           onClick={() => setVideoOpen(false)}
//           className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-center text-white transition-all"
//         >
//           <MdClose className="text-xl" />
//         </button>
        
//         <div className="aspect-video">
//           <iframe
//             width="100%"
//             height="100%"
//             src="https://www.youtube.com/embed/0GmDPAlwifs?si=R-OnhTq0DDi2xJqG&autoplay=1"
//             title="Crop Konnect Demo"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             className="w-full h-full"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
