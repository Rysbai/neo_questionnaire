import {gqClient} from "./clients";
import {UserWithToken} from "./types";


export async function authUser(name: string): Promise<UserWithToken> {
  const query = `mutation { 
    auth(name: "${name}") 
      { 
        message, 
        token,
        user 
          { id, name} 
      }
    }`;

  const response = await gqClient.request(query);

  return {
    ...response.auth
  }
}