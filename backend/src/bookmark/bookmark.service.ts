import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BookmarkService {
  private readonly s3Client = new S3Client({
    region: 'ap-southeast-1',
    credentials: {
      accessKeyId: 'AKIA5RYVYZSLFM6J22MG',
      secretAccessKey: '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',
    },
  });
  constructor(private configService: ConfigService) {}

  // getBookmarks(userId: string) {
  //   return this.prisma.bookmark.findMany({
  //     where: {
  //       userId,
  //     },
  //   });
  // }
  async getBookmarksByTrack(userId: string, title: string) {
    const command = new ListObjectsV2Command({
      Bucket: 'beatit',
      Prefix: '#bookmark_' + userId + '_' + title,
    });
    try {
      let isTruncated = true;
      console.log(userId);
      console.log('Your bucket contains the following objects:\n');
      let contents = '';

      while (isTruncated) {
        const { Contents, IsTruncated, NextContinuationToken } =
          await this.s3Client.send(command);
        const contentsList = Contents.map((c) => `${c.Key}`).join('/');
        contents += contentsList;
        isTruncated = IsTruncated;
        command.input.ContinuationToken = NextContinuationToken;
      }
      console.log(contents);
      return contents;
    } catch (error) {
      console.log(error);
    }
  }

  // getBookmarkById(userId: string, bookmarkId: number) {
  //   return this.prisma.bookmark.findFirst({
  //     where: {
  //       id: bookmarkId,
  //       userId,
  //     },
  //   });
  // }
  async createBookmark(userId: string, body: CreateBookmarkDto, title: string) {
    console.log('created bookmark');
    const name = body.name;
    const content = body.timestamp;
    console.log(title + ' ' + content);
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'beatit',
        Key: '#bookmark_' + userId + '_' + title + '_' + name + '_' + content,
        Body: '',
      }),
    );
  }

  // getBookmarkByTitle(userId: string, title: string) {
  //   return this.prisma.bookmark.findMany({
  //     where: {
  //       title: title,
  //       userId,
  //     },
  //   });
  // }

  // async createBookmark(userId: string, dto: CreateBookmarkDto) {
  //   console.log(dto);
  //   const bookmark = await this.prisma.bookmark.create({
  //     data: {
  //       userId,
  //       ...dto,
  //     },
  //   });
  //   return bookmark;
  // }

  // async editBookmarkByName(userId: string, name: string, dto: EditBookmarkDto) {
  //   const bookmark = await this.prisma.bookmark.findUnique({
  //     where: {
  //       id: bookmarkId,
  //     },
  //   });
  //   if (!bookmark || bookmark.userId !== userId) {
  //     throw new ForbiddenException('Access to resources denied.');
  //   }
  //   return this.prisma.bookmark.update({
  //     where: {
  //       id: bookmarkId,
  //     },
  //     data: {
  //       ...dto,
  //     },
  //   });
  // }

  // async deleteBookmarkByName(userId: string, name: string, title: string) {
  //   const bookmark = await this.prisma.bookmark.findUnique({
  //     where: {
  //       id: bookmarkId,
  //     },
  //   });
  //   if (!bookmark || bookmark.userId !== userId) {
  //     throw new ForbiddenException('Access to resources denied.');
  //   }
  //   await this.prisma.bookmark.delete({
  //     where: {
  //       id: bookmarkId,
  //     },
  //   });
  // }

  async deleteBookmarkByName(
    userId: string,
    name: string,
    title: string,
    time: string,
  ) {
    console.log('#bookmark_' + userId + '_' + title + '_' + name + '_' + time);
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: 'beatit',
        Key: '#bookmark_' + userId + '_' + title + '_' + name + '_' + time,
      }),
    );
  }
}
