import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { Employee } from "./entity/Employee"
import "dotenv"

require('dotenv').config()


AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, route.validator, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // start express server
    app.listen(process.env.APP_PORT)

    await AppDataSource.getRepository(Employee).clear();

    // insert new users for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(Employee, {
            name: "Mr. Tara Davis",
            age: 7412,
            companyId: "d9ee249b-c70e-4cd5-9790-da47138fb812",
        })
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(Employee, {
            name: "Juanita Hammes",
            age: 87497,
            companyId: "455e4f84-80e5-4dcf-8b13-3dacd4ad68f7",
            reviewed: true
        })
    )


    console.log("App running on http://localhost:" + process.env.APP_PORT)

}).catch(error => console.log(error))
