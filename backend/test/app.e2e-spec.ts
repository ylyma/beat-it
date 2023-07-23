import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';
import { CreatePlaylistDto } from 'src/playlist/dto/create-playlist.dto';

describe('App e2e', () => {
describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
  });

  afterAll(() => {
    app.close();
    await app.listen(3333);

  });

  afterAll(() => {
    app.close();
  });

  describe('Bookmarks', () => {
    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        name: 'test',
        timestamp: 500,
      };
      it('should create bookmarks'),
        () => {
          return pactum
            .spec()
            .post('/bookmarks/6/testy')
            .withBody(dto)
            .expectStatus(201)
            .stores('title', 'title');
        };
    });
    describe('Get bookmark by track', () => {
      it('should get bookmarks by track'),
        () => {
          return pactum
            .spec()
            .get('/bookmarks/6/{title}')
            .withPathParams('title', '$S{title}')
            .expectStatus(200)
            .expectBodyContains('$S{title}');
        };
    });
    describe('Delete bookmark by name', () => {
      it('should delete bookmarks by name'),
        () => {
          return pactum
            .spec()
            .delete('/bookmarks/6/{title}/test/500')
            .withPathParams('id', '$S{bookmarkId}')
            .expectStatus(204);
        };
    });
  });
  describe('Playlists', () => {
    describe('Create playlist', () => {
      const dto: CreatePlaylistDto = {
        title: 'test',
        body: 'test1, test2'
      };
      it('should create bookmarks'),
        () => {
          return pactum
            .spec()
            .post('/playlists/6')
            .withBody(dto)
            .expectStatus(201)
        };
    });
    describe('Get playlist titles', () => {
      it('should get playlist titles'),
        () => {
          return pactum
            .spec()
            .get('playlists/6/getplaylist')
            .expectStatus(200)
            .expectBodyContains('title')
      };
    }) 
    describe('Get playlist by title', () => {
      it('should get playlist by title'),
        () => {
          return pactum
            .spec()
            .get('/playlists/6/title')
            .expectStatus(200)
            .expectBodyContains('test1, test2')
        };
    });
    describe('Delete playlist by title', () => {
      it('should delete playlists by title'),
        () => {
          return pactum
            .spec()
            .delete('/playlists/6/deleteplaylist/title')
            .expectStatus(204);
        };
    });
  });
});
