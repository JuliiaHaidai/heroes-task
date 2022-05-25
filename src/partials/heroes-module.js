import axios from 'axios';
import HeroesList from "./heroes-list.handlebars";
const url = "https://api.opendota.com";

export default async function heroe() {
  const heroes = await axios.get(`${url}/api/heroes`);
  const heroesDetails = await axios.get(`${url}/api/heroStats`);
  const div = document.createElement("div");
  div.innerHTML = HeroesList({
    heroes: heroes.data.map((_hero, index) => ({ nameHero: _hero.localized_name, srcImg: `${url}${heroesDetails.data[index].img}` })),
  });
  // const content = document.getElementById("content");
  // const list = document.createElement("ul");
  // heroes.data.forEach((_hero, index) => {
  //   const hero = Heroes({ nameHero: _hero.localized_name, srcImg: `${url}${heroesDetails.data[index].img }`});
  //   const li = document.createElement("li");
  //   li.innerHTML = hero;
  //   list.append(li);
  // });
  content.append(div);
}


