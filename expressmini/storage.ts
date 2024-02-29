import { BlobServiceClient } from '@azure/storage-blob';

export const downloadBlob = async (blobName : string) : Promise<Buffer> => {
    const containerName = 'datasets';

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.BLOB_CONNECTION_STRING!);

    // create container client
    const containerClient = await blobServiceClient.getContainerClient(containerName);
  
    // create blob client
    const blobClient = await containerClient.getBlockBlobClient(blobName);

    await blobClient.downloadToFile(`./public/${blobName}`);

    return;
}

export const uploadBlob = async (buffer : Buffer, blobName : string) : Promise<Buffer> => {
  const containerName = 'datasets';

  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.BLOB_CONNECTION_STRING!);

  // create container client
  const containerClient = await blobServiceClient.getContainerClient(containerName);

  // create blob client
  const blobClient = await containerClient.getBlockBlobClient(blobName);

  await blobClient.upload(buffer, buffer.length);

  return;
}