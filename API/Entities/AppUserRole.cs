using API.Entities;
using Microsoft.AspNetCore.Identity;
#nullable disable
namespace API.Extensions;

public class AppUserRole : IdentityUserRole<int>
{
    public AppUser User { get; set; }
    public AppRole Role { get; set; }

}