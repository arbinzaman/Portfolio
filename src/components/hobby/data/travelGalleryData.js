const imageModules = import.meta.glob(
  "../../../assets/hobby/photoGallery/**/*.{jpg,JPG,jpeg}",
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
  bhairab: "Bhairab River Bridge",
  Chandranath: "Chandranath Peak, Sitakunda",
  Comilla2022: "Cumilla Town",
  Comilla2022shalBon: "Shalban Vihara, Cumilla",
  NowakhaliAlexendar: "Alexander Ghat, Noakhali",
  NowakhaliAlexendarFace: "Alexander Riverbank, Noakhali",
  NowakhaliChairmanGhat: "Chairman Ghat, Noakhali",
  NowakhaliChairmanGhatOnFerry: "Meghna Ferry, Chairman Ghat",
  coxbazar2026: "Cox's Bazar Coastline",
  gazipurBhawal: "Bhawal National Park",
  gazipurBhawalPong: "Bhawal Forest Lake",
  gazipurMawna: "Mawna, Gazipur",
  habigonj2022LawyachoraRaillinee: "Lawachara Forest Rail Trail",
  habigonj2022Teagarden: "Moulvibazar Tea Estate",
  habigonjSatchori2022: "Satchari National Park",
  habigonjSatchori2022Lawyachora: "Lawachara Rainforest Canopy",
  "mirinjaVelley Bandarban": "Mirinja Valley, Bandarban",
  modhuKhaliTangail: "Madhukhali, Tangail",
  mohamayaLake: "Mohamaya Lake, Mirsarai",
  mymenshing: "Brahmaputra Bank, Mymensingh",
  narsindi: "Narsingdi Countryside",
  napittachora: "Napittachora Waterfall Trail",
  netrokona2022: "Netrokona Haor Horizon",
  puranDhakaAhsanMonjil: "Ahsan Manzil, Old Dhaka",
  rajshahi: "Padma Riverfront, Rajshahi",
  rajshahiSaadBiyaUposohor: "Upashahar, Rajshahi",
  ranggamatiJulontoBridge: "Hanging Bridge, Rangamati",
  saintMartin: "Saint Martin's Coral Island",
  saintMartin2021CheraDip: "Chera Dwip, Saint Martin's",
  shitakundoSuptoDhara: "Suptadhara Waterfall, Sitakunda",
  shitakundoSuptoDharaHappy: "Suptadhara Cascade, Sitakunda",
  sunamganjTanguarHaor2025InsideSShimulBagan: "Shimul Bagan, Tanguar Haor",
  sunamgonjTanguarHaor2025ShimulBagan: "Shimul Bagan Canopy, Sunamganj",
  sunamgonjTanguarHaor2026: "Tanguar Haor Wetlands",
  sunamgonjTanguarHaor2026ShimulBagan: "Jadukata & Shimul Bagan",
  sunamgonjTanguarHaor2026WatchTower: "Tanguar Haor Watchtower",
  sunamgonjTanguarHaor2026WatchTowerLifeJacket: "Floating on Tanguar Haor",
  sylhetBichanaKandi: "Bichanakandi Stone Bed, Sylhet",
  sylhetJaflong: "Jaflong Dawki River, Sylhet",
  sylhetLalaKhal: "Lalakhal Emerald River, Sylhet",
  tangailCircuitHouse: "Tangail Circuit House",
  tangailCity: "Tangail Town",
  Darjeeling: "Darjeeling Tea Ridges",
  Meghalaya: "Meghalaya Canyon & Falls",
  eastSikkim: "East Sikkim Alpine Road",
  hawraBridgeKolkata: "Howrah Bridge, Kolkata",
  kolkataVictoriaMemorial: "Victoria Memorial, Kolkata",
  siliguri: "Siliguri Corridor",
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
  saintMartin: "Cox's Bazar",
  saintMartin2021CheraDip: "Cox's Bazar",
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

const landscapeThemeByKey = {
  tajmahalJumpPicture: "Heritage & Cities",
  kolkataVictoriaMemorial: "Heritage & Cities",
  hawraBridgeKolkata: "Heritage & Cities",
  puranDhakaAhsanMonjil: "Heritage & Cities",
  Comilla2022shalBon: "Heritage & Cities",
  Comilla2022: "Heritage & Cities",
  rajshahi: "Heritage & Cities",
  rajshahiSaadBiyaUposohor: "Heritage & Cities",
  tangailCircuitHouse: "Heritage & Cities",
  tangailCity: "Heritage & Cities",
  modhuKhaliTangail: "Heritage & Cities",
  siliguri: "Heritage & Cities",
  mymenshing: "Haors, Rivers & Coast",
  narsindi: "Heritage & Cities",
  bhairab: "Haors, Rivers & Coast",
  BangladeshRainwayHaorExpress: "Haors, Rivers & Coast",
  sunamganjTanguarHaor2025InsideSShimulBagan: "Haors, Rivers & Coast",
  sunamgonjTanguarHaor2025ShimulBagan: "Haors, Rivers & Coast",
  sunamgonjTanguarHaor2026: "Haors, Rivers & Coast",
  sunamgonjTanguarHaor2026ShimulBagan: "Haors, Rivers & Coast",
  sunamgonjTanguarHaor2026WatchTower: "Haors, Rivers & Coast",
  sunamgonjTanguarHaor2026WatchTowerLifeJacket: "Haors, Rivers & Coast",
  netrokona2022: "Haors, Rivers & Coast",
  NowakhaliAlexendar: "Haors, Rivers & Coast",
  NowakhaliAlexendarFace: "Haors, Rivers & Coast",
  NowakhaliChairmanGhat: "Haors, Rivers & Coast",
  NowakhaliChairmanGhatOnFerry: "Haors, Rivers & Coast",
  coxbazar2026: "Haors, Rivers & Coast",
  saintMartin: "Haors, Rivers & Coast",
  saintMartin2021CheraDip: "Haors, Rivers & Coast",
  sylhetBichanaKandi: "Hills, Forests & Falls",
  sylhetJaflong: "Hills, Forests & Falls",
  sylhetLalaKhal: "Haors, Rivers & Coast",
  "mirinjaVelley Bandarban": "Hills, Forests & Falls",
  ranggamatiJulontoBridge: "Hills, Forests & Falls",
  Chandranath: "Hills, Forests & Falls",
  napittachora: "Hills, Forests & Falls",
  shitakundoSuptoDhara: "Hills, Forests & Falls",
  shitakundoSuptoDharaHappy: "Hills, Forests & Falls",
  mohamayaLake: "Hills, Forests & Falls",
  habigonj2022LawyachoraRaillinee: "Hills, Forests & Falls",
  habigonj2022Teagarden: "Hills, Forests & Falls",
  habigonjSatchori2022: "Hills, Forests & Falls",
  habigonjSatchori2022Lawyachora: "Hills, Forests & Falls",
  gazipurBhawal: "Hills, Forests & Falls",
  gazipurBhawalPong: "Hills, Forests & Falls",
  gazipurMawna: "Hills, Forests & Falls",
  eastSikkim: "Himalayas & India",
  Darjeeling: "Himalayas & India",
  Meghalaya: "Himalayas & India",
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
    const theme =
      landscapeThemeByKey[key] ||
      (category === "India" ? "Himalayas & India" : "Haors, Rivers & Coast");

    return {
      id: `${category.toLowerCase()}-${filename.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      key,
      image,
      title,
      location: `${region}, ${category}`,
      category,
      region,
      theme,
      alt: `${title} — ${region}, ${category} travel photograph by Arbin Zaman`,
    };
  })
  .sort((first, second) => first.title.localeCompare(second.title));

// Hand-picked iconic 8-photo bento showcase across Bangladesh & India
const FEATURED_KEYS = [
  "tajmahalJumpPicture",
  "sunamgonjTanguarHaor2026WatchTower",
  "eastSikkim",
  "mirinjaVelley Bandarban",
  "Meghalaya",
  "saintMartin2021CheraDip",
  "Darjeeling",
  "shitakundoSuptoDhara",
  "sylhetBichanaKandi",
  "kolkataVictoriaMemorial",
  "puranDhakaAhsanMonjil",
  "habigonj2022LawyachoraRaillinee",
];

export const featuredGalleryItems = FEATURED_KEYS.map((key) =>
  galleryItems.find((item) => item.key === key),
).filter(Boolean);
