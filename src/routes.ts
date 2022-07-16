import { EmployeeController } from "./controller/EmployeeController"
const {
    storeEmployee,
  } = require('./middlewares/validation/storeEmployee');

  const {
    getEmployees, //this is just a placeholder validator that checks nothing in case something needs to be added later, it can be made simpler
  } = require('./middlewares/validation/getEmployees');

export const Routes = [{
    method: "get",
    route: "/employees",
    controller: EmployeeController,
    action: "all",
    validator: getEmployees
}, {
    method: "get",
    route: "/employees/:id",
    controller: EmployeeController,
    action: "one",
    validator: getEmployees
}, {
    method: "post",
    route: "/employees",
    controller: EmployeeController,
    action: "save",
    validator: storeEmployee
}, {
    method: "put",
    route: "/employees/:id",
    controller: EmployeeController,
    action: "update",
    validator: getEmployees
}, {
    method: "delete",
    route: "/employees/:id",
    controller: EmployeeController,
    action: "remove",
    validator: getEmployees
}]