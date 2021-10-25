import { graphql } from "msw";
import db from "./db";

export const handlers = [
  graphql.query("characters", (req, res, ctx) => {
    return res(
      ctx.data({
        allPeople: {
          people: db.people.getAll(),
        },
      })
    );
  }),
  graphql.query("films", (req, res, ctx) => {
    return res(
      ctx.data({
        allFilms: {
          films: db.film.getAll(),
        },
      })
    );
  }),
];
