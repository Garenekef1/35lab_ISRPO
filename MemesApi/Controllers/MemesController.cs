using MemesApi.Data;
using MemesApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace MemesApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MemesController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<Meme>> GetAll()
    {
        return Ok(MemesStore.Memes);
    }

    [HttpGet("{id:int}")]
    public ActionResult<Meme> GetById(int id)
    {
        var meme = MemesStore.Memes.FirstOrDefault(meme => meme.Id == id);

        if (meme is null)
        {
            return NotFound($"Мем с id = {id} не найден");
        }

        return Ok(meme);
    }

    [HttpPost]
    public ActionResult<Meme> Create([FromBody] Meme meme)
    {
        if (string.IsNullOrWhiteSpace(meme.Title))
        {
            return BadRequest("Название мема обязательно");
        }

        if (meme.Rating < 1 || meme.Rating > 5)
        {
            return BadRequest("Рейтинг должен быть от 1 до 5");
        }

        meme.Id = MemesStore.GetNextId();
        meme.AddedAt = DateTime.UtcNow;
        meme.Category = string.IsNullOrWhiteSpace(meme.Category) ? "жизнь" : meme.Category;

        MemesStore.Memes.Add(meme);

        return CreatedAtAction(nameof(GetById), new { id = meme.Id }, meme);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var meme = MemesStore.Memes.FirstOrDefault(meme => meme.Id == id);

        if (meme is null)
        {
            return NotFound($"Мем с id = {id} не найден");
        }

        MemesStore.Memes.Remove(meme);

        return NoContent();
    }
}
