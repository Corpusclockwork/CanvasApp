using System;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using CanvasApp.Server.Data;
using CanvasApp.AppHost.Dtos;

namespace CanvasApp.Server.Endpoints;

public static class CanvasEndpoints
{
    public static void MapCanvasEndpoints(this WebApplication app)
    {
        // Get canvases
        app.MapGet("/canvas", async (CanvasAppContext dbContext) =>
        {
            await dbContext.Canvases
                .Select(canvas => new GetCanvasDto(canvas.Name))
                .AsNoTracking()
                .ToListAsync();
        });
    }
}
