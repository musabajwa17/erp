// import React, { useState } from 'react';
// import { Plus, MapPin, Calendar, Droplets, Sun, Sprout, ArrowLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Calendar, Droplets, Sun, Sprout, ArrowLeft, Loader } from 'lucide-react';

// // Crop database with detailed information
const CROP_DATABASE = {
 "Winter Wheat": {
    varieties: ["Bell","Cherry","Walla Walla","Premium Gold"],
    botanicalName: "Triticum aestivum",
    daysToEmerge: 6,
    plantSpacing: 7.62,
    rowSpacing: 22.86,
    plantingDepth: 2.54,
    averageHeight: 90.0,
    germRate: 95,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, moderate moisture",
    daysToFlower: 120,
    daysToMaturity: 140,
    harvestWindow: 7,
    estimatedLoss: 2.0,
    harvestUnits: "bales"
  },
  "Spring Wheat": {
    varieties: ["Red Fife","Marquis","Glenn","Stoa"],
    botanicalName: "Triticum aestivum",
    daysToEmerge: 5,
    plantSpacing: 7.5,
    rowSpacing: 22.86,
    plantingDepth: 2.54,
    averageHeight: 85.0,
    germRate: 94,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, moderate moisture",
    daysToFlower: 60,
    daysToMaturity: 100,
    harvestWindow: 7,
    estimatedLoss: 2.5,
    harvestUnits: "bales"
  },
  "Corn": {
    varieties: ["Sweet Gold","Silver Queen","Bodacious","Honey Select"],
    botanicalName: "Zea mays",
    daysToEmerge: 7,
    plantSpacing: 20.32,
    rowSpacing: 76.2,
    plantingDepth: 3.81,
    averageHeight: 200.0,
    germRate: 95,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Fertile, well-drained, moderate-high moisture",
    daysToFlower: 60,
    daysToMaturity: 90,
    harvestWindow: 14,
    estimatedLoss: 5.0,
    harvestUnits: "bushels"
  },
  "Soybeans": {
    varieties: ["Envy","Williams 82","Asgrow","Pioneer 93M11"],
    botanicalName: "Glycine max",
    daysToEmerge: 5,
    plantSpacing: 7.62,
    rowSpacing: 38.1,
    plantingDepth: 3.81,
    averageHeight: 70.0,
    germRate: 92,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Moderate moisture, well-drained",
    daysToFlower: 45,
    daysToMaturity: 120,
    harvestWindow: 10,
    estimatedLoss: 3.0,
    harvestUnits: "bushels"
  },
  "Tomatoes": {
    varieties: ["Beefsteak","Roma","Cherry","Heirloom"],
    botanicalName: "Solanum lycopersicum",
    daysToEmerge: 7,
    plantSpacing: 45.0,
    rowSpacing: 90.0,
    plantingDepth: 1.3,
    averageHeight: 150.0,
    germRate: 85,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Fertile, well-drained, high moisture",
    daysToFlower: 50,
    daysToMaturity: 80,
    harvestWindow: 30,
    estimatedLoss: 8.0,
    harvestUnits: "kg"
  },
  "Rice (paddy)": {
    varieties: ["IR64","Basmati 370","Swarna","Jaya"],
    botanicalName: "Oryza sativa",
    daysToEmerge: 7,
    plantSpacing: 15.0,
    rowSpacing: 20.0,
    plantingDepth: 2.5,
    averageHeight: 100.0,
    germRate: 90,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Flooded/irrigated, heavy soils tolerated",
    daysToFlower: 80,
    daysToMaturity: 120,
    harvestWindow: 10,
    estimatedLoss: 6.0,
    harvestUnits: "kg"
  },
  "Barley": {
    varieties: ["Golden Promise","Harrington","Morex"],
    botanicalName: "Hordeum vulgare",
    daysToEmerge: 6,
    plantSpacing: 6.0,
    rowSpacing: 20.0,
    plantingDepth: 2.5,
    averageHeight: 80.0,
    germRate: 93,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, tolerant to lower moisture",
    daysToFlower: 65,
    daysToMaturity: 120,
    harvestWindow: 7,
    estimatedLoss: 3.0,
    harvestUnits: "bales"
  },
  "Oats": {
    varieties: ["Avena sativa","CDC Dancer","Jerry"],
    botanicalName: "Avena sativa",
    daysToEmerge: 5,
    plantSpacing: 6.0,
    rowSpacing: 18.0,
    plantingDepth: 2.5,
    averageHeight: 90.0,
    germRate: 92,
    seedsPerCell: 1,
    lightProfile: "Full Sun to partial",
    soilConditions: "Moderate moisture",
    daysToFlower: 50,
    daysToMaturity: 90,
    harvestWindow: 7,
    estimatedLoss: 3.5,
    harvestUnits: "bales"
  },
  "Potato": {
    varieties: ["Russet Burbank","Kennebec","Yukon Gold"],
    botanicalName: "Solanum tuberosum",
    daysToEmerge: 14,
    plantSpacing: 30.0,
    rowSpacing: 75.0,
    plantingDepth: 7.5,
    averageHeight: 50.0,
    germRate: 85,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Loose, well-drained, moderate-high moisture",
    daysToFlower: 60,
    daysToMaturity: 90,
    harvestWindow: 21,
    estimatedLoss: 8.0,
    harvestUnits: "kg"
  },
  "Sugarcane": {
    varieties: ["SP70-1143","Co 86032","NCo 310"],
    botanicalName: "Saccharum officinarum",
    daysToEmerge: 21,
    plantSpacing: 20.0,
    rowSpacing: 100.0,
    plantingDepth: 5.0,
    averageHeight: 250.0,
    germRate: 80,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "High moisture, deep soils",
    daysToFlower: 360,
    daysToMaturity: 365,
    harvestWindow: 30,
    estimatedLoss: 10.0,
    harvestUnits: "tonnes"
  },
  "Cotton": {
    varieties: ["Delta Pine 555","FM 9063","CIM-573"],
    botanicalName: "Gossypium hirsutum",
    daysToEmerge: 7,
    plantSpacing: 15.0,
    rowSpacing: 75.0,
    plantingDepth: 3.0,
    averageHeight: 120.0,
    germRate: 90,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, low-moderate moisture",
    daysToFlower: 45,
    daysToMaturity: 150,
    harvestWindow: 14,
    estimatedLoss: 6.0,
    harvestUnits: "bales"
  },
  "Canola (Rapeseed)": {
    varieties: ["NK Neptune","Hyola 401","InVigor"],
    botanicalName: "Brassica napus",
    daysToEmerge: 7,
    plantSpacing: 4.0,
    rowSpacing: 25.0,
    plantingDepth: 2.5,
    averageHeight: 100.0,
    germRate: 88,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, moderate moisture",
    daysToFlower: 60,
    daysToMaturity: 120,
    harvestWindow: 7,
    estimatedLoss: 4.0,
    harvestUnits: "kg"
  },
  "Sunflower": {
    varieties: ["Helianthus annuus","Mammoth","Peredovik"],
    botanicalName: "Helianthus annuus",
    daysToEmerge: 8,
    plantSpacing: 30.0,
    rowSpacing: 75.0,
    plantingDepth: 3.0,
    averageHeight: 150.0,
    germRate: 90,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, tolerant to poor soils",
    daysToFlower: 70,
    daysToMaturity: 110,
    harvestWindow: 14,
    estimatedLoss: 5.0,
    harvestUnits: "kg"
  },
  "Sorghum": {
    varieties: ["Sorghum bicolor","Milo","BTx623"],
    botanicalName: "Sorghum bicolor",
    daysToEmerge: 6,
    plantSpacing: 15.0,
    rowSpacing: 45.0,
    plantingDepth: 3.8,
    averageHeight: 150.0,
    germRate: 92,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Drought-tolerant, well-drained",
    daysToFlower: 60,
    daysToMaturity: 120,
    harvestWindow: 14,
    estimatedLoss: 6.0,
    harvestUnits: "bushels"
  },
  "Peas": {
    varieties: ["Green Arrow","Sugar Snap","Telera"],
    botanicalName: "Pisum sativum",
    daysToEmerge: 8,
    plantSpacing: 5.0,
    rowSpacing: 30.0,
    plantingDepth: 3.0,
    averageHeight: 40.0,
    germRate: 90,
    seedsPerCell: 1,
    lightProfile: "Full Sun to partial",
    soilConditions: "Cool, well-drained soils",
    daysToFlower: 40,
    daysToMaturity: 70,
    harvestWindow: 10,
    estimatedLoss: 4.0,
    harvestUnits: "kg"
  },
  "Chickpea": {
    varieties: ["Kabuli","Desi","CICR-5"],
    botanicalName: "Cicer arietinum",
    daysToEmerge: 10,
    plantSpacing: 8.0,
    rowSpacing: 30.0,
    plantingDepth: 4.0,
    averageHeight: 50.0,
    germRate: 85,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, dryland tolerant",
    daysToFlower: 60,
    daysToMaturity: 120,
    harvestWindow: 7,
    estimatedLoss: 6.0,
    harvestUnits: "kg"
  },
  "Lentil": {
    varieties: ["Masoor","Eston","ILL 6002"],
    botanicalName: "Lens culinaris",
    daysToEmerge: 8,
    plantSpacing: 3.0,
    rowSpacing: 20.0,
    plantingDepth: 3.0,
    averageHeight: 35.0,
    germRate: 88,
    seedsPerCell: 1,
    lightProfile: "Full Sun to partial",
    soilConditions: "Cool, well-drained soils",
    daysToFlower: 45,
    daysToMaturity: 90,
    harvestWindow: 7,
    estimatedLoss: 5.0,
    harvestUnits: "kg"
  },
  "Banana": {
    varieties: ["Cavendish","Plantain","Grand Nain"],
    botanicalName: "Musa spp.",
    daysToEmerge: 30,
    plantSpacing: 200.0,
    rowSpacing: 200.0,
    plantingDepth: 10.0,
    averageHeight: 300.0,
    germRate: 80,
    seedsPerCell: 1,
    lightProfile: "Full Sun to partial",
    soilConditions: "High moisture, fertile soils",
    daysToFlower: 300,
    daysToMaturity: 360,
    harvestWindow: 30,
    estimatedLoss: 12.0,
    harvestUnits: "kg"
  },
  "Apple (orchard)": {
    varieties: ["Gala","Fuji","Honeycrisp"],
    botanicalName: "Malus domestica",
    daysToEmerge: 0,
    plantSpacing: 300.0,
    rowSpacing: 500.0,
    plantingDepth: 30.0,
    averageHeight: 400.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, fertile",
    daysToFlower: 365,
    daysToMaturity: 730,
    harvestWindow: 30,
    estimatedLoss: 10.0,
    harvestUnits: "kg"
  },
  "Grapes (vineyard)": {
    varieties: ["Cabernet Sauvignon","Concord","Thompson Seedless"],
    botanicalName: "Vitis vinifera",
    daysToEmerge: 0,
    plantSpacing: 150.0,
    rowSpacing: 250.0,
    plantingDepth: 25.0,
    averageHeight: 200.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, moderate moisture",
    daysToFlower: 365,
    daysToMaturity: 540,
    harvestWindow: 21,
    estimatedLoss: 8.0,
    harvestUnits: "kg"
  },
  "Alfalfa": {
    varieties: ["Medicago sativa", "Vernal", "Rangelander", "WL 656"],
    botanicalName: "Medicago sativa",
    daysToEmerge: 7,
    plantSpacing: 2.5,
    rowSpacing: 40.0,
    plantingDepth: 0.6,
    averageHeight: 60.0,
    germRate: 90,
    seedsPerCell: 3,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, neutral to alkaline",
    daysToFlower: 60,
    daysToMaturity: 90,
    harvestWindow: 14,
    estimatedLoss: 6.0,
    harvestUnits: "tonnes"
  },
  "Cabbage": {
    varieties: ["Gala", "Savoy", "January King"],
    botanicalName: "Brassica oleracea var. capitata",
    daysToEmerge: 7,
    plantSpacing: 30.0,
    rowSpacing: 60.0,
    plantingDepth: 1.3,
    averageHeight: 30.0,
    germRate: 90,
    seedsPerCell: 1,
    lightProfile: "Full Sun to partial",
    soilConditions: "Fertile, well-drained",
    daysToFlower: 70,
    daysToMaturity: 75,
    harvestWindow: 10,
    estimatedLoss: 5.0,
    harvestUnits: "kg"
  },
  "Carrot": {
    varieties: ["Nantes", "Imperator", "Danvers"],
    botanicalName: "Daucus carota",
    daysToEmerge: 14,
    plantSpacing: 7.5,
    rowSpacing: 30.0,
    plantingDepth: 0.6,
    averageHeight: 25.0,
    germRate: 80,
    seedsPerCell: 6,
    lightProfile: "Full Sun",
    soilConditions: "Loose, deep, well-drained",
    daysToFlower: 90,
    daysToMaturity: 70,
    harvestWindow: 21,
    estimatedLoss: 5.0,
    harvestUnits: "kg"
  },
  "Onion": {
    varieties: ["Yellow Globe", "Red Baron", "Walla Walla"],
    botanicalName: "Allium cepa",
    daysToEmerge: 10,
    plantSpacing: 7.5,
    rowSpacing: 38.0,
    plantingDepth: 1.3,
    averageHeight: 30.0,
    germRate: 85,
    seedsPerCell: 20,
    lightProfile: "Full Sun",
    soilConditions: "Fertile, well-drained",
    daysToFlower: 0,
    daysToMaturity: 120,
    harvestWindow: 14,
    estimatedLoss: 6.0,
    harvestUnits: "kg"
  },
  "Garlic": {
    varieties: ["Softneck", "Hardneck", "Rocambole"],
    botanicalName: "Allium sativum",
    daysToEmerge: 14,
    plantSpacing: 10.0,
    rowSpacing: 30.0,
    plantingDepth: 3.8,
    averageHeight: 35.0,
    germRate: 88,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, fertile",
    daysToFlower: 0,
    daysToMaturity: 240,
    harvestWindow: 14,
    estimatedLoss: 8.0,
    harvestUnits: "kg"
  },
  "Pumpkin": {
    varieties: ["Atlantic Giant", "Jack O'Lantern", "Sugar Pie"],
    botanicalName: "Cucurbita pepo",
    daysToEmerge: 7,
    plantSpacing: 120.0,
    rowSpacing: 240.0,
    plantingDepth: 2.5,
    averageHeight: 40.0,
    germRate: 85,
    seedsPerCell: 4,
    lightProfile: "Full Sun",
    soilConditions: "Fertile, well-drained",
    daysToFlower: 50,
    daysToMaturity: 100,
    harvestWindow: 21,
    estimatedLoss: 10.0,
    harvestUnits: "kg"
  },
  "Cucumber": {
    varieties: ["Marketmore", "Straight Eight", "Lemon"],
    botanicalName: "Cucumis sativus",
    daysToEmerge: 7,
    plantSpacing: 45.0,
    rowSpacing: 120.0,
    plantingDepth: 1.3,
    averageHeight: 20.0,
    germRate: 90,
    seedsPerCell: 2,
    lightProfile: "Full Sun",
    soilConditions: "Fertile, well-drained",
    daysToFlower: 40,
    daysToMaturity: 55,
    harvestWindow: 21,
    estimatedLoss: 7.0,
    harvestUnits: "kg"
  },
  "Bell Pepper": {
    varieties: ["California Wonder", "Yolo Wonder", "Cubanelle"],
    botanicalName: "Capsicum annuum",
    daysToEmerge: 10,
    plantSpacing: 45.0,
    rowSpacing: 90.0,
    plantingDepth: 0.8,
    averageHeight: 60.0,
    germRate: 80,
    seedsPerCell: 5,
    lightProfile: "Full Sun",
    soilConditions: "Warm, fertile, well-drained",
    daysToFlower: 60,
    daysToMaturity: 75,
    harvestWindow: 30,
    estimatedLoss: 9.0,
    harvestUnits: "kg"
  },
  "Eggplant": {
    varieties: ["Black Beauty", "Ichiban", "Listada de Gandia"],
    botanicalName: "Solanum melongena",
    daysToEmerge: 10,
    plantSpacing: 60.0,
    rowSpacing: 90.0,
    plantingDepth: 1.3,
    averageHeight: 90.0,
    germRate: 85,
    seedsPerCell: 3,
    lightProfile: "Full Sun",
    soilConditions: "Warm, fertile, well-drained",
    daysToFlower: 60,
    daysToMaturity: 85,
    harvestWindow: 21,
    estimatedLoss: 8.0,
    harvestUnits: "kg"
  },
  "Spinach": {
    varieties: ["Bloomsdale", "Tyee", "Giant Winter"],
    botanicalName: "Spinacia oleracea",
    daysToEmerge: 7,
    plantSpacing: 5.0,
    rowSpacing: 30.0,
    plantingDepth: 1.3,
    averageHeight: 20.0,
    germRate: 85,
    seedsPerCell: 10,
    lightProfile: "Partial to Full Sun",
    soilConditions: "Cool, well-drained, fertile",
    daysToFlower: 45,
    daysToMaturity: 40,
    harvestWindow: 14,
    estimatedLoss: 6.0,
    harvestUnits: "kg"
  },
  "Lettuce": {
    varieties: ["Romaine", "Butterhead", "Iceberg"],
    botanicalName: "Lactuca sativa",
    daysToEmerge: 7,
    plantSpacing: 25.0,
    rowSpacing: 30.0,
    plantingDepth: 0.5,
    averageHeight: 20.0,
    germRate: 88,
    seedsPerCell: 15,
    lightProfile: "Partial to Full Sun",
    soilConditions: "Cool, fertile, well-drained",
    daysToFlower: 45,
    daysToMaturity: 55,
    harvestWindow: 14,
    estimatedLoss: 6.0,
    harvestUnits: "kg"
  },
  "Broccoli": {
    varieties: ["Calabrese", "Green Magic", "Marathon"],
    botanicalName: "Brassica oleracea var. italica",
    daysToEmerge: 7,
    plantSpacing: 45.0,
    rowSpacing: 75.0,
    plantingDepth: 1.3,
    averageHeight: 60.0,
    germRate: 85,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Cool, fertile, well-drained",
    daysToFlower: 60,
    daysToMaturity: 85,
    harvestWindow: 14,
    estimatedLoss: 7.0,
    harvestUnits: "kg"
  },
  "Cauliflower": {
    varieties: ["Snowball", "Purple Head", "Cheddar"],
    botanicalName: "Brassica oleracea var. botrytis",
    daysToEmerge: 7,
    plantSpacing: 45.0,
    rowSpacing: 75.0,
    plantingDepth: 1.3,
    averageHeight: 60.0,
    germRate: 85,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Cool, fertile, well-drained",
    daysToFlower: 60,
    daysToMaturity: 85,
    harvestWindow: 14,
    estimatedLoss: 8.0,
    harvestUnits: "kg"
  },
  "Sweet Potato": {
    varieties: ["Beauregard", "Georgia Jet", "Covington"],
    botanicalName: "Ipomoea batatas",
    daysToEmerge: 14,
    plantSpacing: 30.0,
    rowSpacing: 90.0,
    plantingDepth: 5.0,
    averageHeight: 25.0,
    germRate: 90,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Loose, well-drained, warm",
    daysToFlower: 120,
    daysToMaturity: 120,
    harvestWindow: 30,
    estimatedLoss: 10.0,
    harvestUnits: "kg"
  },
  "Cassava": {
    varieties: ["TME 419", "BR-106", "KU50"],
    botanicalName: "Manihot esculenta",
    daysToEmerge: 21,
    plantSpacing: 100.0,
    rowSpacing: 100.0,
    plantingDepth: 10.0,
    averageHeight: 200.0,
    germRate: 70,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained to marginal soils",
    daysToFlower: 180,
    daysToMaturity: 300,
    harvestWindow: 30,
    estimatedLoss: 12.0,
    harvestUnits: "kg"
  },
  "Millet": {
    varieties: ["Pearl Millet", "Foxtail Millet", "Proso Millet"],
    botanicalName: "Panicum/Echinochloa spp.",
    daysToEmerge: 5,
    plantSpacing: 10.0,
    rowSpacing: 30.0,
    plantingDepth: 2.5,
    averageHeight: 100.0,
    germRate: 90,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Drought-tolerant, well-drained",
    daysToFlower: 45,
    daysToMaturity: 60,
    harvestWindow: 14,
    estimatedLoss: 6.0,
    harvestUnits: "kg"
  },
  "Quinoa": {
    varieties: ["Real", "Titicaca", "QQ74"],
    botanicalName: "Chenopodium quinoa",
    daysToEmerge: 7,
    plantSpacing: 10.0,
    rowSpacing: 30.0,
    plantingDepth: 1.3,
    averageHeight: 120.0,
    germRate: 85,
    seedsPerCell: 4,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, tolerant to poor soils",
    daysToFlower: 60,
    daysToMaturity: 100,
    harvestWindow: 14,
    estimatedLoss: 8.0,
    harvestUnits: "kg"
  },
  "Buckwheat": {
    varieties: ["Common Buckwheat", "Koto"],
    botanicalName: "Fagopyrum esculentum",
    daysToEmerge: 5,
    plantSpacing: 5.0,
    rowSpacing: 20.0,
    plantingDepth: 1.3,
    averageHeight: 60.0,
    germRate: 90,
    seedsPerCell: 6,
    lightProfile: "Full Sun to partial",
    soilConditions: "Well-drained, poor soils tolerated",
    daysToFlower: 30,
    daysToMaturity: 45,
    harvestWindow: 10,
    estimatedLoss: 6.0,
    harvestUnits: "kg"
  },

  "Rye": {
    varieties: ["Centenaire", "Danko", "Wratislavia"],
    botanicalName: "Secale cereale",
    daysToEmerge: 6,
    plantSpacing: 4.0,
    rowSpacing: 15.0,
    plantingDepth: 2.5,
    averageHeight: 90.0,
    germRate: 92,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Tolerant to poor soils, well-drained",
    daysToFlower: 80,
    daysToMaturity: 120,
    harvestWindow: 7,
    estimatedLoss: 4.0,
    harvestUnits: "bales"
  },

  "Olive (orchard)": {
    varieties: ["Arbequina", "Picual", "Koroneiki"],
    botanicalName: "Olea europaea",
    daysToEmerge: 0,
    plantSpacing: 600.0,
    rowSpacing: 800.0,
    plantingDepth: 30.0,
    averageHeight: 600.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, drought-tolerant",
    daysToFlower: 365,
    daysToMaturity: 1095,
    harvestWindow: 30,
    estimatedLoss: 12.0,
    harvestUnits: "kg"
  },
  "Sorghum": {
    varieties: ["BT×623", "Macia", "Dekalb DKS48"],
    botanicalName: "Sorghum bicolor",
    daysToEmerge: 7,
    plantSpacing: 12.0,
    rowSpacing: 75.0,
    plantingDepth: 3.8,
    averageHeight: 150.0,
    germRate: 90,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Drought-tolerant, well-drained",
    daysToFlower: 65,
    daysToMaturity: 110,
    harvestWindow: 14,
    estimatedLoss: 5.0,
    harvestUnits: "bushels"
  },

  "Barley": {
    varieties: ["Hordeum vulgare", "AC Metcalfe", "Copeland"],
    botanicalName: "Hordeum vulgare",
    daysToEmerge: 5,
    plantSpacing: 5.0,
    rowSpacing: 18.0,
    plantingDepth: 3.0,
    averageHeight: 100.0,
    germRate: 92,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Moderate water, well-drained",
    daysToFlower: 55,
    daysToMaturity: 90,
    harvestWindow: 10,
    estimatedLoss: 4.0,
    harvestUnits: "bushels"
  },

  "Oats": {
    varieties: ["Makuru", "Kariega", "Dane"],
    botanicalName: "Avena sativa",
    daysToEmerge: 7,
    plantSpacing: 5.0,
    rowSpacing: 18.0,
    plantingDepth: 2.5,
    averageHeight: 120.0,
    germRate: 90,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Cool, moist soils",
    daysToFlower: 60,
    daysToMaturity: 95,
    harvestWindow: 10,
    estimatedLoss: 5.0,
    harvestUnits: "bushels"
  },

  "Peas": {
    varieties: ["Green Arrow", "Sugar Snap", "Wando"],
    botanicalName: "Pisum sativum",
    daysToEmerge: 10,
    plantSpacing: 5.0,
    rowSpacing: 60.0,
    plantingDepth: 3.8,
    averageHeight: 60.0,
    germRate: 85,
    seedsPerCell: 3,
    lightProfile: "Full Sun to partial",
    soilConditions: "Cool, well-drained",
    daysToFlower: 50,
    daysToMaturity: 65,
    harvestWindow: 14,
    estimatedLoss: 8.0,
    harvestUnits: "kg"
  },

  "Chickpea": {
    varieties: ["Desi", "Kabuli", "Noor 2013"],
    botanicalName: "Cicer arietinum",
    daysToEmerge: 10,
    plantSpacing: 15.0,
    rowSpacing: 45.0,
    plantingDepth: 5.0,
    averageHeight: 50.0,
    germRate: 88,
    seedsPerCell: 1,
    lightProfile: "Full Sun",
    soilConditions: "Low water, semi-arid",
    daysToFlower: 60,
    daysToMaturity: 110,
    harvestWindow: 14,
    estimatedLoss: 8.0,
    harvestUnits: "kg"
  },

  "Lentil": {
    varieties: ["Masoor 2006", "Eston", "Richlea"],
    botanicalName: "Lens culinaris",
    daysToEmerge: 10,
    plantSpacing: 8.0,
    rowSpacing: 30.0,
    plantingDepth: 4.0,
    averageHeight: 40.0,
    germRate: 85,
    seedsPerCell: 2,
    lightProfile: "Full Sun",
    soilConditions: "Low fertility, drought-tolerant",
    daysToFlower: 60,
    daysToMaturity: 100,
    harvestWindow: 10,
    estimatedLoss: 7.0,
    harvestUnits: "kg"
  },

  "Banana": {
    varieties: ["Cavendish", "Dwarf Brazilian", "Grand Nain"],
    botanicalName: "Musa acuminata",
    daysToEmerge: 0,
    plantSpacing: 200.0,
    rowSpacing: 300.0,
    plantingDepth: 20.0,
    averageHeight: 300.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "High water, rich loam",
    daysToFlower: 180,
    daysToMaturity: 300,
    harvestWindow: 21,
    estimatedLoss: 12.0,
    harvestUnits: "kg"
  },

  "Mango": {
    varieties: ["Sindhri", "Chaunsa", "Alphonso"],
    botanicalName: "Mangifera indica",
    daysToEmerge: 0,
    plantSpacing: 800.0,
    rowSpacing: 1000.0,
    plantingDepth: 30.0,
    averageHeight: 900.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Well-drained, deep soils",
    daysToFlower: 365,
    daysToMaturity: 1095,
    harvestWindow: 30,
    estimatedLoss: 15.0,
    harvestUnits: "kg"
  },

  "Pineapple": {
    varieties: ["Smooth Cayenne", "Queen", "MD2"],
    botanicalName: "Ananas comosus",
    daysToEmerge: 0,
    plantSpacing: 45.0,
    rowSpacing: 90.0,
    plantingDepth: 10.0,
    averageHeight: 100.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Sandy, well-drained",
    daysToFlower: 365,
    daysToMaturity: 540,
    harvestWindow: 21,
    estimatedLoss: 10.0,
    harvestUnits: "kg"
  },

  "Papaya": {
    varieties: ["Red Lady", "Solo", "Sunrise"],
    botanicalName: "Carica papaya",
    daysToEmerge: 14,
    plantSpacing: 200.0,
    rowSpacing: 250.0,
    plantingDepth: 10.0,
    averageHeight: 300.0,
    germRate: 70,
    seedsPerCell: 4,
    lightProfile: "Full Sun",
    soilConditions: "Warm, well-drained",
    daysToFlower: 150,
    daysToMaturity: 300,
    harvestWindow: 30,
    estimatedLoss: 10.0,
    harvestUnits: "kg"
  },

  "Strawberry": {
    varieties: ["Chandler", "Camarosa", "Albion"],
    botanicalName: "Fragaria × ananassa",
    daysToEmerge: 0,
    plantSpacing: 30.0,
    rowSpacing: 90.0,
    plantingDepth: 2.0,
    averageHeight: 25.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "High organic matter",
    daysToFlower: 60,
    daysToMaturity: 90,
    harvestWindow: 21,
    estimatedLoss: 12.0,
    harvestUnits: "kg"
  },

  "Blueberry": {
    varieties: ["Duke", "Bluecrop", "Legacy"],
    botanicalName: "Vaccinium corymbosum",
    daysToEmerge: 0,
    plantSpacing: 120.0,
    rowSpacing: 200.0,
    plantingDepth: 20.0,
    averageHeight: 150.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Acidic soil (pH 4.5–5.5)",
    daysToFlower: 120,
    daysToMaturity: 240,
    harvestWindow: 21,
    estimatedLoss: 10.0,
    harvestUnits: "kg"
  },


  "Grapes": {
    varieties: ["Thompson Seedless", "Red Globe", "Crimson"],
    botanicalName: "Vitis vinifera",
    daysToEmerge: 0,
    plantSpacing: 250.0,
    rowSpacing: 300.0,
    plantingDepth: 20.0,
    averageHeight: 200.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Deep, well-drained",
    daysToFlower: 150,
    daysToMaturity: 300,
    harvestWindow: 30,
    estimatedLoss: 10.0,
    harvestUnits: "kg"
  },

  "Apple": {
    varieties: ["Gala", "Fuji", "Red Delicious"],
    botanicalName: "Malus domestica",
    daysToEmerge: 0,
    plantSpacing: 300.0,
    rowSpacing: 400.0,
    plantingDepth: 30.0,
    averageHeight: 400.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Cool, deep loamy",
    daysToFlower: 180,
    daysToMaturity: 1095,
    harvestWindow: 21,
    estimatedLoss: 10.0,
    harvestUnits: "kg"
  },

  "Pear": {
    varieties: ["Bartlett", "Anjou", "Bosc"],
    botanicalName: "Pyrus communis",
    daysToEmerge: 0,
    plantSpacing: 300.0,
    rowSpacing: 450.0,
    plantingDepth: 30.0,
    averageHeight: 500.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Moist, well-drained",
    daysToFlower: 200,
    daysToMaturity: 1095,
    harvestWindow: 21,
    estimatedLoss: 12.0,
    harvestUnits: "kg"
  },

  "Guava": {
    varieties: ["Safeda", "Allahabadi Surkha", "Red Malaysian"],
    botanicalName: "Psidium guajava",
    daysToEmerge: 0,
    plantSpacing: 300.0,
    rowSpacing: 400.0,
    plantingDepth: 20.0,
    averageHeight: 400.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Warm, well-drained",
    daysToFlower: 150,
    daysToMaturity: 365,
    harvestWindow: 30,
    estimatedLoss: 10.0,
    harvestUnits: "kg"
  },

  "Peach": {
    varieties: ["Early Grande", "Florida Prince", "Redhaven"],
    botanicalName: "Prunus persica",
    daysToEmerge: 0,
    plantSpacing: 400.0,
    rowSpacing: 600.0,
    plantingDepth: 30.0,
    averageHeight: 500.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Loamy, good drainage",
    daysToFlower: 150,
    daysToMaturity: 730,
    harvestWindow: 21,
    estimatedLoss: 12.0,
    harvestUnits: "kg"
  },

  "Apricot": {
    varieties: ["Harcot", "Tilton", "Moorpark"],
    botanicalName: "Prunus armeniaca",
    daysToEmerge: 0,
    plantSpacing: 400.0,
    rowSpacing: 600.0,
    plantingDepth: 30.0,
    averageHeight: 450.0,
    germRate: 0,
    seedsPerCell: 0,
    lightProfile: "Full Sun",
    soilConditions: "Loamy, well-drained",
    daysToFlower: 150,
    daysToMaturity: 730,
    harvestWindow: 21,
    estimatedLoss: 12.0,
    harvestUnits: "kg"
  }
};

