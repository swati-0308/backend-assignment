import { IsAlpha, IsAlphanumeric, IsNumber, IsString } from "class-validator";

export class CreateDepartmentDto {

    @IsString()
    public name: string;


}