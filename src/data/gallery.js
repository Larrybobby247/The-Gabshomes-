// src/data/gallery.js
import room1 from "../assets/room1.jpg";
import parlor from "../assets/parlor.jpg";
import dining from "../assets/dining.jpg";
import kitchen1 from "../assets/kitchen1.jpg";
import toilet from "../assets/toilet.jpg";
import amenities from "../assets/amenities.jpg";

// Reduced from the old long list to 6 photos.
// The 6 items match the 6-slot span pattern used in Home.jsx.
export const gallery = [
  { id: "g-parlor", category: "Living", src: parlor, alt: "Parlor" },
  { id: "g-room1", category: "Bedrooms", src: room1, alt: "Bedroom" },
  { id: "g-dining", category: "Living", src: dining, alt: "Dining area" },
  { id: "g-kitchen", category: "Kitchen & Bath", src: kitchen1, alt: "Kitchen" },
  { id: "g-toilet", category: "Kitchen & Bath", src: toilet, alt: "Bathroom" },
  { id: "g-amenities", category: "Amenities", src: amenities, alt: "Estate amenities" },
];

export const galleryCategories = [
  "All",
  "Bedrooms",
  "Living",
  "Kitchen & Bath",
  "Amenities",
];