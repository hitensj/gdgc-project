

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "https://gdgc-project-git-main-hitensjs-projects.vercel.app",
      "http://localhost:3000"
    ],
    methods: ["GET"]
  })
);
app.use(express.json());

// Mock member data 
const members = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Full Stack Developer",
    photo: "https://i.pravatar.cc/300?img=5",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    bio: "Passionate about building scalable web applications and mentoring junior developers.",
    location: "Mumbai",
    email: "priya.sharma@gdgc.dev",
    github: "priyasharma",
    joinedDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "UI/UX Designer",
    photo: "https://i.pravatar.cc/300?img=12",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    bio: "Creating delightful user experiences through thoughtful design and research.",
    location: "Delhi",
    email: "rahul.verma@gdgc.dev",
    github: "rahulverma",
    joinedDate: "2023-02-20"
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Mobile Developer",
    photo: "https://i.pravatar.cc/300?img=9",
    skills: ["Flutter", "Dart", "Firebase", "iOS"],
    bio: "Building beautiful cross-platform mobile apps that users love.",
    location: "Bangalore",
    email: "ananya.patel@gdgc.dev",
    github: "ananyapatel",
    joinedDate: "2023-03-10"
  },
  {
    id: 4,
    name: "Arjun Singh",
    role: "DevOps Engineer",
    photo: "https://i.pravatar.cc/300?img=13",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    bio: "Automating infrastructure and ensuring seamless deployments for development teams.",
    location: "Pune",
    email: "arjun.singh@gdgc.dev",
    github: "arjunsingh",
    joinedDate: "2023-04-05"
  },
  {
    id: 5,
    name: "Sneha Reddy",
    role: "Data Scientist",
    photo: "https://i.pravatar.cc/300?img=10",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    bio: "Turning data into actionable insights and building intelligent ML models.",
    location: "Hyderabad",
    email: "sneha.reddy@gdgc.dev",
    github: "snehareddy",
    joinedDate: "2023-05-12"
  },
  {
    id: 6,
    name: "Vikram Khanna",
    role: "Backend Developer",
    photo: "https://i.pravatar.cc/300?img=15",
    skills: ["Java", "Spring Boot", "PostgreSQL", "Microservices"],
    bio: "Designing robust backend systems that power modern applications.",
    location: "Chennai",
    email: "vikram.khanna@gdgc.dev",
    github: "vikramkhanna",
    joinedDate: "2023-06-18"
  },
  {
    id: 7,
    name: "Neha Gupta",
    role: "Frontend Developer",
    photo: "https://i.pravatar.cc/300?img=6",
    skills: ["Vue.js", "CSS", "JavaScript", "Webpack"],
    bio: "Crafting pixel-perfect interfaces with clean, maintainable code.",
    location: "Kolkata",
    email: "neha.gupta@gdgc.dev",
    github: "nehagupta",
    joinedDate: "2023-07-22"
  },
  {
    id: 8,
    name: "Karan Mehta",
    role: "Cybersecurity Specialist",
    photo: "https://i.pravatar.cc/300?img=14",
    skills: ["Penetration Testing", "Network Security", "Cryptography", "Ethical Hacking"],
    bio: "Protecting digital assets and ensuring secure software development practices.",
    location: "Ahmedabad",
    email: "karan.mehta@gdgc.dev",
    github: "karanmehta",
    joinedDate: "2023-08-30"
  },
  {
    id: 9,
    name: "Ishita Joshi",
    role: "Cloud Architect",
    photo: "https://i.pravatar.cc/300?img=8",
    skills: ["Azure", "GCP", "Terraform", "Serverless"],
    bio: "Designing scalable cloud solutions for enterprise-level applications.",
    location: "Jaipur",
    email: "ishita.joshi@gdgc.dev",
    github: "ishitajoshi",
    joinedDate: "2023-09-14"
  },
  {
    id: 10,
    name: "Aditya Kumar",
    role: "Blockchain Developer",
    photo: "https://i.pravatar.cc/300?img=11",
    skills: ["Solidity", "Web3.js", "Smart Contracts", "Ethereum"],
    bio: "Building decentralized applications and exploring the future of Web3.",
    location: "Lucknow",
    email: "aditya.kumar@gdgc.dev",
    github: "adityakumar",
    joinedDate: "2023-10-08"
  }
];

// GET /members 
app.get('/members', (req, res) => {
  try {
    res.json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching members'
    });
  }
});

// GET /members/:id 
app.get('/members/:id', (req, res) => {
  try {
    const memberId = parseInt(req.params.id);
    const member = members.find(m => m.id === memberId);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }
    
    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while fetching member'
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});

module.exports = app;