import { GraphQLClient } from "graphql-request";

const endpoint = "https://graphql.datocms.com/";

export const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
  },
});

export const publicClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
    "X-Include-Drafts": "true",
  },
});
