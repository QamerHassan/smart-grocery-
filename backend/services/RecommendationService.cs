using System.Net.Http;
using System.Text.Json;
using Microsoft.Extensions.Configuration;


namespace Backend.Services
{
public interface IRecommendationService
{
Task<List<string>> GetRecommendationsAsync(Guid userId);
}


public class RecommendationService : IRecommendationService
{
private readonly HttpClient _http;
private readonly string _baseUrl;


public RecommendationService(IConfiguration config)
{
_http = new HttpClient();
_baseUrl = config["PythonService:BaseUrl"] ?? "http://127.0.0.1:8000";
}


public async Task<List<string>> GetRecommendationsAsync(Guid userId)
{
var url = $"{_baseUrl}/recommend/{userId}";


var res = await _http.GetAsync(url);
if (!res.IsSuccessStatusCode)
return new List<string>();


var json = await res.Content.ReadAsStringAsync();
return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
}
}
}