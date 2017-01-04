using System.Collections.Generic;
using EmployeeManagementSpa.Dtos;
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

        [HttpGet("[action]")]
        public IEnumerable<Employee> GetAll()
        {
            return _employeeRepository.GetAll();
        }

        [HttpPost("[action]")]
        public Employee Create([FromBody]Employee employee)
        {
            return _employeeRepository.Create(employee);
        }

        // PUT api/values/5
        [HttpPut, Route("Update/{id}")]
        public Employee Update(int id, [FromBody]Employee employee)
        {
            return _employeeRepository.Update(id,employee);
        }

        // DELETE api/values/5
        [HttpDelete, Route("Delete/{id}")]
        public EmployeeDto Delete(int id)
        {
            return _employeeRepository.Delete(id);
        }
    }
}
