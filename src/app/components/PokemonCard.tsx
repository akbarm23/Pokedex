/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';

export default function PokemonCard({ name, url }: { name: string; url: string }) {
  const id = url.split('/').filter(Boolean).pop();

  return (
    <Link
      href={`/pokemon/${id}`}
      className="block bg-gradient-to-br from-blue-100 to-blue-300 shadow-lg rounded-lg p-4 text-center transition hover:scale-105 hover:shadow-xl"
    >
      <h2 className="text-lg font-bold capitalize text-gray-700">{name}</h2>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
        className="w-24 h-24 mx-auto"
      />
      <p className="text-sm font-light text-gray-700">Lihat Detail</p>
    </Link>
  );
}
