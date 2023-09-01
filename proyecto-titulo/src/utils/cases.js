import { ref } from 'vue';
import { getLoggedUser } from './auth';
import { getCollectionData, addDocumentToCollection } from "./firestore"
import { getRegions } from './locations';

const levels = ref(null);
const species = ref(null);
const sizes = ref(null);
const genres = ref(null);
const ages = ref(null);
const types = ref(null);
const regions = ref(null);

const forceLoad = async (refItem, loaderCallback) => {
  if(refItem.value === null)
  {
    refItem.value = await loaderCallback();
  }
};

const loadLocalRegions = () => new Promise(
  (resolve, reject) => {
    getRegions()
      .then((response) => {
        regions.value = response;
        resolve(response);
      })
      .catch((error) => {
        regions.value = [];
        reject(error)    
      });
  }
);

const getTypes = () => new Promise(
  (resolve, reject) => {
    getCollectionData('types')
      .then((response) => {
        types.value = response;
        resolve(response);
      })
      .catch((error) => {
        types.value = [];
        reject(error)    
      });
  }
);

const getLevels = () => new Promise(
  (resolve, reject) => {
    getCollectionData('levels')
      .then((response) => {
        levels.value = response;
        resolve(response);
      })
      .catch((error) => {
        levels.value = [];
        reject(error)    
      });
  }
);

const getSpecies = () => new Promise(
  (resolve, reject) => {
    getCollectionData('species')
      .then((response) => {
        species.value = response;
        resolve(response);
      })
      .catch((error) => {
        species.value = [];
        reject(error)    
      });
  }
);

const getSizes = () => new Promise(
  (resolve, reject) => {
    getCollectionData('size')
      .then((response) => {
        sizes.value = response;
        resolve(response);
      })
      .catch((error) => {
        sizes.value = [];
        reject(error)    
      });
  }
);

const getGenres = () => new Promise(
  (resolve, reject) => {
    getCollectionData('genre')
      .then((response) => {
        genres.value = response;
        resolve(response);
      })
      .catch((error) => {
        genres.value = [];
        reject(error)    
      });
  }
);

const getAges = () => new Promise(
  (resolve, reject) => {
    getCollectionData('ages')
      .then((response) => {
        ages.value = response;
        resolve(response);
      })
      .catch((error) => {
        ages.value = [];
        reject(error)    
      });
  }
);

const storeCase = (caseData) => new Promise(async (resolve, reject) => {

  const responseErrors = {};
  if(!caseData.type)
  {
    responseErrors.type = ['El tipo es requerido'];
  }
  if(!caseData.level)
  {
    responseErrors.level = ['El nivel es requerido'];
  }
  if(!caseData.region)
  {
    responseErrors.region = ['La región es requerida'];
  }
  if(!caseData.city)
  {
    responseErrors.city = ['La ciudad es requerida'];
  }
  if(!caseData.commune)
  {
    responseErrors.commune = ['La comuna es requerida'];
  }
  if(!caseData.specie)
  {
    responseErrors.specie = ['La especie es requerida'];
  }
  if(!caseData.size)
  {
    responseErrors.size = ['El tamaño es requerido'];
  }
  if(!caseData.genre)
  {
    responseErrors.size = ['El género es requerido'];
  }
  if(!caseData.age)
  {
    responseErrors.age = ['La edad es requerida'];
  }
  if(!caseData.description)
  {
    responseErrors.description = ['La descripción es requerida'];
  }

  if(Object.keys(responseErrors).length > 0)
  {
    reject(responseErrors);
  }
  else
  {
    const loggedUser = getLoggedUser();
    const newCase = {
      ...caseData,
      reporterEmail: loggedUser.email,
      date: new Date().toISOString(),  
    };

    addDocumentToCollection('cases', newCase)
      .then(
        (docRef) => resolve(docRef),
      )
      .catch(
        (error) => reject(error),
      );
  }
});

const getCases = () => getCollectionData('cases');

