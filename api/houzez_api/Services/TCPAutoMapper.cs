using AutoMapper;
using houzez_api.DTO;
using houzez_api.Models;

namespace houzez_api.Services

{

    public class TPCAutoMapper : Profile

    {

        public TPCAutoMapper()

        {
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();

            CreateMap<Property, PropertyDTO>();
            CreateMap<PropertyDTO, Property>();

            CreateMap<Booking, BookingDTO>();
            CreateMap<BookingDTO, Booking>();

        }

    }

}
