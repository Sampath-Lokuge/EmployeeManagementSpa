using System.Collections.Generic;
using EmployeeManagementSpa.Models;

namespace EmployeeManagementSpa.Repositories
{
    public interface IDepartmentRepository
    {
        void Create(Department department);
        IEnumerable<Department> GetAll();
        void Delete(int id);
        void Update(Department department);
    }
}
