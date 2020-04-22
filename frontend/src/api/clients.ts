import {GraphQLClient} from "graphql-request";
import config from "../configs";

export const nonAuthClient = new GraphQLClient(config.GRAPHQL_URL);
