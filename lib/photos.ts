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
};

export const photos: Photo[] = [
  {
    id: "autos-01",
    src: "/photos/autos-01.jpg",
    alt: "Automobiles photography — 1",
    title: "Automobiles · 01",
    category: "Automobiles",
    aspect: "portrait",
  },
  {
    id: "autos-02",
    src: "/photos/autos-02.jpg",
    alt: "Automobiles photography — 2",
    title: "Automobiles · 02",
    category: "Automobiles",
    aspect: "landscape",
  },
  {
    id: "autos-03",
    src: "/photos/autos-03.jpg",
    alt: "Automobiles photography — 3",
    title: "Automobiles · 03",
    category: "Automobiles",
    aspect: "landscape",
  },
  {
    id: "moto-01",
    src: "/photos/moto-01.jpg",
    alt: "Motorcycle photography — 1",
    title: "Motorcycles · 01",
    category: "Motorcycles",
    aspect: "landscape",
    priority: true,
  },
  {
    id: "moto-02",
    src: "/photos/moto-02.jpg",
    alt: "Motorcycle photography — 2",
    title: "Motorcycles · 02",
    category: "Motorcycles",
    aspect: "landscape",
  },
  {
    id: "moto-03",
    src: "/photos/moto-03.jpg",
    alt: "Motorcycle photography — 3",
    title: "Motorcycles · 03",
    category: "Motorcycles",
    aspect: "landscape",
  },
  {
    id: "moto-04",
    src: "/photos/moto-04.jpg",
    alt: "Motorcycle photography — 4",
    title: "Motorcycles · 04",
    category: "Motorcycles",
    aspect: "landscape",
  },
  {
    id: "moto-05",
    src: "/photos/moto-05.jpg",
    alt: "Motorcycle photography — 5",
    title: "Motorcycles · 05",
    category: "Motorcycles",
    aspect: "landscape",
  },
  {
    id: "moto-06",
    src: "/photos/moto-06.jpg",
    alt: "Motorcycle photography — 6",
    title: "Motorcycles · 06",
    category: "Motorcycles",
    aspect: "landscape",
  },
  {
    id: "moto-07",
    src: "/photos/moto-07.jpg",
    alt: "Motorcycle photography — 7",
    title: "Motorcycles · 07",
    category: "Motorcycles",
    aspect: "landscape",
  },
  {
    id: "moto-08",
    src: "/photos/moto-08.jpg",
    alt: "Motorcycle photography — 8",
    title: "Motorcycles · 08",
    category: "Motorcycles",
    aspect: "landscape",
  },
  {
    id: "moto-09",
    src: "/photos/moto-09.jpg",
    alt: "Motorcycle photography — 9",
    title: "Motorcycles · 09",
    category: "Motorcycles",
    aspect: "landscape",
  },
  {
    id: "moto-10",
    src: "/photos/moto-10.jpg",
    alt: "Motorcycle photography — 10",
    title: "Motorcycles · 10",
    category: "Motorcycles",
    aspect: "portrait",
  },
  {
    id: "moto-11",
    src: "/photos/moto-11.jpg",
    alt: "Motorcycle photography — 11",
    title: "Motorcycles · 11",
    category: "Motorcycles",
    aspect: "landscape",
  },
  {
    id: "moto-12",
    src: "/photos/moto-12.jpg",
    alt: "Motorcycle photography — 12",
    title: "Motorcycles · 12",
    category: "Motorcycles",
    aspect: "portrait",
  },
  {
    id: "joyeria-01",
    src: "/photos/joyeria-01.jpg",
    alt: "Jewelry product photography — 1",
    title: "Jewelry · 01",
    category: "Jewelry",
    aspect: "portrait",
  },
  {
    id: "joyeria-02",
    src: "/photos/joyeria-02.jpg",
    alt: "Jewelry product photography — 2",
    title: "Jewelry · 02",
    category: "Jewelry",
    aspect: "portrait",
  },
  {
    id: "joyeria-03",
    src: "/photos/joyeria-03.jpg",
    alt: "Jewelry product photography — 3",
    title: "Jewelry · 03",
    category: "Jewelry",
    aspect: "portrait",
  },
  {
    id: "ropa-01",
    src: "/photos/ropa-01.jpg",
    alt: "Fashion / apparel photography — 1",
    title: "Fashion · 01",
    category: "Fashion",
    aspect: "portrait",
  },
  {
    id: "ropa-02",
    src: "/photos/ropa-02.jpg",
    alt: "Fashion / apparel photography — 2",
    title: "Fashion · 02",
    category: "Fashion",
    aspect: "portrait",
  },
  {
    id: "ropa-03",
    src: "/photos/ropa-03.jpg",
    alt: "Fashion / apparel photography — 3",
    title: "Fashion · 03",
    category: "Fashion",
    aspect: "portrait",
  },
  {
    id: "estudio-01",
    src: "/photos/estudio-01.jpg",
    alt: "Studio photography — 1",
    title: "Studio · 01",
    category: "Studio",
    aspect: "portrait",
  },
  {
    id: "estudio-02",
    src: "/photos/estudio-02.jpg",
    alt: "Studio photography — 2",
    title: "Studio · 02",
    category: "Studio",
    aspect: "landscape",
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
    key: "Fashion",
    label: "Fashion",
    description: "Apparel, look-books, on-figure.",
    cover: "/photos/ropa-01.jpg",
  },
  {
    key: "Studio",
    label: "Studio",
    description: "Commissioned studio sessions.",
    cover: "/photos/estudio-01.jpg",
  },
];
