using Microsoft.AspNetCore.Identity;
using API.Entities;

namespace API.Entities;

#nullable disable
public class AppUserRole : IdentityUserRole<int>
{
    public AppUser User { get; set; }
    public AppRole Role { get; set; }

}