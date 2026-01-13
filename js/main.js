// 메인 JavaScript 파일

// 전역 변수
let currentFilter = 'all';
let currentRestaurants = [];

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// 페이지 초기화
function initializePage() {
    currentRestaurants = [...restaurants];
    displayRestaurants(currentRestaurants);
    updateStats();
    setupEventListeners();
    setupSearch();
}

// 통계 업데이트
function updateStats() {
    const stats = getStats();
    
    const cafeCountEl = document.getElementById('cafeCount');
    const restaurantCountEl = document.getElementById('restaurantCount');
    const reviewCountEl = document.getElementById('reviewCount');
    
    if (cafeCountEl) cafeCountEl.textContent = stats.cafeCount;
    if (restaurantCountEl) restaurantCountEl.textContent = stats.restaurantCount;
    if (reviewCountEl) reviewCountEl.textContent = stats.totalReviews;
}

// 맛집 카드 표시
function displayRestaurants(restaurantList) {
    const grid = document.getElementById('restaurantGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (restaurantList.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem; color: #666;">검색 결과가 없습니다.</p>';
        return;
    }
    
    restaurantList.forEach(restaurant => {
        const card = createRestaurantCard(restaurant);
        grid.appendChild(card);
    });
}

// 맛집 카드 생성
function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    
    card.innerHTML = `
        <div class="restaurant-image">
            ${restaurant.icon}
        </div>
        <div class="restaurant-info">
            <div class="restaurant-name">${restaurant.name}</div>
            <div class="restaurant-badges">
                <span class="restaurant-category">${restaurant.category}</span>
                ${restaurant.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> 검증완료</span>' : ''}
            </div>
            <p class="restaurant-desc">${restaurant.description}</p>
            <div class="restaurant-meta">
                <span class="rating">★ ${restaurant.rating} (${restaurant.reviews})</span>
                <span class="discount">앱 전용 ${restaurant.discount} 할인</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => showRestaurantDetail(restaurant));
    
    return card;
}

// 맛집 상세 정보 표시
function showRestaurantDetail(restaurant) {
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('detailContent');
    
    if (!modal || !content) return;
    
    content.innerHTML = `
        <div class="detail-header">
            <div class="detail-image">${restaurant.icon}</div>
            <h2 class="detail-title">${restaurant.name}</h2>
            <div class="detail-badges">
                <span class="restaurant-category">${restaurant.category}</span>
                ${restaurant.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> 검증완료</span>' : ''}
            </div>
        </div>
        
        <div class="detail-info">
            <div class="detail-info-item">
                <strong><i class="fas fa-star"></i> 평점:</strong>
                <span>${restaurant.rating} / 5.0 (${restaurant.reviews}개 리뷰)</span>
            </div>
            <div class="detail-info-item">
                <strong><i class="fas fa-map-marker-alt"></i> 주소:</strong>
                <span>${restaurant.address}</span>
            </div>
            <div class="detail-info-item">
                <strong><i class="fas fa-phone"></i> 전화:</strong>
                <span>${restaurant.phone}</span>
            </div>
            <div class="detail-info-item">
                <strong><i class="fas fa-clock"></i> 영업시간:</strong>
                <span>${restaurant.hours}</span>
            </div>
            <div class="detail-info-item">
                <strong><i class="fas fa-percentage"></i> 할인:</strong>
                <span class="discount">앱 전용 ${restaurant.discount} 할인</span>
            </div>
        </div>
        
        <h3 style="margin-bottom: 15px;">📋 메뉴</h3>
        <div class="detail-info">
            ${restaurant.menu.map(item => `
                <div class="detail-info-item">
                    <strong>${item.name}</strong>
                    <span>${item.price}</span>
                </div>
            `).join('')}
        </div>
        
        <p style="margin: 20px 0; color: #666; line-height: 1.6;">${restaurant.description}</p>
        
        <div class="detail-actions">
            <button class="btn btn-primary" onclick="orderTasting(${restaurant.id})">
                <i class="fas fa-utensils"></i> 맛보기 신청
            </button>
            <button class="btn btn-secondary" onclick="openNavigation('${restaurant.address}')">
                <i class="fas fa-map-marked-alt"></i> 길찾기
            </button>
        </div>
    `;
    
    openModal('detailModal');
}

// 검색 기능
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayRestaurants(restaurants);
        currentRestaurants = [...restaurants];
        return;
    }
    
    const filtered = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(searchTerm) ||
               restaurant.category.toLowerCase().includes(searchTerm) ||
               restaurant.location.toLowerCase().includes(searchTerm) ||
               restaurant.description.toLowerCase().includes(searchTerm);
    });
    
    currentRestaurants = filtered;
    displayRestaurants(filtered);
    scrollToSection('restaurants');
}

// 카테고리 필터
function filterByCategory(type) {
    let filtered;
    
    if (type === 'cafe') {
        filtered = restaurants.filter(r => r.type === 'cafe');
    } else if (type === 'restaurant') {
        filtered = restaurants.filter(r => r.type === 'restaurant');
    } else {
        filtered = [...restaurants];
    }
    
    currentRestaurants = filtered;
    displayRestaurants(filtered);
    scrollToSection('restaurants');
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 추천 폼 제출
    const recommendForm = document.getElementById('recommendForm');
    if (recommendForm) {
        recommendForm.addEventListener('submit', handleRecommendSubmit);
    }
}

// 맛집 추천 제출
function handleRecommendSubmit(e) {
    e.preventDefault();
    
    // 로그인 확인
    if (!requireLogin()) return;
    
    const storeName = document.getElementById('storeName').value;
    const storeCategory = document.getElementById('storeCategory').value;
    const storeLocation = document.getElementById('storeLocation').value;
    const storeReason = document.getElementById('storeReason').value;
    
    // 데이터 저장 (실제로는 서버로 전송)
    console.log('맛집 추천:', {
        name: storeName,
        category: storeCategory,
        location: storeLocation,
        reason: storeReason
    });
    
    // 포인트 적립
    addPoints(500);
    
    alert('맛집 추천이 접수되었습니다!\n평가원 검증 후 승인되면 500P가 적립됩니다.\n평균 검증 기간은 3~5일입니다.');
    
    closeModal('recommendModal');
    document.getElementById('recommendForm').reset();
}

// 맛보기 신청
function orderTasting(restaurantId) {
    if (!requireLogin()) return;
    
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    if (confirm(`${restaurant.name}의 맛보기를 신청하시겠습니까?\n필요 포인트: 100P`)) {
        if (usePoints(100)) {
            alert('맛보기 신청이 완료되었습니다!\n가게에서 확인 후 연락드리겠습니다.');
            closeModal('detailModal');
        }
    }
}

// 길찾기
function openNavigation(address) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        // 모바일: 카카오맵 또는 네이버 지도 앱 실행
        const kakaoUrl = `kakaomap://search?q=${encodeURIComponent(address)}`;
        const naverUrl = `nmap://search?query=${encodeURIComponent(address)}`;
        
        if (confirm('길찾기 앱을 선택하세요\n확인: 카카오맵 | 취소: 네이버지도')) {
            window.location.href = kakaoUrl;
        } else {
            window.location.href = naverUrl;
        }
    } else {
        // PC: 구글 맵 열기
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    }
}

// 회원가입 페이지 이동
function goToSignup() {
    alert('회원가입 페이지로 이동합니다!');
    // window.location.href = 'signup.html';
}

// 모달 관련 함수
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}

// 섹션으로 스크롤
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 햄버거 메뉴 토글
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// 부드러운 네비게이션
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !href.includes('onclick')) {
            e.preventDefault();
            const targetId = href.substring(1);
            scrollToSection(targetId);
        }
    });
});