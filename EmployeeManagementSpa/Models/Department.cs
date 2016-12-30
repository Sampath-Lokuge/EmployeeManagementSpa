using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EmployeeManagementSpa.Models
{
    public class Department
    {
        public const int MaxNameLength = 256;

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(MaxNameLength)]
        public string Name { get; set; }

        public DateTime CreationTime { get; set; }

        public ICollection<Employee> Employees { get; set; }

        public Department()
        {
            CreationTime = DateTime.Now;
        }
    }
}
