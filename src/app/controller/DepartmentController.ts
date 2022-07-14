import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import validationMiddleware from '../middleware/validationmiddleware';
import {CreateDepartmentDto} from '../dto/CreateDepartment';
import authorize from '../middleware/AuthorizationMiddleware'
import { UpdateDepartmentDto } from "../dto/UpdateDepartment";

class DepartmentController extends AbstractController {
  constructor(private deptservice:DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/dept`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    enum Roles{
      ADMIN="admin",HR="hr",ENGINEER="engineer",MANAGER="manager"};
    this.router.get(`${this.path}`, authorize(Object.values(Roles)),this.getDept);
    this.router.get(`${this.path}/:id`, authorize(Object.values(Roles)),this.getDeptById);
    this.router.put(`${this.path}`, validationMiddleware(UpdateDepartmentDto,APP_CONSTANTS.body),authorize([Roles.ADMIN,Roles.HR]),this.updateDeptById);
    this.router.post(`${this.path}`,validationMiddleware(CreateDepartmentDto,APP_CONSTANTS.body),this.createDept);
    this.router.delete(`${this.path}/:id`, authorize([Roles.ADMIN,Roles.HR]),this.deleteDeptById);
  }
  private getDept = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Service Up"};
      response.status(200);
      response.send(await this.deptservice.getAllDepts());
    } catch (error) {
      return next(error);
    }
  }

  private createDept = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      
      const data: any = { message: "Department Creation"};
      response.status(200);
      response.send(this.fmt.formatResponse(await this.deptservice.createDept(request.body), Date.now() - request.startTime, "OK"));
    } catch (error) {
      return next(error);
    
    }
}

private getDeptById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
try {
  
  const data: any = { message: "Get Department By Id"};
  response.status(200);
  response.send(await this.deptservice.getDeptById(request.params.id));
} catch (error) {
  return next(error);

}
}
private updateDeptById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    
    const data: any = { message: "Update Department By Id"};
    response.status(200);
    response.send(await this.deptservice.updateDeptById(request.body));
  } catch (error) {
    return next(error);
  
  }

}

private deleteDeptById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    
    const data: any = { message: "Delete Department with said Id"};
    response.status(200);
    response.send(await this.deptservice.deleteDeptById(request.params.id));
  } catch (error) {
    return next(error);
  
  }

}

}

export default DepartmentController;
