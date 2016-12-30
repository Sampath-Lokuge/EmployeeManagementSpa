using System.Collections.Generic;
using EmployeeManagementSpa.Models;

namespace EmployeeManagementSpa.Repositories
{
    public interface IEmployeeRepository
    {
        void Create(Employee employee);
        IEnumerable<Employee> GetAll();
        void Delete(int id);
        void Update(Employee employee);

    }
}
