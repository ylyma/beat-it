import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  // @Post('/:userId')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadPlaylist(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Param('userId') userId: string,
  // ) {
  //   await this.playlistService.uploadPlaylist(
  //     file.originalname,
  //     userId,
  //     file.buffer,
  //   );
  // }
  @Post('/:userId')
  async uploadPlaylist(
    @Body() body: CreatePlaylistDto,
    @Param('userId') userId: string,
  ) {
    await this.playlistService.uploadPlaylist(body, userId);
  }

  @Get('/:userId/getplaylist')
  getPlaylistTitles(@Param('userId') userId: string) {
    return this.playlistService.getPlaylistTitles(userId);
  }

  @Get('/:userId/getplaylist/:title')
  getPlaylistByTitle(
    @Param('userId') userId: string,
    @Param('title') title: string,
  ) {
    return this.playlistService.getPlaylistByTitle(title, userId);
  }

  @Delete('/:userId/deleteplaylist/:title')
  deletePlaylist(
    @Param('userId') userId: string,
    @Param('title') title: string,
  ) {
    return this.playlistService.deletePlaylist(title, userId);
  }
}
