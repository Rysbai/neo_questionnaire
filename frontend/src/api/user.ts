import config from "../configs";
import {GraphQLClient} from "graphql-request";
import {User} from "./types";

const nonAuthClient = new GraphQLClient(config.GRAPHQL_URL);


export async function authUser(name: string): Promise<User> {
  const query = `mutation { 
        auth(name: "${name}") 
            { 
                message, 
                user 
                    { id name} 
            }
        }`;

  const response = await nonAuthClient.request(query);

  return {
    id: response.data.data.auth.user.id,
    name: response.data.data.auth.user.name
  }
}