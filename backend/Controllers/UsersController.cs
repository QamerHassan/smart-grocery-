// Backend/Controllers/UsersController.cs
using Backend.Data; // FIXED namespace
using Backend.Models; // FIXED namespace
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public UsersController(ApplicationDbContext db)
        {
            _db = db;
        }

        // Controller actions...
    }
}
