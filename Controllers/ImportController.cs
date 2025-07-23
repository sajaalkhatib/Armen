using System.Diagnostics;
using Armen_FrontEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace Armen_FrontEnd.Controllers
{
    public class ImportController : Controller
    {
        private readonly ILogger<ImportController> _logger;

        public ImportController(ILogger<ImportController> logger)
        {
            _logger = logger;
        }


        public IActionResult Dashboard()
        {
            return View();
        }

        public IActionResult CustomsCodes()
        {
            return View();
        }

        public IActionResult TaskDetails()
        {
            return View();
        }


        public IActionResult Profile()
        {
            return View();
        }

        public IActionResult Costomers()
        {
            return View();
        }



    }
}
