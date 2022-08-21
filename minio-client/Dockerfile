FROM minio/mc as minio-client

COPY ./bin/minio.init /opt

ENTRYPOINT [ "/opt/minio.init" ]