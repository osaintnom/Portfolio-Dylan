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
    alt: "Automotive photography \u2014 1",
    title: "Autos \u00b7 01",
    category: "Autos",
    aspect: "portrait",
  },
  {
    id: "autos-02",
    src: "/photos/autos-02.jpg",
    alt: "Automotive photography \u2014 2",
    title: "Autos \u00b7 02",
    category: "Autos",
    aspect: "landscape",
  },
  {
    id: "autos-03",
    src: "/photos/autos-03.jpg",
    alt: "Automotive photography \u2014 3",
    title: "Autos \u00b7 03",
    category: "Autos",
    aspect: "landscape",
  },
  {
    id: "moto-01",
    src: "/photos/moto-01.jpg",
    alt: "Motorcycle photography \u2014 1",
    title: "Moto \u00b7 01",
    category: "Moto",
    aspect: "landscape",
    priority: true,
  },
  {
    id: "moto-02",
    src: "/photos/moto-02.jpg",
    alt: "Motorcycle photography \u2014 2",
    title: "Moto \u00b7 02",
    category: "Moto",
    aspect: "landscape",
  },
  {
    id: "moto-03",
    src: "/photos/moto-03.jpg",
    alt: "Motorcycle photography \u2014 3",
    title: "Moto \u00b7 03",
    category: "Moto",
    aspect: "landscape",
  },
  {
    id: "moto-04",
    src: "/photos/moto-04.jpg",
    alt: "Motorcycle photography \u2014 4",
    title: "Moto \u00b7 04",
    category: "Moto",
    aspect: "landscape",
  },
  {
    id: "moto-05",
    src: "/photos/moto-05.jpg",
    alt: "Motorcycle photography \u2014 5",
    title: "Moto \u00b7 05",
    category: "Moto",
    aspect: "landscape",
  },
  {
    id: "moto-06",
    src: "/photos/moto-06.jpg",
    alt: "Motorcycle photography \u2014 6",
    title: "Moto \u00b7 06",
    category: "Moto",
    aspect: "landscape",
  },
  {
    id: "moto-07",
    src: "/photos/moto-07.jpg",
    alt: "Motorcycle photography \u2014 7",
    title: "Moto \u00b7 07",
    category: "Moto",
    aspect: "landscape",
  },
  {
    id: "moto-08",
    src: "/photos/moto-08.jpg",
    alt: "Motorcycle photography \u2014 8",
    title: "Moto \u00b7 08",
    category: "Moto",
    aspect: "landscape",
  },
  {
    id: "moto-09",
    src: "/photos/moto-09.jpg",
    alt: "Motorcycle photography \u2014 9",
    title: "Moto \u00b7 09",
    category: "Moto",
    aspect: "landscape",
  },
  {
    id: "moto-10",
    src: "/photos/moto-10.jpg",
    alt: "Motorcycle photography \u2014 10",
    title: "Moto \u00b7 10",
    category: "Moto",
    aspect: "portrait",
  },
  {
    id: "moto-11",
    src: "/photos/moto-11.jpg",
    alt: "Motorcycle photography \u2014 11",
    title: "Moto \u00b7 11",
    category: "Moto",
    aspect: "landscape",
  },
  {
    id: "moto-12",
    src: "/photos/moto-12.jpg",
    alt: "Motorcycle photography \u2014 12",
    title: "Moto \u00b7 12",
    category: "Moto",
    aspect: "portrait",
  },
  {
    id: "joyeria-01",
    src: "/photos/joyeria-01.jpg",
    alt: "Jewelry product photography \u2014 1",
    title: "Joyer\u00eda \u00b7 01",
    category: "Joyer\u00eda",
    aspect: "portrait",
  },
  {
    id: "joyeria-02",
    src: "/photos/joyeria-02.jpg",
    alt: "Jewelry product photography \u2014 2",
    title: "Joyer\u00eda \u00b7 02",
    category: "Joyer\u00eda",
    aspect: "portrait",
  },
  {
    id: "joyeria-03",
    src: "/photos/joyeria-03.jpg",
    alt: "Jewelry product photography \u2014 3",
    title: "Joyer\u00eda \u00b7 03",
    category: "Joyer\u00eda",
    aspect: "portrait",
  },
  {
    id: "ropa-01",
    src: "/photos/ropa-01.jpg",
    alt: "Fashion / apparel photography \u2014 1",
    title: "Ropa \u00b7 01",
    category: "Ropa",
    aspect: "portrait",
  },
  {
    id: "ropa-02",
    src: "/photos/ropa-02.jpg",
    alt: "Fashion / apparel photography \u2014 2",
    title: "Ropa \u00b7 02",
    category: "Ropa",
    aspect: "portrait",
  },
  {
    id: "ropa-03",
    src: "/photos/ropa-03.jpg",
    alt: "Fashion / apparel photography \u2014 3",
    title: "Ropa \u00b7 03",
    category: "Ropa",
    aspect: "portrait",
  },
  {
    id: "estudio-01",
    src: "/photos/estudio-01.jpg",
    alt: "Studio photography \u2014 1",
    title: "Estudio \u00b7 01",
    category: "Estudio",
    aspect: "portrait",
  },
  {
    id: "estudio-02",
    src: "/photos/estudio-02.jpg",
    alt: "Studio photography \u2014 2",
    title: "Estudio \u00b7 02",
    category: "Estudio",
    aspect: "landscape",
  },
];

export const categories = (): string[] => [
  "All",
  ...Array.from(new Set(photos.map((p) => p.category).filter(Boolean) as string[]))
];

/** Featured image used in the hero. Falls back to the first photo. */
export const heroPhoto = (): Photo => photos.find((p) => p.priority) ?? photos[0];
