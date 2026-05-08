using MemesApi.Models;

namespace MemesApi.Data;

public static class MemesStore
{
    private static int _nextId = 4;

    public static List<Meme> Memes { get; } =
    [
        new Meme
        {
            Id = 1,
            Title = "Когда код заработал с первого раза",
            Category = "программирование",
            Rating = 5,
            AddedAt = DateTime.UtcNow.AddDays(-3)
        },
        new Meme
        {
            Id = 2,
            Title = "До дедлайна ещё целая ночь",
            Category = "учёба",
            Rating = 4,
            AddedAt = DateTime.UtcNow.AddDays(-2)
        },
        new Meme
        {
            Id = 3,
            Title = "Я после пятой пары",
            Category = "жизнь",
            Rating = 3,
            AddedAt = DateTime.UtcNow.AddDays(-1)
        }
    ];

    public static int GetNextId()
    {
        return _nextId++;
    }
}
