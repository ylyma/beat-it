import { Module } from '@nestjs/common';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { CacheModule } from '@nestjs/cache-manager';
import { PlaylistService } from './playlist/playlist.service';
import { PlaylistModule } from './playlist/playlist.module';
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
    BookmarkModule,
    UploadModule,
    PlaylistModule,
  ],
  providers: [PlaylistService],
})
export class AppModule {}
