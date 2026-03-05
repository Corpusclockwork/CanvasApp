var builder = DistributedApplication.CreateBuilder(args);

builder.AddAzureContainerAppEnvironment("AzureContainerNew");
var azureStorage = builder.AddAzureStorage("canvasappstorageaccount")
    .AddBlobs("blobs");

var azureSql = builder.AddAzureSqlServer("azuresql")
    .AddDatabase("database");

var server = builder.AddProject<Projects.CanvasApp_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints()
    .WithReference(azureStorage)
    .WithReference(azureSql)
    .WaitFor(azureStorage)
    .WaitFor(azureSql);

var webfrontend = builder.AddViteApp("webfrontend", "../frontend")
    .WithReference(server)
    .WaitFor(server);

server.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
