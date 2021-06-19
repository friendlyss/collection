import { Collection } from '../src';
import {v4} from 'uuid'

type User = {
  uuid: string
  username: string
  email: string
}

const getUser = (uuid?: string): User => {
  return {
    uuid: uuid || v4(),
    username: 'username',
    email: 'user@email.com'
  }
}

describe('collection', () => {
  it('add many items', () => {
    const collection = new Collection<User>()
    collection.setPrimaryKeyField('uuid')

    collection.addMany([
      getUser(),
      getUser()
    ])

    expect(collection.length).toEqual(2)
  });
  
  it('add single item', () => {
    const collection = new Collection<User>()
    const UUID_USER = 'ca8fdabf-3c22-4491-86a3-d830f5775195'

    collection.setPrimaryKeyField('uuid')
    collection.set(getUser(UUID_USER))

    expect(collection.length).toEqual(1)
  });

  it('check for unique key per item', () => {
    const collection = new Collection<User>()
    const UUID_USER = 'ca8fdabf-3c22-4491-86a3-d830f5775195'

    collection.setPrimaryKeyField('uuid')
    collection.addMany([
      getUser(UUID_USER),
      getUser()
    ])

    const [user] = collection.all()

    expect(user.uuid).toEqual(UUID_USER)
  });
});
