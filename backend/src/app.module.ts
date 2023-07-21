import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { CacheModule } from '@nestjs/cache-manager';
import { PlaylistService } from './playlist/playlist.service';
import { PlaylistModule } from './playlist/playlist.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: process.env.HOST,
    //   port: process.env.PORT,
    // }),
    PrismaModule,
    BookmarkModule,
    UploadModule,
    PlaylistModule,
  ],
  providers: [PlaylistService],
})
export class AppModule {}
