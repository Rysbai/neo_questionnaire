from graphene.test import Client


class TestUser:
    def test_setup(self, client):
        assert isinstance(client, Client)

    def test_should_return_token_and_user(self, client: Client):
        query = '''
            mutation { 
            auth(name: "Rysbai") 
              { 
                message, 
                token,
                user 
                  { id, name} 
              }
            }
        '''

        response = client.execute(query)

        assert type(response['data']['auth']['token']) == str
        assert response['data']['auth']['user']['name'] == 'Rysbai'
