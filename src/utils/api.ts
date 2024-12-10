import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getPokemonList = async (offset = 0, limit = 1) => {
  const response = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  return response.data;
};

export const getPokemonDetails = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
  return response.data;
};
