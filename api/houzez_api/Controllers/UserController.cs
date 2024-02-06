using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using houzez_api.DTO;
using houzez_api.Services;
using System.Net;
using houzez_api.Models;

namespace houzez_api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private  IUserService _userService;

        public UserController(IUserService service) 
        {
            _userService = service; 
        }

        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<UserDTO> Index()
        {
            var users = _userService.FindAll().ToList();
            return users;
        }

        // GET: User/2
        [AllowAnonymous]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<UserDTO> GetById(int id)
        {
            var user = _userService.FindById(id);
            return user == null ? NotFound() : user;
        }

        // GET: User/Name/ET
        [AllowAnonymous]
        [HttpGet("Name/{title}")]
        public IQueryable<UserDTO> GetByName(string title)
        {
            var user = _userService.FindByName(title);
            return user;
        }

        // POST: user
        [HttpPost()]
        public UserDTO AddUser(UserDTO user)
        {
            user = _userService.Create(user);
            //_genreService.Save();
            return user;
        }

        // UPDATE: User
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<UserDTO> UpdateUser(UserDTO user)
        {

            user = _userService.Update(user);
            // _genreService.Save();
            return user;
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public HttpStatusCode DeleteUser(int id)
        {
            var user = _userService.FindById(id);
            if (user == null)
                return HttpStatusCode.NotFound;
            _userService.Delete(user);
            //_movieService.Save();
            return HttpStatusCode.NoContent;
        }
    }

}
