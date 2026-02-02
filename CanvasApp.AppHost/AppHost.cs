var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres")
    .WithHostPort(5433)
    .WithPgAdmin(pgAdmin =>
    {
        pgAdmin.WithHostPort(5051);
    });

var postgresdb = postgres.AddDatabase("canvasappdb");

var server = builder.AddProject<Projects.CanvasApp_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints()
    .WithReference(postgresdb)
    .WaitFor(postgresdb);

var webfrontend = builder.AddViteApp("webfrontend", "../frontend")
    .WithReference(server)
    .WaitFor(server);

server.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
