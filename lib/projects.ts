export type Project = {
  id: string;           // slug (same as folder name)
  title: string;
  description?: string;
  location?: string;
  images: string[];     // first is the grid tile (thumb)
};

// Helper to make URLs from /public
const p = (slug: string, file: string) => `/projects/${slug}/${file}`;

export const PROJECTS: Project[] = [
  {
    id: "sanktgores",
    title: "Sankt Görens Townhouse",
    description: "Nidus",
    location: "Düsseldorf, Germany",
    images: [
    p("sanktgores", "thumb.jpg"),
    p("sanktgores", "01.jpg"),
    p("sanktgores", "02.jpg"),
    p("sanktgores", "03.jpg"),
    p("sanktgores", "04.jpg"),
    p("sanktgores", "05.jpg"),
    p("sanktgores", "06.jpg"),
    ],
  },
  {
    id: "teahouse",
    title: "TEA WELL Store",
    description: "Ruhaus Studio",
    location: "Shen Zhen, China",
    images: [
    p("teahouse", "thumb.jpg"),
    p("teahouse", "01.jpg"),
    p("teahouse", "02.jpg"),
    p("teahouse", "03.jpg"),
    p("teahouse", "04.jpg"),
    p("teahouse", "05.jpg"),
    p("teahouse", "06.jpg"),
    p("teahouse", "07.jpg"),
    ],
  },
  {
    id: "beatbuilding",
    title: "Beat Building",
    description: "OSPA Arquitetura e Urbanismo",
    location: "Porto Alegre, Brazil",
    images: [
    p("beatbuilding", "thumb.jpg"),
    p("beatbuilding", "01.jpg"),
    p("beatbuilding", "02.jpg"),
    p("beatbuilding", "03.jpg"),
    p("beatbuilding", "04.jpg"),

    ],
  },
  {
    id: "ipehouse",
    title: "Ipe House",
    description: "Terra Arquitetura",
    location: "Sao Roque, Brazil",
    images: [
    p("ipehouse", "thumb.jpg"),
    p("ipehouse", "01.jpg"),
    p("ipehouse", "02.jpg"),
    p("ipehouse", "03.jpg"),
    p("ipehouse", "04.jpg"),


    ],
  },
  {
    id: "velostation",
    title: "Velo Station",
    description: "WaArchi Studio",
    location: "Rotterdam, Nethderlands",
    images: [
    p("velostation", "thumb.jpg"),
    p("velostation", "01.jpg"),
    p("velostation", "02.jpg"),
    ],
  },
  {
  id: "binome",
  title: "BINÔME Multi-residence",
  description: "APPAREIL architecture",
  location: "Montréal, Canada",
  images: [
  p("binome", "thumb.jpg"),
  p("binome", "01.jpg"),
  p("binome", "02.jpg"),
  p("binome", "03.jpg"),
  p("binome", "04.jpg"),
  p("binome", "05.jpg"),
  p("binome", "06.jpg")
  ],
},
  // add more...
];
