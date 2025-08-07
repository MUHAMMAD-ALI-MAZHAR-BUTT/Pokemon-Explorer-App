import { defineStore } from "pinia";
import axios from "axios";
import type { Pokemon } from "@/types/pokemon";

interface PokemonState {
  pokemonList: Pokemon[];
  isLoading: boolean;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
}

export const usePokemonStore = defineStore("pokemon", {
  state: (): PokemonState => ({
    pokemonList: [],
    isLoading: false,
    searchQuery: "",
    currentPage: 1,
    itemsPerPage: 12,
  }),
  actions: {
    async fetchPokemons() {
      this.isLoading = true;
      try {
        const baseURL =
          import.meta.env.VITE_API_BASE_URL || "https://pokeapi.co/api/v2";

        const response = await axios.get(`${baseURL}/pokemon?limit=150`);

        const results = response.data.results;

        const pokemonData: Pokemon[] = await Promise.all(
          results.map((pokemon: any) =>
            axios.get(pokemon.url).then((res) => {
              const data = res.data;
              return {
                id: data.id,
                name: data.name,
                image:
                  data.sprites.other["official-artwork"].front_default ||
                  data.sprites.front_default,
                types: data.types,
                stats: data.stats,
                height: data.height,
                weight: data.weight,
                abilities: data.abilities,
                customName:
                  data.name.charAt(0).toUpperCase() + data.name.slice(1),
                customDescription: `${
                  data.name.charAt(0).toUpperCase() + data.name.slice(1)
                } is a ${data.types
                  .map((t: any) => t.type.name)
                  .join(
                    "/"
                  )} type Pokémon with unique abilities and characteristics.`,
              };
            })
          )
        );
        this.pokemonList = pokemonData;
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        this.isLoading = false;
      }
    },
    updatePokemon(updatedPokemon: Pokemon) {
      const index = this.pokemonList.findIndex(
        (p) => p.id === updatedPokemon.id
      );
      if (index !== -1) {
        this.pokemonList[index] = {
          ...this.pokemonList[index],
          ...updatedPokemon,
        };
      }
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.currentPage = 1;
    },
    setCurrentPage(page: number) {
      this.currentPage = page;
    },
    setItemsPerPage(items: number) {
      this.itemsPerPage = items;
      this.currentPage = 1;
    },
  },
  getters: {
    filteredPokemons(state): Pokemon[] {
      if (!state.searchQuery) return state.pokemonList;
      return state.pokemonList.filter(
        (pokemon) =>
          pokemon.name
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          pokemon.customName
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase())
      );
    },
    paginatedPokemons(): Pokemon[] {
      const filtered = this.filteredPokemons;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return filtered.slice(startIndex, endIndex);
    },
    totalPages(): number {
      return Math.ceil(this.filteredPokemons.length / this.itemsPerPage);
    },
    totalItems(): number {
      return this.filteredPokemons.length;
    },
  },
});
