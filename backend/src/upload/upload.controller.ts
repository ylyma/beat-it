import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/audio/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    console.log('audio posted');
    await this.uploadService.uploadAudio(
      file.originalname,
      userId,
      file.buffer,
    );
  }

  @Post('/video/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    await this.uploadService.uploadVideo(
      file.originalname,
      userId,
      file.buffer,
    );
  }

  @Get('/:userId/getvideo')
  getVideoTitles(@Param('userId') userId: string) {
    return this.uploadService.getVideoTitles(userId);
  }
  @Get('/:userId/getaudio')
  getAudioTitles(@Param('userId') userId: string) {
    return this.uploadService.getAudioTitles(userId);
  }

  @Get('/:userId/getaudio/:title')
  getAudioByTitle(
    @Param('title') title: string,
    @Param('userId') userId: string,
  ) {
    return this.uploadService.getAudioByTitle(title, userId);
  }

  @Get('/:userId/getvideo/:title')
  getVideoByTitle(
    @Param('title') title: string,
    @Param('userId') userId: string,
  ) {
    return this.uploadService.getVideoByTitle(title, userId);
  }

  @Delete('/:userId/deleteaudio/:title')
  deleteAudio(@Param('title') title: string, @Param('userId') userId: string) {
    return this.uploadService.deleteAudio(title, userId);
  }

  @Delete('/:userId/deletevideo/:title')
  deleteVideo(@Param('title') title: string, @Param('userId') userId: string) {
    return this.uploadService.deleteVideo(title, userId);
  }
}
