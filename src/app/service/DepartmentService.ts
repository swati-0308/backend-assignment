import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import { UpdateDepartmentDto } from "../dto/UpdateDepartment";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";

export class DepartmentService{
    constructor(private departmentrepo:DepartmentRepository){}
    async getAllDepts(){
        return this.departmentrepo.getAllDepts();
        
    }

    async createDept(deptDetails:CreateDepartmentDto){
        try {
            const newdept = plainToClass(Department, {
                    name: deptDetails.name,
                
                 });
            const save = await this.departmentrepo.createDept(newdept);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create department","unauthorized");
        }
       
    }
    async getDeptById(id:string){
        const dept = await this.departmentrepo.getDeptById(id)
        if(!dept){
            throw(new EntityNotFoundException((ErrorCodes.USER_WITH_ID_NOT_FOUND)));
        }
        else{
        return dept}
       
        }
    
    async updateDeptById(deptDetails: UpdateDepartmentDto){
       
        try {
            const newdept = plainToClass(Department, {
                id:deptDetails.id,
                name: deptDetails.name,
                
                 });
                 const response = await this.departmentrepo.getDeptById(newdept.id)
                 if(!response){
                     throw new EntityNotFoundException( ErrorCodes.DEPT_WITH_ID_NOT_FOUND);
                 }
            const save = await this.departmentrepo.updateDeptById(newdept);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to update department","unauthorized");
        }
    }

    async deleteDeptById(id:string){

        const response = await this.departmentrepo.getDeptById(id)
        if(!response){
            throw new EntityNotFoundException( ErrorCodes.DEPT_WITH_ID_NOT_FOUND);
        }
        const employees = await this.departmentrepo.getEmployeeByDept(id)
        if(employees){
            throw new EntityNotFoundException( ErrorCodes.FOREIGN_KEY);
        }
       return await this.departmentrepo.deleteDeptById(response)
    }
        
}