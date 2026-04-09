namespace Backend.Services
{
    public interface IJwtService
    {
        string GenerateToken(string userId, string email, string role, out DateTime expiresAt);
    }
}
