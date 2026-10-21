const imageModules = import.meta.glob(
  "../../assets/hobby/photoGallery/**/*.{jpg,JPG,jpeg}",
  { eager: true, import: "default", query: "?url" },
);

const titleCase = (value) =>
  value
    .replace(/\.[^.]+$/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const titleOverrides = {
  BangladeshRainwayHaorExpress: "Bangladesh Railway · Haor Express",
  bhairab: "Bhairab",
  Comilla2022: "Cumilla 2022",
  Comilla2022shalBon: "Cumilla Shalbon",
  NowakhaliAlexendar: "Noakhali Alexander Ghat",
  NowakhaliAlexendarFace: "Noakhali Alexander Ghat",
  NowakhaliChairmanGhat: "Noakhali Chairman Ghat",
  NowakhaliChairmanGhatOnFerry: "Noakhali Chairman Ghat · Ferry",
  coxbazar2026: "Cox's Bazar",
  gazipurBhawal: "Bhawal National Park",
  gazipurBhawalPong: "Bhawal National Park · Pong",
  gazipurMawna: "Mawna, Gazipur",
  habigonj2022LawyachoraRaillinee: "Lawachara Railway Line",
  habigonj2022Teagarden: "Tea Garden, Moulvibazar",
  habigonjSatchori2022: "Satchari National Park",
  habigonjSatchori2022Lawyachora: "Satchari · Lawachara",
  "mirinjaVelley Bandarban": "Mirinja Valley, Bandarban",
  modhuKhaliTangail: "Madhukhali, Tangail",
  mymenshing: "Mymensingh",
  narsindi: "Narsingdi",
  napittachora: "Napittachora Waterfall",
  netrokona2022: "Netrokona",
  puranDhakaAhsanMonjil: "Ahsan Manzil, Old Dhaka",
  ranggamatiJulontoBridge: "Rangamati Hanging Bridge",
  saintMartin: "Saint Martin's Island",
  saintMartin2021CheraDip: "Chera Dwip, Saint Martin's Island",
  shitakundoSuptoDhara: "Suptadhara Waterfall",
  shitakundoSuptoDharaHappy: "Suptadhara Waterfall",
  sunamganjTanguarHaor2025InsideSShimulBagan:
    "Tanguar Haor · Shimul Bagan",
  sunamgonjTanguarHaor2025ShimulBagan: "Tanguar Haor · Shimul Bagan",
  sunamgonjTanguarHaor2026: "Tanguar Haor",
  sunamgonjTanguarHaor2026ShimulBagan: "Tanguar Haor · Shimul Bagan",
  sunamgonjTanguarHaor2026WatchTower: "Tanguar Haor · Watchtower",
  sunamgonjTanguarHaor2026WatchTowerLifeJacket:
    "Tanguar Haor · Watchtower",
  sylhetBichanaKandi: "Bichanakandi",
  sylhetJaflong: "Jaflong",
  sylhetLalaKhal: "Lalakhal",
  tangailCircuitHouse: "Tangail Circuit House",
  tangailCity: "Tangail City",
  Darjeeling: "Darjeeling",
  Meghalaya: "Meghalaya",
  eastSikkim: "East Sikkim",
  hawraBridgeKolkata: "Howrah Bridge, Kolkata",
  kolkataVictoriaMemorial: "Victoria Memorial, Kolkata",
  siliguri: "Siliguri",
  tajmahalJumpPicture: "Taj Mahal, Agra",
};

const bangladeshDistricts = {
  BangladeshRainwayHaorExpress: "Sunamganj",
  bhairab: "Kishoreganj",
  Chandranath: "Chattogram",
  Comilla2022: "Cumilla",
  Comilla2022shalBon: "Cumilla",
  NowakhaliAlexendar: "Noakhali",
  NowakhaliAlexendarFace: "Noakhali",
  NowakhaliChairmanGhat: "Noakhali",
  NowakhaliChairmanGhatOnFerry: "Noakhali",
  coxbazar2026: "Cox's Bazar",
  gazipurBhawal: "Gazipur",
  gazipurBhawalPong: "Gazipur",
  gazipurMawna: "Gazipur",
  habigonj2022LawyachoraRaillinee: "Moulvibazar",
  habigonj2022Teagarden: "Moulvibazar",
  habigonjSatchori2022: "Habiganj",
  habigonjSatchori2022Lawyachora: "Habiganj",
  "mirinjaVelley Bandarban": "Bandarban",
  modhuKhaliTangail: "Tangail",
  mohamayaLake: "Chattogram",
  mymenshing: "Mymensingh",
  narsindi: "Narsingdi",
  napittachora: "Chattogram",
  netrokona2022: "Netrokona",
  puranDhakaAhsanMonjil: "Dhaka",
  rajshahi: "Rajshahi",
  rajshahiSaadBiyaUposohor: "Rajshahi",
  ranggamatiJulontoBridge: "Rangamati",
  saintMartin: "Saint Martin's Island",
  saintMartin2021CheraDip: "Saint Martin's Island",
  shitakundoSuptoDhara: "Chattogram",
  shitakundoSuptoDharaHappy: "Chattogram",
  sunamganjTanguarHaor2025InsideSShimulBagan: "Sunamganj",
  sunamgonjTanguarHaor2025ShimulBagan: "Sunamganj",
  sunamgonjTanguarHaor2026: "Sunamganj",
  sunamgonjTanguarHaor2026ShimulBagan: "Sunamganj",
  sunamgonjTanguarHaor2026WatchTower: "Sunamganj",
  sunamgonjTanguarHaor2026WatchTowerLifeJacket: "Sunamganj",
  sylhetBichanaKandi: "Sylhet",
  sylhetJaflong: "Sylhet",
  sylhetLalaKhal: "Sylhet",
  tangailCircuitHouse: "Tangail",
  tangailCity: "Tangail",
};

const indiaStates = {
  Darjeeling: "West Bengal",
  Meghalaya: "Meghalaya",
  eastSikkim: "Sikkim",
  hawraBridgeKolkata: "West Bengal",
  kolkataVictoriaMemorial: "West Bengal",
  siliguri: "West Bengal",
  tajmahalJumpPicture: "Uttar Pradesh",
};

export const galleryItems = Object.entries(imageModules)
  .map(([path, image]) => {
    const filename = path.split("/").pop();
    const category = path.includes("/india/") ? "India" : "Bangladesh";
    const key = filename.replace(/\.[^.]+$/, "");
    const title = titleOverrides[key] || titleCase(filename);
    const region =
      category === "India"
        ? indiaStates[key] || "India"
        : bangladeshDistricts[key] || "Bangladesh";

    return {
      id: `${category.toLowerCase()}-${filename.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      image,
      title,
      location: `${title} · ${category}`,
      category,
      region,
      alt: `${title} travel photograph from ${category}`,
    };
  })
  .sort((first, second) => first.title.localeCompare(second.title));

export const featuredGalleryItems = [
  ...galleryItems.filter((item) => item.category === "Bangladesh").slice(0, 4),
  ...galleryItems
    .filter((item) => item.category === "India")
    .sort((first, second) => {
      if (first.title.startsWith("Taj Mahal")) return -1;
      if (second.title.startsWith("Taj Mahal")) return 1;
      return first.title.localeCompare(second.title);
    })
    .slice(0, 6),
];
