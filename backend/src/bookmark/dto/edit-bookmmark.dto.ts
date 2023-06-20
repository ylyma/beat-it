import { IsOptional, IsString, Min, IsNumber } from 'class-validator';

export class EditBookmarkDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  artist?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  timestamp?: number;
}
