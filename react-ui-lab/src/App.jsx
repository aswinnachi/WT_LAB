import { useState } from 'react';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    { name: 'Submit lab report', done: false },
    { name: 'Prepare React Quiz', done: true },
    { name: 'Review notes', done: false },
  ]);

  const courses = [
    { name: 'Web Technology', progress: 85 },
    { name: 'Database Systems', progress: 72 },
    { name: 'Machine Learning', progress: 68 },
    { name: 'Computer Networks', progress: 90 },
  ];

  const stats = [
    { title: 'Courses', value: '6' },
    { title: 'Assignments', value: '12' },
    { title: 'Attendance', value: '92%' },
    { title: 'CGPA', value: '8.7' },
  ];

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  const addTask = () => {
    if (!task.trim()) return;
    setTasks((prev) => [...prev, { name: task.trim(), done: false }]);
    setTask('');
  };

  const toggleTask = (index) => {
    setTasks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, done: !item.done } : item))
    );
  };

  const removeTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <aside className={menuOpen ? 'sidebar open' : 'sidebar'}>
        <h3>EduDashboard</h3>
        <a href="#">Home</a>
        <a href="#">Courses</a>
        <a href="#">Tasks</a>
        <a href="#">Profile</a>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
          <div className="title-block">
            <span>Student portal</span>
            <h2>Welcome Back!</h2>
          </div>
          <div className="topbar-actions">
            <div className="search-box">
              <input
                type="text"
                value={search}
                placeholder="Search course"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="notify">🔔 <b>3</b></div>
            <div className="profile">
              <img src="https://i.pravatar.cc/100?img=12" alt="profile" />
            </div>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.title}>
              <p>{stat.title}</p>
              <h3>{stat.value}</h3>
            </div>
          ))}
        </section>

        <section className="content-grid">
          <div className="panel">
            <div className="panel-header">
              <h3>My Courses</h3>
              <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? 'Light' : 'Dark'}
              </button>
            </div>
            <div className="course-list">
              {filteredCourses.map((course) => (
                <div className="course-item" key={course.name}>
                  <div className="course-row">
                    <span>{course.name}</span>
                    <b>{course.progress}%</b>
                  </div>
                  <div className="progress-bar">
                    <span style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel task-panel">
            <h3>Add Task</h3>
            <div className="task-row">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task"
              />
              <button onClick={addTask}>Add</button>
            </div>
            <ul className="task-list">
              {tasks.map((item, index) => (
                <li key={index} className={item.done ? 'done' : ''}>
                  <span onClick={() => toggleTask(index)}>{item.name}</span>
                  <button onClick={() => removeTask(index)}>×</button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
