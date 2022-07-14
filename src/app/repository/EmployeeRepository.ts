import { getConnection, ObjectLiteral } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({relations:['department','address']})
    }

    async getEmployeeById(id:string){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne({id});
    }

    async updateEmployeeById(employee:Employee){
        const employeeRepo = getConnection().getRepository(Employee)
        const newemp = await employeeRepo.save(employee)
        return newemp

    }

    public async getEmployeeByName(name: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name },
        });
        return employeeDetail;
    }

    public async deleteEmployeeById(emp:Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employee= await employeeRepo.softDelete(emp);
        return employee;
    
    }
    public async createEmployee(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeCreated = await employeeRepo.save(employeeDetails);
        return employeeCreated;
    }
    }