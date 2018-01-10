const express = require('express');
const sqlite3 = require('sqlite3');
const router = express.Router();
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


router.get('/employees', (req, res) => {
    db.all('SELECT * FROM Employee WHERE is_current_employee=1;', (err, rows) => {
        if (err) {
            res.sendStatus(500); 
        } else {
            res.json({employees: rows});
        }
    });
});

router.post('/employees', (req, res) => {
    const employeeToCreate = req.body.employee;
    db.run('INSERT INTO Employee (id, name, position, wage, is_current_employee) VALUES ($id, $name, $position, $wage, #is_current_employee)', 
    {
        $id: employeeToCreate.id,
        $name: employeeToCreate.name,
        $position: employeeToCreate.position,
        $wage: employeeToCreate.wage,
        $is_current_employee: employeeToCreate.is_current_employee
    }, function(err) {
        if (err) {
          return res.sendStatus(500);
        }
        db.get(`SELECT * FROM Employee WHERE id = ${this.lastID}`, (err, row) => {
          if (!row) {
            return res.sendStatus(500);
          }
          res.status(201).send({employee: row});
        });
      });
    });

module.exports = router;
