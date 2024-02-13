using System.Linq.Expressions;
using AutoMapper;
using houzez_api.DTO;
using houzez_api.Models;
using houzez_api.Repositories;

namespace houzez_api.Services
{
    public class UserService : IUserService
    {
        IUserRepository _userRepository;
        IBookingRepository _bookingRepository;
        private IMapper _mapper;

        public UserService(IUserRepository userRepository, IBookingRepository bookingRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _bookingRepository = bookingRepository;
            _mapper = mapper;
        }

        public IQueryable<UserDTO> FindAll()
        {
            var users = _userRepository.FindAll().ToList();
            List<UserDTO> dtoUsers = new List<UserDTO>();
            foreach (User user in users)
            {
                dtoUsers.Add(_mapper.Map<UserDTO>(user));
            }
            return dtoUsers.AsQueryable();
        }

        public UserDTO FindById(int id)
        {
            User user = _userRepository.FindById(id);
            UserDTO dtoUser = _mapper.Map<UserDTO>(user);
            return dtoUser;
        }

        public IQueryable<UserDTO> FindByName(string title)
        {
            IQueryable<User> users = _userRepository.FindByCondition(b => b.FirstName == title);
            List<UserDTO> dtoUsers = new List<UserDTO>();
            foreach (User user in users)
            {
                UserDTO dtoUser = _mapper.Map<UserDTO>(user);
                dtoUsers.Add(dtoUser);
            }
            return dtoUsers.AsQueryable<UserDTO>();
        }

        public UserDTO Create(UserDTO dtoUser)
        {
            User userData = _mapper.Map<User>(dtoUser);
            userData = _userRepository.Create(userData);
            dtoUser = _mapper.Map<UserDTO>(userData);
            return dtoUser;
        }

        public void Delete(UserDTO dtoUser)
        {
            User user = _mapper.Map<User>(dtoUser);
            var bookings = _bookingRepository.FindAll().ToList();
            foreach (Booking booking in bookings)
            {
                if (booking.BuyerId == dtoUser.Id)
                {
                    _bookingRepository.Delete(booking);
                }
            }
            _userRepository.Delete(user);
        }

        public IQueryable<UserDTO> FindByCondition(Expression<Func<UserDTO, bool>> expression)
        {
            User userData = _mapper.Map<User>(expression);
            //return _repository.FindByCondition(movieData);
            return null;
        }

        public UserDTO Update(UserDTO user)
        {
            User userData = _mapper.Map<User>(user);
            var b = _userRepository.FindById(userData.Id);
            if (b == null)
                return null;

            b.FirstName = userData.FirstName;
            b.LastName = userData.LastName;
            b.Address = userData.Address;
            b.PostCode = userData.PostCode;
            b.Phone = userData.Phone;

            User userToUpdate = _userRepository.Update(b);
            UserDTO dtoGenre = _mapper.Map<UserDTO>(userToUpdate);
            return dtoGenre;
        }
    }
}
