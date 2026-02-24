namespace CanvasApp.AppHost.Dtos;

public record class UpdateCanvasDto
(
    List<string> Collaborators,
    bool PublicCanEdit,
    bool PublicCanView 
);
