using System;
using System.Collections.Generic;
using System.Linq;
using EmployeeManagementSpa.Dtos;
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

        //add
        public Department Create(Department department)
        {
            _dbContext.Add(department);
            _dbContext.SaveChanges();
            return department;
        }

        //get
        public IEnumerable<Department> GetAll()
        {
            return _dbContext.Departments.ToList();
        }

        //delete
        public DepartmentDto Delete(int id)
        {
            var message = new DepartmentDto { Message = string.Empty };
            var itemToDelete = _dbContext.Departments.FirstOrDefault(r => r.Id == id);
            if (itemToDelete == null) return message;
            _dbContext.Remove(itemToDelete);
            _dbContext.SaveChanges();
            message.Message = "Success";
            return message;
        }

        //edit
        public Department Update(int id, Department department)
        {
            var itemToUpdate = _dbContext.Departments.FirstOrDefault(r => r.Id == id);
            if (itemToUpdate == null) return department;
            itemToUpdate.Name = department.Name;
            itemToUpdate.CreationTime = DateTime.Now;
            _dbContext.SaveChanges();
            return itemToUpdate;
        }
    }
}
