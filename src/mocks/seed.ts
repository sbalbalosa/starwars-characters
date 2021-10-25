import { seedFilms } from "./query/films";
import { seedCharacters } from "./query/characters";

export default function seed() {
  seedFilms();
  seedCharacters();
}
