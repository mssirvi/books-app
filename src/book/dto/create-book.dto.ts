import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    readonly publishedYear?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly genre?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly summary?: string;
}
