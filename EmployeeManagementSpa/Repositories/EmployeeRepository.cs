using System;
using System.Collections.Generic;
using System.Linq;
using EmployeeManagementSpa.Dtos;
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

        //add
        public Employee Create(Employee employee)
        {
            _dbContext.Employees.Add(employee);
            _dbContext.SaveChanges();
            return employee;
        }

        //get
        public IEnumerable<Employee> GetAll()
        {
            return _dbContext.Employees.ToList();
        }

        //delete
        public EmployeeDto Delete(int id)
        {
            var message = new EmployeeDto { Message = string.Empty };
            var itemToDelete = _dbContext.Employees.FirstOrDefault(r => r.Id == id);
            if (itemToDelete == null) return message;
            _dbContext.Remove(itemToDelete);
            _dbContext.SaveChanges();
            message.Message = "Success";
            return message;
        }

        //edit
        public Employee Update(int id, Employee employee)
        {
            var itemToUpdate = _dbContext.Employees.FirstOrDefault(r => r.Id == id);
            if (itemToUpdate == null) return employee;
            itemToUpdate.FirstName = employee.FirstName;
            itemToUpdate.LastName = employee.LastName;
            itemToUpdate.CreationTime = DateTime.Now;
            itemToUpdate.DepartmentId = employee.DepartmentId;
            _dbContext.SaveChanges();
            return itemToUpdate;
        }
    }
}
