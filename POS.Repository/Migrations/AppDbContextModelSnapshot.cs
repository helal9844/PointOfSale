﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using POS.Repository.DataContext;

#nullable disable

namespace POS.Repository.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("POS.Domain.Models.Branches", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Branches");
                });

            modelBuilder.Entity("POS.Domain.Models.Cashier", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CashierUser")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("SessionTotal")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Cashier");
                });

            modelBuilder.Entity("POS.Domain.Models.SalesOrders.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("POS.Domain.Models.SalesOrders.OrderHeader", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Discount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("SessionId")
                        .HasColumnType("int");

                    b.Property<decimal>("Subtotal")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Tax")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("SessionId");

                    b.ToTable("OrderHeaders");
                });

            modelBuilder.Entity("POS.Domain.Models.SalesOrders.OrderLine", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("OrderHeaderId")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OrderHeaderId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderLines");
                });

            modelBuilder.Entity("POS.Domain.Models.SalesOrders.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("Stock")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 101,
                            CategoryId = 1,
                            Name = "Laptop",
                            Price = 1200m,
                            Stock = 10
                        },
                        new
                        {
                            Id = 102,
                            CategoryId = 1,
                            Name = "Tablet",
                            Price = 400m,
                            Stock = 15
                        },
                        new
                        {
                            Id = 103,
                            CategoryId = 1,
                            Name = "Smartphone",
                            Price = 800m,
                            Stock = 20
                        },
                        new
                        {
                            Id = 104,
                            CategoryId = 1,
                            Name = "Smartwatch",
                            Price = 250m,
                            Stock = 25
                        },
                        new
                        {
                            Id = 201,
                            CategoryId = 2,
                            Name = "Mouse",
                            Price = 25m,
                            Stock = 50
                        },
                        new
                        {
                            Id = 202,
                            CategoryId = 2,
                            Name = "Keyboard",
                            Price = 50m,
                            Stock = 40
                        },
                        new
                        {
                            Id = 203,
                            CategoryId = 2,
                            Name = "Headphones",
                            Price = 75m,
                            Stock = 30
                        },
                        new
                        {
                            Id = 204,
                            CategoryId = 2,
                            Name = "USB Cable",
                            Price = 10m,
                            Stock = 100
                        },
                        new
                        {
                            Id = 301,
                            CategoryId = 3,
                            Name = "Microwave",
                            Price = 150m,
                            Stock = 8
                        },
                        new
                        {
                            Id = 302,
                            CategoryId = 3,
                            Name = "Refrigerator",
                            Price = 1000m,
                            Stock = 5
                        },
                        new
                        {
                            Id = 303,
                            CategoryId = 3,
                            Name = "Washing Machine",
                            Price = 700m,
                            Stock = 7
                        },
                        new
                        {
                            Id = 304,
                            CategoryId = 3,
                            Name = "Vacuum Cleaner",
                            Price = 200m,
                            Stock = 12
                        },
                        new
                        {
                            Id = 401,
                            CategoryId = 4,
                            Name = "PlayStation 5",
                            Price = 500m,
                            Stock = 6
                        },
                        new
                        {
                            Id = 402,
                            CategoryId = 4,
                            Name = "Xbox Series X",
                            Price = 550m,
                            Stock = 5
                        },
                        new
                        {
                            Id = 403,
                            CategoryId = 4,
                            Name = "Gaming Chair",
                            Price = 300m,
                            Stock = 10
                        },
                        new
                        {
                            Id = 404,
                            CategoryId = 4,
                            Name = "VR Headset",
                            Price = 400m,
                            Stock = 8
                        },
                        new
                        {
                            Id = 501,
                            CategoryId = 5,
                            Name = "Coffee",
                            Price = 5m,
                            Stock = 100
                        },
                        new
                        {
                            Id = 502,
                            CategoryId = 5,
                            Name = "Tea",
                            Price = 4m,
                            Stock = 80
                        },
                        new
                        {
                            Id = 503,
                            CategoryId = 5,
                            Name = "Juice",
                            Price = 6m,
                            Stock = 60
                        },
                        new
                        {
                            Id = 504,
                            CategoryId = 5,
                            Name = "Soft Drink",
                            Price = 3m,
                            Stock = 120
                        });
                });

            modelBuilder.Entity("POS.Domain.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("POS.Domain.Models.UserBranches", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BranchId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BranchId");

                    b.HasIndex("UserId");

                    b.ToTable("UserBranches");
                });

            modelBuilder.Entity("POS.Domain.Models.SalesOrders.OrderHeader", b =>
                {
                    b.HasOne("POS.Domain.Models.Cashier", "Session")
                        .WithMany()
                        .HasForeignKey("SessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Session");
                });

            modelBuilder.Entity("POS.Domain.Models.SalesOrders.OrderLine", b =>
                {
                    b.HasOne("POS.Domain.Models.SalesOrders.OrderHeader", "OrderHeader")
                        .WithMany("OrderLines")
                        .HasForeignKey("OrderHeaderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("POS.Domain.Models.SalesOrders.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("OrderHeader");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("POS.Domain.Models.SalesOrders.Product", b =>
                {
                    b.HasOne("POS.Domain.Models.SalesOrders.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("POS.Domain.Models.UserBranches", b =>
                {
                    b.HasOne("POS.Domain.Models.Branches", "Branches")
                        .WithMany("UserBranches")
                        .HasForeignKey("BranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("POS.Domain.Models.User", "User")
                        .WithMany("UserBranches")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Branches");

                    b.Navigation("User");
                });

            modelBuilder.Entity("POS.Domain.Models.Branches", b =>
                {
                    b.Navigation("UserBranches");
                });

            modelBuilder.Entity("POS.Domain.Models.SalesOrders.OrderHeader", b =>
                {
                    b.Navigation("OrderLines");
                });

            modelBuilder.Entity("POS.Domain.Models.User", b =>
                {
                    b.Navigation("UserBranches");
                });
#pragma warning restore 612, 618
        }
    }
}
