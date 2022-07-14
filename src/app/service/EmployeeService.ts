import { plainToClass } from "class-transformer";
import { Code, IsNull, ObjectLiteral } from "typeorm";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from "jsonwebtoken"
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import { Address } from "../entities/Address";
import { AddressRespository } from "../repository/AddressRepository";
import { UpdateEmployeeDto } from "../dto/UpdateEmployee";


export class EmployeeService{
    constructor(private employeerepo:EmployeeRespository,private addressrepo:AddressRespository){

    }
    
    async getAllEmployees(){
        
        return this.employeerepo.getAllEmployees();
    
}
        
//     async createEmployee(body:any){

//         return this.employeerepo.createEmployee(body);
        
// }
    public async createEmployee(employeeDetails: CreateEmployeeDto) {
    try {

        const newAddress = plainToClass(Address, {
        addr_line1: employeeDetails.addr_line1,
        addr_line2: employeeDetails.addr_line2,
        city: employeeDetails.city,
        zip: employeeDetails.zip,
        state : employeeDetails.state
      });
        const newEmployee = plainToClass(Employee, {
            name: employeeDetails.name,
            password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
            role:employeeDetails.role,
            departmentId: employeeDetails.department_id,
            address:newAddress
         });
         
        const save = await this.employeerepo.createEmployee(newEmployee);
        return save;
    } catch (err) {
       throw new HttpException(400, "Failed to create employee","unauthorized");
    }
  }
    async getEmployeeById(id:string){
        const response = await this.employeerepo.getEmployeeById(id)
        if(!response){
            throw(new EntityNotFoundException((ErrorCodes.USER_WITH_ID_NOT_FOUND)));
        }
        return response;
    
}
    async updateEmployeeById(employeeDetails:UpdateEmployeeDto){
      try{const newEmployee = plainToClass(Employee, {
          id:employeeDetails.id,
          name: employeeDetails.name,
          password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
          departmentId: employeeDetails.departmentId,
          addressId: employeeDetails.addressId
           });
          const response = await this.employeerepo.getEmployeeById(newEmployee.id);
           if(!response){
             throw new EntityNotFoundException( ErrorCodes.USER_WITH_ID_NOT_FOUND);
         }
         const save = await this.employeerepo.updateEmployeeById(newEmployee);
         return save;
        }
     catch (err) {
         throw new HttpException(400, "Failed to update employee","unauthorized");
     }
      
     }

    async deleteEmployeeById(id:string){
        const response = await this.employeerepo.getEmployeeById(id);
        if(!response){
          throw new EntityNotFoundException( ErrorCodes.USER_WITH_ID_NOT_FOUND);
      }
     return await this.employeerepo.deleteEmployeeById(response)

    }

    public employeeLogin = async (
        name: string,
        password: string) => {
        const employeeDetails = await this.employeerepo.getEmployeeByName(name);
    if (!employeeDetails) {
      throw new UserNotAuthorizedException();
    }
    const validPassword = await bcrypt.compare(password, employeeDetails.password);
    if (validPassword) {
      let payload = {
        "custom:id": employeeDetails.id,
        "custom:name": employeeDetails.name,
        "role":employeeDetails.role
      };
      const token = this.generateAuthTokens(payload);

      return {
        idToken: token,
        employeeDetails,
      };
    } else {
      throw new IncorrectUsernameOrPasswordException();
    }
  };

 private generateAuthTokens = (payload: any) => {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };  

}