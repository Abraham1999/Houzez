using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using houzez_api.Repositories.Contracts;
using System;

namespace houzez_api.Models
{
    public class Booking : EntityBase, IEquatable<Booking>
    {

        [Column("BOOKING_ID")]
        [Key]
        public override int Id { get; set; }
        public int BuyerId { get; set; }
        public int SellerId { get; set; }
        public int PropertyId { get; set; }
        public DateTime? BookingTime { get; set; }
        public DateTime? CreatedAt { get; set; }
        public virtual User User { get; set; } = null!;
        public virtual Property Property { get; set; } = null!;
        public object Clone()
        {
            return new Booking
            {
                Id = this.Id,
                BuyerId = this.BuyerId,
                SellerId = this.SellerId,
                PropertyId = this.PropertyId,
                BookingTime = this.BookingTime,
                CreatedAt = this.CreatedAt,
            };
        }

        public bool Equals(Booking? other)
        {
            return Id == other.Id;
        }
    }
}
