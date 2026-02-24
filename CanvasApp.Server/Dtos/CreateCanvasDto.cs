namespace CanvasApp.AppHost.Dtos;
using System.ComponentModel.DataAnnotations;
public record  CreateCanvasDto
(
    string  Name,
    [Required][StringLength(50)] string CanvasCreator,
    List<string> Collaborators,
    DateTime DateCreated,
    bool PublicCanEdit,
    bool PublicCanView 
);
