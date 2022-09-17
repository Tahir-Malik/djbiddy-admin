import React from 'react';
import S3 from 'react-aws-s3';

const uploadFileS3Bucket = (file, fileName) => {
    const config = {
        bucketName: 'wavey-videos-dev',
        dirName: `output`, /* optional */
        region: 'us-east-1',
        accessKeyId: 'AKIAVCQG4FCQEHVFKNWI',
        secretAccessKey: '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',
        s3Url: 'https://wavey-videos-dev.s3.amazonaws.com',
        ACL: 'public-read'
    };

    const ReactS3Client = new S3(config);

    return ReactS3Client
        .uploadFile(file, fileName)
        .then(data => {
            return data.location
        })
        .catch(err => {
            console.error(err)
        })
};

export { uploadFileS3Bucket };