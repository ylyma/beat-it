import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadAudio(fileName: string, userId: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: '#audio_' + userId + '_' + fileName,
        Body: file,
      }),
    );
  }

  async uploadVideo(fileName: string, userId: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: '#video_' + userId + '_' + fileName,
        Body: file,
      }),
    );
  }

  async getAudio(userId) {
    await this.s3Client.send(
      new ListObjectsCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Prefix: '#audio_' + userId + '_',
      }),
    );
  }

  async getVideo(userId) {
    await this.s3Client.send(
      new ListObjectsCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Prefix: '#video_' + userId + '_',
      }),
    );
  }

  async getAudioByTitle(title: string, userId: string) {
    await this.s3Client.send(
      new GetObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: '#audio_' + userId + '_' + title,
      }),
    );
  }

  async getVideoByTitle(title: string, userId: string) {
    await this.s3Client.send(
      new GetObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: '#video_' + userId + '_' + title,
      }),
    );
  }

  async deleteAudio(title: string, userId: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: '#audio_' + userId + '_' + title,
      }),
    );
  }

  async deleteVideo(title: string, userId: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: '#video_' + userId + '_' + title,
      }),
    );
  }
}
