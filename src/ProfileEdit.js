import React, { useState } from 'react';
import './ProfileEdit.css';

function ProfileEdit({ profile, onClose, onProfileUpdate }) {
  const [feedName, setFeedName] = useState(profile.feedName);
  const [description, setDescription] = useState(profile.description);
  const [profilePic, setProfilePic] = useState(profile.profilePic);

  const handleSubmit = (e) => {
    e.preventDefault();
    onProfileUpdate({feedName, description, profilePic });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal-content">
        <button className="profile-close-btn" onClick={onClose}>x</button>
        <h2>프로필 수정</h2>
        <form className="profile-modal-form" onSubmit={handleSubmit}>
          <div>
            <label>추억 보관소명</label>
            <input type="text" value={feedName} onChange={(e) => setFeedName(e.target.value)} placeholder="이름 입력" />
          </div>
          <div>
            <label>프로필 사진</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div>
            <label>줄글 소개</label>
            <textarea className="introduce" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="소개 입력"></textarea>
          </div>
          <button className="profile-submit-btn" type="submit">수정하기</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileEdit;
