import { getLoggedUser } from './auth';

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
    name: 'Medio',
    value: 'medio'
  },
  {
    name: 'Alto',
    value: 'alto'
  },
];

const species = [
  {
    name: 'Perro',
    'value': 'dog'
  },
  {
    name: 'Gato',
    value: 'cat'
  },
  {
    name: 'Conejo',
    value: 'rabbit'
  }
];

const sizes = [
  {
    name: 'Pequeño',
    value: 'small'
  },
  {
    name: 'Mediano',
    value: 'medium'
  },
  {
    name: 'Grande',
    value: 'large'
  }
];

const genres = [
  {
    name: 'Macho',
    value: 'macho'
  },
  {
    name: 'Hembra',
    value: 'hembra'
  }
];

const ages = [
  {
    name: 'Hasta 1 año',
    value: 'upto1'
  },
  {
    name: '1 a 5 años',
    value: '1to5'
  },
  {
    name: '6 a 10 años',
    value: '6to10'
  }
];

const storeCase = (caseData) => new Promise(async (resolve, reject) => {

  const SUCCESS = true;

  if(SUCCESS)
  {
    const cases = await getCases();
  
    const loggedUser = getLoggedUser();
    const newCase = {
      ...caseData,
      reporterEmail: loggedUser.email,
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
        size: ['El tamaño es requerido'],
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
      const { region, specie, size, genre, age } = filters;

      const regionMatched = region === 'any' ? true : caseItem.region === region;
      const specieMatched = specie === 'any' ? true : caseItem.specie === specie;
      const sizeMatched = size === 'any' ? true : caseItem.size === size;
      const genreMatched = genre === 'any' ? true : caseItem.genre === genre;
      const ageMatched = age === 'any' ? true : caseItem.age === age;

      return regionMatched && specieMatched && sizeMatched && genreMatched && ageMatched;
    });

    resolve(filteredCases);
  }
  catch(error)
  {
    reject(error);
  }
});

const generatePlusReport = (filters) => new Promise((resolve) => {
  try
  {
    const cases = localStorage.getItem('cases') ? JSON.parse(localStorage.getItem('cases')) : [];
    const filteredCases = cases.filter((caseItem) => {
      const { 
        type,
        level,
        region,
        city,
        commune,
        specie,
      } = filters;

      const typeMatched = type === 'any' ? true : caseItem.type === type;
      const levelMatched = level === 'any' ? true : caseItem.level === level;
      const regionMatched = region === 'any' ? true : caseItem.region === region;
      const cityMatched = city === 'any' ? true : caseItem.city === city;
      const communeMatched = commune === 'any' ? true : caseItem.commune === commune;
      const specieMatched = specie === 'any' ? true : caseItem.specie === specie;

      return typeMatched && levelMatched && regionMatched && cityMatched && communeMatched && specieMatched;
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
  species,
  sizes,
  genres,
  ages,
  storeCase,
  getCases,
  searchCases,
  generatePlusReport,
}