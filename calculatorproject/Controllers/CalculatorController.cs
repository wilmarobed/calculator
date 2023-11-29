using Microsoft.AspNetCore.Mvc;

namespace calculatorproject.Controllers;

[ApiController]
[Route("[controller]")]
public class CalculatorController : ControllerBase
{

    private readonly ILogger<CalculatorController> _logger;

    public CalculatorController(ILogger<CalculatorController> logger)
    {
        _logger = logger;
    }

    [HttpPost("sum")]
    public ActionResult<CalculatorResponse> Sum([FromBody] List<double> nums)
    {
        try
        {
            double total = 0;

            nums.ForEach((num) =>
            {

                //total =+ num;
                total = total + num;
            });

            CalculatorResponse response = new CalculatorResponse { value = total };

            return StatusCode(200, response);
        }
        catch (System.Exception)
        {
            CalculatorResponse response = new CalculatorResponse { message = "Ha Ocurrido un error!" };

            return StatusCode(500, response);
        }
    }
}
