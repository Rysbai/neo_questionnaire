import {GraphQLClient} from "graphql-request";
import config from "../configs";
import {lsKeys} from "../store/constants";


export const gqClient = new GraphQLClient(config.GRAPHQL_URL);
export const authorizedGqClient = () => new GraphQLClient(config.GRAPHQL_URL, {headers: {...getBaseHeaders()}});


function getBaseHeaders() {
  return {
    'Authorization': localStorage.getItem(lsKeys.token) || ''
  }
}
