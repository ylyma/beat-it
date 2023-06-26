import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddAudioDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  artist?: string;

  @IsInt()
  @IsNotEmpty()
  length: number;
}
