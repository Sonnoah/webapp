using System.ComponentModel.DataAnnotations;

#nullable disable

namespace API.Extensions;

public class MessageGroup
{
    public MessageGroup() { }

    public MessageGroup(string name)
    {
        Name = name;
    }

    [Key]
    public string Name { get; set; }//ให้เป็น pk จะได้ไม่ซ้ำ
    public ICollection<Connection> Connections { get; set; } = new List<Connection>();
}