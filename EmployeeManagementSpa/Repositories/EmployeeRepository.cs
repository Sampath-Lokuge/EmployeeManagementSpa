using System;
using System.Collections.Generic;
using System.Linq;
using EmployeeManagementSpa.EntityFramework;
using EmployeeManagementSpa.Models;

namespace EmployeeManagementSpa.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly EmployeeManagementSpaDbContext _dbContext;

        public EmployeeRepository(EmployeeManagementSpaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Create(Employee employee)
        {
            _dbContext.Employees.Add(employee);
        }

        public IEnumerable<Employee> GetAll()
        {
            return _dbContext.Employees.ToList();
        }

        public void Delete(int id)
        {
            var itemToDelete = _dbContext.Employees.FirstOrDefault(r => r.Id == id);
            if (itemToDelete != null) _dbContext.Remove(itemToDelete);
        }

        public void Update(Employee employee)
        {
            var itemToUpdate = _dbContext.Employees.FirstOrDefault(r => r.Id == employee.Id);
            if (itemToUpdate != null)
            {
                itemToUpdate.FirstName = employee.FirstName;
                itemToUpdate.LastName = employee.LastName;
                itemToUpdate.CreationTime = DateTime.Now;

            }
        }
    }
}
