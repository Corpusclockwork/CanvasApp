using System.ComponentModel.DataAnnotations;
namespace CanvasApp.Server.Models;
public class Canvas() {
    public int Id {get; set;}
    [Required]
    public string  Name {get; set;} = string.Empty;
    [Required]
    public DateTime DateCreated {get; set;} = DateTime.Now;
    public bool PublicCanEdit {get; set;} = false;
    public bool PublicCanView {get; set;} = true;
};

