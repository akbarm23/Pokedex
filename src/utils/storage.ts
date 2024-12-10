const STORAGE_KEY = 'savedPokemon';

export const getSavedPokemon = (): string[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

export const savePokemon = (id: string) => {
  const saved = getSavedPokemon();
  if (!saved.includes(id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved, id]));
  }
};

export const removePokemon = (id: string) => {
  const saved = getSavedPokemon();
  const updated = saved.filter((item) => item !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
