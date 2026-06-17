import './Community.css';

const COMMUNITY_POSTS = [
  {
    avatar: '🧑🏽‍💻',
    name: 'AlexStrike',
    country: '🇧🇷',
    time: '2m ago',
    text: 'Just nailed the Golden Boot challenge! 5/5 predictions correct 🎯 Earning those coins!',
    likes: 1204,
    replies: 87,
    xp: '+500 XP',
  },
  {
    avatar: '👩🏻‍🦰',
    name: 'SoccerQueen',
    country: '🇬🇧',
    time: '15m ago',
    text: 'England vs France prediction was insane! Drew it perfectly. Goal Rush is next level! 🏆',
    likes: 834,
    replies: 43,
    xp: '+750 XP',
  },
  {
    avatar: '👦🏿',
    name: 'KingFan99',
    country: '🇩🇪',
    time: '1h ago',
    text: 'Top 10 globally this week! The leaderboard competition is REAL. Germany will dominate WC2026!',
    likes: 2187,
    replies: 156,
    xp: '+1200 XP',
  },
];

export default function Community() {
  return (
    <section id="community" className="community-section">
      <div className="community-bg" />

      <div className="container community-container">
        <div className="community-left fade-up">
          <div className="section-tag" style={{ background: 'rgba(0,71,171,0.08)', borderColor: 'rgba(0,71,171,0.2)', color: 'var(--royal-blue)' }}>
            🌍 Community
          </div>
          <h2 className="section-title">
            Join <span className="text-gradient-blue">10 Million</span> Fans Already Competing
          </h2>
          <p className="section-subtitle">
            Share predictions, celebrate wins, challenge friends, and be part of the most passionate global sports community.
          </p>

          <div className="community-stats">
            {[
              { label: 'Posts Today', value: '142K', icon: '💬' },
              { label: 'Fan Countries', value: '180+', icon: '🌍' },
              { label: 'Active Now', value: '890K', icon: '🔥' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="community-stat">
                <span className="comm-stat-icon">{icon}</span>
                <span className="comm-stat-value">{value}</span>
                <span className="comm-stat-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="community-ctas">
            <button className="btn btn-primary btn-lg" id="join-community-btn">
              🌍 Join the Community
            </button>
            <button className="btn btn-outline" id="community-leaderboard-btn">
              🏆 View Leaderboard
            </button>
          </div>
        </div>

        <div className="community-right fade-up fade-up-delay-2">
          <div className="community-feed">
            <div className="feed-header">
              <span>🔥 Fan Feed</span>
              <span className="feed-live">
                <span className="live-dot" />
                Live
              </span>
            </div>
            {COMMUNITY_POSTS.map((post, i) => (
              <div key={i} className="feed-post" style={{ '--delay': `${i * 0.1}s` }}>
                <div className="post-avatar">
                  <span>{post.avatar}</span>
                </div>
                <div className="post-body">
                  <div className="post-meta">
                    <span className="post-name">{post.name}</span>
                    <span className="post-country">{post.country}</span>
                    <span className="post-time">{post.time}</span>
                    <span className="post-xp">{post.xp}</span>
                  </div>
                  <p className="post-text">{post.text}</p>
                  <div className="post-actions">
                    <button className="post-action" id={`like-post-${i}-btn`}>
                      ❤️ {post.likes.toLocaleString()}
                    </button>
                    <button className="post-action" id={`reply-post-${i}-btn`}>
                      💬 {post.replies}
                    </button>
                    <button className="post-action" id={`share-post-${i}-btn`}>
                      🔗 Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="feed-footer">
              <button className="btn btn-outline btn-sm" style={{ width: '100%' }} id="view-more-posts-btn">
                View More Posts →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