// const CropPreparationSystem = () => {
//   const [view, setView] = useState('locations'); // locations, addCrop, addLocation, plantingDetails
//   const [crops, setCrops] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [currentCrop, setCurrentCrop] = useState(null);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [step, setStep] = useState(1);

//   // Form states
//   const [cropForm, setCropForm] = useState({
//     type: '',
//     variety: '',
//     internalId: ''
//   });

//   const [locationForm, setLocationForm] = useState({
//     name: '',
//     internalId: '',
//     electronicId: '',
//     locationType: 'Field',
//     plantingFormat: 'Planted in Beds',
//     numBeds: 5,
//     bedLength: 100,
//     bedWidth: 3,
//     status: 'Active',
//     lightProfile: '',
//     grazingRestDays: '',
//     description: ''
//   });

//   const [plantingForm, setPlantingForm] = useState({
//     cropType: '',
//     location: '',
//     amount: '',
//     startDate: '',
//     startMethod: 'Direct Sow',
//     plantingDetails: '',
//     pruningDetails: '',
//     isPerennial: false,
//     autoTasks: true
//   });

//   // Add new crop
//   const handleAddCrop = () => {
//     if (!cropForm.type || !cropForm.variety) {
//       alert('Please select crop type and variety');
//       return;
//     }

//     const cropData = CROP_DATABASE[cropForm.type];
//     const newCrop = {
//       id: Date.now(),
//       type: cropForm.type,
//       variety: cropForm.variety,
//       internalId: cropForm.internalId || `${cropForm.type.substring(0, 4).toUpperCase()}`,
//       botanicalName: cropData.botanicalName,
//       ...cropData
//     };

