import { IsInt, IsOptional, IsString } from 'class-validator';

export class EditAudioDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  artist?: string;

  @IsInt()
  @IsOptional()
  length?: number;
}
