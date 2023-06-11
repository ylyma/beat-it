import { IsNotEmpty, IsOptional, IsString, Min, IsInt } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  artist?: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  timestamp: number;
}
