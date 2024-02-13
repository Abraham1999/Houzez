﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using houzez_api.Data;

#nullable disable

namespace houzez_api.Migrations
{
    [DbContext(typeof(HouzezDbContext))]
    [Migration("20240206085646_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.26")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("houzez_api.Models.Booking", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int")
                        .HasColumnName("BOOKING_ID");

                    b.Property<DateTime?>("BookingTime")
                        .HasColumnType("datetime")
                        .HasColumnName("BOOKING_TIME");

                    b.Property<int>("BuyerId")
                        .HasColumnType("int")
                        .HasColumnName("BUYER_ID");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2")
                        .HasColumnName("CREATED_AT");

                    b.Property<int>("PropertyId")
                        .HasColumnType("int")
                        .HasColumnName("PROPERTY_ID");

                    b.Property<int>("SellerId")
                        .HasColumnType("int")
                        .HasColumnName("SELLER_ID");

                    b.HasKey("Id");

                    b.HasIndex("PropertyId");

                    b.ToTable("booking", (string)null);
                });

            modelBuilder.Entity("houzez_api.Models.Property", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("PROPERTY_ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("ADDRESS");

                    b.Property<int>("Bathrooms")
                        .HasColumnType("int")
                        .HasColumnName("BATHROOMS")
                        .IsFixedLength();

                    b.Property<int>("Bedrooms")
                        .HasColumnType("int")
                        .HasColumnName("BEDROOMS")
                        .IsFixedLength();

                    b.Property<int?>("BuyerId")
                        .HasColumnType("int")
                        .HasColumnName("BUYER_ID");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2")
                        .HasColumnName("CREATED_AT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("DESCRIPTION");

                    b.Property<int>("Gardens")
                        .HasColumnType("int")
                        .HasColumnName("GARDENS");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("IMAGE");

                    b.Property<string>("PostCode")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("POSTCODE");

                    b.Property<int>("Price")
                        .HasColumnType("int")
                        .HasColumnName("PRICE");

                    b.Property<int>("SellerId")
                        .HasColumnType("int")
                        .HasColumnName("SELLER_ID");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(9)
                        .HasColumnType("nvarchar(9)")
                        .HasColumnName("STATUS");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("TYPE");

                    b.HasKey("Id");

                    b.HasIndex("SellerId");

                    b.ToTable("property", (string)null);
                });

            modelBuilder.Entity("houzez_api.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("USER_ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("AccountType")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("ACCOUNT_TYPE");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("ADDRESS");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2")
                        .HasColumnName("CREATED_AT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("EMAIL");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("FIRST_NAME");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("LAST_NAME");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("PASSWORD");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("PHONE");

                    b.Property<string>("PostCode")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("POSTCODE");

                    b.HasKey("Id");

                    b.ToTable("user", (string)null);
                });

            modelBuilder.Entity("houzez_api.Models.Booking", b =>
                {
                    b.HasOne("houzez_api.Models.User", "User")
                        .WithMany("Bookings")
                        .HasForeignKey("Id")
                        .IsRequired()
                        .HasConstraintName("booking$booking_ibfk_1");

                    b.HasOne("houzez_api.Models.Property", "Property")
                        .WithMany("Bookings")
                        .HasForeignKey("PropertyId")
                        .IsRequired()
                        .HasConstraintName("booking$booking_ibfk_2");

                    b.Navigation("Property");

                    b.Navigation("User");
                });

            modelBuilder.Entity("houzez_api.Models.Property", b =>
                {
                    b.HasOne("houzez_api.Models.User", "User")
                        .WithMany("Properties")
                        .HasForeignKey("SellerId")
                        .IsRequired()
                        .HasConstraintName("property$property_ibfk_1");

                    b.Navigation("User");
                });

            modelBuilder.Entity("houzez_api.Models.Property", b =>
                {
                    b.Navigation("Bookings");
                });

            modelBuilder.Entity("houzez_api.Models.User", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("Properties");
                });
#pragma warning restore 612, 618
        }
    }
}
