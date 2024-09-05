import React, { useState } from 'react';
import './MemoryModal.css'; 

const MemoryModal = () => {
    const [fileName, setFileName] = useState('');  // 파일 이름 상태 관리
    const [isPublic, setIsPublic] = useState(false);  // 공개 여부 상태 관리
    const [tags, setTags] = useState([]);  // 태그 상태 관리
    const [tagInput, setTagInput] = useState('');  // 태그 입력 상태 관리

    const handleFileChange = (e) => {
        setFileName(e.target.files[0].name);  // 파일 선택 시 파일 이름 상태 업데이트
    };

    const toggleVisibility = () => {
        setIsPublic(!isPublic);  // 공개/비공개 상태 토글
    };

    const addTag = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tagInput.trim()) {
                setTags([...tags, tagInput.trim()]);  // Enter 키 입력 시 태그 추가
                setTagInput('');
            }
        }
    };
 
    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));  // 태그 제거
    };

    return (
        <div className="modal">
            <div className="modal-header">
                <h1>추억 올리기</h1>
                <button className="close-btn">&times;</button>
            </div>
            <form className="memory-form">
                <div className="form-left">
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" placeholder="제목을 입력해 주세요" className="input-box" />

                    <label htmlFor="image">이미지</label>
                    <div className="image-input">
                        <input type="text" id="file-name" value={fileName} placeholder="파일을 선택해 주세요" readOnly className="image-box" />
                        <label htmlFor="image-upload" className="file-select-btn">파일 선택</label>
                        <input type="file" id="image-upload" className="file-input" style={{ display: 'none' }} onChange={handleFileChange} />
                    </div>

                    <label htmlFor="location">장소</label>
                    <input type="text" id="location" placeholder="장소를 입력해 주세요" className="input-box" />

                    <label htmlFor="content">본문</label>
                    <textarea id="content" placeholder="본문 내용을 입력해 주세요"></textarea>
                </div>

                <div className="form-right">
                    <label htmlFor="tags">태그</label>
                    <input 
                        type="text" 
                        id="tags" 
                        value={tagInput} 
                        onChange={(e) => setTagInput(e.target.value)} 
                        placeholder="태그를 입력해 주세요" 
                        className="input-box" 
                        onKeyDown={addTag} 
                    />
                    <div className="tag-list">
                        {tags.map((tag, index) => (
                            <span key={index}>
                                #{tag}
                                <span className="remove-tag" onClick={() => removeTag(tag)}>x</span>
                            </span>
                        ))}
                    </div>

                    <label htmlFor="date">추억의 순간</label>
                    <input type="date" id="date" placeholder="YYYY-MM-DD" className="input-box" />

                    <label htmlFor="visibility">추억 공개 선택</label>
                    <div className="visibility-container">
                        <label className="visibility-label">{isPublic ? '공개' : '비공개'}</label>
                        <label className="switch">
                            <input type="checkbox" id="visibility" checked={isPublic} onChange={toggleVisibility} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <button type="submit" className="submit-btn">올리기</button>
            </form>
        </div>
    );
};

export default MemoryModal;
