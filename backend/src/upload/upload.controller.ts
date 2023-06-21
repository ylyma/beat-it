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
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/audio/:userId')
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

  @Post('/video/:userId')
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

  // @UseInterceptors(CacheInterceptor)
  // @CacheKey('audio')
  // @CacheTTL(0)
  // @Get('/:userId/getaudios')
  // getAudio(@Param('userId') userId: string) {
  //   return this.uploadService.getAudio(userId);
  // }

  // @UseInterceptors(CacheInterceptor)
  // @CacheKey('video')
  // @CacheTTL(0)
  // @Get('/:userId/getvideos')
  // getVideo(@Param('userId') userId: string) {
  //   return this.uploadService.getVideo(userId);
  // }

  // @UseInterceptors(CacheInterceptor)
  // @CacheKey('audio')
  // @CacheTTL(0)
  // @Get('/:userId/getaudio/:title')
  // getAudioByTitle(title: string, @Param('userId') userId: string) {
  //   return this.uploadService.getAudioByTitle(title, userId);
  // }

  // @UseInterceptors(CacheInterceptor)
  // @CacheKey('video ')
  // @CacheTTL(0)
  // @Get('/:userId/getvideo/:title')
  // getVideoByTitle(title: string, @Param('userId') userId: string) {
  //   return this.uploadService.getVideoByTitle(title, userId);
  // }
  @Get('getvideo')
  getVideo(@Param('userId') userId: string) {
    return this.uploadService.getVideo(userId);
  }
  @Get('getaudio')
  getAudio(@Param('userId') userId: string) {
    return this.uploadService.getAudio(userId);
  }

  @Get('/getaudio/:title')
  getAudioByTitle(title: string, @Param('userId') userId: string) {
    return this.uploadService.getAudioByTitle(title, userId);
  }

  @Get('/getvideo/:title')
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
