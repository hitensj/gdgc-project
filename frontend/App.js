import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, MapPin, Code, X } from 'lucide-react';

// Splash Screen Component
const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 z-50 animate-pulse">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <Code className="w-16 h-16 text-blue-600" />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-white rounded-full animate-ping opacity-75"></div>
        </div>
        <h1 className="text-5xl font-bold text-white tracking-wider animate-slide-up">
          GDGC
        </h1>
        <p className="text-xl text-white/90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Member Showcase
        </p>
      </div>
    </div>
  );
};

// Member Card Component
const MemberCard = ({ member, isDark, onClick }) => (
  <div 
    onClick={() => onClick(member)}
    className={`${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-xl'} 
      rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}
  >
    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
      <img 
        src={member.photo} 
        alt={member.name}
        className="w-32 h-32 rounded-full border-4 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 object-cover"
      />
    </div>
    <div className="pt-20 pb-6 px-6 text-center">
      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {member.name}
      </h3>
      <p className="text-purple-600 font-semibold mb-3">{member.role}</p>
      <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
        {member.bio}
      </p>
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {member.skills.slice(0, 3).map((skill, idx) => (
          <span 
            key={idx}
            className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-blue-100 text-blue-800'}`}
          >
            {skill}
          </span>
        ))}
      </div>
      <div className={`flex items-center justify-center gap-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <MapPin className="w-4 h-4" />
        {member.location}
      </div>
    </div>
  </div>
);

// Member Detail Modal
const MemberModal = ({ member, isDark, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img 
            src={member.photo} 
            alt={member.name}
            className="w-40 h-40 rounded-full border-4 border-white absolute bottom-0 left-8 transform translate-y-1/2 object-cover shadow-xl"
          />
        </div>
        
        <div className="pt-24 pb-8 px-8">
          <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {member.name}
          </h2>
          <p className="text-purple-600 font-semibold text-lg mb-4">{member.role}</p>
          
          <div className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <p className="leading-relaxed">{member.bio}</p>
          </div>

          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-blue-100 text-blue-800'}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <span>{member.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-600" />
              <span>github.com/{member.github}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function GDGCMemberShowcase() {
  const [showSplash, setShowSplash] = useState(true);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('gdgc-theme');
    return saved ? saved === 'dark' : false;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);

  // Load theme preference
  useEffect(() => {
    localStorage.setItem('gdgc-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Fetch members from API
  useEffect(() => {
    if (!showSplash) {
      fetchMembers();
    }
  }, [showSplash]);

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API URL
      const API_URL = 'http://localhost:3001/members';
      const response = await fetch(API_URL);
      
      if (!response.ok) throw new Error('Failed to fetch members');
      
      const data = await response.json();
      setMembers(data.data || data);
      setFilteredMembers(data.data || data);
    } catch (err) {
      setError(err.message);
      // Fallback mock data for demo
      const mockData = [
        {
          id: 1,
          name: "Priya Sharma",
          role: "Full Stack Developer",
          photo: "https://i.pravatar.cc/300?img=5",
          skills: ["React", "Node.js", "MongoDB", "TypeScript"],
          bio: "Passionate about building scalable web applications and mentoring junior developers.",
          location: "Mumbai",
          github: "priyasharma"
        },
        {
          id: 2,
          name: "Rahul Verma",
          role: "UI/UX Designer",
          photo: "https://i.pravatar.cc/300?img=12",
          skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
          bio: "Creating delightful user experiences through thoughtful design and research.",
          location: "Delhi",
          github: "rahulverma"
        }
      ];
      setMembers(mockData);
      setFilteredMembers(mockData);
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  useEffect(() => {
    let filtered = members;

    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(member => member.role === roleFilter);
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter(member => member.location === locationFilter);
    }

    setFilteredMembers(filtered);
  }, [searchTerm, roleFilter, locationFilter, members]);

  const uniqueRoles = [...new Set(members.map(m => m.role))];
  const uniqueLocations = [...new Set(members.map(m => m.location))];

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 ${isDark ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-lg border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${isDark ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-600 to-purple-600'} flex items-center justify-center`}>
              <Code className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              GDGC Members
            </h1>
          </div>
          
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search by name or bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
            >
              <option value="all">All Roles</option>
              {uniqueRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
            >
              <option value="all">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={`p-6 rounded-xl ${isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-100 text-red-700'} mb-8`}>
            <p className="font-semibold">Using demo data - API connection failed</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Member Grid */}
        {!loading && (
          <>
            <div className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Showing {filteredMembers.length} of {members.length} members
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map(member => (
                <MemberCard 
                  key={member.id} 
                  member={member} 
                  isDark={isDark}
                  onClick={setSelectedMember}
                />
              ))}
            </div>
          </>
        )}

        {/* No Results */}
        {!loading && filteredMembers.length === 0 && (
          <div className="text-center py-20">
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              No members found matching your criteria
            </p>
          </div>
        )}
      </main>

      {/* Member Detail Modal */}
      {selectedMember && (
        <MemberModal 
          member={selectedMember} 
          isDark={isDark} 
          onClose={() => setSelectedMember(null)} 
        />
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}