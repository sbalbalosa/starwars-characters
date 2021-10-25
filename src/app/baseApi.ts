import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  "https://swapi-graphql.netlify.app/.netlify/functions/index"
);
export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({ client }),
  endpoints: () => ({}),
});
