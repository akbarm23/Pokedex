/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { getPokemonDetails } from '../../../utils/api';
import { savePokemon, getSavedPokemon } from '../../../utils/storage';
import { useParams } from 'next/navigation';
import Breadcrumb from '../../components/Breadcrumb';
import { useRouter } from 'next/navigation';

export default function PokemonDetail() {
  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pokemon, setPokemon] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  const breadcrumb = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "",
      label: pokemon?.name,
    },
  ];
  const router = useRouter();

  useEffect(() => {
    if (!params?.id) return;

    const fetchPokemon = async () => {
      const data = await getPokemonDetails(params.id as string);
      setPokemon(data);

      const savedPokemon = getSavedPokemon();
      setIsSaved(savedPokemon.includes(params.id as string));
    };

    fetchPokemon();
  }, [params.id]);

  const handleSave = () => {
    if (params?.id) {
      savePokemon(params.id as string);
      setIsSaved(true);
    }
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 p-6 px-[64px] w-full mx-auto bg-white rounded-xl shadow-lg">
      <Breadcrumb data={breadcrumb} />
      <br />
      <div className="md:col-span-1 col-span-2 gap-6 mb-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4">{pokemon.name}</h1>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-40 h-40 mb-4"
          />
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
            <p className="font-semibold">Types:</p>
            {pokemon.types.map((type: any) => (
              <span
                key={type.type.name}
                className="px-4 py-1 text-sm bg-blue-500 text-white rounded-full"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>


      <div className="md:col-span-1 col-span-2 gap-6 items-center mb-6">
        <div className="space-y-4">
          {pokemon.stats.map((stat: any) => {
            const progress = stat.base_stat > 100 ? 100 : stat.base_stat;
            return (
              <div key={stat.stat.name} className="flex items-center space-x-2 mb-4">
                <span className="w-1/3 text-gray-600 md:text-end text-start">{stat.stat.name}</span>
                <div className="flex-grow">
                  <progress
                  id={stat.stat.name}
                  className="w-full h-4 bg-gray-200 rounded-full"
                  value={progress}
                  max={100}
                  />
                </div>
                <span className="w-1/8 text-teal-600">{stat.base_stat}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className='text-center col-span-2 flex justify-center space-x-4'>
      <button
        onClick={() => router.push('/')}
        className="px-4 py-1 text-sm font-medium rounded-lg button-sm bg-gray-200 hover:bg-gray-300">
        Back
      </button>
        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`px-4 py-1 text-sm font-medium rounded-lg text-white button-sm ${
          isSaved ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}>
          {isSaved ? 'Saved' : 'Save Pokémon'}
        </button>
      </div>
    </div>
  );
}
