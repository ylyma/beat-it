import { IsOptional, IsString, Min, IsInt } from 'class-validator';

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

  @IsInt()
  @Min(0)
  @IsOptional()
  timestamp?: number;
}
