// 맛집 데이터
const restaurants = [
    {
        id: 1,
        name: "할매손칼국수",
        category: "한식",
        type: "restaurant",
        location: "울산광역시 남구",
        icon: "🍜",
        description: "3대째 이어온 전통 방식 손칼국수. 매일 아침 직접 반죽한 면발이 일품입니다.",
        rating: 4.8,
        reviews: 324,
        discount: "10%",
        verified: true,
        address: "울산광역시 남구 삼산로 123",
        phone: "052-123-4567",
        hours: "09:00 - 21:00 (연중무휴)",
        menu: [
            { name: "손칼국수", price: "8,000원" },
            { name: "수육", price: "25,000원" },
            { name: "만두", price: "6,000원" }
        ]
    },
    {
        id: 2,
        name: "바다횟집",
        category: "일식",
        type: "restaurant",
        location: "울산광역시 동구",
        icon: "🐟",
        description: "매일 새벽 직접 경매하는 싱싱한 활어. 20년 경력의 베테랑 사장님이 손질합니다.",
        rating: 4.9,
        reviews: 567,
        discount: "10%",
        verified: true,
        address: "울산광역시 동구 방어진항로 456",
        phone: "052-234-5678",
        hours: "11:00 - 22:00 (월요일 휴무)",
        menu: [
            { name: "모듬회(소)", price: "40,000원" },
            { name: "모듬회(중)", price: "60,000원" },
            { name: "모듬회(대)", price: "80,000원" },
            { name: "매운탕", price: "10,000원" }
        ]
    },
    {
        id: 3,
        name: "골목피자",
        category: "양식",
        type: "restaurant",
        location: "울산광역시 중구",
        icon: "🍕",
        description: "이탈리아 유학파 셰프의 정통 나폴리 피자. 수제 도우와 프리미엄 재료만 사용.",
        rating: 4.7,
        reviews: 412,
        discount: "10%",
        verified: true,
        address: "울산광역시 중구 번영로 789",
        phone: "052-345-6789",
        hours: "11:30 - 22:00 (연중무휴)",
        menu: [
            { name: "마르게리따", price: "18,000원" },
            { name: "페퍼로니", price: "20,000원" },
            { name: "해산물 피자", price: "24,000원" },
            { name: "파스타", price: "15,000원" }
        ]
    },
    {
        id: 4,
        name: "숨은카페",
        category: "카페/디저트",
        type: "cafe",
        location: "울산광역시 북구",
        icon: "☕",
        description: "로스터리 직영 카페. 매주 다른 싱글 오리진 원두를 만나볼 수 있습니다.",
        rating: 4.6,
        reviews: 289,
        discount: "10%",
        verified: true,
        address: "울산광역시 북구 산업로 234",
        phone: "052-456-7890",
        hours: "10:00 - 22:00 (연중무휴)",
        menu: [
            { name: "아메리카노", price: "4,500원" },
            { name: "카페라떼", price: "5,000원" },
            { name: "수제 케이크", price: "6,500원" },
            { name: "브런치 세트", price: "12,000원" }
        ]
    },
    {
        id: 5,
        name: "옛날통닭",
        category: "치킨/피자",
        type: "restaurant",
        location: "울산광역시 남구",
        icon: "🍗",
        description: "30년 전통의 옛날 통닭. 바삭한 튀김옷과 부드러운 속살의 조화가 일품.",
        rating: 4.8,
        reviews: 651,
        discount: "10%",
        verified: true,
        address: "울산광역시 남구 문수로 567",
        phone: "052-567-8901",
        hours: "15:00 - 01:00 (연중무휴)",
        menu: [
            { name: "옛날통닭", price: "18,000원" },
            { name: "후라이드", price: "17,000원" },
            { name: "양념치킨", price: "19,000원" },
            { name: "반반", price: "19,000원" }
        ]
    },
    {
        id: 6,
        name: "수제아이스크림",
        category: "카페/디저트",
        type: "cafe",
        location: "울산광역시 울주군",
        icon: "🍦",
        description: "매일 직접 만드는 20가지 수제 아이스크림. 인공첨가물 제로.",
        rating: 4.9,
        reviews: 478,
        discount: "10%",
        verified: true,
        address: "울산광역시 울주군 언양읍 중앙로 890",
        phone: "052-678-9012",
        hours: "12:00 - 22:00 (연중무휴)",
        menu: [
            { name: "싱글(1스쿱)", price: "3,500원" },
            { name: "더블(2스쿱)", price: "6,000원" },
            { name: "트리플(3스쿱)", price: "8,500원" },
            { name: "와플 세트", price: "9,000원" }
        ]
    },
    {
        id: 7,
        name: "한우마을",
        category: "한식",
        type: "restaurant",
        location: "울산광역시 북구",
        icon: "🥩",
        description: "1++등급 한우만 취급하는 정육식당. 직접 구워주는 서비스와 함께 최상급 한우를 합리적인 가격에.",
        rating: 4.7,
        reviews: 389,
        discount: "10%",
        verified: true,
        address: "울산광역시 북구 호계로 345",
        phone: "052-789-0123",
        hours: "11:00 - 23:00 (연중무휴)",
        menu: [
            { name: "한우 등심(100g)", price: "35,000원" },
            { name: "한우 안심(100g)", price: "40,000원" },
            { name: "한우 갈비살(100g)", price: "30,000원" },
            { name: "된장찌개", price: "5,000원" }
        ]
    },
    {
        id: 8,
        name: "떡볶이골목",
        category: "한식",
        type: "restaurant",
        location: "울산광역시 중구",
        icon: "🍢",
        description: "25년 전통의 떡볶이 맛집. 매콤달콤한 비법 소스와 쫄깃한 떡이 조화를 이루며, 튀김도 바삭합니다.",
        rating: 4.6,
        reviews: 512,
        discount: "10%",
        verified: true,
        address: "울산광역시 중구 태화로 678",
        phone: "052-890-1234",
        hours: "10:00 - 21:00 (일요일 휴무)",
        menu: [
            { name: "떡볶이", price: "4,000원" },
            { name: "튀김(5개)", price: "3,000원" },
            { name: "김밥", price: "3,500원" },
            { name: "라면", price: "3,000원" }
        ]
    }
];

// 카테고리 데이터
const categories = {
    all: "전체",
    korean: "한식",
    chinese: "중식",
    japanese: "일식",
    western: "양식",
    chicken: "치킨/피자",
    cafe: "카페/디저트",
    etc: "기타"
};

// 통계 계산 함수
function getStats() {
    return {
        totalRestaurants: restaurants.length,
        cafeCount: restaurants.filter(r => r.type === 'cafe').length,
        restaurantCount: restaurants.filter(r => r.type === 'restaurant').length,
        totalReviews: restaurants.reduce((sum, r) => sum + r.reviews, 0),
        averageRating: (restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length).toFixed(1)
    };

}

// ===== 유틸: 날짜·시간 문자열 =====
function getDateTimeText() {
    const now = new Date();

    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');

    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}
