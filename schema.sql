
-- NetLink General Solutions Database Schema
-- Database: netlink-gs
-- Password: 1437faf@

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Employees Table
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    seniority VARCHAR(50) NOT NULL,
    photo_url TEXT,
    base_salary DECIMAL(12, 2) DEFAULT 0.00,
    performance_score INT DEFAULT 0,
    performance_history INT[] DEFAULT '{}',
    current_plan TEXT,
    daily_plan TEXT,
    evaluation_frequency VARCHAR(20) DEFAULT 'Monthly',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Task Posts Table (Feed)
CREATE TABLE task_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    likes UUID[] DEFAULT '{}', -- Array of employee IDs who liked
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comments Table
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES task_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reports Table
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_data TEXT, -- Base64 encoded or path to storage
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- News & Events Table
CREATE TABLE news_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(20) DEFAULT 'News',
    author_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Admin Data
-- Note: Replace with actual initial setup in production
-- INSERT INTO employees (name, email, role, department, seniority) 
-- VALUES ('Admin', 'admin@netlink-gs.com', 'System Administrator', 'Management', 'Executive');
