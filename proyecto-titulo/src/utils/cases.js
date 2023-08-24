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

const searchCases = (filters) => {
  return getCases();
};

export {
  types,
  levels,
  storeCase,
  getCases,
  searchCases,
}