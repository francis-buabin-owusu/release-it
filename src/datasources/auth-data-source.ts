import { SQLDataSource } from 'datasource-sql';

class MyDatabase extends SQLDataSource {
  getPermissions(id) {
    return this.knex
      .select('permissions')
      .from('access_level')
      .where('id', id)
      .first();
    //   .cache();
  }
}

const knexConfig = {
  client: 'pg',
  connection: process.env.AUTHENTICATION_DB_URL,
};
const AuthDataSource = new MyDatabase(knexConfig);

export { MyDatabase, AuthDataSource };
