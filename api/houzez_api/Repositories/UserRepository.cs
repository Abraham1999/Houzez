using houzez_api.Data;
using houzez_api.Models;

namespace houzez_api.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(HouzezDbContext repositoryContext)
            : base(repositoryContext)
        {

        }
    }
}