const searchCases = (filters) => new Promise(
  async (resolve, reject) => {
    try
    {
      await forceLoad(regions, loadLocalRegions);
      await forceLoad(types, getTypes);
      await forceLoad(levels, getLevels);
      await forceLoad(species, getSpecies);
      await forceLoad(sizes, getSizes);
      await forceLoad(genres, getGenres);
      await forceLoad(ages, getAges);

      console.clear();
      const cases = await getCases();
      const filteredCases = cases
        .filter((caseItem) => {
          const { region, specie, size, genre, age } = filters;

          const regionMatched = region === 'any' ? true : caseItem.region === region;
          const specieMatched = specie === 'any' ? true : caseItem.specie === specie;
          const sizeMatched = size === 'any' ? true : caseItem.size === size;
          const genreMatched = genre === 'any' ? true : caseItem.genre === genre;
          const ageMatched = age === 'any' ? true : caseItem.age === age;

          return regionMatched && specieMatched && sizeMatched && genreMatched && ageMatched;
        })
        .map((caseItem) => {

          caseItem.region = regions.value.find((regionItem) => regionItem.id === caseItem.region);
          caseItem.type = types.value.find((typeItem) => typeItem.id === caseItem.type);
          caseItem.level = levels.value.find((levelItem) => levelItem.id === caseItem.level);
          caseItem.specie = species.value.find((specieItem) => specieItem.id === caseItem.specie);
          caseItem.size = sizes.value.find((sizeItem) => sizeItem.id === caseItem.size);
          caseItem.genre = genres.value.find((genreItem) => genreItem.id === caseItem.genre);
          caseItem.age = ages.value.find((ageItem) => ageItem.id === caseItem.age);
          caseItem.city = caseItem.region.cities.find((cityItem) => cityItem.id === caseItem.city);

          return caseItem;
        });

      resolve(filteredCases);
    }
    catch(error)
    {
      reject(error);
    }
  }
);

const generatePlusReport = (filters) => new Promise(
  async (resolve, reject) => {
    try
    {
      await forceLoad(types, getTypes);
      await forceLoad(levels, getLevels);
      await forceLoad(species, getSpecies);
      await forceLoad(sizes, getSizes);
      await forceLoad(genres, getGenres);
      await forceLoad(ages, getAges);
      await forceLoad(regions, loadLocalRegions);

      console.clear();
      const cases = await getCases();
      const filteredCases = cases
        .filter((caseItem) => {
          const { type, level, region, city, commune, specie } = filters;

          const typeMatched = type === 'any' ? true : caseItem.type === type;
          const levelMatched = level === 'any' ? true : caseItem.level === level;
          const regionMatched = region === 'any' ? true : caseItem.region === region;
          const cityMatched = city === 'any' ? true : caseItem.city === city;
          const communeMatched = commune === 'any' ? true : caseItem.commune === commune;
          const specieMatched = specie === 'any' ? true : caseItem.specie === specie;

          return typeMatched && levelMatched && regionMatched && cityMatched && communeMatched && specieMatched;
        })
        .map((caseItem) => {

          caseItem.type = types.value.find((typeItem) => typeItem.id === caseItem.type);
          caseItem.level = levels.value.find((levelItem) => levelItem.id === caseItem.level);
          caseItem.specie = species.value.find((specieItem) => specieItem.id === caseItem.specie);
          caseItem.size = sizes.value.find((sizeItem) => sizeItem.id === caseItem.size);
          caseItem.genre = genres.value.find((genreItem) => genreItem.id === caseItem.genre);
          caseItem.age = ages.value.find((ageItem) => ageItem.id === caseItem.age);
          caseItem.region = regions.value.find((regionItem) => regionItem.id === caseItem.region);
          caseItem.city = caseItem.region.cities.find((cityItem) => cityItem.id === caseItem.city);

          return caseItem;
        });
      
      console.log('filteredCases', filteredCases);
      resolve(filteredCases);
    }
    catch(error)
    {
      reject(error);
    }
  }
);

export {
  getLevels,
  getSpecies,
  getSizes,
  getGenres,
  getAges,
  getTypes,
  storeCase,
  searchCases,
  generatePlusReport,
}