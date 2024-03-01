import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { startOfDay, subDays } from 'date-fns';

import { AuthDto } from 'src/dto/auth.dto';
import { UserDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
   constructor(private prisma: PrismaService) {}

   getUserById(id: string) {
      return this.prisma.user.findUnique({
         where: {
            id,
         },
         include: {
            tasks: true,
         },
      });
   }

   getUserByEmail(email: string) {
      return this.prisma.user.findUnique({
         where: {
            email,
         },
      });
   }

   async getUserProfile(id: string) {
      const profile = await this.getUserById(id);

      const totalTasks = profile.tasks.length;
      const completedTasks = await this.prisma.task.count({
         where: {
            userId: id,
            isCompleted: true,
         },
      });
      const todayStart = startOfDay(new Date());
      const weekStart = startOfDay(subDays(new Date(), 7));

      const todatTasks = await this.prisma.task.count({
         where: {
            userId: id,
            createdAt: {
               gte: todayStart.toISOString(),
            },
         },
      });

      const weekTasks = await this.prisma.task.count({
         where: {
            userId: id,
            createdAt: {
               gte: weekStart.toISOString(),
            },
         },
      });

      delete profile.password;
      return {
         user: profile,
         statistics: [
            { label: 'Total', value: totalTasks },
            { label: 'Completed Tasks', value: completedTasks },
            { label: 'Today Tasks', value: todatTasks },
            { label: 'Week Tasks', value: weekTasks },
         ],
      };
   }

   async createUser(dto: AuthDto) {
      const { email, password } = dto;

      const user = {
         email,
         name: '',
         password: await hash(password),
      };

      return this.prisma.user.create({
         data: user,
      });
   }

   async updateUser(id: string, dto: UserDto) {
      let data = dto;

      if (dto.password) {
         data = { ...dto, password: await hash(dto.password) };
      }

      return this.prisma.user.update({
         where: {
            id,
         },
         data,
         select: {
            name: true,
            email: true,
         },
      });
   }
}
