using houzez_api.DTO;

namespace houzez_api.Services
{
    public interface IUserService
    {
        IQueryable<UserDTO> FindAll();
        IQueryable<UserDTO> FindByName(string name);
        UserDTO FindById(int id);
        UserDTO Create(UserDTO entity);
        UserDTO Update(UserDTO entity);
        void Delete(UserDTO entity);
    }
}