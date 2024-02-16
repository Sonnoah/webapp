namespace API.Helpers;
#nullable disable
public class MessageParams : PaginationParams
{
  public string Username { get; set; }
  public string Label { get; set; } = "Unread";
}