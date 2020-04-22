import {User} from "./types";
import {nonAuthClient} from "./clients";

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
    id: response.auth.user.id,
    name: response.auth.user.name
  }
}