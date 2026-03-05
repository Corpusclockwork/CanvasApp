using System;
using Microsoft.EntityFrameworkCore;
using CanvasApp.Server.Models;

namespace CanvasApp.Server.Data;

public class CanvasAppContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Canvas> Canvases => Set<Canvas>();
}