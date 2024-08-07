import axios from 'axios';

const apiKey = '89b9b269a559e361095973dbcdd3ca86';
const baseUrl = 'https://libraries.io/api/search';

interface Module {
  name: string;
  owner: string;
  stars: number;
}

export const searchModules = async (query: string, type: string): Promise<Module[]> => {
  try {
    const url = `${baseUrl}?q=${query}&api_key=${apiKey}`;
    const response = await axios.get<Module[]>(url);
    let data = response.data;

    if (type === 'stars') {
      data = data.sort((a, b) => b.stars - a.stars);
    }

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
