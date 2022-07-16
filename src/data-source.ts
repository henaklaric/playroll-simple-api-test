import "reflect-metadata"
import "dotenv"
import { DataSource } from "typeorm"
import { Employee } from "./entity/Employee"

require('dotenv').config()

export const AppDataSource = new DataSource({
    type: process.env.DB_CONNECTION as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Employee],
    migrations: [],
    subscribers: [],
})
