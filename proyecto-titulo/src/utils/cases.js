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

const storeCase = (caseData) => new Promise(async (resolve, reject) => {

  const SUCCESS = true;

  if(SUCCESS)
  {
    const cases = await getCases();
  
    const newCase = {
      ...caseData,
      date: new Date().toISOString(),  
    };
  
    localStorage.setItem('cases', JSON.stringify([...cases, newCase]));
  
    resolve(newCase);
  }
  else
  {
    const responseErrors = {
      errors: {
        type: ['El tipo es requerido'],
        level: ['El nivel es requerido'],
        email: ['El correo es requerido'],
      }
    };
  
    reject(responseErrors);
  }
});

const getCases = () => new Promise((resolve) => {
  const cases = localStorage.getItem('cases') ? JSON.parse(localStorage.getItem('cases')) : [];
  resolve(cases);
});

const searchCases = (filters) => new Promise((resolve) => {
  try
  {
    const cases = localStorage.getItem('cases') ? JSON.parse(localStorage.getItem('cases')) : [];
    const filteredCases = cases.filter((caseItem) => {
      const { region } = filters;

      const regionMatched = region === 'all' ? true : caseItem.region === region;

      return regionMatched;
    });

    resolve(filteredCases);
  }
  catch(error)
  {
    reject(error);
  }
});

export {
  types,
  levels,
  storeCase,
  getCases,
  searchCases,
}