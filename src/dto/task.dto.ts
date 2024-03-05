import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsEnum, IsString } from 'class-validator';

export class TaskDto {
   @IsString()
   name: string;

   @IsBoolean()
   @IsOptional()
   isCompleted?: boolean;

   @IsString()
   @IsOptional()
   createdAt?: Date;

   @IsEnum(Priority)
   @IsOptional()
   @Transform(({ value }) => ('' + value).toLowerCase())
   priority?: Priority;
}
