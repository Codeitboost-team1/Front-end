// 아이디 중복 확인 처리(이부분은 백엔드)
document.querySelector('.check-btn').addEventListener('click', function() {
    const usernameInput = document.getElementById('아이디').value;
    const messageElement = document.createElement('p');
    const inputGroup = document.querySelector('.input-group'); // 아이디 input의 부모 요소
    
    // 이전 메시지 제거
    const previousMessage = inputGroup.querySelector('p');
    if (previousMessage) {
        previousMessage.remove();
    }

    // 아이디 중복 여부 확인
    if (usernameInput === "codeit123") { // 이미 사용 중인 아이디로 가정
        messageElement.textContent = "이미 사용중인 아이디입니다.";
        messageElement.classList.add('error');  // error 클래스 추가
    } else {
        messageElement.textContent = "사용가능한 아이디입니다.";
        messageElement.classList.add('success');  // success 클래스 추가
    }

    inputGroup.appendChild(messageElement);  // input-group의 마지막에 메시지를 추가
});

// 비밀번호 일치 여부 확인 처리
document.getElementById('비밀번호확인').addEventListener('input', function() {
    const password = document.getElementById('비밀번호').value;
    const confirmPassword = document.getElementById('비밀번호확인').value;
    const messageElement = document.createElement('p');
    const inputGroup = this.parentElement; // 비밀번호 확인 input의 부모 요소
    
    // 이전 메시지 제거
    const previousMessage = inputGroup.querySelector('p');
    if (previousMessage) {
        previousMessage.remove();
    }

    // 비밀번호가 일치하지 않을 경우 메시지 표시
    if (password !== confirmPassword) {
        messageElement.textContent = "비밀번호가 일치하지 않습니다.";
        messageElement.classList.add('error');  // error 클래스 추가
    }
    else{
        messageElement.remove();
    }

    inputGroup.appendChild(messageElement);  // input-group의 마지막에 메시지를 추가
});
