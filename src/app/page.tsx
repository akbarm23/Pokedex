'use client';

import { useEffect, useState } from 'react';
import { getPokemonList } from '../utils/api';
import PokemonCard from '../app/components/PokemonCard';
import Pagination from '../app/components/Pagination';

export default function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 12;

  useEffect(() => {
    const fetchPokemon = async () => {
      const offset = (currentPage - 1) * limit;
      const data = await getPokemonList(offset, limit);
      setPokemonList(data.results);
      setTotalPages(Math.ceil(151 / limit));
    };

    fetchPokemon();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-red-100">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}