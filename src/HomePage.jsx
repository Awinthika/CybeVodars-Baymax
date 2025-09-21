import { useState, useEffect } from "react";
import {
  Menu,
  Users,
  Activity,
  Send,
  Calendar,
  MessageCircle,
  BookOpen,
  GraduationCap,
  Trophy,
  LogOut,
} from "lucide-react";

export default function HomePage({ onOpenChat, onOpenResourceHub, onOpenJournal, user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  // points shown in header
  const [totalPoints, setTotalPoints] = useState(0);
  // sliders
  const [happyLevel, setHappyLevel] = useState(60);
  const [energyLevel, setEnergyLevel] = useState(45);
  // localStorage-backed task completion so tile shows progress
  const [completedTasks, setCompletedTasks] = useState({});
  // only for counting on the tile (the real list lives in DailyTasksPage)
  const dailyTasks = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
    { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 },
  ];

  // Get user's first name for greeting
  const getUserFirstName = () => {
    if (user?.email) {
      const name = user.email.split('@')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return user?.type === 'counsellor' ? 'Counsellor' : 'User';
  };

  // Get user initials for profile button
  const getUserInitials = () => {
    if (user?.email) {
      const name = user.email.split('@')[0];
      return name.substring(0, 2).toUpperCase();
    }
    return user?.type === 'counsellor' ? 'C' : 'U';
  };

  useEffect(() => {
    const savedCompletedTasks = localStorage.getItem("completedTasks");
    const savedPoints = localStorage.getItem("totalPoints");
    if (savedCompletedTasks) setCompletedTasks(JSON.parse(savedCompletedTasks));
    if (savedPoints) setTotalPoints(parseInt(savedPoints, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const getCompletedTasksCount = () => {
    const today = new Date().toDateString();
    return dailyTasks.filter((t) => completedTasks[`${t.id}-${today}`]).length;
  };

  function handleSend(e) {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatInput("");
    onOpenChat();
  }

  const handleLogoutClick = () => {
    setSidebarOpen(false);
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className="page-root">
      {/* Header */}
      <header className="header header-gradient">
        <div className="header-inner">
          <button
            aria-label="menu"
            onClick={() => setSidebarOpen(true)}
            className="btn-icon"
            title="Menu"
          >
            <Menu className="icon" />
          </button>
          <div className="brand">
            <div className="brand-logo">BM</div>
            <div>
              <div className="brand-title">BayMax</div>
              <div className="brand-tag">
                {user?.type === 'counsellor' 
                  ? 'Professional Dashboard' 
                  : 'Care. Listen. Support.'
                }
              </div>
            </div>
          </div>
          <button 
            aria-label="profile" 
            className="profile-btn" 
            title={`Profile - ${user?.email || 'User'}`}
            onClick={() => setSidebarOpen(true)}
          >
            {getUserInitials()}
          </button>
        </div>
        {/* Points Bar */}
        <div className="points-bar">
          <div className="points-info">
            <Trophy className="points-icon" />
            <span className="points-text">{totalPoints} Points</span>
          </div>
          <div className="points-progress">
            <div
              className="points-progress-fill"
              style={{ width: `${Math.min(totalPoints % 100, 100)}%` }}
            />
          </div>
          <div className="points-level">Level {Math.floor(totalPoints / 100) + 1}</div>
        </div>
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="overlay">
          <div className="overlay-back" onClick={() => setSidebarOpen(false)} />
          <aside className="sidebar">
            <div className="sidebar-head">
              <div className="sidebar-title">Menu</div>
              <button className="close-plain" onClick={() => setSidebarOpen(false)}>
                Close
              </button>
            </div>

            {/* User Info Section */}
            <div style={{ 
              padding: '1rem', 
              borderBottom: '1px solid #eee', 
              marginBottom: '1rem' 
            }}>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#666', 
                marginBottom: '0.5rem' 
              }}>
                Logged in as:
              </div>
              <div style={{ 
                fontSize: '0.95rem', 
                fontWeight: '500',
                color: '#333',
                marginBottom: '0.25rem' 
              }}>
                {user?.email}
              </div>
              {user?.type === 'counsellor' && user?.licenseNumber && (
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: '#28a745',
                  fontWeight: '500' 
                }}>
                  License: {user.licenseNumber}
                </div>
              )}
              <div style={{ 
                fontSize: '0.8rem', 
                color: user?.type === 'counsellor' ? '#28a745' : '#007bff',
                textTransform: 'capitalize',
                fontWeight: '500'
              }}>
                {user?.type} Account
              </div>
            </div>

            <nav className="sidebar-nav">
              {/* Chatbot */}
              <button
                onClick={() => {
                  onOpenChat();
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <MessageCircle className="nav-icon" />
                <span>
                  {user?.type === 'counsellor' ? 'Client Chat' : 'Chatbot'}
                </span>
              </button>

              {/* Journal */}
              <button
                onClick={() => {
                  onOpenJournal();
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <BookOpen className="nav-icon" />
                <span>
                  {user?.type === 'counsellor' ? 'Client Journals' : 'Journal'}
                </span>
              </button>

              {/* Resource Hub */}
              <button
                onClick={() => {
                  onOpenResourceHub("resourceHub");
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <GraduationCap className="nav-icon" />
                <span>
                  {user?.type === 'counsellor' ? 'Professional Resources' : 'Resource Hub'}
                </span>
              </button>

              {/* Activities -> Daily Tasks page */}
              <button
                onClick={() => {
                  onOpenResourceHub("dailyTasks");
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <Activity className="nav-icon" />
                <span>
                  {user?.type === 'counsellor' ? 'Client Activities' : 'Activities'}
                </span>
              </button>

              {/* Community (placeholder) */}
              <button
                onClick={() => {
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <Users className="nav-icon" />
                <span>
                  {user?.type === 'counsellor' ? 'Professional Network' : 'Community'}
                </span>
              </button>

              {/* Counseling (placeholder) */}
              <button
                onClick={() => {
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <Calendar className="nav-icon" />
                <span>
                  {user?.type === 'counsellor' ? 'Session Schedule' : 'Book Counseling'}
                </span>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogoutClick}
                className="nav-item"
                style={{ 
                  marginTop: 'auto',
                  borderTop: '1px solid #eee',
                  paddingTop: '1rem',
                  color: '#dc3545' 
                }}
              >
                <LogOut className="nav-icon" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="content">
        <div className="greeting">
          Hey {getUserFirstName()}, 
          {user?.type === 'counsellor' 
            ? ' welcome to your professional dashboard!' 
            : ' what do you want to do?'
          }
        </div>

        {/* Sliders - Show for users, different context for counsellors */}
        <section className="sliders">
          <div className="slider-row">
            <label className="slider-label">
              {user?.type === 'counsellor' ? 'Client Mood Avg' : 'Happy'}
            </label>
            <div className="slider-control">
              <input
                type="range"
                min="0"
                max="100"
                value={happyLevel}
                onChange={(e) => setHappyLevel(Number(e.target.value))}
                className="range"
                aria-label={user?.type === 'counsellor' ? 'Client mood average' : 'Happy level'}
                disabled={user?.type === 'counsellor'} // Read-only for counsellors
              />
              <div className="range-value">{happyLevel}%</div>
            </div>
          </div>
          <div className="slider-row">
            <label className="slider-label">
              {user?.type === 'counsellor' ? 'Client Energy Avg' : 'Energy'}
            </label>
            <div className="slider-control">
              <input
                type="range"
                min="0"
                max="100"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(Number(e.target.value))}
                className="range"
                aria-label={user?.type === 'counsellor' ? 'Client energy average' : 'Energy level'}
                disabled={user?.type === 'counsellor'} // Read-only for counsellors
              />
              <div className="range-value">{energyLevel}%</div>
            </div>
          </div>
        </section>

        {/* Tiles */}
        <div className="tiles-grid">
          {/* Journal */}
          <button
            className="tile tile-journal"
            onClick={() => onOpenJournal()}
            aria-label="Journal"
          >
            <div className="tile-left">
              <div className="tile-icon circle-purple">
                <BookOpen />
              </div>
            </div>
            <div className="tile-body">
              <div className="tile-title">
                {user?.type === 'counsellor' ? 'Client Journals' : 'Journal'}
              </div>
              <div className="tile-sub">
                {user?.type === 'counsellor' 
                  ? 'Review client progress' 
                  : 'Log your daily journal'
                }
              </div>
            </div>
          </button>

          {/* Community */}
          <button
            className="tile tile-community"
            onClick={() => {}}
            aria-label="Community"
          >
            <div className="tile-left">
              <div className="tile-icon circle-green">
                <Users />
              </div>
            </div>
            <div className="tile-body">
              <div className="tile-title">
                {user?.type === 'counsellor' ? 'Network' : 'Community'}
              </div>
              <div className="tile-sub">
                {user?.type === 'counsellor' 
                  ? 'Connect with peers' 
                  : 'Join support rooms'
                }
              </div>
            </div>
          </button>

          {/* Activities */}
          <button
            className="tile tile-activities"
            onClick={() => onOpenResourceHub("dailyTasks")}
            aria-label="Activities"
          >
            <div className="tile-left">
              <div className="tile-icon circle-yellow">
                <Activity />
              </div>
            </div>
            <div className="tile-body">
              <div className="tile-title">
                {user?.type === 'counsellor' ? 'Client Tasks' : 'Activities'}
              </div>
              <div className="tile-sub">
                {user?.type === 'counsellor' 
                  ? 'Monitor client progress' 
                  : `${getCompletedTasksCount()}/10 completed today`
                }
              </div>
            </div>
          </button>

          {/* Counseling */}
          <button
            className="tile tile-counsel"
            onClick={() => {}}
            aria-label={user?.type === 'counsellor' ? 'Sessions' : 'Book Counseling'}
          >
            <div className="tile-left">
              <div className="tile-icon circle-orange">
                <Calendar />
              </div>
            </div>
            <div className="tile-body">
              <div className="tile-title">
                {user?.type === 'counsellor' ? 'Sessions' : 'Book Counseling'}
              </div>
              <div className="tile-sub">
                {user?.type === 'counsellor' 
                  ? 'Manage appointments' 
                  : 'Book anonymously'
                }
              </div>
            </div>
          </button>
        </div>
      </main>

      {/* Bottom Chatbox */}
      <div className="fixed-chat">
        <form onSubmit={handleSend} className="chat-form" role="search">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={
              user?.type === 'counsellor' 
                ? "Quick message to clients..." 
                : "Talk to BayMax..."
            }
            className="chat-input"
            aria-label={
              user?.type === 'counsellor' 
                ? "Quick message to clients" 
                : "Quick chat to BayMax"
            }
          />
          <button type="submit" className="chat-send" aria-label="Send quick chat">
            Send <Send className="send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}