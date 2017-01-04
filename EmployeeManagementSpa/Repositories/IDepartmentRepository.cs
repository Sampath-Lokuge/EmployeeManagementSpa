using System.Collections.Generic;
using EmployeeManagementSpa.Dtos;
using EmployeeManagementSpa.Models;

namespace EmployeeManagementSpa.Repositories
{
    public interface IDepartmentRepository
    {
        Department Create(Department department);
        IEnumerable<Department> GetAll();
        DepartmentDto Delete(int id);
        Department Update(int id, Department department);
    }
}
