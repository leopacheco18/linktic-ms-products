import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'; // Importa las clases del nuevo SDK
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const { originalname } = file;
    const bucketS3 = process.env.AWS_S3_BUCKET;
    const fileExtension = originalname.split('.').pop();
    const key = `${uuid()}.${fileExtension}`;

    const uploadParams = {
      Bucket: bucketS3,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    const command = new PutObjectCommand(uploadParams);
    await this.s3.send(command); // Ejecuta el comando

    // Devuelve la URL pública
    return `https://${bucketS3}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }
}
