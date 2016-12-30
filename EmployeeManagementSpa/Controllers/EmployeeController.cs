using System.Collections.Generic;
using EmployeeManagementSpa.Models;
using EmployeeManagementSpa.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSpa.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public IEnumerable<Employee> GetAll()
        {
            return _employeeRepository.GetAll();
        }

        [HttpPost]
        public void Create([FromBody]Employee department)
        {
            _employeeRepository.Create(department);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Update(int id, [FromBody]Employee department)
        {
            _employeeRepository.Update(department);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _employeeRepository.Delete(id);
        }
    }
}
