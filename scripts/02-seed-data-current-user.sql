    -- HƯỚNG DẪN: 
    -- Chạy script này khi bạn đã đăng nhập vào ứng dụng
    -- Script sẽ tự động sử dụng user hiện tại

    -- Insert sample profile data for current user
    INSERT INTO profiles (id, name, job_title, bio, avatar_url, email) 
    SELECT 
    auth.uid(),
    'Alex Johnson',
    'Full Stack Developer',
    'Passionate developer with 5+ years of experience in React, Node.js, and cloud technologies. I love creating beautiful, functional applications that solve real-world problems.',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    auth.email()
    WHERE auth.uid() IS NOT NULL;

    -- Insert sample projects data for current user
    INSERT INTO projects (user_id, name, description, demo_url, repository_url) 
    SELECT 
    auth.uid(),
    'E-Commerce Platform',
    'A modern e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard.',
    'https://ecommerce-demo.vercel.app',
    'https://github.com/alexjohnson/ecommerce-platform'
    WHERE auth.uid() IS NOT NULL

    UNION ALL

    SELECT 
    auth.uid(),
    'Task Management App',
    'A collaborative task management application with real-time updates, built using React and Firebase.',
    'https://taskmanager-demo.vercel.app',
    'https://github.com/alexjohnson/task-manager'
    WHERE auth.uid() IS NOT NULL

    UNION ALL

    SELECT 
    auth.uid(),
    'Weather Dashboard',
    'A beautiful weather dashboard with location-based forecasts and interactive charts.',
    'https://weather-dashboard-demo.vercel.app',
    'https://github.com/alexjohnson/weather-dashboard'
    WHERE auth.uid() IS NOT NULL;
