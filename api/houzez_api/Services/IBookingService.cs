using houzez_api.DTO;

namespace houzez_api.Services
{
    public interface IBookingService
    {
        IQueryable<BookingDTO> FindAll();
        BookingDTO FindById(int id);
        BookingDTO Create(BookingDTO entity);
        BookingDTO Update(BookingDTO entity);
        void Delete(BookingDTO entity);
    }
}

