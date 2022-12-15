import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  listAllStudents() {
    return this.prisma.student.findMany();
  }

  getStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  createStudent(authUserId: string) {
    return this.prisma.student.create({
      data: {
        authUserId,
      },
    });
  }
}
