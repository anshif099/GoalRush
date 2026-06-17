import { useState } from 'react';
import './Marketplace.css';

const MARKETPLACE_ITEMS = [
  {
    id: 'item-amazon',
    category: 'Gift Cards',
    title: '$50 Amazon Gift Card',
    price: 5000,
    icon: '🎁',
    brand: 'Amazon',
    stock: 'In Stock',
    color: '#FF9900',
  },
  {
    id: 'item-imax',
    category: 'Movie Tickets',
    title: '2x IMAX Movie Tickets',
    price: 3000,
    icon: '🎬',
    brand: 'IMAX Cinema',
    stock: '15 Left',
    color: '#0099FF',
  },
  {
    id: 'item-ubereats',
    category: 'Food Coupons',
    title: '$25 Uber Eats Voucher',
    price: 2500,
    icon: '🍔',
    brand: 'Uber Eats',
    stock: 'In Stock',
    color: '#06C167',
  },
  {
    id: 'item-spotify',
    category: 'OTT Subscriptions',
    title: '3-Month Spotify Premium',
    price: 4000,
    icon: '🎵',
    brand: 'Spotify',
    stock: '8 Left',
    color: '#1DB954',
  },
  {
    id: 'item-cashback',
    category: 'Cashback Rewards',
    title: '$10 Direct Cash Back',
    price: 1500,
    icon: '💵',
    brand: 'PayPal / Stripe',
    stock: 'Unlimited',
    color: '#00A651',
  },
  {
    id: 'item-airbnb',
    category: 'Travel Discounts',
    title: '$100 Airbnb Gift Card',
    price: 9500,
    icon: '✈️',
    brand: 'Airbnb',
    stock: '3 Left',
    color: '#FF5A5F',
  },
  {
    id: 'item-shell',
    category: 'Fuel Vouchers',
    title: '$20 Shell Fuel Pass',
    price: 2000,
    icon: '⛽',
    brand: 'Shell',
    stock: 'In Stock',
    color: '#FFCC00',
  },
  {
    id: 'item-nike',
    category: 'Shopping Coupons',
    title: '$50 Nike Promo Code',
    price: 4500,
    icon: '👟',
    brand: 'Nike',
    stock: '12 Left',
    color: '#111111',
  },
];

const CATEGORIES = [
  'All',
  'Gift Cards',
  'Movie Tickets',
  'Food Coupons',
  'OTT Subscriptions',
  'Cashback Rewards',
  'Travel Discounts',
  'Fuel Vouchers',
  'Shopping Coupons',
];

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userCoins, setUserCoins] = useState(15000); // Starting Mock Coins
  const [redeemedItems, setRedeemedItems] = useState({});

  const handleRedeem = (id, price) => {
    if (redeemedItems[id]) return;
    if (userCoins < price) {
      alert("Insufficient Goal Rush Coins! Play more challenges to earn more.");
      return;
    }

    setUserCoins(prev => prev - price);
    setRedeemedItems(prev => ({ ...prev, [id]: true }));
  };

  const filteredItems = selectedCategory === 'All'
    ? MARKETPLACE_ITEMS
    : MARKETPLACE_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section id="marketplace" className="marketplace-section">
      <div className="container">
        {/* Marketplace Header */}
        <div className="market-header-block fade-up">
          <div className="market-header-left">
            <div className="section-tag market-tag">🛍️ Coin Shop</div>
            <h2 className="section-title">
              Rewards <span className="text-gradient-blue">Marketplace</span>
            </h2>
            <p className="section-subtitle">
              Redeem your accumulated Goal Rush coins for real gift cards, coupons, and brand vouchers.
            </p>
          </div>

          {/* User Coin Balance Board */}
          <div className="user-coin-board">
            <div className="coin-glow-icon">🪙</div>
            <div className="coin-balance-details">
              <span className="balance-lbl">YOUR BALANCE</span>
              <span className="balance-val">{userCoins.toLocaleString()} Coins</span>
            </div>
          </div>
        </div>

        {/* Filter categories bar */}
        <div className="market-filter-bar fade-up">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="market-grid">
          {filteredItems.map((item, idx) => {
            const isRedeemed = redeemedItems[item.id];
            
            return (
              <div 
                key={item.id} 
                className="market-card fade-up"
                style={{ '--brand-color': item.color }}
              >
                {/* E-commerce Card Top */}
                <div className="market-card-image-wrap">
                  <div className="market-card-bg-glow" />
                  <div className="market-card-badge">{item.category}</div>
                  <span className="market-card-icon">{item.icon}</span>
                </div>

                {/* E-commerce Card Body */}
                <div className="market-card-body">
                  <div className="market-card-brand">{item.brand}</div>
                  <h3 className="market-card-title">{item.title}</h3>
                  <div className="market-card-meta">
                    <span className="meta-stock">Stock: <strong>{item.stock}</strong></span>
                  </div>
                </div>

                {/* E-commerce Card Footer */}
                <div className="market-card-footer">
                  <div className="price-tag">
                    <span className="coin-gold-icon">🪙</span>
                    <span className="price-val">{item.price.toLocaleString()}</span>
                  </div>
                  
                  {isRedeemed ? (
                    <button className="btn btn-redeem-success" disabled>
                      Redeemed! 📬
                    </button>
                  ) : (
                    <button 
                      className="btn btn-redeem-action"
                      onClick={() => handleRedeem(item.id, item.price)}
                    >
                      Redeem Item
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
