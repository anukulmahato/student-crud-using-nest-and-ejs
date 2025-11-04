import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}
  async findAll() {
    return await this.prismaService.students.findMany();
  }

  async findOne(id: string) {
    const student = await this.prismaService.students.findUnique({
      where: { id },
    });

    return student;
  }

  async create(createStudentDto: CreateStudentDto, file: any) {
    await this.prismaService.students.create({
      data: {
        name: createStudentDto.name,
        email: createStudentDto.email,
        cell: createStudentDto.cell,
        photo: file,
      },
    });

    return {
      message: 'Lead Created Successful',
    };
  }

  async delete(id: string) {
    try {
      const deleted = await this.prismaService.students.delete({
        where: { id },
      });
      return deleted;
    } catch (error) {
      console.error('❌ Delete error:', error);
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }
}
