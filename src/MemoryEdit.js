import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MemoryEdit.css'; 

const MemoryEdit = ({ onAddNewFeedItem,onClose,onEdit }) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [fileName, setFileName] = useState('');  // 파일 이름 상태 관리
    const [isPublic, setIsPublic] = useState(false);  // 공개 여부 상태 관리
    const [tags, setTags] = useState([]);  // 태그 상태 관리
    const [tagInput, setTagInput] = useState('');  // 태그 입력 상태 관리
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');

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

    const handleSubmit = () => {
        const updatedMemory = {
            thumbnail: '/_.jpeg',
            name: 'New User', // 실제 사용자 정보로 업데이트
            id: 'new_user', // 실제 사용자 ID로 업데이트
            title,
            tags: tags.join(', '),
            locationDate: `${location} | ${date}`,
            content, // 본문 내용 추가
            isPublic,
        };

        onEdit(updatedMemory);  // 수정된 메모리 데이터를 부모로 전달
        onClose(); // 모달 닫기
    };

    return (
        <div className="memory-modal-overlay">
            <div className="memory-modal-content">
                <div className="memory-modal-header">
                    <h1>추억 수정하기</h1>
                    <button className="memory-modal-close-btn" onClick={onClose}>x</button>
                </div>
                <form className="memory-form">
                    <div className="form-left">
                        <label htmlFor="title">제목</label>
                        <input 
                            type="text" 
                            id="title" 
                            placeholder="제목을 입력해 주세요" 
                            className="input-box" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />

                        <label htmlFor="image">이미지</label>
                        <div className="image-input">
                            <input 
                                type="text" 
                                id="file-name" 
                                value={fileName} 
                                placeholder="파일을 선택해 주세요" 
                                readOnly 
                                className="image-box" 
                            />
                            <label htmlFor="image-upload" className="file-select-btn">파일 선택</label>
                            <input 
                                type="file" 
                                id="image-upload" 
                                className="file-input" 
                                style={{ display: 'none' }} 
                                onChange={handleFileChange} 
                            />
                        </div>

                        <label htmlFor="location">장소</label>
                        <input 
                            type="text" 
                            id="location" 
                            placeholder="장소를 입력해 주세요" 
                            className="input-box" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                        />

                        <label htmlFor="content">본문</label>
                        <textarea 
                            id="content" 
                            placeholder="본문 내용을 입력해 주세요"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
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
                        <input 
                            type="date" 
                            id="date" 
                            placeholder="YYYY-MM-DD" 
                            className="input-box" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                        <label htmlFor="visibility">추억 공개 선택</label>
                        <div className="visibility-container">
                            <label className="visibility-label">{isPublic ? '공개' : '비공개'}</label>
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    id="visibility" 
                                    checked={isPublic} 
                                    onChange={toggleVisibility} 
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </form>
                <button type="button" className="submit-btn" onClick={handleSubmit}>수정하기</button>
            </div>
        </div>
    );
};

export default MemoryEdit;
