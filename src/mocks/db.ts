import { datatype, name, commerce } from "faker";
import { factory, primaryKey, manyOf } from "@mswjs/data";

const db = factory({
  people: {
    id: primaryKey(datatype.uuid),
    name: name.firstName,
    gender: name.gender,
    eyeColor: commerce.color,
    hairColor: commerce.color,
    filmConnection: {
      films: manyOf("film"),
    },
  },
  film: {
    id: primaryKey(datatype.uuid),
    title: commerce.productName,
  },
});

export default db;
