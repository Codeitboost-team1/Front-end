import React from 'react';
import './FeedCard.css';

function FeedCard({ thumbnail, name, id, title, tags, locationDate, likes, comments, isPublic }) {
  return (
    <div className="feed-card">
      <img src={thumbnail} alt="Thumbnail" className="feed-thumbnail" />
      <div className="feed-info">
        <div className="name-id">
            <p className="profile-name">codeit</p>
            <p className="profile-id">&ensp;|&ensp;@codeit</p>
        </div>
        <h3 className="feedcard-title">{title}</h3>
        <p className="feed-tags">{tags}</p>
        <div className="feed-stats">
            <p className="feed-location-date">{locationDate}</p>
            <span className="feed-likes">공감 {likes}</span>
            <span className="feed-comments">댓글 {comments}</span>
        </div>
        <span className="feed-privacy" style={{ display: 'none' }}>
          {isPublic ? '공개' : '비공개'}
        </span>
      </div>
    </div>
  );
}

export default FeedCard;
