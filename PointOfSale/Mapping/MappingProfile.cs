using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using POS.Domain.DTOs.SalesOrder;
using POS.Domain.Models.SalesOrders;



namespace PointOfSale.Mapping
{

    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            CreateMap<OrderHeaderDTO, OrderHeader>();  // DTO to Entity
            CreateMap<OrderLineDTO, OrderLine>();      // DTO to Entity
            CreateMap<OrderHeader, OrderHeaderDTO>();  // Entity to DTO
            CreateMap<OrderLine, OrderLineDTO>();      // Entity to DTO
        }
    }
}
