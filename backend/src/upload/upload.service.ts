import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
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
  constructor(
    private readonly configService: ConfigService, // @Inject(CACHE_MANAGER) private cacheService: Cache,
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
  //TODO: get all titles and filetypes in userid
  async getAudioTitles(userId: string) {
    // await this.s3Client.send(
    //   new ListObjectsCommand({
    //     Bucket: this.configService.get('AWS_BUCKET_NAME'),
    //     Prefix: '#audio_' + userId + '_',
    //   }),
    // );
    const command = new ListObjectsV2Command({
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Prefix: '#audio_' + userId + '_',
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

  async getVideoTitles(userId: string) {
    // await this.s3Client.send(
    //   new ListObjectsCommand({
    //     Bucket: this.configService.get('AWS_BUCKET_NAME'),
    //     Prefix: '#video_' + userId + '_',
    //   }),
    // );
    const command = new ListObjectsV2Command({
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Prefix: '#video_' + userId + '_',
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

  async getVideoByTitle(title: string, userId: string) {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: '#video_' + userId + '_' + title,
    });
    const url = await getSignedUrl(this.s3Client, command);
    console.log(url);
    return url;
  }

  async getAudioByTitle(title: string, userId: string) {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: '#audio_' + userId + '_' + title,
    });
    const url = await getSignedUrl(this.s3Client, command);
    console.log(url);
    return url;
  }

  // async getAudioByTitle(title: string, userId: string) {
  //   // const response = await await this.s3Client.send(
  //   //   new GetObjectCommand({
  //   //     Bucket: this.configService.get('AWS_BUCKET_NAME'),
  //   //     Key: '#audio_' + userId + '_' + title,
  //   //   }),
  //   // );
  //   // const stream = response.Body as Readable;
  //   // return new Promise<Buffer>((resolve, reject) => {
  //   //   const chunks: Buffer[] = [];
  //   //   stream.on('data', (chunk) => chunks.push(chunk));
  //   //   stream.once('end', () => resolve(Buffer.concat(chunks)));
  //   //   stream.once('error', reject);
  //   // });
  //   await new Promise(async (resolve, reject) => {
  //     const getObjectCommand = new GetObjectCommand({
  //       Bucket: this.configService.get('AWS_BUCKET_NAME'),
  //       Key: '#audio_' + userId + '_' + title,
  //     });
  //     try {
  //       const response = await this.s3Client.send(getObjectCommand);
  //       const stream = response.Body as Readable;
  //       // Store all of data chunks returned from the response data stream
  //       // into an array then use Array#join() to use the returned contents as a String
  //       const responseDataChunks = [];

  //       // Handle an error while streaming the response body
  //       stream.once('error', (err) => reject(err));

  //       // Attach a 'data' listener to add the chunks of data to our array
  //       // Each chunk is a Buffer instance
  //       stream.on('data', (chunk) => responseDataChunks.push(chunk));

  //       // Once the stream has no more data, join the chunks into a string and return the string
  //       stream.once('end', () => resolve(responseDataChunks.join('')));
  //     } catch (err) {
  //       // Handle the error or throw
  //       return reject(err);
  //     }
  //   });
  // }

  // async getVideoByTitle(title: string, userId: string, res: Response) {
  //   await new Promise(async (resolve, reject) => {
  //     const getObjectCommand = new GetObjectCommand({
  //       Bucket: this.configService.get('AWS_BUCKET_NAME'),
  //       Key: '#video_' + userId + '_' + title,
  //     });
  //     try {
  //       const response = await this.s3Client.send(getObjectCommand);
  //       const stream = response.Body as Readable;
  //       stream.pipe(res);
  //       // console.log('s' + stream);
  //       // const responseDataChunks = [];
  //       // stream.once('error', (err) => reject(err));
  //       // stream.on('data', (chunk) => responseDataChunks.push(chunk));
  //       // stream.once('end', () => resolve(responseDataChunks.join('')));
  //       // console.log(responseDataChunks);
  //     } catch (err) {
  //       // Handle the error or throw
  //       return reject(err);
  //     }
  //   });
  // }

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
