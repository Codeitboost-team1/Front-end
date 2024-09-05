import React from 'react';
import './Detail.css';

const DetailPage = () => {
    return (
        <div className="container">
            <header className="header">
                <div className="left-content">
                    <div className="user-info">
                        <span>홍길동</span> | <span>@honggildong</span>
                    </div>
                    <h1>인천 앞바다에서 무려 60cm 월척을 낚다!</h1>
                    <div className="tags">
                        <span>#인천</span>
                        <span>#낚시</span>
                    </div>
                    <div className="post-details">
                        <span>인천 앞바다</span> · <span>24.01.19</span> · <span className="likes">120</span> · <span className="comments-count">8</span>
                    </div>
                </div>
                <div className="right-content">
                    <div className="actions">
                        <button className="action-btn">추억 수정하기</button>
                        <button className="action-btn">추억 삭제하기</button>
                    </div>
                    <button className="share-btn">공감 보내기</button>
                </div>
            </header>

            <section className="post-content">
                <img src="https://via.placeholder.com/780x780" alt="Fishing" className="post-image" />
                <p>
                    인천 앞바다에서 월척을 낚았습니다!<br />
                    가족들과 기억에 오래도록 남을 멋진 하루였어요.<br /><br />
                    인천 앞바다에서 월척을 낚았습니다!<br />
                    가족들과 기억에 오래도록 남을 멋진 하루였어요.<br /><br />
                    인천 앞바다에서 월척을 낚았습니다!
                </p>
            </section>

            <section className="comments-section">
                <h2>댓글 8</h2>
                <div className="comment">
                    <p><strong>다람이네가족</strong> 우와 60cm이라니..!! 저도 가족들과 가봐야겠어요~</p>
                    <span className="comment-date">24.01.18 21:50</span>
                </div>
                {/* 추가 댓글을 여기서 렌더링 */}
            </section>

            <button id="commentButton" className="comment-btn">댓글 등록하기</button>

            <div className="pagination">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
            </div>
        </div>
    );
}

export default DetailPage;
