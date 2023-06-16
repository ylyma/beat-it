import {
  Controller,
  Delete,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('audio')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async uploadAudio(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /\.(mp3|mp4|m4a|flac|wav|aac)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.uploadService.uploadAudio(file.originalname, file.buffer);
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async uploadVideo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\.(mp4|mov|mpeg)$/ })],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.uploadService.uploadVideo(file.originalname, file.buffer);
  }

  @Delete('/audio/:title')
  async deleteAudio(title: string) {
    await this.uploadService.deleteAudio(title);
  }

  @Delete('/audio/:title')
  async deleteVideo(title: string) {
    await this.uploadService.deleteAudio(title);
  }
}
