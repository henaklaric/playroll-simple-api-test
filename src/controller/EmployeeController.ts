import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Employee } from "../entity/Employee"

export class EmployeeController {

    private employeeRepository = AppDataSource.getRepository(Employee)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.employeeRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        let employee = await this.employeeRepository.findOneBy({
            id: request.params.id
        })

        return employee ? employee: (response.status(404).send("Employee not found"), null);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.employeeRepository.save(request.body)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let employee = await this.employeeRepository.findOneBy({
            id: request.params.id
        })

        if(!employee) {
            response.status(404).send("Employee not found");
            return;
        }

        const result = await this.employeeRepository.createQueryBuilder()
        .update(request.body)
        .where({
            id: request.params.id,
        })
        .returning('*')
        .execute()
    
        return result.raw[0]

    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let employeeToRemove = await this.employeeRepository.findOneBy({ id: request.params.id })
        await this.employeeRepository.remove(employeeToRemove)
    }

}