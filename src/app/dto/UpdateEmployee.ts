import { IsAlpha, IsAlphanumeric, IsNumber, IsString } from "class-validator";

export class UpdateEmployeeDto {
    
    @IsString()
    public id: string;

    @IsString()
    public name: string;

    @IsString()
    public departmentId: string;

    @IsString()
    public password:string;
    
    @IsString()
    public role: string;

    @IsString()
    public addressId: string;
}