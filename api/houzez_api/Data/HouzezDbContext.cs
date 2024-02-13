using houzez_api.Models;
using Microsoft.EntityFrameworkCore;

namespace houzez_api.Data
{
    public partial class HouzezDbContext : DbContext
    {
        public HouzezDbContext()
        {
        }

        public HouzezDbContext(DbContextOptions<HouzezDbContext> options)
            : base(options)
        {
        }


        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Property> Properties { get; set; } = null!;
        public virtual DbSet<Booking> Bookings { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //base.OnConfiguring(optionsBuilder);
            if (!optionsBuilder.IsConfigured)
            {
                base.OnConfiguring(optionsBuilder);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.ToTable("booking");

                entity.Property(e => e.Id).HasColumnName("BOOKING_ID");

                entity.Property(e => e.BuyerId).HasColumnName("BUYER_ID");

                entity.Property(e => e.SellerId).HasColumnName("SELLER_ID");

                entity.Property(e => e.PropertyId).HasColumnName("PROPERTY_ID");

                entity.Property(e => e.CreatedAt).HasColumnName("CREATED_AT");

                entity.Property(e => e.BookingTime)
                    .HasColumnType("datetime")
                    .HasColumnName("BOOKING_TIME");

                entity.HasOne(d => d.User)
                  .WithMany(p => p.Bookings)
                  .HasForeignKey(d => d.Id)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("booking$booking_ibfk_1");

                entity.HasOne(d => d.Property)
                   .WithMany(p => p.Bookings)
                   .HasForeignKey(d => d.PropertyId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("booking$booking_ibfk_2");


                //this is created from the database and has created a key for the booking table which doesnt not currenyl exist in the file, was needed to generate the routes to work
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Id).HasColumnName("USER_ID");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .HasColumnName("FIRST_NAME");

                entity.Property(e => e.LastName)
                  .HasMaxLength(255)
                  .HasColumnName("LAST_NAME");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("EMAIL");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("PASSWORD");

                entity.Property(e => e.AccountType)
                    .HasMaxLength(255)
                    .HasColumnName("ACCOUNT_TYPE");

                entity.Property(e => e.Address)
                   .HasMaxLength(255)
                   .HasColumnName("ADDRESS");

                entity.Property(e => e.PostCode)
                  .HasMaxLength(255)
                  .HasColumnName("POSTCODE");

                entity.Property(e => e.Phone)
                    .HasMaxLength(20)
                    .HasColumnName("PHONE");

                entity.Property(e => e.CreatedAt).HasColumnName("CREATED_AT");

            });

            modelBuilder.Entity<Property>(entity =>
            {
                entity.ToTable("property");

                entity.Property(e => e.Id).HasColumnName("PROPERTY_ID");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .HasColumnName("ADDRESS");

                entity.Property(e => e.PostCode)
                    .HasMaxLength(255)
                    .HasColumnName("POSTCODE");

                entity.Property(e => e.Image).HasColumnName("IMAGE");

                entity.Property(e => e.Description).HasColumnName("DESCRIPTION");

                entity.Property(e => e.Type)
                   .HasMaxLength(255)
                   .HasColumnName("TYPE");

                entity.Property(e => e.Bedrooms)
                   .HasColumnName("BEDROOMS")
                   .IsFixedLength();

                entity.Property(e => e.Bathrooms)
                    .HasColumnName("BATHROOMS")
                    .IsFixedLength();

                entity.Property(e => e.Gardens)
                    //  .HasMaxLength(6)
                    .HasColumnName("GARDENS");
                //  .IsFixedLength();

                entity.Property(e => e.Price)
                    //.HasColumnType("decimal(11, 2)")
                    .HasColumnName("PRICE");

                entity.Property(e => e.Status)
                  .HasMaxLength(9)
                  .HasColumnName("STATUS");

                entity.Property(e => e.SellerId).HasColumnName("SELLER_ID");

                entity.Property(e => e.BuyerId).HasColumnName("BUYER_ID");

                entity.Property(e => e.CreatedAt).HasColumnName("CREATED_AT");

                entity.HasOne(d => d.User)
                   .WithMany(p => p.Properties)
                   .HasForeignKey(d => d.SellerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("property$property_ibfk_1");

            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
