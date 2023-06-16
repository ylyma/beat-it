import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('uploads')
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

  @Get('/getaudio')
  getAudio() {
    return this.uploadService.getAudio();
  }

  @Get('getaudio')
  getVideo() {
    return this.uploadService.getVideo();
  }

  @Get('/getaudio/:title')
  getAudioByTitle(title: string) {
    return this.uploadService.getAudioByTitle(title);
  }

  @Get('/getvideo/:title')
  getVideoByTitle(title: string) {
    return this.uploadService.getVideoByTitle(title);
  }

  @Delete('deleteaudio/:title')
  deleteAudio(title: string) {
    return this.uploadService.deleteAudio(title);
  }

  @Delete('deletevideo/:title')
  deleteVideo(title: string) {
    return this.uploadService.deleteVideo(title);
  }
}
