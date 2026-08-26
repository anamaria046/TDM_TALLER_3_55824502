import pokemon from "../models/pokemon.js";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export async function fetchPokemon(id) {

    try{
        const res = await fetch (API_URL + id);
        if (!res.ok) throw new Error ("No se encontró Pokémon");
        const data = await res.json();

        // Extraer los tipos
        const types = data.types.map(t => t.types.name);

        // Crear instancia de Pokémon
        return new pokemon (
        data.id,
        data.name,
        types,
        data.sprites.other["official-artwork"].front_default
        );
    }catch (error){
        console.error(error);
        return null;

    }
    
}