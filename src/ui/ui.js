export function showPokemon(pokemon) {
    if (!pokemon) return;

    // Card Principal
    const img = document.getElementById("pokemon-img");
    img.src = pokemon.sprite;
    img.onclick = () => {
        playCry(pokemon.cry);
        showModal(pokemon);
    };

    const soundBtn = document.getElementById("b-sound");
    if (soundBtn) {
        soundBtn.onclick = () => playCry(pokemon.cry);
    }

    //Datos del Pokemon

    // document.getElementById("pokemon-img").src = pokemon.sprite;
    document.getElementById("pokemon-name").textContent = capitalize(pokemon.name);
    document.getElementById("pokemon-id").textContent = `#${pokemon.id}`;

    //Tipos
    const typesDiv = document.querySelector(".types");
    typesDiv.innerHTML = "";
    pokemon.types.forEach(t => {
        const span = document.createElement("span");
        span.classList.add("type", t);
        span.textContent = capitalize(t);
        typesDiv.appendChild(span);
    });

}
// Mostrar modal

export function showModal(pokemon) {
    const modal = document.getElementById("pokemon-modal");
    modal.classList.remove("hidden");

    document.getElementById("modal-name").textContent = capitalize(pokemon.name);
    document.getElementById("modal-img").src = pokemon.sprite;
    document.getElementById("modal-id").textContent = `#${pokemon.id}`;   
    document.getElementById("modal-height").textContent = pokemon.height;
    document.getElementById("modal-weight").textContent = pokemon.weight;
    document.getElementById("modal-abilities").textContent = pokemon.abilities.join(", ");
    
    // Estadísticas
    const statsContainer = document.getElementById("stats-container");
    if (statsContainer) {
        statsContainer.innerHTML = "";
        pokemon.stats.forEach(s => {
            const div = document.createElement("div");
            div.classList.add("stat-item");
            const percentage = Math.min((s.base / 180) * 100, 100);
            div.innerHTML = `
                <span class="stat-name">${capitalize(s.stat)}</span>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill" style="width: ${percentage}%;"></div>
                </div>
                <span class="stat-value">${s.base}</span>
            `;
            statsContainer.appendChild(div);
        });
    }
    // Cerrar modal 
    document.getElementById("close-modal").onclick = () => {
        modal.classList.add("hidden");
    };
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function playCry(cryUrl) {
    if (!cryUrl) return;
    const audio = new Audio(cryUrl);
    audio.volume = 0.5;
    audio.play().catch(err => console.warn("No se pudo reproducir el sonido:", err));
}