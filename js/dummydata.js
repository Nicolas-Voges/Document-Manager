dummyDataCategories = [
  {
    name: "Rechnungen",
    createdAt: "2023-01-15",
    color: "#FF5733",
    updatedAt: "2023-02-20",
    id: 1,
    parentId: null
  },
  {
    name: "2025",
    createdAt: "2025-03-10",
    color: "#ff5833a6",
    updatedAt: "2025-04-15",
    id: 2,
    parentId: 1
  },
  {
    name: "2024",
    createdAt: "2024-03-10",
    color: "#ff5833a6",
    updatedAt: "2024-04-15",
    id: 3,
    parentId: 1
  },
  {
    name: "2023",
    createdAt: "2023-03-10",
    color: "#ff5833a6",
    updatedAt: "2023-04-15",
    id: 4,
    parentId: 1
  },
  {
    name: "Versicherungen",
    createdAt: "2023-03-10",
    color: "#33e0ffff",
    updatedAt: "2023-04-15",
    id: 5,
    parentId: null
  },
  {
    name: "Auto",
    createdAt: "2023-03-10",
    color: "#33e0ffc2",
    updatedAt: "2023-04-15",
    id: 6,
    parentId: 5
  },
  {
    name: "Hausrat",
    createdAt: "2023-03-10",
    color: "#33e0ffc2",
    updatedAt: "2023-04-15",
    id: 7,
    parentId: 5
  },
  {
    name: "Lebensversicherung",
    createdAt: "2023-03-10",
    color: "#33e0ffc2",
    updatedAt: "2023-04-15",
    id: 8,
    parentId: 5
  },
  {
    name: "2025",
    createdAt: "2023-03-10",
    color: "#33e0ff8a",
    updatedAt: "2023-04-15",
    id: 9,
    parentId: 6
  },
  {
    name: "2025",
    createdAt: "2023-03-10",
    color: "#33e0ff8a",
    updatedAt: "2023-04-15",
    id: 10,
    parentId: 7
  },
  {
    name: "2025",
    createdAt: "2023-03-10",
    color: "#33e0ff8a",
    updatedAt: "2023-04-15",
    id: 11,
    parentId: 8
  },
  {
    name: "Kontoauszüge",
    createdAt: "2023-03-10",
    color: "#fcff33ff",
    updatedAt: "2025-04-15",
    id: 12,
    parentId: null
  },
  {
    name: "Verträge",
    createdAt: "2023-03-10",
    color: "#33ff5fff",
    updatedAt: "2025-04-15",
    id: 13,
    parentId: null
  },
];


