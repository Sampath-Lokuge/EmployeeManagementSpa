using System.Collections.Generic;
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

        [HttpGet]
        public IEnumerable<Department> GetAll()
        {
            return _departmentRepository.GetAll();
        }
        
        [HttpPost]
        public void Create([FromBody]Department department)
        {
            _departmentRepository.Create(department);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Update(int id, [FromBody]Department department)
        {
            _departmentRepository.Update(department);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _departmentRepository.Delete(id);
        }
    }
}
