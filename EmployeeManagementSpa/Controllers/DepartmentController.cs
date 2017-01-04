using System.Collections.Generic;
using EmployeeManagementSpa.Dtos;
using EmployeeManagementSpa.Models;
using EmployeeManagementSpa.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace EmployeeManagementSpa.Controllers
{
    [Route("api/[controller]")]
    public class DepartmentController : Controller
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentController(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        [HttpGet("[action]")]
        public IEnumerable<Department> GetAll()
        {
            return _departmentRepository.GetAll();
        }

        [HttpPost("[action]")]
        public Department Create([FromBody]Department department)
        {
            return _departmentRepository.Create(department);
        }

        // PUT api/values/5
        [HttpPut, Route("Update/{id}")]
        public Department Update(int id, [FromBody]Department department)
        {
            return _departmentRepository.Update(id, department);
        }

        // DELETE api/values/5
        [HttpDelete, Route("Delete/{id}")]
        public DepartmentDto Delete(int id)
        {
            return _departmentRepository.Delete(id);
        }
    }
}
