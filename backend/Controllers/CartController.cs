using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public CartController(ApplicationDbContext db)
        {
            _db = db;
        }

        private Guid GetUserId()
        {
            return Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        }

        // ✅ Add to cart
        [HttpPost("add/{productId}")]
        public async Task<IActionResult> AddToCart(Guid productId)
        {
            var userId = GetUserId();

            var item = await _db.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

            if (item == null)
            {
                item = new CartItem
                {
                    UserId = userId,
                    ProductId = productId,
                    Quantity = 1
                };
                _db.CartItems.Add(item);
            }
            else
            {
                item.Quantity++;
            }

            await _db.SaveChangesAsync();
            return Ok(item);
        }

        // ✅ Update quantity
        [HttpPut("update/{itemId}/{qty}")]
        public async Task<IActionResult> UpdateQuantity(Guid itemId, int qty)
        {
            var userId = GetUserId();
            var item = await _db.CartItems.FindAsync(itemId);

            if (item == null || item.UserId != userId)
                return NotFound();

            item.Quantity = qty;
            await _db.SaveChangesAsync();

            return Ok(item);
        }

        // ✅ Remove from cart
        [HttpDelete("remove/{itemId}")]
        public async Task<IActionResult> Remove(Guid itemId)
        {
            var userId = GetUserId();
            var item = await _db.CartItems.FindAsync(itemId);

            if (item == null || item.UserId != userId)
                return NotFound();

            _db.CartItems.Remove(item);
            await _db.SaveChangesAsync();

            return Ok("Removed");
        }

        // ✅ Get cart
        [HttpGet("mycart")]
        public async Task<IActionResult> GetMyCart()
        {
            var userId = GetUserId();
            var items = await _db.CartItems.Where(c => c.UserId == userId).ToListAsync();
            return Ok(items);
        }
    }
}
