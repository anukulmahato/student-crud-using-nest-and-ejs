import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}
  async findAll() {
    return await this.prismaService.students.findMany();
  }

  async create(createStudentDto: CreateStudentDto, file: string) {
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

  // async delete(id: string) {
  //   return await this.prismaService.students.delete({
  //     where: { id },
  //   });
  // }

  async delete(id: string) {
    try {
      const deleted = await this.prismaService.students.delete({
        where: { id },
      });
      console.log('✅ Deleted student:', deleted);
      return deleted;
    } catch (error) {
      console.error('❌ Delete error:', error);
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }
}
