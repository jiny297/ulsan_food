// 인증 관련 기능

// 로그인 상태 확인 및 UI 업데이트
function checkLoginStatus() {
    const userInfo = document.getElementById('user-info');
    const loggedInUser = getLoggedInUser();

    if (loggedInUser && userInfo) {
        updateUserInfo(loggedInUser);
    }
}

// 로그인된 사용자 정보 가져오기
function getLoggedInUser() {
    const userStr = localStorage.getItem('loggedInUser');
    return userStr ? JSON.parse(userStr) : null;
}

// 사용자 정보 저장
function saveUser(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
}

// 사용자 정보 UI 업데이트
function updateUserInfo(user) {
    const userInfo = document.getElementById('user-info');
    if (!userInfo) return;

    userInfo.innerHTML = `
        <span>${user.name}님 😊</span>
        <i class="fas fa-user-circle"></i>
        <span class="points">
            <i class="fas fa-coins"></i> ${user.points || 0}P
        </span>
        <button class="logout-btn" onclick="logout()">로그아웃</button>
    `;
}

// 로그아웃
function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        localStorage.removeItem('loggedInUser');
        alert('로그아웃 되었습니다.');
        location.reload();
    }
}

// 포인트 적립
function addPoints(amount) {
    const user = getLoggedInUser();
    if (!user) {
        alert('로그인이 필요합니다.');
        return false;
    }

    user.points = (user.points || 0) + amount;
    saveUser(user);
    updateUserInfo(user);
    return true;
}

// 포인트 사용
function usePoints(amount) {
    const user = getLoggedInUser();
    if (!user) {
        alert('로그인이 필요합니다.');
        return false;
    }

    if (user.points < amount) {
        alert('포인트가 부족합니다.');
        return false;
    }

    user.points -= amount;
    saveUser(user);
    updateUserInfo(user);
    return true;
}

// 로그인 필요 여부 확인
function requireLogin(callback) {
    const user = getLoggedInUser();
    if (!user) {
        if (confirm('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?')) {
            window.location.href = 'login.html';
        }
        return false;
    }
    if (callback) callback(user);
    return true;
}

// 페이지 로드 시 로그인 상태 확인
document.addEventListener('DOMContentLoaded', checkLoginStatus);