//     setCrops([...crops, newCrop]);
//     console.log('Crop Added:', newCrop);
    
//     // Reset form
//     setCropForm({ type: '', variety: '', internalId: '' });
//     setView('locations');
//   };

//   // Add new location
//   const handleAddLocation = () => {
//     if (!locationForm.name) {
//       alert('Please enter location name');
//       return;
//     }

//     const newLocation = {
//       id: Date.now(),
//       ...locationForm,
//       areaSqm: locationForm.numBeds * locationForm.bedLength * locationForm.bedWidth
//     };

//     setLocations([...locations, newLocation]);
//     console.log('Location Added:', newLocation);
    
//     // Reset form
//     setLocationForm({
//       name: '',
//       internalId: '',
//       electronicId: '',
//       locationType: 'Field',
//       plantingFormat: 'Planted in Beds',
//       numBeds: 5,
//       bedLength: 100,
//       bedWidth: 3,
//       status: 'Active',
//       lightProfile: '',
//       grazingRestDays: '',
//       description: ''
//     });
//     setView('locations');
//   };

//   // Start planting process
//   const handleStartPlanting = (location, crop) => {
//     setCurrentLocation(location);
//     setCurrentCrop(crop);
    
//     const cropData = CROP_DATABASE[crop.type];
//     const today = new Date();
//     const expectedHarvest = new Date(today);
//     expectedHarvest.setDate(today.getDate() + cropData.daysToMaturity);

