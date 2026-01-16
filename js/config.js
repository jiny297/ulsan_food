// 카카오맵 API 키 (발급받은 JavaScript 키로 교체하세요)
const KAKAO_MAP_API_KEY = 'YOUR_KAKAO_MAP_API_KEY';

// 카카오맵 SDK 동적 로드 함수
function loadKakaoMapScript() {
    return new Promise((resolve, reject) => {
        // 이미 로드되어 있으면 바로 resolve
        if (window.kakao && window.kakao.maps) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.onload = () => {
            window.kakao.maps.load(() => {
                resolve();
            });
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 카카오맵 위치 선택 모달 열기
async function openMapModal() {
    try {
        // 카카오맵 SDK 로드
        await loadKakaoMapScript();

        // 모달 열기
        openModal('mapSelectModal');

        // 지도 초기화 (약간의 지연 후 실행 - 모달이 완전히 열린 후)
        setTimeout(() => {
            initializeKakaoMap();
        }, 100);

    } catch (error) {
        console.error('카카오맵 로드 실패:', error);
        alert('지도를 불러오는 중 오류가 발생했습니다.\n인터넷 연결을 확인해주세요.');
    }
}

// 카카오맵 초기화
function initializeKakaoMap() {
    const mapContainer = document.getElementById('kakaoMap');
    
    // 울산시청 좌표 (기본 중심점)
    const ulsanCenter = new kakao.maps.LatLng(35.5384, 129.3114);
    
    const mapOption = {
        center: ulsanCenter,
        level: 5 // 확대 레벨
    };

    // 지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);
    
    // 마커 생성
    const marker = new kakao.maps.Marker({
        position: ulsanCenter,
        map: map
    });

    // 주소-좌표 변환 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();

    // 지도 클릭 이벤트
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        const latlng = mouseEvent.latLng;
        
        // 마커 위치 변경
        marker.setPosition(latlng);
        
        // 좌표로 주소 검색
        geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name;
                
                // 선택된 주소 표시
                const selectedAddressEl = document.getElementById('selectedMapAddress');
                if (selectedAddressEl) {
                    selectedAddressEl.textContent = address;
                }
                
                // 숨겨진 input에 저장
                const hiddenAddressInput = document.getElementById('hiddenMapAddress');
                if (hiddenAddressInput) {
                    hiddenAddressInput.value = address;
                }
            }
        });
    });

    // 현재 위치로 이동 버튼 이벤트
    const currentLocationBtn = document.getElementById('currentLocationBtn');
    if (currentLocationBtn) {
        currentLocationBtn.onclick = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const locPosition = new kakao.maps.LatLng(lat, lon);
                    
                    map.setCenter(locPosition);
                    marker.setPosition(locPosition);
                    
                    // 현재 위치 주소 검색
                    geocoder.coord2Address(lon, lat, function(result, status) {
                        if (status === kakao.maps.services.Status.OK) {
                            const address = result[0].address.address_name;
                            document.getElementById('selectedMapAddress').textContent = address;
                            document.getElementById('hiddenMapAddress').value = address;
                        }
                    });
                }, function() {
                    alert('현재 위치를 가져올 수 없습니다.');
                });
            } else {
                alert('이 브라우저는 위치 정보를 지원하지 않습니다.');
            }
        };
    }

    // 주소 검색 기능
    const searchBtn = document.getElementById('mapSearchBtn');
    const searchInput = document.getElementById('mapSearchInput');
    
    if (searchBtn && searchInput) {
        searchBtn.onclick = function() {
            const keyword = searchInput.value.trim();
            if (!keyword) {
                alert('검색할 주소를 입력하세요.');
                return;
            }
            
            geocoder.addressSearch(keyword, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    
                    map.setCenter(coords);
                    marker.setPosition(coords);
                    
                    const address = result[0].address_name;
                    document.getElementById('selectedMapAddress').textContent = address;
                    document.getElementById('hiddenMapAddress').value = address;
                } else {
                    alert('주소를 찾을 수 없습니다.');
                }
            });
        };
        
        // 엔터키로 검색
        searchInput.onkeypress = function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        };
    }
}

// 지도에서 선택한 주소 확정
function confirmMapAddress() {
    const selectedAddress = document.getElementById('hiddenMapAddress').value;
    
    if (!selectedAddress) {
        alert('지도에서 위치를 선택해주세요.');
        return;
    }
    
    // 원래 입력란에 주소 입력
    const storeLocationInput = document.getElementById('storeLocation');
    if (storeLocationInput) {
        storeLocationInput.value = selectedAddress;
    }
    
    // 모달 닫기
    closeModal('mapSelectModal');
}

// 지도 모달 닫기
function closeMapModal() {
    closeModal('mapSelectModal');
}

// Firebase 프로젝트 설정
const firebaseConfig = {
    databaseURL: "https://ulsan-restaurant-default-rtdb.firebaseio.com/"  // 예: https://your-project.firebaseio.com
    // 필요시 다른 설정 추가 가능:
    // apiKey: "YOUR_API_KEY",
    // authDomain: "your-project.firebaseapp.com",
    // projectId: "your-project-id",
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Realtime Database 참조
const database = firebase.database();