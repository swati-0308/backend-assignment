/**
 * Wraps Controllers for easy import from other modules
 */
import { AddressRespository } from "../repository/AddressRepository";
import { DepartmentRepository } from "../repository/DepartmentRepository";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { AddressService } from "../service/AddressService";
import { DepartmentService } from "../service/DepartmentService";
import { EmployeeService } from "../service/EmployeeService";
import AddressController from "./AddressController";
import DepartmentController from "./DepartmentController";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";

export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository(),new AddressRespository)),
  new DepartmentController(new DepartmentService(new DepartmentRepository())),
  new AddressController(new AddressService(new AddressRespository())),
];