//     setPlantingForm({
//       cropType: crop.type,
//       variety: crop.variety,
//       location: location.name,
//       amount: `${(location.areaSqm / (cropData.plantSpacing * cropData.rowSpacing / 10000)).toFixed(2)} sqm (100.0 bed m)`,
//       startDate: today.toISOString().split('T')[0],
//       expectedHarvest: expectedHarvest.toISOString().split('T')[0],
//       startMethod: 'Direct Sow',
//       plantingDetails: cropData.soilConditions,
//       pruningDetails: '',
//       isPerennial: false,
//       autoTasks: true,
//       ...cropData
//     });

//     setView('plantingDetails');
//     setStep(1);
//   };

//   // Create planting plan
//   const handleCreatePlan = () => {
//     const planData = {
//       crop: currentCrop,
//       location: currentLocation,
//       planting: plantingForm,
//       createdAt: new Date().toISOString()
//     };

//     console.log('Planting Plan Created:', planData);
//     alert('Planting plan created successfully! Check console for details.');
    
//     // Reset and go back
//     setView('locations');
//     setCurrentCrop(null);
//     setCurrentLocation(null);
//     setStep(1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Sprout className="w-8 h-8 text-green-600" />
//               <h1 className="text-3xl font-bold text-gray-800">Crop Preparation System</h1>
//             </div>
//             <div className="flex gap-3">
//               {view === 'locations' && (
//                 <>
//                   <button
//                     onClick={() => setView('addCrop')}
//                     className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                   >
//                     <Plus className="w-5 h-5" />
//                     New Crop Type
//                   </button>
//                   <button
//                     onClick={() => setView('addLocation')}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                   >
//                     <MapPin className="w-5 h-5" />
//                     Add Location
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Add Crop View */}
//         {view === 'addCrop' && (
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <button
//                 onClick={() => setView('locations')}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//               <h2 className="text-2xl font-bold text-gray-800">New Crop Type</h2>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Crop Type *
//                 </label>
//                 <select
//                   value={cropForm.type}
//                   onChange={(e) => setCropForm({ ...cropForm, type: e.target.value, variety: '' })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 >
//                   <option value="">Search for Type</option>
//                   {Object.keys(CROP_DATABASE).map(crop => (
//                     <option key={crop} value={crop}>{crop}</option>
//                   ))}
//                 </select>
//               </div>

