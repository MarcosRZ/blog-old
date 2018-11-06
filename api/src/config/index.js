export const GRAPHQL_ENDPOINT = "/graphql";
export const GRAPHIQL_ENDPOINT = "/graphiql";
export const PORT = 3001;
export const API_MOUNTPOINT = "/api";
export const ENVS = {
  DEV: "dev",
  PRODUCTION: "production"
};

export const isProductionEnv = () => process.env.NODE_ENV === ENVS.PRODUCTION;
