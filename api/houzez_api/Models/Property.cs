using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using houzez_api.Repositories.Contracts;

namespace houzez_api.Models
{
    public partial class Property : EntityBase, IEquatable<Property>
    {
        public Property()
        {
            Bookings = new HashSet<Booking>();
            // booking set that can be tried when booking is created
        }

        [Column("Property_Id")]
        [Key]
        public override int Id { get; set; }
        public string Address { get; set; } = null!;
        public string PostCode { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Type { get; set; } = null!;
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public int Gardens { get; set; }
        public int Price { get; set; }
        public string Status { get; set; } = null!;
        public int SellerId { get; set; }
        public int? BuyerId { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual User? User { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; }

        //certian areas of the code are commented out as they are not needed for the project currently

        public object Clone()
        {
            return new Property
            {
                Id = this.Id,
                Address = this.Address,
                PostCode = this.PostCode,
                Image = this.Image,
                Description = this.Description,
                Type = this.Type,
                Bedrooms = this.Bedrooms,
                Bathrooms = this.Bathrooms,
                Gardens = this.Gardens,
                Price = this.Price,
                Status = this.Status,
                SellerId = this.SellerId,
                BuyerId = this.BuyerId,
                CreatedAt = this.CreatedAt,
            };
        }

        public bool Equals(Property? other)
        {
            return Id == other.Id;
        }
    }
}

