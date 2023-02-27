import { Resources } from '@prisma/client';

export interface ResourceOut extends Resources {
    url: string;
}

export interface ResourceOutArray {
    files: ResourceOut[];
}
