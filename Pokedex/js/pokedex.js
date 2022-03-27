const fetchPokemon = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    fetch(url).then((res) => {
        // respuesta del get (status 200 etc)
        if (res.status != "200"){
            pokeImage("../assets/img/pokebola.jpg")
        }
        else{
            return res.json();
        } 
    }).then((data) => {
        //data de la respuesta
        //console.log(data);
        let pokeImg = data.sprites.front_default;
        let pokeNum = data.id;
        let pokeNam = data.name;
        pokeNam = pokeNam[0].toUpperCase() + pokeNam.slice(1);
        let pokeWeight = data.weight;
        let pokeHeight = data.height;
        let pokeTypeL = data.types.length;
        let pokeType = data.types[pokeTypeL-1].type.name;
        pokeType = pokeType[0].toUpperCase() + pokeType.slice(1);
        let statBase1 = data.stats[0].base_stat;
        let statBase2 = data.stats[1].base_stat;
        let statBase3 = data.stats[2].base_stat;
        let statBase4 = data.stats[3].base_stat;
        let statBase5 = data.stats[4].base_stat;

        let pokeDat = document.getElementById("info");
        let pokeDat2 = document.getElementById("info2");
        let pokeDat3 = document.getElementById("info3");
        pokeDat.innerHTML = `Name: ${pokeNam} `;
        pokeDat2.innerHTML = `#${pokeNum}`;
        pokeDat3.innerHTML = `Type: ${pokeType}`

        pokeImage(pokeImg);
        pokeData();
        pokeData2(pokeHeight, pokeWeight);
        pokeStat(statBase1, statBase2,statBase3,statBase4,statBase5);
    });
};

const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

const imprimir = () => {
    const pokeName = document.getElementById("pokeName");
    if (pokeName.value != '' && pokeName.value != '0'){
        fetchPokemon(pokeName.value.toLowerCase());
    }
}

const pokeData = () => {
    const pokeDat = document.getElementById("info");
    const pokeDat2 = document.getElementById("info2");
    const pokeDat3 = document.getElementById("info3");
    pokeDat.removeAttribute("hidden");
    pokeDat2.removeAttribute("hidden");
    pokeDat3.setAttribute("hidden","");
}

const pokeData2 = (pokeHeight, pokeWeight) => {
    const pokeHg = document.getElementById("square-button-right1");
    const pokeWg = document.getElementById("square-button-right2");
    pokeHg.innerHTML = `Height: ${pokeHeight}`;
    pokeWg.innerHTML = `Weight: ${pokeWeight}`;
}

const pokeData3 = () => {
    const pokeDat = document.getElementById("info");
    const pokeDat2 = document.getElementById("info2");
    const pokeDat3 = document.getElementById("info3");
    pokeDat.setAttribute("hidden","");
    pokeDat2.setAttribute("hidden","");
    pokeDat3.removeAttribute("hidden");
    
}

const pokeStat = (statBase1, statBase2,statBase3,statBase4,statBase5) => {
    const pokeHp = document.getElementById("hp-value");
    pokeHp.innerHTML = statBase1;

    const pokeatt = document.getElementById("att-value");
    pokeatt.innerHTML = statBase2;

    const pokedef = document.getElementById("def-value");
    pokedef.innerHTML = statBase3;

    const pokesatt = document.getElementById("specialA-value");
    pokesatt.innerHTML = statBase4;

    const pokesdef = document.getElementById("specialD-value");
    pokesdef.innerHTML = statBase5;
}

const increaseIdPokemon = () => {
    let next = document.getElementById("info2").innerHTML;
    let next2 = 0;
    if (next != ''){
        next = next.slice(1);
        next = parseInt(next);
        if (next == 898 || next == 0) {
            next2 = 1;
        }else{
            next2 = next + 1;
        }
        let number = document.getElementById("pokeName");
        number.value = `${next2}`;
        
        fetchPokemon(next2);
    }

}

const decreaseIdPokemon = () => {
    let back = document.getElementById("info2").innerHTML;
    let back2 = 0;
    if (back != ''){
        back = back.slice(1);
        back = parseInt(back);
        if (back == 1 || back == 0) {
            back2 = 898;
        } else{
            back2 = back - 1;
        }
        let number = document.getElementById("pokeName");
        number.value = `${back2}`;
        fetchPokemon(back2);
    }
}

const nextInfo = () => {
    pokeData3();
}

const backInfo = () => {
    pokeData();
}