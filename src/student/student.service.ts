import { Injectable, NotFoundException } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from './../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    private prismaService: PrismaService,
    private mailService: MailService,
  ) {}
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
    const student = await this.prismaService.students.create({
      data: {
        name: createStudentDto.name,
        email: createStudentDto.email,
        cell: createStudentDto.cell,
        photo: file,
      },
    });
    this.mailService.sendEmail('anukulmahato014@gmail.com', 'test', 'hello js');

    return {
      student,
      message: 'Lead Created Successful',
    };
  }

  async update(id: string, updateStudentDto: UpdateStudentDto, file: any) {
    const updateData: any = {
      name: updateStudentDto.name,
      email: updateStudentDto.email,
      cell: updateStudentDto.cell,
    };

    if (file) {
      updateData.photo = file;
    }

    const updated = await this.prismaService.students.update({
      where: { id },
      data: updateData,
    });

    return updated;
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
