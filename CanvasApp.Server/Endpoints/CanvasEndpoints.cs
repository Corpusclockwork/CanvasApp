using System;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using CanvasApp.Server.Data;
using CanvasApp.AppHost.Dtos;
using Microsoft.Data.SqlClient;

namespace CanvasApp.Server.Endpoints;

public static class CanvasEndpoints
{
    public static void MapCanvasEndpoints(this WebApplication app)
    {
        // Get canvases
        app.MapGet("/canvases", async (CanvasAppContext canvasappdb) =>
        {
            await canvasappdb.Canvases
                .Select(canvas => new GetCanvasDto(canvas.CanvasName))
                .AsNoTracking()
                .ToListAsync();
        }).WithName("GetCanvasDetails");
    }
}
