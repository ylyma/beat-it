import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
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

  constructor(
    private readonly configService: ConfigService,
    // @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

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

  // async getAudio(userId) {
  //   const cachedData = await this.cacheService.get(userId);
  //   if (cachedData) {
  //     console.log('data exists in cache');
  //     return '${cachedData.name}';
  //   }

  //   const audio = new ListObjectsCommand({
  //     Bucket: this.configService.get('AWS_BUCKET_NAME'),
  //     Prefix: '#audio_' + userId + '_',
  //   });
  //   await this.s3Client.send(audio);
  //   await this.cacheService.set(userId, audio);
  //   return await '${audio.name}';
  // }

  // async getVideo(userId) {
  //   const cachedData = await this.cacheService.get(userId);
  //   if (cachedData) {
  //     console.log('data exists in cache');
  //     return '${cachedData.name}';
  //   }

  //   const audio = new ListObjectsCommand({
  //     Bucket: this.configService.get('AWS_BUCKET_NAME'),
  //     Prefix: '#video_' + userId + '_',
  //   });
  //   await this.s3Client.send(audio);
  //   await this.cacheService.set(userId, audio);
  //   return await '${video.name}';
  // }

  // async getAudioByTitle(title: string, userId: string) {
  //   const cachedData = await this.cacheService.get(userId);
  //   if (cachedData) {
  //     console.log('data exists in cache');
  //     return '${cachedData.name}';
  //   }

  //   const audio = new GetObjectCommand({
  //     Bucket: this.configService.get('AWS_BUCKET_NAME'),
  //     Key: '#audio_' + userId + '_' + title,
  //   });
  //   await this.s3Client.send(audio);
  //   await this.cacheService.set(userId, audio);
  //   return await '${audio.name}';
  // }

  // async getVideoByTitle(title: string, userId: string) {
  //   const cachedData = await this.cacheService.get(userId);
  //   if (cachedData) {
  //     console.log('data exists in cache');
  //     return '${cachedData.name}';
  //   }

  //   const audio = new GetObjectCommand({
  //     Bucket: this.configService.get('AWS_BUCKET_NAME'),
  //     Key: '#video_' + userId + '_' + title,
  //   });
  //   await this.s3Client.send(audio);
  //   await this.cacheService.set(userId, audio);
  //   return await '${video.name}';
  // }

  async getAudio(userId: string) {
    await this.s3Client.send(
      new ListObjectsCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Prefix: '#audio_' + userId + '_',
      }),
    );
  }

  async getVideo(userId: string) {
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
