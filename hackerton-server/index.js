const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 5000;

// PostgreSQL database connection setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_db',
  password: 'postgres',
  port: 5432,
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// JWT Secret Key
const jwtSecret = 'secret123';

// Routes
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    await pool.query(
      'INSERT INTO Register (username, password) VALUES ($1, $2)',
      [username, hashedPassword]
    );

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.username, is_admin: user.is_admin }, jwtSecret);

    res.status(200).json({ token, is_admin: user.is_admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

app.get('/admin', authenticateToken, (req, res) => {
  if (req.user.is_admin !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  // Admin dashboard
  res.status(200).json({ message: 'Welcome to the admin dashboard' });
});

app.get('/user', authenticateToken, (req, res) => {
  // User dashboard
  res.status(200).json({ message: 'Welcome to the user dashboard' });
});

app.get('/users', (req, res) => {
  const query = "SELECT e_id as id, username as title, righttitle FROM public.register";

  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.json(rows);
    }
  });
});

app.get('/tasks', (req, res) => {
  const query = `select task_id as id, e_id as group, concat('ID:',task_id, ' ',description) as title, extract(epoch from taskdate) * 1000 + extract(epoch from starttime)*1000 - 28800000 as start, extract(epoch from taskdate) * 1000 + extract(epoch from endtime)*1000 - 28800000 as end, righttitle as className from task inner join register on task.ename = register.username`;

  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.json(rows);
    }
    
  });
});

app.post('/users_user', (req, res) => {

  console.log(req.body)
  const ename = req.body.ename;
  const query = "SELECT e_id as id, username as title, righttitle FROM public.register where username = '" + ename + "'";

  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.json(rows);
    }
  });
});

app.post('/tasks_user', (req, res) => {

  const ename = req.body.ename;
  const query = "select task_id as id, e_id as group, concat('ID:',task_id, ' ',description) as title, extract(epoch from taskdate) * 1000 + extract(epoch from starttime)*1000 - 28800000 as start, extract(epoch from taskdate) * 1000 + extract(epoch from endtime)*1000 - 28800000 as end, righttitle as className from task inner join register on task.ename = register.username where task.ename = '" + ename + "'";

  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.json(rows);
    }
    
  });
});

app.post('/admincreatetask', async (req, res) => {
	try {
	  const {catid, taskdate,starttime,endtime,tasktype,taskstatus,description,ename } = req.body;
  
	  
	  // Save the user to the database
	  await pool.query(
		'INSERT INTO Task(catid, taskdate,starttime,endtime,tasktype,taskstatus,description,ename) VALUES ($1,$2, $3,$4,$5,$6,$7,$8)',
		[catid, taskdate,starttime,endtime,tasktype,taskstatus,description,ename]
	  );
  
	  res.status(200).json({ message: 'User registered successfully' });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Error registering user' });
	}
  });

  app.post('/usercreatetask', async (req, res) => {
    try {
      const {catid, taskdate,starttime,endtime,tasktype,taskstatus,description,ename } = req.body;
    
      
      // Save the user to the database
      await pool.query(
      'INSERT INTO Task(catid, taskdate,starttime,endtime,tasktype,taskstatus,description,ename) VALUES ($1,$2, $3,$4,$5,$6,$7,$8)',
      [catid, taskdate,starttime,endtime,tasktype,taskstatus,description,ename]
      );
    
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering user' });
    }
  });

  app.post('/userdeletetask', async (req, res) => {
    try {
      const taskId = req.body.id;
      const ename = req.body.ename;
  
      if (!taskId) {
        return res.status(400).json({ message: 'Task ID is missing' });
      }

      console.log(taskId)
      console.log(ename)
  
      // Delete the task from the database
      const result = await pool.query("DELETE FROM Task WHERE task_id = $1 and ename = $2 RETURNING *", [taskId, ename]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting task' });
    }
});

app.post('/admindeletetask', async (req, res) => {
  try {
    const taskId = req.body.id;

    if (!taskId) {
      return res.status(400).json({ message: 'Task ID is missing' });
    }

    // Delete the task from the database
    const result = await pool.query('DELETE FROM Task WHERE task_id = $1 RETURNING *', [taskId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting task' });
  }
});
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
