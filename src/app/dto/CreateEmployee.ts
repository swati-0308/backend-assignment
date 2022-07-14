import { IsAlpha, IsAlphanumeric, IsNumber, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public department_id: string;

    @IsAlphanumeric()
    public password: string;

    @IsString()
    public role:string;

    @IsString()
    public addr_line1:string;

    @IsString()
    public addr_line2:string;

    @IsString()
    public city:string;

    @IsString()
    public zip:string

    @IsString()
    public state:string

}