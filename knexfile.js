// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'ec2-54-235-90-96.compute-1.amazonaws.com',
      port:'5432',
      database: 'my_db',
      user: 'ahyzplqbdqjeha',
      password: process.env.DBPWD
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
