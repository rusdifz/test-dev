import { IsNotEmpty, IsString } from "class-validator"

export class ItemDTO{
    @IsNotEmpty()
    username: string
    @IsNotEmpty()
    item: string
}