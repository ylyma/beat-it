import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  IsNumber,
} from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  timestamp: number;
}
