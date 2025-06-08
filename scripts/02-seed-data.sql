-- Insert sample profile data
INSERT INTO profiles (id, name, job_title, bio, avatar_url, email) VALUES
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Alex Johnson',
  'Full Stack Developer',
  'Passionate developer with 5+ years of experience in React, Node.js, and cloud technologies. I love creating beautiful, functional applications that solve real-world problems.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  'alex.johnson@example.com'
);

-- Insert sample projects data
INSERT INTO projects (user_id, name, description, demo_url, repository_url) VALUES
(
  '550e8400-e29b-41d4-a716-446655440000',
  'E-Commerce Platform',
  'A modern e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard.',
  'https://ecommerce-demo.vercel.app',
  'https://github.com/alexjohnson/ecommerce-platform'
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Task Management App',
  'A collaborative task management application with real-time updates, built using React and Firebase.',
  'https://taskmanager-demo.vercel.app',
  'https://github.com/alexjohnson/task-manager'
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Weather Dashboard',
  'A beautiful weather dashboard with location-based forecasts and interactive charts.',
  'https://weather-dashboard-demo.vercel.app',
  'https://github.com/alexjohnson/weather-dashboard'
);
