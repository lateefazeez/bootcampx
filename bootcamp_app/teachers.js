const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2];

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = '${cohort || 'JUL02'}'
ORDER BY teacher;
`)
  .then(teachers => {
    teachers.rows.forEach(teacher => {
      console.log(`${teacher.cohort}: ${ teacher.teacher }`);
    });
  })
  .catch(err => console.error(err.stack));