import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get('/:userId/:trackTitle')
  getBookmarksByTrack(
    @Param('userId') userId: string,
    @Param('trackTitle') title: string,
  ) {
    return this.bookmarkService.getBookmarksByTrack(userId, title);
  }

  @Post('/:userId/:trackTitle')
  createBookmark(
    @Param('userId') userId: string,
    @Body() dto: CreateBookmarkDto,
    @Param('trackTitle') title: string,
  ) {
    return this.bookmarkService.createBookmark(userId, dto, title);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:userId/:trackTitle/:name/:time')
  deleteBookmarkByName(
    @Param('userId') userId: string,
    @Param('name') name: string,
    @Param('trackTitle') title: string,
    @Param('time') time: string,
  ) {
    return this.bookmarkService.deleteBookmarkByName(userId, name, title, time);
  }
}
