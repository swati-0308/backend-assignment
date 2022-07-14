import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import  authorize  from '../middleware/AuthorizationMiddleware';
import {CreateEmployeeDto} from '../dto/CreateEmployee';
import validationMiddleware from '../middleware/validationmiddleware';
import { UpdateEmployeeDto } from "../dto/UpdateEmployee";



class EmployeeController extends AbstractController {
  constructor(private employeeservice:EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
   
  }
  protected initializeRoutes() {
    enum Roles{
      ADMIN="admin",HR="hr",ENGINEER="engineer",MANAGER="manager"};
    
    this.router.get(`${this.path}`, authorize(Object.values(Roles)),this.getAllEmployees);
    this.router.get(`${this.path}/:id`,authorize(Object.values(Roles)), this.getEmployeeById);
    this.router.put(`${this.path}`, authorize([Roles.ADMIN,Roles.HR]),validationMiddleware(UpdateEmployeeDto,APP_CONSTANTS.body),this.updateEmployeeById);
    this.router.post(`${this.path}`, validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body),
    this.createEmployee);
    this.router.post(`${this.path}/login`,this.login);
    this.router.delete(`${this.path}/:id`, authorize([Roles.ADMIN,Roles.HR]),this.deleteEmployeeById);
  }
  private getAllEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Get All Employees"};
      response.status(200);
      response.send(await this.employeeservice.getAllEmployees());
    } catch (error) {
      return next(error);
    }
}
    private createEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
          
          const data: any = { message: "Employee Creation"};
          response.status(200);
          response.send(this.fmt.formatResponse(await this.employeeservice.createEmployee(request.body), Date.now() - request.startTime, "OK"));
        } catch (error) {
          return next(error);
        
        }
  }

  private getEmployeeById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      
      const data: any = { message: "Get Employee By Id"};
      response.status(200);
      response.send(await this.employeeservice.getEmployeeById(request.params.id));
    } catch (error) {
      return next(error);
    
    }
  }
    private updateEmployeeById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
      try {
        
        const data: any = { message: "Update Employee By Id"};
        response.status(200);
        response.send(await this.employeeservice.updateEmployeeById(request.body));
      } catch (error) {
        return next(error);
      
      }
  
    }

    private deleteEmployeeById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
      try {
        
        const data: any = { message: "Delete Employee with said Id"};
        response.status(200);
        response.send(await this.employeeservice.deleteEmployeeById(request.params.id));
      } catch (error) {
        return next(error);
      
      }
  
    }

    private login = async (
      request: RequestWithUser,
      response: Response,
      next: NextFunction
    ) => {
      const loginData = request.body;
      const loginDetail = await this.employeeservice.employeeLogin(
        loginData.name,
        loginData.password
      );
      response.send(
        this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
      );
    };

}

export default EmployeeController;
