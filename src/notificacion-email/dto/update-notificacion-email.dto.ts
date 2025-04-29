import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNotificacionEmailDto {
  @IsNotEmpty()
  Id: number;
  @IsString()
  @IsNotEmpty()
  Email: string;

  Enable: boolean;
}
