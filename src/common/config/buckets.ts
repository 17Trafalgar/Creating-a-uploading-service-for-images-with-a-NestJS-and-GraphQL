enum Buckets {
    bucket = '[{"name":"test1","keys":{"read":"","upload":"key_test","delete":"abcd"}}]',
}

export class CdnBucket {
    getBucket(): string {
        return Buckets.bucket;
    }
}
