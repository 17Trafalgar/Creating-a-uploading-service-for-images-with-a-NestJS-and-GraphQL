import { PrismaService } from '../services/prisma.service';
import { Module } from '@nestjs/common';
import { UploadMutationResolvers } from './resolvers/upload-mutation.resolver';
import { FileUploadService } from './services/file-upload.service';
import { ConfigModule } from '@nestjs/config';
import { CdnService } from './services/cdn.service';
import { UploadRootResolver } from './resolvers/upload-root.resolver';
import { FilesQueryResolver } from './resolvers/upload-query.resolver';

@Module({
    imports: [ConfigModule],
    providers: [
        UploadMutationResolvers,
        FileUploadService,
        UploadRootResolver,
        PrismaService,
        CdnService,
        FilesQueryResolver,
    ],
    exports: [FileUploadService],
})
export class FileUploadModule {}
