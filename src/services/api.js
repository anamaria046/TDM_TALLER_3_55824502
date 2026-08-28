import pokemon from "../models/pokemon.js";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export async function fetchPokemon(id) {

    try{
        const res = await fetch (API_URL + id);
        if (!res.ok) throw new Error ("No se encontró Pokémon");
        const data = await res.json();

        // Extraer los tipos
        const types = data.types.map(t => t.type.name);

        // Extraer las habilidades
        const abilities = data.abilities.map (a=> a.ability.name);

        // Extraer estadísticas
        const stats = data.stats.map(s=> ({
            stat: s.stat.name,
            base: s.base_stat
        }));


        // Extraer audio del grito/sonido
        const cry = data.cries?.latest || data.cries?.legacy || null;

        // Crear instancia de Pokémon
        return new pokemon (
        data.id,
        data.name,
        types,
        data.sprites.other["official-artwork"].front_default,
        data.height / 10,
        data.weight /10,
        abilities,
        stats,
        cry
        );

    }catch (error){
        console.error(error);
        return null;
    }
    
}