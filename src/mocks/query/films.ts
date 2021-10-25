import db from "../db";
import { commerce } from "faker";

export const seedFilms = () => {
  db.film.create({
    title: commerce.productName(),
  });
  db.film.create({
    title: commerce.productName(),
  });
  db.film.create({
    title: commerce.productName(),
  });
  db.film.create({
    title: commerce.productName(),
  });
};
