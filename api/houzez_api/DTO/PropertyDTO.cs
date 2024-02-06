using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using houzez_api.Models;
using houzez_api.Repositories.Contracts;

namespace houzez_api.DTO
{
    public class PropertyDTO : EntityBase, IEquatable<PropertyDTO>
    {
        public PropertyDTO()
        {
            Bookings = new HashSet<BookingDTO>();
        }
        [Key]
        [Column("id")]
        public override int Id { get; set; }
        [Column("address")]
        public string Address { get; set; }
        [Column("postcode")]
        public string PostCode { get; set; }
        [Column("image")]
        public string Image { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("type")]
        public string Type { get; set; }
        [Column("bedrooms")]
        public int Bedrooms { get; set; }
        [Column("bathrooms")]
        public int Bathrooms { get; set; }
        [Column("gardens")]
        public int Gardens { get; set; }
        [Column("price")]
        public int Price { get; set; }
        [Column("status")]
        public string Status { get; set; }
        [Column("sellerId")]
        public int SellerId { get; set; }
        [Column("buyerId")]
        public int? BuyerId { get; set; }
        [Column("createdAt")]
        public DateTime? CreatedAt { get; set; }
        public virtual ICollection<BookingDTO>? Bookings { get; set; }

        public bool Equals(PropertyDTO? other)
        {
            return Id == other.Id;
        }

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

    }
}
