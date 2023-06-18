import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('audio')
export class AudioController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('audio', { dest: './uploads' }))
  uploadSingle(@UploadedFile() file) {
    console.log(file);
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('audios[]', 10, { dest: './uploads' }))
  uploadMultiple(@UploadedFiles() files) {
    console.log(files);
  }
}
