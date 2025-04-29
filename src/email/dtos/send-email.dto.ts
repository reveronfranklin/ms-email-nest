import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Template } from '../enums/template.enum';

export class SendEmailDto {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  subjectEmail: string;

  @IsString()
  @IsNotEmpty()
  sendTo: string;
  @IsString()
  bcc: string;
  @IsString()
  cc: string;

  @IsString()
  @IsNotEmpty()
  bodyText: string;

  @IsEnum(Template)
  @IsNotEmpty()
  template: string;

  //@IsObject()
  //@IsOptional()
  //params: any;
}
