using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public OrdersController(ApplicationDbContext db)
        {
            _db = db;
        }

        private Guid GetUserId()
        {
            return Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        }

        // ✅ Place order
        [HttpPost("place")]
        public async Task<IActionResult> PlaceOrder()
        {
            var userId = GetUserId();

            var cartItems = await _db.CartItems.Where(c => c.UserId == userId).ToListAsync();
            if (!cartItems.Any())
                return BadRequest("Cart is empty");

            var order = new Order
            {
                UserId = userId,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow
            };

            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            foreach (var item in cartItems)
            {
                var product = await _db.Products.FindAsync(item.ProductId);

                _db.OrderItems.Add(new OrderItem
                {
                    OrderId = order.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    PriceAtPurchase = product!.Price
                });
            }

            _db.CartItems.RemoveRange(cartItems);
            await _db.SaveChangesAsync();

            return Ok(order);
        }

        // ✅ User orders
        [HttpGet("myorders")]
        public async Task<IActionResult> MyOrders()
        {
            var userId = GetUserId();
            var orders = await _db.Orders.Where(o => o.UserId == userId).ToListAsync();
            return Ok(orders);
        }

        // ✅ Admin updates status
        [Authorize(Roles = "Admin")]
        [HttpPut("status/{orderId}/{status}")]
        public async Task<IActionResult> UpdateStatus(Guid orderId, string status)
        {
            var order = await _db.Orders.FindAsync(orderId);
            if (order == null) return NotFound();

            order.Status = status;
            await _db.SaveChangesAsync();

            return Ok(order);
        }
    }
}