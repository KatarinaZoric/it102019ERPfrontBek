using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ErpPopravni.Context;
using ErpPopravni.Models;
using ErpPopravni.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly ButikContext _context;

        public QuestionController(ButikContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public IActionResult GetAll()
        {
            var questions = _context.Questions
                .Include(q => q.User)
                .Include(q => q.Messages)
                .ToList();

            return StatusCode(StatusCodes.Status200OK, questions);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var questionFromDB = _context.Questions.Find(id);

            if (questionFromDB == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            _context.Entry(questionFromDB).Reference(q => q.User).Load();

            return StatusCode(StatusCodes.Status200OK, questionFromDB);
        }

        [HttpPost("")]
        [Authorize]
        public IActionResult AddQuestion([FromHeader] int userId, QuestionDTO question)
        {
            var user = _context.Users.Find(userId);

            var newQuestion = new Question()
            {
                Theme = question.Theme,
                User = user
            };

            _context.Questions.Add(newQuestion);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status201Created, newQuestion);
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult UpdateQuestion(int id, QuestionDTO question)
        {
            var questionFromDB = _context.Questions.Find(id);

            if (questionFromDB == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            _context.Entry(questionFromDB).Reference(q => q.User).Load();

            questionFromDB.Theme = question.Theme;

            _context.Questions.Update(questionFromDB);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status201Created, questionFromDB);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteQuestion(int id)
        {
            var questionFromDB = _context.Questions.Find(id);

            if (questionFromDB == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            _context.Entry(questionFromDB).Reference(q => q.User).Load();

            _context.Questions.Remove(questionFromDB);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status201Created, questionFromDB);
        }

        [HttpGet("{questionId}/messages")]
        public IActionResult GetQuestionMessages(int questionId)
        {
            var questionFromDB = _context.Questions.Find(questionId);

            if (questionFromDB == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            _context.Entry(questionFromDB).Collection(q => q.Messages).Load();

            var messages = questionFromDB.Messages;

            foreach (var message in messages)
            {
                _context.Entry(message).Reference(m => m.User).Load();
            }

            return StatusCode(StatusCodes.Status200OK, messages);
        }

        [HttpPost("{questionId}/messages")]
        [Authorize]
        public IActionResult CreateQuestionMessage(int questionId, [FromHeader] int userId, MessageDTO message)
        {
            var questionFromDB = _context.Questions.Find(questionId);
            var user = _context.Users.Find(userId);

            if (questionFromDB == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            var newMessage = new Message()
            {
                Question = questionFromDB,
                User = user,
                Date = DateTime.Now,
                MessageText = message.MessageText
            };

            _context.Messages.Add(newMessage);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status201Created, newMessage);
        }

        [HttpPut("{questionId}/messages/{messageId}")]
        [Authorize]
        public IActionResult UpdateQuestionMessage(int questionId, int messageId, MessageDTO message)
        {
            var questionFromDB = _context.Questions.Find(questionId);
            var messageFromDB = _context.Messages.Find(messageId);

            if (questionFromDB == null || messageFromDB == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            messageFromDB.MessageText = message.MessageText;
            messageFromDB.Date = DateTime.Now;

            _context.Entry(messageFromDB).Reference(m => m.User).Load();

            _context.Messages.Update(messageFromDB);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status202Accepted, messageFromDB);
        }

        [HttpDelete("{questionId}/messages/{messageId}")]
        [Authorize]
        public IActionResult DeleteQuestionMessage(int questionId, int messageId)
        {
            var questionFromDB = _context.Questions.Find(questionId);
            var messageFromDB = _context.Messages.Find(messageId);

            if (questionFromDB == null || messageFromDB == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            _context.Entry(messageFromDB).Reference(m => m.User).Load();

            _context.Messages.Remove(messageFromDB);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status202Accepted, messageFromDB);
        }
    }
}
