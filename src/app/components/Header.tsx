import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-300 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">
          <Link href="/">Pokedex</Link>
        </h1>
        <nav>
          <Link
            href="/saved"
            className="text-lg font-semibold"
          >
            My Pokémon
          </Link>
        </nav>
      </div>
    </header>
  );
}