//               {cropForm.type && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Variety/Strain
//                     </label>
//                     <select
//                       value={cropForm.variety}
//                       onChange={(e) => setCropForm({ ...cropForm, variety: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     >
//                       <option value="">Select variety</option>
//                       {CROP_DATABASE[cropForm.type].varieties.map(variety => (
//                         <option key={variety} value={variety}>{variety}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Internal ID
//                     </label>
//                     <input
//                       type="text"
//                       value={cropForm.internalId}
//                       onChange={(e) => setCropForm({ ...cropForm, internalId: e.target.value })}
//                       placeholder="Optional"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     />
//                   </div>
//                 </>
//               )}

//               <div className="flex gap-3 justify-end pt-4">
//                 <button
//                   onClick={() => setView('locations')}
//                   className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddCrop}
//                   className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                 >
//                   Save & New
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Add Location View */}
//         {view === 'addLocation' && (
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <button
//                 onClick={() => setView('locations')}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//               <h2 className="text-2xl font-bold text-gray-800">New Grow Location</h2>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={locationForm.name}
//                   onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
//                   placeholder="Example: Northwest Field"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Internal ID
//                   </label>
//                   <input
//                     type="text"
//                     value={locationForm.internalId}
//                     onChange={(e) => setLocationForm({ ...locationForm, internalId: e.target.value })}
//                     placeholder="Example: F001"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Electronic ID
//                   </label>
//                   <input
//                     type="text"
//                     value={locationForm.electronicId}
//                     onChange={(e) => setLocationForm({ ...locationForm, electronicId: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Location Type
//                 </label>
//                 <select
//                   value={locationForm.locationType}
//                   onChange={(e) => setLocationForm({ ...locationForm, locationType: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="Field">Field</option>
//                   <option value="Greenhouse">Greenhouse</option>
//                   <option value="Tunnel">Tunnel</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-4">
//                   Planting Format
//                 </label>
//                 <div className="grid grid-cols-2 gap-4">
//                   <button
//                     onClick={() => setLocationForm({ ...locationForm, plantingFormat: 'Planted in Beds' })}
//                     className={`p-4 border-2 rounded-lg text-left transition ${
//                       locationForm.plantingFormat === 'Planted in Beds'
//                         ? 'border-blue-500 bg-blue-50'
//                         : 'border-gray-300 hover:border-gray-400'
//                     }`}
//                   >
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="w-6 h-6 flex items-center justify-center">
//                         ≡
//                       </div>
//                       <span className="font-semibold">Planted in Beds</span>
//                     </div>
//                     <p className="text-sm text-gray-600">
//                       Distinct number of beds for diverse crops. Often in 100m length.
//                     </p>
//                   </button>
//                   <button
//                     onClick={() => setLocationForm({ ...locationForm, plantingFormat: 'Row Crop' })}
//                     className={`p-4 border-2 rounded-lg text-left transition ${
//                       locationForm.plantingFormat === 'Row Crop'
//                         ? 'border-blue-500 bg-blue-50'
//                         : 'border-gray-300 hover:border-gray-400'
//                     }`}
//                   >
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="w-6 h-6 flex items-center justify-center">
//                         ▦
//                       </div>
//                       <span className="font-semibold">Row Crop</span>
//                     </div>
//                     <p className="text-sm text-gray-600">
//                       One crop planted in rows wide enough to traverse with machinery.
//                     </p>
//                   </button>
//                 </div>
//               </div>

