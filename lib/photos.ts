/**
 * Photos manifest — auto-generated from /photos dylan/.
 *
 * To add or remove photos:
 *   1. Drop new files into public/photos/ (use .jpg, long edge ~2400px).
 *   2. Add an entry to this array — order in the array = order on the page.
 *   3. Set `priority: true` on the single photo you want as the hero.
 */

export type PhotoAspect = "portrait" | "landscape" | "square";

export type Photo = {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  aspect: PhotoAspect;
  priority?: boolean;
  /** Camera + lens used for the shot, shown in the lightbox. */
  camera?: string;
};

/** Camera spec presets to keep the manifest tidy. */
const CAM_AUTOS = "Sony · 70–200mm Sigma f/4";
const CAM_MOTO = "Sony A7 III · 70–200mm f/2.8";
const CAM_ATTIRE = "Nikon D7000 · AF-S Nikkor 18–105mm f/3.5–5.6";
const CAM_JEWELRY = "Nikon D7000 · AF-S Micro Nikkor 60mm f/2.8";

export const photos: Photo[] = [
  {
    id: "autos-01",
    src: "/photos/autos-01.jpg",
    alt: "Automobiles photography — 1",
    title: "Automobiles · 01",
    category: "Automobiles",
    aspect: "portrait",
    camera: CAM_AUTOS,
  },
  {
    id: "autos-02",
    src: "/photos/autos-02.jpg",
    alt: "Automobiles photography — 2",
    title: "Automobiles · 02",
    category: "Automobiles",
    aspect: "landscape",
    camera: CAM_AUTOS,
  },
  {
    id: "autos-03",
    src: "/photos/autos-03.jpg",
    alt: "Automobiles photography — 3",
    title: "Automobiles · 03",
    category: "Automobiles",
    aspect: "landscape",
    camera: CAM_AUTOS,
  },
  {
    id: "moto-01",
    src: "/photos/moto-01.jpg",
    alt: "Motorcycle photography — 1",
    title: "Motorcycles · 01",
    category: "Motorcycles",
    aspect: "landscape",
    priority: true,
    camera: CAM_MOTO,
  },
  {
    id: "moto-02",
    src: "/photos/moto-02.jpg",
    alt: "Motorcycle photography — 2",
    title: "Motorcycles · 02",
    category: "Motorcycles",
    aspect: "landscape",
    camera: CAM_MOTO,
  },
  {
    id: "moto-03",
    src: "/photos/moto-03.jpg",
    alt: "Motorcycle photography — 3",
    title: "Motorcycles · 03",
    category: "Motorcycles",
    aspect: "landscape",
    camera: CAM_MOTO,
  },
  {
    id: "moto-04",
    src: "/photos/moto-04.jpg",
    alt: "Motorcycle photography — 4",
    title: "Motorcycles · 04",
    category: "Motorcycles",
    aspect: "landscape",
    camera: CAM_MOTO,
  },
  {
    id: "moto-05",
    src: "/photos/moto-05.jpg",
    alt: "Motorcycle photography — 5",
    title: "Motorcycles · 05",
    category: "Motorcycles",
    aspect: "landscape",
    camera: CAM_MOTO,
  },
  {
    id: "moto-06",
    src: "/photos/moto-06.jpg",
    alt: "Motorcycle photography — 6",
    title: "Motorcycles · 06",
    category: "Motorcycles",
    aspect: "landscape",
    camera: CAM_MOTO,
  },
  {
    id: "moto-07",
    src: "/photos/moto-07.jpg",
    alt: "Motorcycle photography — 7",
    title: "Motorcycles · 07",
    category: "Motorcycles",
    aspect: "landscape",
    camera: CAM_MOTO,
  },
  {
    id: "moto-08",
    src: "/photos/moto-08.jpg",
    alt: "Motorcycle photography — 8",
    title: "Motorcycles · 08",
    category: "Motorcycles",
    aspect: "landscape",
    camera: CAM_MOTO,
  },
  {
    id: "moto-09",
    src: "/photos/moto-09.jpg",
    alt: "Motorcycle photography — 9",
    title: "Motorcycles · 09",
    category: "Motorcycles",
    aspect: "landscape",
    camera: CAM_MOTO,
  },
  {
    id: "moto-10",
    src: "/photos/moto-10.jpg",
    alt: "Motorcycle photography — 10",
    title: "Motorcycles · 10",
    category: "Motorcycles",
    aspect: "portrait",
    camera: CAM_MOTO,
  },
  {
    id: "moto-11",
    src: "/photos/moto-11.jpg",
    alt: "Motorcycle photography — 11",
    title: "Motorcycles · 11",
    category: "Motorcycles",
    aspect: "landscape",
    camera: CAM_MOTO,
  },
  {
    id: "moto-12",
    src: "/photos/moto-12.jpg",
    alt: "Motorcycle photography — 12",
    title: "Motorcycles · 12",
    category: "Motorcycles",
    aspect: "portrait",
    camera: CAM_MOTO,
  },
  {
    id: "joyeria-01",
    src: "/photos/joyeria-01.jpg",
    alt: "Jewelry product photography — 1",
    title: "Jewelry · 01",
    category: "Jewelry",
    aspect: "portrait",
    camera: CAM_JEWELRY,
  },
  {
    id: "joyeria-02",
    src: "/photos/joyeria-02.jpg",
    alt: "Jewelry product photography — 2",
    title: "Jewelry · 02",
    category: "Jewelry",
    aspect: "portrait",
    camera: CAM_JEWELRY,
  },
  {
    id: "joyeria-03",
    src: "/photos/joyeria-03.jpg",
    alt: "Jewelry product photography — 3",
    title: "Jewelry · 03",
    category: "Jewelry",
    aspect: "portrait",
    camera: CAM_JEWELRY,
  },
  {
    id: "joyeria-04",
    src: "/photos/joyeria-04.jpg",
    alt: "Jewelry product photography — carbon necklace",
    title: "Jewelry · 04",
    category: "Jewelry",
    aspect: "portrait",
    camera: CAM_ATTIRE,
  },
  {
    id: "ropa-01",
    src: "/photos/ropa-01.jpg",
    alt: "Attire photography — 1",
    title: "Attire · 01",
    category: "Attire",
    aspect: "portrait",
    camera: CAM_ATTIRE,
  },
  {
    id: "ropa-02",
    src: "/photos/ropa-02.jpg",
    alt: "Attire photography — 2",
    title: "Attire · 02",
    category: "Attire",
    aspect: "portrait",
    camera: CAM_ATTIRE,
  },
  {
    id: "ropa-03",
    src: "/photos/ropa-03.jpg",
    alt: "Attire photography — 3",
    title: "Attire · 03",
    category: "Attire",
    aspect: "portrait",
    camera: CAM_ATTIRE,
  },
  {
    id: "estudio-01",
    src: "/photos/estudio-01.jpg",
    alt: "Attire photography — 4",
    title: "Attire · 04",
    category: "Attire",
    aspect: "portrait",
    camera: CAM_ATTIRE,
  },
  {
    id: "estudio-02",
    src: "/photos/estudio-02.jpg",
    alt: "Attire photography — 5",
    title: "Attire · 05",
    category: "Attire",
    aspect: "landscape",
    camera: CAM_ATTIRE,
  },
];

