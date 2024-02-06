using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using houzez_api.Repositories.Contracts;

namespace houzez_api.DTO
{
    public class BookingDTO : EntityBase, IEquatable<BookingDTO>
    {
        public BookingDTO()
        {

        }

        [Key]
        [Column("id")]
        public override int Id { get; set; }
        public int BuyerId { get; set; }
        public int SellerId { get; set; }
        public int PropertyId { get; set; }
        public DateTime BookingTime { get; set; }
        public DateTime CreatedAt { get; set; }

        public bool Equals(BookingDTO? other)
        {
            return Id == other.Id;
        }

        public object Clone()
        {
            return new BookingDTO
            {
                Id = this.Id,
                BuyerId = this.BuyerId,
                SellerId = this.SellerId,
                PropertyId = this.PropertyId,
                BookingTime = this.BookingTime,
                CreatedAt = this.CreatedAt,
            };
        }
    }
}

