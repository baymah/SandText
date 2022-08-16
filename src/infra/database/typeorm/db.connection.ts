import { Connection, ConnectionOptions, createConnection, getConnection } from 'typeorm';

export const dbConnection = {
  async create(dbConfig: ConnectionOptions) {
    try {
      const connectionObj: Connection = await createConnection(dbConfig);
      console.log({ host: connectionObj.options['database'] }, 'Database...');
    } catch (err: any) {
      console.log(err, 'dbConnection Error');
    }
  },
  async close() {
    await getConnection().close();
  },
  getConnection() {
    return getConnection();
  },
  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    await Promise.all(
      entities.map(async (entity) => {
        const repository = connection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
      }),
    );
  },
};
