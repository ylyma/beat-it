import { Controller, Post } from '@nestjs/common';

@Controller('playlist')
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService) {}

    @Post('/playlist/:userId')
    async uploadPlaylist()
}
