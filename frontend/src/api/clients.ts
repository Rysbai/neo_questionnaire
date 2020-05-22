import {GraphQLClient} from "graphql-request";
import config from "../configs";
import {lsKeys} from "../store/constants";


const token = localStorage.getItem(lsKeys.token);

const baseHeaders = {
  'Authorization': token || ''
};


export const gqClient = new GraphQLClient(config.GRAPHQL_URL);
export const authorizedGqClient = new GraphQLClient(config.GRAPHQL_URL, {headers: {...baseHeaders}});
