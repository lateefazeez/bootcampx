const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2] || 'JUL02';
const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;
`;

const values = [`${cohort}`];

pool.query(queryString, values)
  .then(teachers => {
    teachers.rows.forEach(teacher => {
      console.log(`${teacher.cohort}: ${ teacher.teacher }`);
    });
  })
  .catch(err => console.error(err.stack));