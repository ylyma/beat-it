import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistService {
  private readonly s3Client = new S3Client({
    region: 'ap-southeast-1',
    credentials: {
      accessKeyId: 'AKIA5RYVYZSLFM6J22MG',
      secretAccessKey: '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',
    },
  });
  constructor(private readonly configService: ConfigService) {}

  // async uploadPlaylist(fileName: string, userId: string, file: Buffer) {
  //   await this.s3Client.send(
  //     new PutObjectCommand({
  //       Bucket: "beatit",
  //       Key: '#playlist_' + userId + '_' + fileName,
  //       Body: file,
  //     }),
  //   );
  // }

  async uploadPlaylist(body: CreatePlaylistDto, userId: string) {
    const title = body.title;
    const content = body.body;
    console.log(title + ' ' + content);
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'beatit',
        Key: '#playlist_' + userId + '_' + title,
        Body: content,
      }),
    );
  }
  async getPlaylistTitles(userId: string) {
    const command = new ListObjectsV2Command({
      Bucket: 'beatit',
      Prefix: '#playlist_' + userId + '_',
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

  async getPlaylistByTitle(title: string, userId: string) {
    const command = new GetObjectCommand({
      Bucket: 'beatit',
      Key: '#playlist_' + userId + '_' + title,
    });
    const data = await this.s3Client.send(command);
    const titles = data.Body.transformToString();
    console.log(titles);
    return titles;
  }

  async deletePlaylist(title: string, userId: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: 'beatit',
        Key: '#playlist_' + userId + '_' + title,
      }),
    );
  }
}
