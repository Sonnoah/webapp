using Microsoft.AspNetCore.Identity;

namespace API.Entities;

#nullable disable

public class AppRole : IdentityRole<int>
{
    public ICollection<AppUserRole> UserRoles { get; set; }    
}