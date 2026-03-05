using System.ComponentModel.DataAnnotations;
namespace CanvasApp.Server.Models;
public class Canvas() {
    [Key]
    public int Id {get; set;}
    [Required]
    [StringLength(100, ErrorMessage = "CanvasName cannot be longer than 100 characters")]
    public string CanvasName {get; set;} = string.Empty;
    [Required]
    public DateTime DateCreated {get; set;} = DateTime.Now;
    public bool PublicCanEdit {get; set;} = false;
    public bool PublicCanView {get; set;} = true;
};

