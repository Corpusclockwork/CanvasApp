var builder = DistributedApplication.CreateBuilder(args);

var postgresPassword = builder.AddParameter("postgresql-password", secret: true);

var postgres = builder.AddPostgres("postgres", password: postgresPassword)
    .WithHostPort(5433)
    .WithPgAdmin(pgAdmin =>
    {
        pgAdmin.WithHostPort(5051);
    });
    
    // .WithLifetime(ContainerLifetime.Persistent); 
    // we only want to add the line above back in when I am seeding data and adding tables correctly
    // until then it's nice having a clean slate each time

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
