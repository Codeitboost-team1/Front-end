import React, { useState, useEffect } from 'react';
import './MemoryEdit.css';

const MemoryEdit = ({ onClose, onEdit, initialData }) => {
    const [filePreview, setFilePreview] = useState(null); // 이미지 미리보기 상태 추가
    const [fileName, setFileName] = useState('');  
    const [isPublic, setIsPublic] = useState(false);  
    const [tags, setTags] = useState([]);  
    const [tagInput, setTagInput] = useState('');  
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setLocation(initialData.location || '');
            setDate(initialData.date || '');
            setTags(initialData.tags ? initialData.tags.split(', ') : []);
            setIsPublic(initialData.isPublic || false);
            setContent(initialData.content || '');
            setFileName(initialData.fileName || '');
        }
    }, [initialData]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileName(selectedFile.name);
        const previewURL = URL.createObjectURL(selectedFile);
        setFilePreview(previewURL);  // 파일 미리보기 URL 업데이트
    };

    const toggleVisibility = () => {
        setIsPublic(!isPublic);  
    };

    const addTag = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tagInput.trim()) {
                setTags([...tags, tagInput.trim()]);  
                setTagInput('');
            }
        }
    };
 
    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));  
    };

    const handleSubmit = () => {
        const updatedMemory = {
            title,
            tags: tags.join(', '),
            location,
            date,
            content,
            fileName,
            filePreview,  // 파일 미리보기 URL 포함
            isPublic
        };

        onEdit(updatedMemory);  
        onClose();  
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

                        {filePreview && (
                            <div className="image-preview">
                                <img src={filePreview} alt="Preview" className="preview-img" />
                            </div>
                        )}

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
