using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace houzez_api.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    USER_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FIRST_NAME = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    LAST_NAME = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    EMAIL = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    PASSWORD = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ACCOUNT_TYPE = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ADDRESS = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    POSTCODE = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    PHONE = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    CREATED_AT = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.USER_ID);
                });

            migrationBuilder.CreateTable(
                name: "property",
                columns: table => new
                {
                    PROPERTY_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ADDRESS = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    POSTCODE = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IMAGE = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DESCRIPTION = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TYPE = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    BEDROOMS = table.Column<int>(type: "int", fixedLength: true, nullable: false),
                    BATHROOMS = table.Column<int>(type: "int", fixedLength: true, nullable: false),
                    GARDENS = table.Column<int>(type: "int", nullable: false),
                    PRICE = table.Column<int>(type: "int", nullable: false),
                    STATUS = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false),
                    SELLER_ID = table.Column<int>(type: "int", nullable: false),
                    BUYER_ID = table.Column<int>(type: "int", nullable: true),
                    CREATED_AT = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_property", x => x.PROPERTY_ID);
                    table.ForeignKey(
                        name: "property$property_ibfk_1",
                        column: x => x.SELLER_ID,
                        principalTable: "user",
                        principalColumn: "USER_ID");
                });

            migrationBuilder.CreateTable(
                name: "booking",
                columns: table => new
                {
                    BOOKING_ID = table.Column<int>(type: "int", nullable: false),
                    BUYER_ID = table.Column<int>(type: "int", nullable: false),
                    SELLER_ID = table.Column<int>(type: "int", nullable: false),
                    PROPERTY_ID = table.Column<int>(type: "int", nullable: false),
                    BOOKING_TIME = table.Column<DateTime>(type: "datetime", nullable: true),
                    CREATED_AT = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_booking", x => x.BOOKING_ID);
                    table.ForeignKey(
                        name: "booking$booking_ibfk_1",
                        column: x => x.BOOKING_ID,
                        principalTable: "user",
                        principalColumn: "USER_ID");
                    table.ForeignKey(
                        name: "booking$booking_ibfk_2",
                        column: x => x.PROPERTY_ID,
                        principalTable: "property",
                        principalColumn: "PROPERTY_ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_booking_PROPERTY_ID",
                table: "booking",
                column: "PROPERTY_ID");

            migrationBuilder.CreateIndex(
                name: "IX_property_SELLER_ID",
                table: "property",
                column: "SELLER_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "booking");

            migrationBuilder.DropTable(
                name: "property");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
