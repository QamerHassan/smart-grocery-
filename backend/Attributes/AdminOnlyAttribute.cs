using Microsoft.AspNetCore.Authorization;


namespace Backend.Attributes
{
public class AdminOnlyAttribute : AuthorizeAttribute
{
public AdminOnlyAttribute()
{
Roles = "Admin";
}
}
}