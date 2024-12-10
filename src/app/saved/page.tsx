/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { getSavedPokemon, removePokemon } from '../../utils/storage';
import { getPokemonDetails } from '../../utils/api';

const SavedPage = () => {
  const [savedPokemon, setSavedPokemon] = useState<
    { id: string; name: string; sprite: string }[]
  >([]);

  useEffect(() => {
    const fetchSavedPokemon = async () => {
      const savedIds = getSavedPokemon();
      const details = await Promise.all(
        savedIds.map(async (id) => {
          const data = await getPokemonDetails(id);
          return { id, name: data.name, sprite: data.sprites.front_default };
        })
      );
      setSavedPokemon(details);
    };

    fetchSavedPokemon();
  }, []);

  const handleRemove = (id: string) => {
    removePokemon(id);
    setSavedPokemon((prev) => prev.filter((pokemon) => pokemon.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-6">My Pokémon</h1>
      {savedPokemon.length === 0 ? (
        <p className="text-center text-gray-500">No Pokémon saved yet!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {savedPokemon.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-white shadow-lg rounded-lg p-4 text-center hover:shadow-xl transition"
            >
              <h2 className="mt-4 text-lg font-bold capitalize text-gray-700">
                {pokemon.name}
              </h2>
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="w-20 h-20 mx-auto"
              />
              <button
                onClick={() => handleRemove(pokemon.id)}
                className="mt-4 px-4 py-1 text-sm font-medium rounded-lg text-white button-sm bg-red-500 text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;
