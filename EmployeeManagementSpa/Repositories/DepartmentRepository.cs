using System;
using System.Collections.Generic;
using System.Linq;
using EmployeeManagementSpa.Models;
using EmployeeManagementSpa.EntityFramework;

namespace EmployeeManagementSpa.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly EmployeeManagementSpaDbContext _dbContext;

        public DepartmentRepository(EmployeeManagementSpaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Create(Department department)
        {
            _dbContext.Add(department);
        }

        public IEnumerable<Department> GetAll()
        {
            return _dbContext.Departments.ToList();
        }

        public void Delete(int id)
        {
            var itemToDelete = _dbContext.Departments.FirstOrDefault(r => r.Id == id);
            if (itemToDelete != null) _dbContext.Remove(itemToDelete);
        }

        public void Update(Department department)
        {
            var itemToUpdate = _dbContext.Departments.FirstOrDefault(r => r.Id == department.Id);
            if (itemToUpdate != null)
            {
                itemToUpdate.Name = department.Name;
                itemToUpdate.CreationTime = DateTime.Now;

            }
        }
    }
}
