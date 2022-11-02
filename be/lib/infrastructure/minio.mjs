import Minio         from 'minio';
import { promisify } from '../../packages.mjs';
import config        from '../config.cjs';

const minioClient = new Minio.Client({ ...config.minio, port: +config.minio.port });

minioClient.uploadAsync = promisify(minioClient.putObject);
minioClient.deleteAsync = promisify(minioClient.removeObject);

export default minioClient;
export const BucketName = config.minio.bucket;
