import { getCollectionData, getSubCollectionData } from '@/utils/firestore';

const getRegions = async () => {
  const regions = await getCollectionData('regions');
  for (const region of regions) {
    region.cities = await getSubCollectionData('regions', region.id, 'cities');
  }

  return regions;
};

export { getRegions };
