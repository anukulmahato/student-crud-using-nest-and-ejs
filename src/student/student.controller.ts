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
import { UpdateStudentDto } from './dto/update-student.dto';
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

  @Get('view/:id')
  @Render('student/view')
  async findOne(@Param('id') id: string) {
    const student = await this.studentService.findOne(id);
    return { student };
  }

  @Get('edit/:id')
  @Render('student/edit')
  async showEditForm(@Param('id') id: string) {
    const student = await this.studentService.findOne(id);

    return { student, message: '' };
  }

  @Post('update/:id')
  @UseInterceptors(FileInterceptor('photo', { storage }))
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateStudentDto: UpdateStudentDto,

    @UploadedFile() file,
    @Res() res,
  ) {
    await this.studentService.update(id, updateStudentDto, file?.path || null);
    return res.redirect('/student');
  }

  @Get('delete/:id')
  async delete(@Param('id') id: string, @Res() res) {
    try {
      await this.studentService.delete(id);

      return res.redirect('/student');
    } catch (error) {
      console.error('Delete error:', error);
      return res.status(500).send(`Delete failed: ${error.message}`);
    }
  }
}
