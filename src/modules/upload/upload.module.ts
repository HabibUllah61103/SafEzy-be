// src/upload/upload.module.ts
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudinaryService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [CloudinaryService],
})
export class UploadModule {}
