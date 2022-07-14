import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { AddressService } from "../service/AddressService";

class AddressController extends AbstractController {
  constructor(private addressservice:AddressService) {
    super(`${APP_CONSTANTS.apiPrefix}/address`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getAddress);
    this.router.post(`${this.path}`, this.createAddress)
  }
  private getAddress = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Service Up"};
      response.status(200);
      response.send(await this.addressservice.getAddress());
    } catch (error) {
      return next(error);
    }
}
private createAddress = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Service Up"};
      response.status(200);
      response.send(await this.addressservice.createAddress(request.body));
    } catch (error) {
      return next(error);
    }
}
}
export default AddressController;