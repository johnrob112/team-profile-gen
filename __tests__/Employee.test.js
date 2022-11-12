

const Employee = require('../lib/Employee');
const employee = new Employee('devi', '12345', 'd.hall@gmail.com');

test('getting constructor values for employee object',() =>{
    expect(employee.name).toBe('devi');
    expect(employee.id).toBe('12345');
    expect(employee.email).toBe('d.hall@gmail.com');
}) 

test('test to get the name of employee with getName() method',() => {
    expect(employee.getName()).toBe('devi');
})

test("test to get the i.d of employee with getId() method", () => {
  expect(employee.getId()).toBe("12345");
});

test("test to get the email of employee with getEmail() method", () => {
  expect(employee.getEmail()).toBe("d.hall@gmail.com");
});

test("test to get the role of employee with getRole() method", () => {
  expect(employee.getRole()).toBe("Employee");
});