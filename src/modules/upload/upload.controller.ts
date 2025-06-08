// src/upload/upload.controller.ts
import {
  BadRequestException,
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './upload.service';
import { Express } from 'express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('files')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'The files to upload (10 max at once)',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
      }),
    )
    files: Express.Multer.File[],
  ) {
    files.map((file) => {
      const regex =
        /^(image\/(jpeg|png|gif)|application\/pdf|application\/xml|text\/xml)$/;

      const mimeType = file.mimetype;

      if (!regex.test(mimeType)) {
        throw new BadRequestException(
          `Unsupported file type: ${mimeType} (${file.originalname})`,
        );
      }
    });

    const result = await this.cloudinaryService.uploadFiles(files);
    return result;
  }
}
