import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CommonFilterDTO {
  @IsOptional()
  keyword?: string;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
