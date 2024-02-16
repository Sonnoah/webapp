namespace API.DTOs;
#nullable disable
public class CreateMessageDto
{
    public string RecipientUsername { get; set; }
    public string Content { get; set; }
}