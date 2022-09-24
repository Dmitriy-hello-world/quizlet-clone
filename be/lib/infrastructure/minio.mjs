import Minio         from 'minio';
import { promisify } from '../../packages.mjs';
import config        from '../config.cjs';


console.log(config.minio);
const minioClient = new Minio.Client({ ...config.minio, port: +config.minio.port });

minioClient.uploadAsync = promisify(minioClient.putObject);

export default minioClient;
export const BucketName = config.minio.bucket;
