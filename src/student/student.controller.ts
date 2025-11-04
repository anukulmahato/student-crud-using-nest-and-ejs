import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/cloudinary';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @Render('student/index')
  async findAll() {
    const studentData = await this.studentService.findAll();
    return { studentData: studentData };
  }

  @Post()
  @Render('student/create')
  @UseInterceptors(FileInterceptor('photo', { storage }))
  async create(
    @Body(ValidationPipe) createStudentDto: CreateStudentDto,
    @UploadedFile() file,
  ) {
    return await this.studentService.create(
      createStudentDto,
      file.path || null,
    );
  }

  @Get('/create')
  @Render('student/create')
  showCreateForm() {
    return {
      message: '',
    };
  }

  // @Delete(':id')
  // @Redirect('/')
  // async delete(@Param('id') id: string) {
  //   await this.studentService.delete(id);
  //   return {};
  // }

  @Get('delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      console.log('🔴 Deleting student with ID:', id);
      console.log('✅ Student deleted successfully');
      return await this.studentService.delete(id);
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }
  // @Post('student/:id')
  // async deleteStudent(@Param('id') id: string) {
  //   await this.studentService.delete(id);
  //   return { Redirect: '/student' };
  // }
}
