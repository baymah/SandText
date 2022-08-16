import { dbConnection } from './db.connection'
import { dbConfig } from './db.config'

try {
    dbConnection.create(dbConfig)
    console.log('Db Connected')
} catch (err: any) {
    console.log('Error ============')
    console.log(err)
}
