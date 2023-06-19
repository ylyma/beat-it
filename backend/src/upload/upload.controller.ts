import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
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

  @Post('audio/:userId')
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
    @Param('userId') userId: string,
  ) {
    await this.uploadService.uploadAudio(
      file.originalname,
      userId,
      file.buffer,
    );
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
    @Param('userId') userId: string,
  ) {
    await this.uploadService.uploadVideo(
      file.originalname,
      userId,
      file.buffer,
    );
  }

  @Get('/:userId/getaudios')
  getAudio(@Param('userId') userId: string,) {
    return this.uploadService.getAudio(userId);
  }

  @Get('/:userId/getvideos')
  getVideo(@Param('userId') userId: string,) {
    return this.uploadService.getVideo(userId);
  }

  @Get('?:userId/getaudio/:title')
  getAudioByTitle(title: string, @Param('userId') userId: string) {
    return this.uploadService.getAudioByTitle(title, userId);
  }

  @Get('/:userId/getvideo/:title')
  getVideoByTitle(title: string, @Param('userId') userId: string) {
    return this.uploadService.getVideoByTitle(title, userId);
  }

  @Delete('/:userId/deleteaudio/:title')
  deleteAudio(title: string, @Param('userId') userId: string) {
    return this.uploadService.deleteAudio(title, userId);
  }

  @Delete('/:userId/deletevideo/:title')
  deleteVideo(title: string, @Param('userId') userId: string) {
    return this.uploadService.deleteVideo(title, userId);
  }
}