export const categories = (): string[] => [
  "All",
  ...Array.from(new Set(photos.map((p) => p.category).filter(Boolean) as string[])),
];

/** Featured image used in the hero. Falls back to the first photo. */
export const heroPhoto = (): Photo => photos.find((p) => p.priority) ?? photos[0];

/**
 * Category metadata used by the homepage CategoryDirectory.
 * Order = order shown in the expandable strip.
 *
 * `cover` should be one of the strongest images per category — it carries
 * the whole panel until the user hovers it open.
 */
export type CategoryMeta = {
  key: string;
  label: string;
  description: string;
  cover: string;
};

export const categoryDirectory: CategoryMeta[] = [
  {
    key: "Automobiles",
    label: "Automobiles",
    description: "Cars in motion and at rest.",
    cover: "/photos/autos-02.jpg",
  },
  {
    key: "Motorcycles",
    label: "Motorcycles",
    description: "Editorial portraits of machine and rider.",
    cover: "/photos/moto-01.jpg",
  },
  {
    key: "Jewelry",
    label: "Jewelry",
    description: "Precise product work, controlled light.",
    cover: "/photos/joyeria-01.jpg",
  },
  {
    key: "Attire",
    label: "Attire",
    description: "Apparel and studio sessions — on-figure and in-frame.",
    cover: "/photos/ropa-01.jpg",
  },
];
