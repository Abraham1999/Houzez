using System.ComponentModel.DataAnnotations;

namespace houzez_api.DTO
{
    public class LoginDTO
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}

