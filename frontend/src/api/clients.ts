import {GraphQLClient} from "graphql-request";
import config from "../configs";

export const gqClient = new GraphQLClient(config.GRAPHQL_URL);
