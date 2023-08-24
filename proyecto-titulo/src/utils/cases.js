const types = [
  {
    title: 'Abandono',
    value: 'abandono'
  },
  {
    title: 'Maltrato',
    value: 'maltrato'
  },
  {
    title: 'Adopción',
    value: 'adopcion'
  },
];

const levels = [
  {
    name: 'Bajo',
    value: 'bajo'
  },
  {
    name: 'Alto',
    value: 'alto'
  },
  {
    name: 'Medio',
    value: 'medio'
  },
];

const regions = [
  {
    name: "Región Metropolitana",
    cities: [
      {
        name: "Santiago",
        communes: [
          "Santiago",
          "Providencia",
          "Las Condes"
        ]
      },
      {
        name: "Maipú",
        communes: [
          "Maipú",
          "Cerrillos",
          "Pudahuel"
        ]
      }
    ]
  },
  {
    name: "Región de Valparaíso",
    cities: [
      {
        name: "Valparaíso",
        communes: [
          "Valparaíso",
          "Viña del Mar",
          "Concón"
        ]
      },
      {
        name: "Quilpué",
        communes: [
          "Quilpué",
          "Villa Alemana"
        ]
      }
    ]
  }
];

const storeCase = (caseData) => {
  const cases = getCases();
  
  const newCase = {
    ...caseData,
    date: new Date().toISOString(),  
  };

  localStorage.setItem('cases', JSON.stringify([...cases, newCase]));

  return newCase;
};

const getCases = () => {
  return localStorage.getItem('cases') ? JSON.parse(localStorage.getItem('cases')) : [];
};

export {
  types,
  levels,
  regions,
  storeCase,
  getCases,
}