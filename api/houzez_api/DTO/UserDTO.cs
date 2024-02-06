using System.ComponentModel.DataAnnotations;
using houzez_api.Repositories.Contracts;

namespace houzez_api.DTO
{

    public class UserDTO : EntityBase, IEquatable<UserDTO>
    {
        public UserDTO()
        {
            Bookings = new HashSet<BookingDTO>();
            Properties = new HashSet<PropertyDTO>();
        }
        [Key]
        public override int Id { get; set; }
        /// <summary>
        /// public int BuyerId { get { return Id; } set { Id = value; } }
        /// </summary>
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string PostCode { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string AccountType { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }

        public virtual ICollection<PropertyDTO> Properties { get; set; }
        public virtual ICollection<BookingDTO> Bookings { get; set; }

        public bool Equals(UserDTO? other)
        {
            return Id == other.Id;
        }

        public object Clone()
        {
            return new UserDTO
            {
                Id = this.Id,
                FirstName = this.FirstName,
                LastName = this.LastName,
                Email = this.Email,
                Password = this.Password,
                AccountType = this.AccountType,
                Address = this.Address,
                PostCode = this.PostCode,
                Phone = this.Phone,
                CreatedAt = this.CreatedAt,
            };
        }
    }
}
