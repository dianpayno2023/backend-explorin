import { IsNotEmpty, IsOptional } from "class-validator";

export class UsersDTO{
    // @IsNotEmpty()
    // @IsOptional()
    email : string

    // @IsNotEmpty()
    data : string
}