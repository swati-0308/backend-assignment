import { getConnection, ObjectLiteral } from "typeorm";
import { Department } from "../entities/Department"
import { Employee } from "../entities/Employee";

export class DepartmentRepository{
    async getAllDepts(){
        const deptrepo= getConnection().getRepository(Department);
        return deptrepo.find({relations:['employee']});
    }
    async getDeptById(id:string){
        const deptrepo = getConnection().getRepository(Department);
        return deptrepo.findOne({id});
    }

    async updateDeptById(department:Department){
        const deptrepo = getConnection().getRepository(Department);
        const dept= await deptrepo.save(department);
        return dept;


    }
    async createDept(deptDetails:Department){
        const deptrepo = getConnection().getRepository(Department).save(deptDetails)
        return deptrepo;
        
    }

    async deleteDeptById(dept:Department) {
        const deptrepo = getConnection().getRepository(Department);
        const department = await deptrepo.softDelete(dept)
        return department;
    }

    async getEmployeeByDept(id:string){
        const employeeRepo = getConnection().getRepository(Employee);
        return await employeeRepo.find({
            where:{departmentId:id}
        })
       
        }
}
