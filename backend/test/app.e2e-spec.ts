import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

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
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });

  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => {
      it('should get bookmarks'),
        () => {
          return pactum
            .spec()
            .get('/bookmarks/6')
            .expectStatus(200)
            .expectBody([]);
        };
    });
    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: 'test',
        description: 'test',
        timestamp: 500,
      };
      it('should create bookmarks'),
        () => {
          return pactum
            .spec()
            .post('/bookmarks/6')
            .withBody(dto)
            .expectStatus(201)
            .stores('bookmarkId', 'id')
            .stores('title', 'title');
        };
    });
    describe('Get bookmarks', () => {
      it('should get bookmarks'),
        () => {
          return pactum
            .spec()
            .get('/bookmarks/6')
            .expectStatus(200)
            .expectJsonLength(1);
        };
    });
    describe('Get bookmark by id', () => {
      it('should get bookmarks by id'),
        () => {
          return pactum
            .spec()
            .get('/bookmarks/6/{id}')
            .withPathParams('id', '$S{bookmarkId}')
            .expectStatus(200)
            .expectBodyContains('$S{bookmarkId}');
        };
    });
    describe('Get bookmark by title', () => {
      it('should get bookmarks by title'),
        () => {
          return pactum
            .spec()
            .get('/bookmarks/6/{title}')
            .withPathParams('title', '$S{title}')
            .expectStatus(200)
            .expectBodyContains('$S{title}');
        };
    });
    describe('Edit bookmark by id', () => {
      const dto: EditBookmarkDto = {
        title: 'edit test',
        description: 'edit test',
      };
      it('should edit bookmarks by id'),
        () => {
          return pactum
            .spec()
            .patch('/bookmarks/6/{id}')
            .withPathParams('id', '$S{bookmarkId}')
            .withBody(dto)
            .expectStatus(200)
            .expectBodyContains(dto.title)
            .expectBodyContains(dto.description);
        };
    });
    describe('Delete bookmark by id', () => {
      it('should delete bookmarks by id'),
        () => {
          return pactum
            .spec()
            .delete('/bookmarks/6/{id}')
            .withPathParams('id', '$S{bookmarkId}')
            .expectStatus(204);
        };
    });
  });
});
