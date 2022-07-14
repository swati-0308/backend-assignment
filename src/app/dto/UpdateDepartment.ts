import { IsAlpha, IsAlphanumeric, IsNumber, IsString } from "class-validator";

export class UpdateDepartmentDto {

    @IsString()
    public id: string;

    @IsString()
    public name: string;


}