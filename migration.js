const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


// Employee Table
db.serialize(function () {
    db.run(`DROP TABLE IF EXISTS Employee`);
    db.run(`CREATE TABLE IF NOT EXISTS Employee(
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      position INTEGER NOT NULL,
      wage INTEGER NOT NULL,
      is_current_employee INTEGER NOT NULL DEFAULT 1
    );`);
  });

// Timesheet Table
  db.serialize(function () {
    db.run(`DROP TABLE IF EXISTS Timesheet`);
    db.run(`CREATE TABLE IF NOT EXISTS Timesheet(
      id INTEGER PRIMARY KEY,
			hours INTEGER,
			rate INTEGER,
			date INTEGER,
      employee_id INTEGER
    );`);
  });

// Menu Table
  db.serialize(function () {
    db.run(`DROP TABLE IF EXISTS Menu`);
    db.run(`CREATE TABLE IF NOT EXISTS Menu(
      id INTEGER PRIMARY KEY,
			title TEXT
    );`);
  });

// MenuItem Table
db.serialize(function () {
    db.run(`DROP TABLE IF EXISTS MenuItem`);
    db.run(`CREATE TABLE IF NOT EXISTS MenuItem(
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      inventory INTEGER NOT NULL,
      price INTEGER NOT NULL,
      menu_id INTEGER NOT NULL DEFAULT 1
    );`);
  });