//               {locationForm.plantingFormat === 'Planted in Beds' && (
//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Number of Beds
//                     </label>
//                     <input
//                       type="number"
//                       value={locationForm.numBeds}
//                       onChange={(e) => setLocationForm({ ...locationForm, numBeds: parseInt(e.target.value) })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Bed Length (Meters)
//                     </label>
//                     <input
//                       type="number"
//                       value={locationForm.bedLength}
//                       onChange={(e) => setLocationForm({ ...locationForm, bedLength: parseFloat(e.target.value) })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Bed Width (Meters)
//                     </label>
//                     <input
//                       type="number"
//                       value={locationForm.bedWidth}
//                       onChange={(e) => setLocationForm({ ...locationForm, bedWidth: parseFloat(e.target.value) })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   value={locationForm.description}
//                   onChange={(e) => setLocationForm({ ...locationForm, description: e.target.value })}
//                   rows={3}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div className="flex gap-3 justify-end pt-4">
//                 <button
//                   onClick={() => setView('locations')}
//                   className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddLocation}
//                   className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Locations List View */}
//         {view === 'locations' && (
//           <div className="space-y-6">
//             {/* My Crops Section */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">My Crops</h2>
//               {crops.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Sprout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                   <p className="text-gray-500 mb-4">No crops yet?</p>
//                   <button
//                     onClick={() => setView('addCrop')}
//                     className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                   >
//                     Add a new crop type and it will show up here
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {crops.map(crop => (
//                     <div key={crop.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
//                       <div className="flex items-start gap-3">
//                         <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
//                           <Sprout className="w-6 h-6 text-amber-600" />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-gray-800">{crop.type}, {crop.variety}</h3>
//                           <p className="text-sm text-gray-500 italic">{crop.botanicalName}</p>
//                           <p className="text-xs text-gray-400 mt-1">ID: {crop.internalId}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Grow Locations Section */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">Grow Locations</h2>
//               {locations.length === 0 ? (
//                 <div className="text-center py-12">
//                   <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                   <p className="text-gray-500 mb-4">No locations yet</p>
//                   <button
//                     onClick={() => setView('addLocation')}
//                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                   >
//                     Add Location
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {locations.map(location => (
//                     <div key={location.id} className="border border-gray-200 rounded-lg p-6">
//                       <div className="flex items-start justify-between mb-4">
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-800">{location.name}</h3>
//                           <p className="text-sm text-gray-500">
//                             {location.plantingFormat} • {location.areaSqm.toFixed(2)} sqm
//                           </p>
//                           {location.internalId && (
//                             <p className="text-xs text-gray-400 mt-1">ID: {location.internalId}</p>
//                           )}
//                         </div>
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           location.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
//                         }`}>
//                           {location.status}
//                         </span>
//                       </div>

//                       {crops.length > 0 && (
//                         <div className="border-t pt-4">
//                           <p className="text-sm font-medium text-gray-700 mb-3">Select crop to plant:</p>
//                           <div className="grid grid-cols-2 gap-2">
//                             {crops.map(crop => (
//                               <button
//                                 key={crop.id}
//                                 onClick={() => handleStartPlanting(location, crop)}
//                                 className="flex items-center gap-2 px-4 py-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition text-left"
//                               >
//                                 <Sprout className="w-5 h-5 text-green-600 flex-shrink-0" />
//                                 <div className="flex-1 min-w-0">
//                                   <p className="text-sm font-medium text-gray-800 truncate">
//                                     {crop.type}
//                                   </p>
//                                   <p className="text-xs text-gray-500 truncate">{crop.variety}</p>
//                                 </div>
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Planting Details View */}
//         {view === 'plantingDetails' && (
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <button
//                 onClick={() => setView('locations')}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//               <h2 className="text-2xl font-bold text-gray-800">New Planting Details</h2>
//             </div>

//             {/* Progress Steps */}
//             <div className="flex items-center justify-center mb-8">
//               <div className="flex items-center gap-2">
//                 <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
//                   step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
//                 }`}>
//                   1
//                 </div>
//                 <span className="text-sm font-medium">Plant Type & Variety</span>
//               </div>
//               <div className="w-16 h-0.5 bg-gray-300 mx-2" />
//               <div className="flex items-center gap-2">
//                 <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
//                   step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
//                 }`}>
//                   2
//                 </div>
//                 <span className="text-sm font-medium">Planting Details</span>
//               </div>
//               <div className="w-16 h-0.5 bg-gray-300 mx-2" />
//               <div className="flex items-center gap-2">
//                 <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
//                   step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
//                 }`}>
//                   ✓
//                 </div>
//                 <span className="text-sm font-medium">Complete</span>
//               </div>
//             </div>

//             {/* Step 1: Type & Variety */}
//             {step === 1 && (
//               <div className="space-y-6">
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <p className="text-sm text-blue-800">
//                     <strong>Crop:</strong> {currentCrop.type}, {currentCrop.variety}
//                   </p>
//                   <p className="text-sm text-blue-800 mt-1">
//                     <strong>Location:</strong> {currentLocation.name}
//                   </p>
//                   <p className="text-sm text-blue-800 mt-1">
//                     <strong>Botanical Name:</strong> {currentCrop.botanicalName}
//                   </p>
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     onClick={() => setStep(2)}
//                     className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                   >
//                     Next, Planting Details
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Planting Details */}
//             {step === 2 && (
//               <div className="space-y-6">
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
//                   <p className="text-sm text-green-800 font-medium mb-2">
//                     ✓ Auto-predicted planting details based on {currentCrop.type}
//                   </p>
//                   <p className="text-xs text-green-700">
//                     All values have been automatically calculated. You can modify them if needed.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Crop Type
//                     </label>
//                     <input
//                       type="text"
//                       value={plantingForm.cropType}
//                       readOnly
//                       className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Variety / Strain
//                     </label>
//                     <input
//                       type="text"
//                       value={plantingForm.variety}
//                       readOnly
//                       className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     value={plantingForm.location}
//                     readOnly
//                     className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Days To Emerge
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="number"
//                         value={plantingForm.daysToEmerge}
//                         onChange={(e) => setPlantingForm({ ...plantingForm, daysToEmerge: parseFloat(e.target.value) })}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       />
//                       <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
//                         days
//                       </span>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Plant Spacing
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="number"
//                         value={plantingForm.plantSpacing}
//                         onChange={(e) => setPlantingForm({ ...plantingForm, plantSpacing: parseFloat(e.target.value) })}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       />
//                       <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
//                         cm
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Row Spacing
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="number"
//                         value={plantingForm.rowSpacing}
//                         onChange={(e) => setPlantingForm({ ...plantingForm, rowSpacing: parseFloat(e.target.value) })}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       />
//                       <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
//                         cm
//                       </span>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Planting Depth
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="number"
//                         value={plantingForm.plantingDepth}
//                         onChange={(e) => setPlantingForm({ ...plantingForm, plantingDepth: parseFloat(e.target.value) })}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       />
//                       <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
//                         cm
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Average Height
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="number"
//                         value={plantingForm.averageHeight}
//                         onChange={(e) => setPlantingForm({ ...plantingForm, averageHeight: parseFloat(e.target.value) })}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       />
//                       <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
//                         cm
//                       </span>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Start Method
//                     </label>
//                     <select
//                       value={plantingForm.startMethod}
//                       onChange={(e) => setPlantingForm({ ...plantingForm, startMethod: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     >
//                       <option value="Direct Sow">Direct Sow</option>
//                       <option value="Transplant">Transplant</option>
//                       <option value="Seed Started">Seed Started</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Estimated Germination Rate
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="number"
//                         value={plantingForm.germRate}
//                         onChange={(e) => setPlantingForm({ ...plantingForm, germRate: parseFloat(e.target.value) })}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       />
//                       <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
//                         %
//                       </span>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Seeds Per Hole/Cell
//                     </label>
//                     <input
//                       type="number"
//                       value={plantingForm.seedsPerCell}
//                       onChange={(e) => setPlantingForm({ ...plantingForm, seedsPerCell: parseInt(e.target.value) })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Light Profile
//                     </label>
//                     <select
//                       value={plantingForm.lightProfile}
//                       onChange={(e) => setPlantingForm({ ...plantingForm, lightProfile: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     >
//                       <option value="Full Sun">Full Sun</option>
//                       <option value="Partial Sun">Partial Sun</option>
//                       <option value="Shade">Shade</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Soil Conditions
//                     </label>
//                     <select
//                       value={plantingForm.plantingDetails}
//                       onChange={(e) => setPlantingForm({ ...plantingForm, plantingDetails: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     >
//                       <option value="Low water">Low water</option>
//                       <option value="Moderate water">Moderate water</option>
//                       <option value="High water">High water</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Planting Details
//                   </label>
//                   <textarea
//                     value={plantingForm.plantingDetails}
//                     onChange={(e) => setPlantingForm({ ...plantingForm, plantingDetails: e.target.value })}
//                     rows={3}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Pruning Details
//                   </label>
//                   <textarea
//                     value={plantingForm.pruningDetails}
//                     onChange={(e) => setPlantingForm({ ...plantingForm, pruningDetails: e.target.value })}
//                     rows={3}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div className="space-y-3">
//                   <label className="flex items-center gap-3">
//                     <input
//                       type="checkbox"
//                       checked={plantingForm.isPerennial}
//                       onChange={(e) => setPlantingForm({ ...plantingForm, isPerennial: e.target.checked })}
//                       className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
//                     />
//                     <span className="text-sm font-medium text-gray-700">Plant is Perennial</span>
//                   </label>
//                   <label className="flex items-center gap-3">
//                     <input
//                       type="checkbox"
//                       checked={plantingForm.autoTasks}
//                       onChange={(e) => setPlantingForm({ ...plantingForm, autoTasks: e.target.checked })}
//                       className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
//                     />
//                     <span className="text-sm font-medium text-gray-700">
//                       Automatically create tasks for new plantings
//                     </span>
//                   </label>
//                 </div>

//                 <div className="border-t pt-6">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Harvest Details</h3>
                  
//                   <div className="grid grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Days To Flower
//                       </label>
//                       <div className="flex gap-2">
//                         <input
//                           type="number"
//                           value={plantingForm.daysToFlower}
//                           onChange={(e) => setPlantingForm({ ...plantingForm, daysToFlower: parseInt(e.target.value) })}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                         />
//                         <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
//                           days
//                         </span>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Days To Maturity
//                       </label>
//                       <div className="flex gap-2">
//                         <input
//                           type="number"
//                           value={plantingForm.daysToMaturity}
//                           onChange={(e) => setPlantingForm({ ...plantingForm, daysToMaturity: parseInt(e.target.value) })}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                         />
//                         <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
//                           Days
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-6 mt-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Harvest Window
//                       </label>
//                       <div className="flex gap-2">
//                         <input
//                           type="number"
//                           value={plantingForm.harvestWindow}
//                           onChange={(e) => setPlantingForm({ ...plantingForm, harvestWindow: parseInt(e.target.value) })}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                         />
//                         <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
//                           Days
//                         </span>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Estimated Loss Rate
//                       </label>
//                       <div className="flex gap-2">
//                         <input
//                           type="number"
//                           value={plantingForm.estimatedLoss}
//                           onChange={(e) => setPlantingForm({ ...plantingForm, estimatedLoss: parseFloat(e.target.value) })}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                         />
//                         <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
//                           %
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-6 mt-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Harvest Units
//                       </label>
//                       <select
//                         value={plantingForm.harvestUnits}
//                         onChange={(e) => setPlantingForm({ ...plantingForm, harvestUnits: e.target.value })}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       >
//                         <option value="bales">bales</option>
//                         <option value="bushels">bushels</option>
//                         <option value="kg">kg</option>
//                         <option value="lbs">lbs</option>
//                         <option value="tons">tons</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Estimated Revenue
//                       </label>
//                       <div className="flex gap-2">
//                         <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-l-lg">
//                           Rs
//                         </span>
//                         <input
//                           type="number"
//                           placeholder="0.00"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-3 justify-end pt-4">
//                   <button
//                     onClick={() => setStep(1)}
//                     className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//                   >
//                     Back
//                   </button>
//                   <button
//                     onClick={() => setStep(3)}
//                     className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                   >
//                     Review Plan
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Complete/Review */}
//             {step === 3 && (
//               <div className="space-y-6">
//                 <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
//                       <Calendar className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-800">Planting Plan Ready!</h3>
//                       <p className="text-sm text-gray-600">Review your plan before creating it</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   {/* Crop Information */}
//                   <div className="border border-gray-200 rounded-lg p-4">
//                     <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                       <Sprout className="w-5 h-5 text-green-600" />
//                       Crop Information
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Type:</span>
//                         <span className="font-medium">{plantingForm.cropType}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Variety:</span>
//                         <span className="font-medium">{plantingForm.variety}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Start Method:</span>
//                         <span className="font-medium">{plantingForm.startMethod}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Location Information */}
//                   <div className="border border-gray-200 rounded-lg p-4">
//                     <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                       <MapPin className="w-5 h-5 text-blue-600" />
//                       Location
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Name:</span>
//                         <span className="font-medium">{plantingForm.location}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Area:</span>
//                         <span className="font-medium">{plantingForm.amount}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Format:</span>
//                         <span className="font-medium">{currentLocation.plantingFormat}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Planting Details */}
//                   <div className="border border-gray-200 rounded-lg p-4">
//                     <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                       <Sun className="w-5 h-5 text-yellow-600" />
//                       Planting Specifications
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Plant Spacing:</span>
//                         <span className="font-medium">{plantingForm.plantSpacing} cm</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Row Spacing:</span>
//                         <span className="font-medium">{plantingForm.rowSpacing} cm</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Depth:</span>
//                         <span className="font-medium">{plantingForm.plantingDepth} cm</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Days to Emerge:</span>
//                         <span className="font-medium">{plantingForm.daysToEmerge} days</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Harvest Plan */}
//                   <div className="border border-gray-200 rounded-lg p-4">
//                     <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                       <Calendar className="w-5 h-5 text-purple-600" />
//                       Harvest Plan
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Plant Date:</span>
//                         <span className="font-medium">{new Date(plantingForm.startDate).toLocaleDateString()}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Expected Harvest:</span>
//                         <span className="font-medium">{new Date(plantingForm.expectedHarvest).toLocaleDateString()}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Days to Maturity:</span>
//                         <span className="font-medium">{plantingForm.daysToMaturity} days</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Harvest Units:</span>
//                         <span className="font-medium">{plantingForm.harvestUnits}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Additional Details */}
//                 <div className="border border-gray-200 rounded-lg p-4">
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <Droplets className="w-5 h-5 text-cyan-600" />
//                     Growing Conditions
//                   </h4>
//                   <div className="grid grid-cols-3 gap-4 text-sm">
//                     <div>
//                       <span className="text-gray-600 block mb-1">Light Profile:</span>
//                       <span className="font-medium">{plantingForm.lightProfile}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-600 block mb-1">Soil Conditions:</span>
//                       <span className="font-medium">{plantingForm.plantingDetails}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-600 block mb-1">Germination Rate:</span>
//                       <span className="font-medium">{plantingForm.germRate}%</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Settings */}
//                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                   <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center gap-2">
//                       {plantingForm.autoTasks ? (
//                         <span className="text-green-600">✓</span>
//                       ) : (
//                         <span className="text-gray-400">✗</span>
//                       )}
//                       <span className="text-gray-700">Automatic task creation enabled</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {plantingForm.isPerennial ? (
//                         <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
//                           Perennial
//                         </span>
//                       ) : (
//                         <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium">
//                           Annual
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-3 justify-end pt-4">
//                   <button
//                     onClick={() => setStep(2)}
//                     className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//                   >
//                     Back to Edit
//                   </button>
//                   <button
//                     onClick={handleCreatePlan}
//                     className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition font-semibold shadow-lg"
//                   >
//                     Create Planting Plan
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CropPreparationSystem;



// Crop database with detailed information
// const CROP_DATABASE = {
//   'Winter Wheat': {
//     varieties: ['Bell', 'Cherry', 'Walla Walla', 'Premium Gold'],
//     botanicalName: 'Triticum aestivum',
//     daysToEmerge: 5,
//     plantSpacing: 7.62,
//     rowSpacing: 7.62,
//     plantingDepth: 5.08,
//     averageHeight: 91.44,
//     germRate: 100,
//     seedsPerCell: 1,
//     lightProfile: 'Full Sun',
//     soilConditions: 'Low water',
//     daysToFlower: 0,
//     daysToMaturity: 240,
//     harvestWindow: 0,
//     estimatedLoss: 0.0,
//     harvestUnits: 'bales',
//     startMethod: 'Direct Sow'
//   },
//   'Rice': {
//     varieties: ['Walla', 'Basmati', 'Jasmine', 'Arborio'],
//     botanicalName: 'Oryza sativa',
//     daysToEmerge: 7,
//     plantSpacing: 27.94,
//     rowSpacing: 27.94,
//     plantingDepth: 3.0,
//     averageHeight: 120.0,
//     germRate: 90,
//     seedsPerCell: 1,
//     lightProfile: 'Full Sun',
//     soilConditions: 'High water',
//     daysToFlower: 60,
//     daysToMaturity: 120,
//     harvestWindow: 10,
//     estimatedLoss: 2.0,
//     harvestUnits: 'bales',
//     startMethod: 'Start in Trays, Transplant in Ground'
//   },
//   'Spring Wheat': {
//     varieties: ['Red Fife', 'Marquis', 'Glenn', 'Stoa'],
//     botanicalName: 'Triticum aestivum',
//     daysToEmerge: 4,
//     plantSpacing: 7.5,
//     rowSpacing: 7.5,
//     plantingDepth: 4.5,
//     averageHeight: 85.0,
//     germRate: 98,
//     seedsPerCell: 1,
//     lightProfile: 'Full Sun',
//     soilConditions: 'Moderate water',
//     daysToFlower: 0,
//     daysToMaturity: 100,
//     harvestWindow: 7,
//     estimatedLoss: 0.0,
//     harvestUnits: 'bales',
//     startMethod: 'Direct Sow'
//   },
//   'Corn': {
//     varieties: ['Sweet Gold', 'Silver Queen', 'Bodacious', 'Honey Select'],
//     botanicalName: 'Zea mays',
//     daysToEmerge: 7,
//     plantSpacing: 30.0,
//     rowSpacing: 76.0,
//     plantingDepth: 5.0,
//     averageHeight: 200.0,
//     germRate: 95,
//     seedsPerCell: 1,
//     lightProfile: 'Full Sun',
//     soilConditions: 'High water',
//     daysToFlower: 60,
//     daysToMaturity: 80,
//     harvestWindow: 14,
//     estimatedLoss: 5.0,
//     harvestUnits: 'bushels',
//     startMethod: 'Direct Sow'
//   },
//   'Soybeans': {
//     varieties: ['Envy', 'Williams 82', 'Asgrow', 'Pioneer 93M11'],
//     botanicalName: 'Glycine max',
//     daysToEmerge: 5,
//     plantSpacing: 10.0,
//     rowSpacing: 50.0,
//     plantingDepth: 3.8,
//     averageHeight: 75.0,
//     germRate: 92,
//     seedsPerCell: 1,
//     lightProfile: 'Full Sun',
//     soilConditions: 'Moderate water',
//     daysToFlower: 45,
//     daysToMaturity: 120,
//     harvestWindow: 10,
//     estimatedLoss: 3.0,
//     harvestUnits: 'bushels',
//     startMethod: 'Direct Sow'
//   }
// };
const CropPreparationSystem = () => {
  const [view, setView] = useState('locations'); // locations, addCrop, plantingWizard
  const [crops, setCrops] = useState([]);
  const [locations, setLocations] = useState([]);
  const [plantedBeds, setPlantedBeds] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentCrop, setCurrentCrop] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [step, setStep] = useState(1);

  // Form states
  const [cropForm, setCropForm] = useState({
    type: '',
    variety: '',
    internalId: ''
  });

  const [plantingForm, setPlantingForm] = useState({
    numPlantings: 1,
    bedNumber: 1,
    startMethod: 'Direct Sow',
    growthStage: 'Seed Started',
    seedStarted: new Date().toISOString().split('T')[0],
    planted: new Date().toISOString().split('T')[0],
    plantSpacing: 0,
    rowSpacing: 0,
    plantedRowLength: 100.0,
    rows: 10,
    electronicId: '',
    plannedHarvest: '',
    expectedHarvestAmount: 0,
    seedCompany: '',
    seedType: '',
    lotNumber: '',
    origin: '',
    seedsPerCell: 1,
    traySize: 0,
    expectedStartsPerTray: 0,
    numTrays: 0,
    trayNumbers: ''
  });

  // Fetch locations from API
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://earthscansystems.com/farmerdatauser/userfarm/",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched locations:', data);
        
        // Transform API data to match our format
        const transformedLocations = data.map(loc => ({
          id: loc.id,
          name: loc.farm_name || loc.location_name || 'Unknown Location',
          internalId: loc.id.toString(),
          locationType: 'Field',
          plantingFormat: 'Planted in Beds',
          numBeds: 5, // Default, can be adjusted
          bedLength: 100,
          bedWidth: 3,
          areaSqm: loc.area || 1500,
          status: 'Active',
          description: loc.description || '',
          coordinates: loc.coordinates || null
        }));
        
        setLocations(transformedLocations);
      } else {
        console.error('Failed to fetch locations');
        // Fallback to demo data if API fails
        setLocations([
          {
            id: 1,
            name: 'Islamabad',
            internalId: 'ISB-01',
            locationType: 'Field',
            plantingFormat: 'Planted in Beds',
            numBeds: 5,
            bedLength: 100,
            bedWidth: 3,
            areaSqm: 1500,
            status: 'Active',
            description: 'Main field in Islamabad'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      // Fallback to demo data
      setLocations([
        {
          id: 1,
          name: 'Islamabad',
          internalId: 'ISB-01',
          locationType: 'Field',
          plantingFormat: 'Planted in Beds',
          numBeds: 5,
          bedLength: 100,
          bedWidth: 3,
          areaSqm: 1500,
          status: 'Active',
          description: 'Main field in Islamabad'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

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
    
    setCropForm({ type: '', variety: '', internalId: '' });
    setView('locations');
  };

  // Check if a bed is available
  const isBedAvailable = (locationId, bedNumber) => {
    const key = `${locationId}-${bedNumber}`;
    return !plantedBeds[key] || plantedBeds[key].harvested;
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
      numPlantings: 1,
      bedNumber: 1,
      startMethod: cropData.startMethod,
      growthStage: 'Seed Started',
      seedStarted: today.toISOString().split('T')[0],
      planted: today.toISOString().split('T')[0],
      plantSpacing: cropData.plantSpacing,
      rowSpacing: cropData.rowSpacing,
      plantedRowLength: 100.0,
      rows: 10,
      electronicId: '',
      plannedHarvest: expectedHarvest.toISOString().split('T')[0],
      expectedHarvestAmount: 0,
      seedCompany: '',
      seedType: '',
      lotNumber: '',
      origin: '',
      seedsPerCell: cropData.seedsPerCell,
      traySize: 0,
      expectedStartsPerTray: 0,
      numTrays: 0,
      trayNumbers: '',
      ...cropData
    });

    setView('plantingWizard');
    setStep(1);
  };

  // Create planting plan
  const handleCreatePlan = () => {
    const plantings = [];
    
    for (let i = 0; i < plantingForm.numPlantings; i++) {
      const bedNumber = plantingForm.bedNumber + i;
      
      if (!isBedAvailable(currentLocation.id, bedNumber)) {
        alert(`Bed ${bedNumber} is already planted and not harvested yet!`);
        return;
      }

      const planting = {
        id: Date.now() + i,
        crop: currentCrop,
        location: currentLocation,
        bedNumber: bedNumber,
        ...plantingForm,
        createdAt: new Date().toISOString(),
        harvested: false
      };

      plantings.push(planting);
      
      // Mark bed as planted
      const key = `${currentLocation.id}-${bedNumber}`;
      setPlantedBeds(prev => ({
        ...prev,
        [key]: planting
      }));
    }

    console.log('Planting Plans Created:', plantings);
    alert(`Successfully created ${plantings.length} planting(s)! Check console for details.`);
    
    setView('locations');
    setCurrentCrop(null);
    setCurrentLocation(null);
    setStep(1);
  };

  // Get available beds for a location
  const getAvailableBeds = (locationId) => {
    const location = locations.find(l => l.id === locationId);
    if (!location) return [];
    
    const beds = [];
    for (let i = 1; i <= location.numBeds; i++) {
      beds.push({
        number: i,
        available: isBedAvailable(locationId, i)
      });
    }
    return beds;
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
                <button
                  onClick={() => setView('addCrop')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Plus className="w-5 h-5" />
                  New Crop Type
                </button>
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
                    Add a new crop type
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Grow Locations</h2>
                {loading && <Loader className="w-5 h-5 animate-spin text-blue-600" />}
              </div>
              
              {locations.length === 0 && !loading ? (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No locations found</p>
                  <button
                    onClick={fetchLocations}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Refresh Locations
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {locations.map(location => {
                    const availableBeds = getAvailableBeds(location.id);
                    const allBedsPlanted = availableBeds.every(bed => !bed.available);
                    
                    return (
                      <div key={location.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{location.name}</h3>
                            <p className="text-sm text-gray-500">
                              {location.plantingFormat} • {location.areaSqm.toFixed(2)} sqm • {location.numBeds} beds
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

                        {/* Bed Status */}
                        <div className="mb-4 pb-4 border-b">
                          <p className="text-sm font-medium text-gray-700 mb-2">Bed Status:</p>
                          <div className="flex gap-2 flex-wrap">
                            {availableBeds.map(bed => (
                              <span
                                key={bed.number}
                                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                                  bed.available
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                Bed {bed.number}: {bed.available ? 'Available' : 'Planted'}
                              </span>
                            ))}
                          </div>
                        </div>

                        {crops.length > 0 && !allBedsPlanted && (
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

                        {allBedsPlanted && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                            <p className="text-sm text-amber-800">
                              All beds are currently planted. Harvest existing crops to free up beds.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Planting Wizard */}
        {view === 'plantingWizard' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setView('locations')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">New Planting</h2>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium">Crop Type & Location</span>
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

            {/* Step 1: Crop Type & Location */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-gray-600">
                        {currentCrop.type.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {currentCrop.type}, {currentCrop.variety}
                      </h3>
                      <p className="text-sm text-gray-600">{currentLocation.name} - Bed: 01</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {currentCrop.internalId}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Botanical Name:</span>
                      <span className="font-medium text-gray-800">{currentCrop.botanicalName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium text-gray-800">{currentLocation.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Beds:</span>
                      <span className="font-medium text-gray-800">
                        {getAvailableBeds(currentLocation.id).filter(b => b.available).length} of {currentLocation.numBeds}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number Of Plantings
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={getAvailableBeds(currentLocation.id).filter(b => b.available).length}
                    value={plantingForm.numPlantings}
                    onChange={(e) => setPlantingForm({ ...plantingForm, numPlantings: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Schedule plantings across multiple beds (max: {getAvailableBeds(currentLocation.id).filter(b => b.available).length} available beds)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Starting Bed Number
                  </label>
                  <select
                    value={plantingForm.bedNumber}
                    onChange={(e) => setPlantingForm({ ...plantingForm, bedNumber: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {getAvailableBeds(currentLocation.id)
                      .filter(bed => bed.available)
                      .map(bed => (
                        <option key={bed.number} value={bed.number}>
                          Bed {bed.number}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Planting Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800 font-medium mb-2">
                    ✓ Auto-predicted planting details based on {currentCrop.type}
                  </p>
                  <p className="text-xs text-green-700">
                    Planting {plantingForm.numPlantings} bed(s) starting from Bed {plantingForm.bedNumber}
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">First Planting Details</h3>
                  
                  <div className="space-y-4">
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
                        <option value="Start in Trays, Transplant in Ground">Start in Trays, Transplant in Ground</option>
                        <option value="Transplant">Transplant</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Growth Stage
                      </label>
                      <select
                        value={plantingForm.growthStage}
                        onChange={(e) => setPlantingForm({ ...plantingForm, growthStage: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="Seed Started">Seed Started</option>
                        <option value="Transplanted">Transplanted</option>
                        <option value="Growing">Growing</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Seed Started
                        </label>
                        <input
                          type="date"
                          value={plantingForm.seedStarted}
                          onChange={(e) => setPlantingForm({ ...plantingForm, seedStarted: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Planted
                        </label>
                        <input
                          type="date"
                          value={plantingForm.planted}
                          onChange={(e) => setPlantingForm({ ...plantingForm, planted: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Plant Spacing
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="0.01"
                            value={plantingForm.plantSpacing}
                            onChange={(e) => setPlantingForm({ ...plantingForm, plantSpacing: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                            cm
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Row Spacing
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="0.01"
                            value={plantingForm.rowSpacing}
                            onChange={(e) => setPlantingForm({ ...plantingForm, rowSpacing: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                            cm
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Planted Row Length
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="0.1"
                            value={plantingForm.plantedRowLength}
                            onChange={(e) => setPlantingForm({ ...plantingForm, plantedRowLength: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                            Meters
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rows
                        </label>
                        <input
                          type="number"
                          value={plantingForm.rows}
                          onChange={(e) => setPlantingForm({ ...plantingForm, rows: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Electronic Id
                      </label>
                      <input
                        type="text"
                        value={plantingForm.electronicId}
                        onChange={(e) => setPlantingForm({ ...plantingForm, electronicId: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Harvest Plan</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Planned First Harvest
                      </label>
                      <input
                        type="date"
                        value={plantingForm.plannedHarvest}
                        onChange={(e) => setPlantingForm({ ...plantingForm, plannedHarvest: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Harvest Amount
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          step="0.01"
                          value={plantingForm.expectedHarvestAmount}
                          onChange={(e) => setPlantingForm({ ...plantingForm, expectedHarvestAmount: parseFloat(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <span className="flex items-center px-3 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg">
                          Bales
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Seed Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seed Company
                      </label>
                      <input
                        type="text"
                        value={plantingForm.seedCompany}
                        onChange={(e) => setPlantingForm({ ...plantingForm, seedCompany: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seed Type
                      </label>
                      <select
                        value={plantingForm.seedType}
                        onChange={(e) => setPlantingForm({ ...plantingForm, seedType: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Organic">Organic</option>
                        <option value="Heirloom">Heirloom</option>
                        <option value="GMO">GMO</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lot Number
                        </label>
                        <input
                          type="text"
                          value={plantingForm.lotNumber}
                          onChange={(e) => setPlantingForm({ ...plantingForm, lotNumber: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Origin
                        </label>
                        <input
                          type="text"
                          value={plantingForm.origin}
                          onChange={(e) => setPlantingForm({ ...plantingForm, origin: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tray Size (Cells Per Tray)
                        </label>
                        <input
                          type="number"
                          value={plantingForm.traySize}
                          onChange={(e) => setPlantingForm({ ...plantingForm, traySize: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expected Starts Per Tray
                        </label>
                        <input
                          type="number"
                          value={plantingForm.expectedStartsPerTray}
                          onChange={(e) => setPlantingForm({ ...plantingForm, expectedStartsPerTray: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number Of Trays
                        </label>
                        <input
                          type="number"
                          value={plantingForm.numTrays}
                          onChange={(e) => setPlantingForm({ ...plantingForm, numTrays: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tray Numbers
                      </label>
                      <input
                        type="text"
                        value={plantingForm.trayNumbers}
                        onChange={(e) => setPlantingForm({ ...plantingForm, trayNumbers: e.target.value })}
                        placeholder="867, 53, 09"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
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
                    onClick={handleCreatePlan}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition font-semibold shadow-lg"
                  >
                    Create Planting
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