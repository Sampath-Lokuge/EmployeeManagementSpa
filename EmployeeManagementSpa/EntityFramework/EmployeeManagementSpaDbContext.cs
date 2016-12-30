
using EmployeeManagementSpa.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSpa.EntityFramework
{
    public class EmployeeManagementSpaDbContext : DbContext
    {
        public EmployeeManagementSpaDbContext(DbContextOptions<EmployeeManagementSpaDbContext> options):base(options) { }

        public EmployeeManagementSpaDbContext() { }
        
        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }

    }
}
