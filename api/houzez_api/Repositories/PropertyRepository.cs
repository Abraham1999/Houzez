using houzez_api.Data;
using houzez_api.Models;

namespace houzez_api.Repositories
{
    public class PropertyRepository : RepositoryBase<Property>, IPropertyRepository
    {
        public PropertyRepository(HouzezDbContext repostioryContext)
            : base(repostioryContext)
        {

        }
    }
}
