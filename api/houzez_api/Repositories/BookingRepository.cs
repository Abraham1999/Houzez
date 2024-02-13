using houzez_api.Data;
using houzez_api.Models;

namespace houzez_api.Repositories
{
    public class BookingRepository : RepositoryBase<Booking>, IBookingRepository
    {

        public BookingRepository(HouzezDbContext repositoryContext)
            : base(repositoryContext)
        {

        }

   
    }
}


