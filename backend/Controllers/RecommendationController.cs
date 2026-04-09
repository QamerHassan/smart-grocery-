using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace Backend.Controllers
{
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class RecommendationController : ControllerBase
{
private readonly IRecommendationService _rec;


public RecommendationController(IRecommendationService rec)
{
_rec = rec;
}


private Guid GetUserId()
{
return Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
}


[HttpGet("products")]
public async Task<IActionResult> GetRecommendedProducts()
{
var userId = GetUserId();
var recommendations = await _rec.GetRecommendationsAsync(userId);


return Ok(new
{
userId = userId,
recommended = recommendations
});
}
}
}