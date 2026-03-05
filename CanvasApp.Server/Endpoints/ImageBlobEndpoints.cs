using System;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.SignalR;

namespace CanvasApp.Server.Endpoints;

public class ImageBlobEndpoints: Hub
{
    public async Task UploadBlobAsync(string userName, string blobContainer, string canvasBlobName, BlobServiceClient blobServiceClient){
        var containerClient = blobServiceClient.GetBlobContainerClient(blobContainer);
        await containerClient.CreateIfNotExistsAsync();

        BlobClient blobClient = containerClient.GetBlobClient(canvasBlobName);
        await blobClient.UploadAsync("https://myaccount.blob.core.windows.net/mycontainer/myblob", overwrite: true);

        Console.WriteLine("Upload completed");
    }
}