dummyDataFiles = [
  // Kategorie 2 (2025 unter Rechnungen) - 2 Files
  {
    id: 3,
    name: "Rechnung Müller 2025",
    createdAt: "2025-03-01",
    docDate: "2024-07-09",
    categoryId: 2,
    originals: ["rechnungen/mueller_2025.pdf"],
    text: "Rechnung von Müller 2025.",
    searchValues: ["Müller", "2025", "Rechnung"]
  },
  {
    id: 4,
    name: "Rechnung Schornsteinfeger 2025",
    createdAt: "2025-02-27",
    docDate: "2024-07-09",
    categoryId: 2,
    originals: ["rechnungen/schornsteinfeger_2025.pdf"],
    text: "Schornsteinfeger Rechnung 2025.",
    searchValues: ["Müller", "2025", "Rechnung"]
  },

  // Kategorie 3 (2024 unter Rechnungen) - 2 Files
  {
    id: 5,
    name: "Rechnung Bäcker 2024",
    createdAt: "2024-05-20",
    docDate: "2024-07-09",
    categoryId: 3,
    originals: ["rechnungen/baecker_2024.pdf"],
    text: "Bäcker Rechnung 2024.",
    searchValues: ["Müller", "2025", "Rechnung"]
  },
  {
    id: 6,
    name: "Rechnung Metzger 2024",
    createdAt: "2024-11-03",
    docDate: "2024-07-09",
    categoryId: 3,
    originals: ["rechnungen/metzger_2024.pdf"],
    text: "Metzger Rechnung 2024.",
    searchValues: ["Müller", "2025", "Rechnung"]
  },

  // Kategorie 4 (2023 unter Rechnungen) - 2 Files
  {
    id: 7,
    name: "Rechnung Gärtner 2023",
    createdAt: "2023-04-10",
    docDate: "2024-07-09",
    categoryId: 4,
    originals: ["rechnungen/gaertner_2023.pdf"],
    text: "Gärtner Rechnung 2023.",
    searchValues: ["Müller", "2025", "Rechnung"]
  },
  {
    id: 8,
    name: "Rechnung IT-Service 2023",
    createdAt: "2023-09-13",
    docDate: "2024-07-09",
    categoryId: 4,
    originals: ["rechnungen/itservice_2023.pdf"],
    text: "IT-Service Rechnung 2023.",
    searchValues: ["Müller", "2025", "Rechnung"]
  },

  // Kategorie 9 (2025 unter Auto) - 2 Files
  {
    id: 17,
    name: "TÜV Bericht 2025",
    createdAt: "2025-01-28",
    docDate: "2024-07-09",
    categoryId: 9,
    originals: ["auto/tuev_2025.pdf"],
    text: "TÜV Bericht 2025.",
    searchValues: ["Müller", "2025", "Rechnung"]
  },
  {
    id: 18,
    name: "Tankquittung 2025",
    createdAt: "2025-01-12",
    docDate: "2024-07-09",
    categoryId: 9,
    originals: ["auto/tankquittung_2025.pdf"],
    text: "Tankquittung Januar 2025.",
    searchValues: ["Müller", "2025", "Rechnung"]
  },

  // Kategorie 10 (2025 unter Hausrat) - 2 Files
  {
    id: 19,
    name: "Hausrat Ergänzung 2025",
    createdAt: "2025-01-08",
    docDate: "2024-07-09",
    categoryId: 10,
    originals: ["hausrat/ergaenzung_2025.pdf"],
    text: "Ergänzung Hausratversicherung 2025.",
    searchValues: ["Müller", "2025", "Rechnung"]
  },
  {
    id: 20,
    name: "Hausrat Inventar 2025",
    createdAt: "2025-01-30",
    docDate: "2024-07-09",
    categoryId: 10,
    originals: ["hausrat/inventar_2025.pdf"],
    text: "Inventar- und Fotodokumentation 2025.",
    searchValues: ["Müller", "2025", "Rechnung"]
  },

  // Kategorie 11 (2025 unter Lebensversicherung) - 2 Files
  {
    id: 21,
    name: "Lebensversicherung Übersicht 2025",
    createdAt: "2025-01-03",
    docDate: "2024-07-09",
    categoryId: 11,
    originals: ["lebens/uebersicht_2025.pdf"],
    text: "Jahresübersicht Lebensversicherung 2025.",
    searchValues: ["Müller", "2025", "Rechnung"]
  },
  {
    id: 22,
    name: "Lebensversicherung Anpassung 2025",
    createdAt: "2025-01-14",
    docDate: "2024-07-09",
    categoryId: 11,
    originals: ["lebens/anpassung_2025.pdf", "lebens/anpassung_02_2025.pdf"],
    text: "Anpassung Lebensversicherung Januar 2025.",
    searchValues: ["Müller", "2025", "Rechnung"]
  },
  {
    id: 23,
    name: "Kontoauszüge Auszug Mär/2025",
    createdAt: "2025-09-20",
    docDate: "2025-04-02",
    categoryId: 12,
    originals: ["lebens/anpassung_2025.pdf", "lebens/anpassung_02_2025.pdf", "lebens/anpassung_2025.pdf", "lebens/anpassung_02_2025.pdf"],
    text: "Fernseher -3000€, Laptop -1500€, Handy -800€.",
    searchValues: ["Müller", "2025", "Rechnung"]
  }
];