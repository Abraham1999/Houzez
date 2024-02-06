using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using houzez_api.Repositories.Contracts;

namespace houzez_api.Models
{
    public partial class User : EntityBase, IEquatable<User>
    {
        public User()
        {
            Bookings = new HashSet<Booking>();
            Properties = new HashSet<Property>();
        }
        [Column("UserId")]
        [Key]
        public override int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string AccountType { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string PostCode { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<Property> Properties { get; set; }

        public bool Equals(User? other)
        {
            return Id == other.Id;
        }
    }
}
