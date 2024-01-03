using System.Security.Claims;

namespace API.Entities;
public static class ClaimsPrincipalExtensions {
public static string? GetUsername(this ClaimsPrincipal user) => user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
}