using System.Collections.Generic;
using EmployeeManagementSpa.Dtos;
using EmployeeManagementSpa.Models;

namespace EmployeeManagementSpa.Repositories
{
    public interface IEmployeeRepository
    {
        Employee Create(Employee employee);
        IEnumerable<Employee> GetAll();
        EmployeeDto Delete(int id);
        Employee Update(int id, Employee employee);

    }
}
