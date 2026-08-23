# 통합재고 동기화 최종 흐름 이미지 프롬프트

Scene: 밝은 기술 문서용 C6 flow_process 인포그래픽. 하나의 가로 흐름 안에 브라우저, Spring Boot API, Oracle 실행권, Spring Batch core, 두 개의 독립 snapshot task, 최종 화면을 배치합니다. 왼쪽 첫 번째 카드에는 사용자가 재고 동기화 버튼을 누르는 브라우저와 TanStack Query 캐시가 있고, 다음 카드에는 API 요청·clientRequestId·409 응답을 처리하는 Backend가 있습니다. 중앙의 Oracle 카드에는 pessimistic lock, active scope unique guard, idempotency, fencing token을 작은 방패와 데이터베이스 아이콘으로 묶습니다. 그 다음 카드에는 Spring Batch가 네 원천을 page 단위로 읽고 Canonical Inventory와 Risk Assessment를 한 transaction으로 publish하는 장면을 표현합니다. 오른쪽에는 Dashboard Snapshot과 Statistics Snapshot이 서로 다른 두 갈래로 나뉘어 각각 retry·ready 상태를 거쳐 다시 화면의 목록·대시보드·통계로 돌아오는 화살표를 그립니다. 흐름의 마지막에만 버튼이 다시 활성화되는 작은 원형 상태 표시를 배치합니다. 모든 연결은 왼쪽에서 오른쪽으로 읽히는 굵은 화살표와 짧은 단계 번호로 정렬합니다.

Camera: 정면에서 바라본 넓은 16:9 설명 도식, 세로로 겹치지 않는 여섯 개의 큰 라운드 카드, 중앙 Oracle guard와 두 개의 snapshot branch가 시각적 중심이 되는 균형 잡힌 그리드.

Lighting: 오프화이트 캔버스의 부드러운 확산광, 카드 표면의 얕은 그림자, 핵심 경계와 화살표에만 은은한 하이라이트.

Color grading: 배경 #F8FAFC, 브라우저와 캐시는 스카이블루 #38BDF8, API와 Oracle은 딥네이비 #1E3A5F와 퍼플 #A855F7, Batch와 canonical 영역은 민트 #34D399, snapshot branch는 오렌지 #FB923C와 라벤더 #D9D2F0, 텍스트는 #111827. 전체 팔레트는 다섯 색 안에서 반복합니다.

Texture/Medium: Bright 3D clean isometric 기술 일러스트와 정돈된 벡터 플로우차트의 혼합, 투명한 유리·플라스틱 모듈, 작은 database·lock·batch·dashboard 아이콘, 매거진형 여백과 얇은 hairline connector.

Text-in-image: 큰 제목은 "Integrated Inventory Sync". 카드 라벨은 "Browser / TanStack Query", "Spring Boot API", "Oracle Guard", "Spring Batch Core", "Dashboard Snapshot", "Statistics Snapshot", "Ready". All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark.

AR 16:9
