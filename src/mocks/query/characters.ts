import db from "../db";

export const seedCharacters = () => {
  const films = db.film.getAll();

  db.people.create({
    filmConnection: {
      films: [films[0]],
    },
  });
  db.people.create({
    filmConnection: {
      films: [films[1], films[2]],
    },
  });
  db.people.create({
    filmConnection: {
      films: [films[3]],
    },
  });
};
