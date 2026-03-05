namespace CanvasApp.AppHost.Dtos;
using System.ComponentModel.DataAnnotations;
public record  CreateCanvasDto
(
    [Required][StringLength(50)] string CanvasName,
    [Required] DateTime DateCreated,
    bool PublicCanEdit,
    bool PublicCanView 
);
