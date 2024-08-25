import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsOptional()
    @IsInt()
    readonly publishedYear?: number;

    @IsOptional()
    @IsString()
    readonly genre?: string;

    @IsOptional()
    @IsString()
    readonly summary?: string;
}
