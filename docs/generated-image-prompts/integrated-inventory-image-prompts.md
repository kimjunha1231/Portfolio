# 통합재고 글 이미지 생성 프롬프트

이 문서의 프롬프트는 `$image-prompt`의 Format A와 C6 인포그래픽 기준으로 작성했습니다. 이미지 안에는 단계 번호·행 수·클래스명처럼 깨지기 쉬운 숫자와 긴 식별자를 넣지 않고, 짧은 한글 라벨만 사용합니다. 정확한 컬럼명과 수치는 본문과 캡션에서 설명합니다.

## 01 · 통합 목표 — `integrated-inventory-source-to-canonical-ai.png`

Scene: 밝은 배경의 C6 기술 인포그래픽, 좌측에 서로 다른 네 재고 원천을 나타내는 네 개의 둥근 카드, 중앙에 하나의 주황색 공통 번역기 카드, 우측에 파란색 검증·매핑 카드와 보라색 canonical 업무 데이터 카드가 왼쪽에서 오른쪽으로 연결되는 flow_process 구성. 네 원천 카드는 오프라인, 이커머스, 그리팅, 물류센터라는 짧은 한글 라벨을 사용합니다. 중앙 카드는 공통 형식, 검증 카드는 검증·매핑, 마지막 카드는 통합재고라는 의미를 표현합니다. 숫자와 긴 코드 식별자는 이미지 밖의 설명으로 남기고, 카드 사이의 화살표는 한 방향 흐름을 명확하게 보여줍니다. 상단에는 통합 목표를 설명하는 짧은 제목을 한 번만 배치합니다. 
Camera: 정면 아이레벨의 평면 다이어그램, 좌우 여백이 넓은 16:9 캔버스, 카드 간 간격과 화살표가 겹치지 않는 균형 잡힌 그리드, 중앙 수평축 정렬, 짧은 텍스트를 크게 읽을 수 있는 크기.
Lighting: 흰색 스튜디오 균등광, 카드 모서리에 아주 약한 컨택트 섀도, 선명한 테두리와 또렷한 화살표.
Color grading: 흰색과 #FBFCFF 배경, 제목과 본문은 #1B2B45, 원천 카드는 #E9F7F1과 #3FA77E, 번역기는 #FFF4E3와 #E7891F, 검증 카드는 #EAF2FF와 #3575C5, canonical 카드는 #F2EDFF와 #7D63C4, 채도 낮은 파스텔 기술 문서 톤.
Texture/Medium: 매트한 종이 질감의 벡터 카드, 얇은 라운드 테두리, 단순한 선 아이콘, 고른 선 굵기, 웹 문서에 어울리는 깨끗한 인포그래픽.
Text-in-image: 상단 타이틀은 "서로 다른 원천을 같은 기준으로", 원천 라벨은 "오프라인", "이커머스", "그리팅", "물류센터", 중앙 라벨은 "공통 형식", 검증 라벨은 "검증·매핑", 최종 라벨은 "통합재고". 모든 텍스트는 한 번씩만, 지정한 위치에 또렷하게 표시합니다. All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark.
AR 16:9

## 02 · 데이터 계층 — `inventory-source-layers-ai.png`

Scene: 밝은 C6 layered_stack 인포그래픽, 위에서 아래로 내려가는 다섯 개의 넓은 계층 카드가 서로 분리되어 있고 얇은 화살표로 연결됩니다. 카드에는 승인 기준선, 원천 current, 연결 지도, 공통 record, canonical 업무 데이터라는 짧은 라벨을 배치합니다. 왼쪽에는 각 계층의 책임을 설명하는 작은 색 점, 오른쪽에는 실행 메타데이터를 별도 세로 카드로 배치합니다. 계층 사이에는 데이터의 수명과 책임이 섞이지 않는다는 흐름을 보여주는 여백을 둡니다. 숫자와 긴 테이블명은 이미지 밖의 본문에서 설명합니다.
Camera: 정면 아이레벨, 16:9 가로 캔버스의 중앙 수직 스택, 카드 폭을 충분히 확보하고 각 라벨을 크게 배치, 오른쪽 메타데이터 카드가 본 흐름과 겹치지 않는 구도.
Lighting: 부드러운 균등광, 카드 아래에 얕은 컨택트 섀도, 흰 배경과 선명한 경계.
Color grading: #FBFCFF와 흰색 배경, 계층 카드는 위에서 아래로 #EAF2FF, #E9F7F1, #FFF4E3, #F2EDFF, #EEF2F7의 파스텔 변화, 텍스트는 #1B2B45, 연결선은 #7894B7.
Texture/Medium: 매트한 벡터 카드, 얇은 라운드 테두리, 종이 인포그래픽 느낌, 단순한 데이터베이스·파일·링크 아이콘.
Text-in-image: 계층 라벨은 "승인 기준선", "원천 current", "연결 지도", "공통 record", "canonical 업무 데이터", 오른쪽 보조 카드 라벨은 "실행 메타데이터". 모든 텍스트는 한 번씩, 각 카드 안에서 수평 중앙 정렬로 또렷하게 표시합니다. All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark.
AR 16:9

## 03 · 필드 표준화 — `inventory-source-projection-ai.png`

Scene: 밝은 C6 comparison 인포그래픽, 왼쪽에는 서로 다른 원천 컬럼을 보여주는 네 개의 초록 카드, 중앙에는 주황색 SQL projection 번역표, 오른쪽에는 파란색 typed validation 카드와 보라색 공통 의미 카드가 배치됩니다. 왼쪽 카드는 오프라인의 가용 수량, 이커머스의 판매 가능 수량, 그리팅의 식수 수량, 물류센터의 실물 수량이라는 짧은 의미 라벨을 사용합니다. 중앙 번역표는 같은 의미로 번역하는 역할, 오른쪽 검증 카드는 값 검증, 마지막 카드는 공통 재고 의미를 표현합니다. 긴 영문 컬럼명, 숫자, SQL 구문은 이미지에 넣지 않고 본문에서 설명합니다. 
Camera: 정면 아이레벨, 좌우 비교가 즉시 읽히는 16:9 구도, 네 원천 카드가 한 열로 정렬되고 중앙 번역표와 오른쪽 검증 카드 사이에 넉넉한 거터를 둡니다.
Lighting: 흰색 균등광, 번역표와 검증 카드에만 은은한 컨택트 섀도, 얇고 선명한 화살표.
Color grading: 배경 #FBFCFF, 원천 카드 #E9F7F1, 번역표 #FFF4E3, 검증 카드 #EAF2FF, 결과 카드 #F2EDFF, 텍스트 #1B2B45, 강조색 #3FA77E·#E7891F·#3575C5·#7D63C4.
Texture/Medium: 매트한 기술 문서 벡터, 둥근 카드, 작은 데이터베이스와 변환 아이콘, 평면 색상과 균일한 선 굵기.
Text-in-image: 원천 라벨은 "오프라인 · 가용 수량", "이커머스 · 판매 가능 수량", "그리팅 · 식수 수량", "물류센터 · 실물 수량", 중앙 라벨은 "같은 의미로 번역", 검증 라벨은 "값 검증", 결과 라벨은 "공통 재고 의미". 모든 텍스트는 한 번씩만, 카드 안에서 크게 읽히도록 표시합니다. All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark.
AR 16:9

## 04 · 승인 매핑 — `inventory-row-map-bridge-ai.png`

Scene: 밝은 C6 diagram_horizontal 인포그래픽, 왼쪽의 초록색 원천 행 카드에서 중앙의 파란색 다리 모양 승인된 연결 지도 카드로 화살표가 이어지고, 오른쪽의 보라색 기존 업무 행 카드로 연결됩니다. 중앙 카드에는 여러 개의 작은 선 연결이 상품·SKU·LOT·재고를 의미하는 아이콘으로 정리되어 있습니다. 아래쪽에는 주황색 경고 경로가 별도로 분기되어 매핑 실패에서 중단되는 짧은 상태를 보여줍니다. 자동 추측이나 퍼지 검색을 상징하는 요소 대신, 승인된 연결만 통과하는 좁은 다리를 강조합니다.
Camera: 정면 아이레벨, 넓은 16:9 수평 캔버스, 정상 경로는 위쪽 수평축, 실패 경로는 아래쪽 보조축으로 분리해 화살표가 겹치지 않는 구성.
Lighting: 균등한 소프트박스 조명, 다리 카드 아래에 가벼운 그림자, 화살표와 분기선은 높은 대비로 표현.
Color grading: 흰색과 #FBFCFF 배경, 원천 #E9F7F1, 승인 지도 #EAF2FF, 기존 행 #F2EDFF, 실패 경로 #FFF4E3와 #E7891F, 본문 #1B2B45.
Texture/Medium: 매트한 종이 벡터 인포그래픽, 다리와 지도 핀을 단순화한 아이콘, 얇은 라운드 테두리와 고른 선 굵기.
Text-in-image: 왼쪽 라벨은 "원천 행", 중앙 라벨은 "승인된 연결 지도", 오른쪽 라벨은 "기존 업무 행", 아래 경고 라벨은 "매핑 실패 → 중단". 모든 텍스트는 한 번씩, 경로와 겹치지 않는 카드 안에 또렷하게 표시합니다. All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark.
AR 16:9

## 05 · 초기 fixture — `inventory-source-lifecycle-ai.png`

Scene: 밝은 C6 flow_process 인포그래픽, 왼쪽의 보라색 승인 snapshot 카드에서 주황색 fixture 생성기 카드로 흐르고, 네 개의 초록색 원천 current 카드와 파란색 연결 지도 카드로 분기된 다음, 오른쪽의 회색 manifest 카드와 보라색 첫 sync = 0 카드로 모이는 순차 흐름. 생성기 주변에는 키 조인과 checksum을 상징하는 작은 아이콘을 두되 긴 코드나 행 수는 넣지 않습니다. 상단에는 초기 fixture 방향을 설명하는 짧은 제목을 한 번만 표시합니다.
Camera: 정면 아이레벨, 16:9 가로 흐름, 왼쪽에서 오른쪽으로 읽히는 충분한 간격, 네 개의 원천 카드가 생성기 아래에서 깔끔하게 세로 정렬됩니다.
Lighting: 흰색 균등광, 생성기와 결과 카드에 얕은 컨택트 섀도, 화살표는 선명한 단색.
Color grading: 배경 #FBFCFF, snapshot과 결과 카드 #F2EDFF, 생성기 #FFF4E3, 원천 current #E9F7F1, 연결 지도 #EAF2FF, manifest #EEF2F7, 텍스트 #1B2B45.
Texture/Medium: 매트한 기술 문서 벡터, 파일·기어·체크 아이콘, 둥근 카드와 얇은 테두리, 차분한 학습 기록 톤.
Text-in-image: 상단 타이틀은 "처음에는 기준선에서 원천을 만듭니다", 카드 라벨은 "승인 snapshot", "fixture 생성기", "원천 current", "연결 지도", "manifest", "첫 sync = 0". 모든 텍스트는 한 번씩만, 넓은 카드 안에서 크게 표시합니다. All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark.
AR 16:9

## 06 · 변경 검증 — `inventory-hash-noop-ai.png`

Scene: 밝은 C6 comparison 인포그래픽, 화면을 두 개의 큰 패널로 나눕니다. 왼쪽 패널은 초록색 같은 값 카드에서 회색 건너뜀 카드로 이어지는 no-op 경로, 오른쪽 패널은 주황색 바뀐 값 카드에서 파란색 변경 후보 카드와 보라색 반영 카드로 이어지는 변경 경로입니다. 두 패널 아래에는 작은 공통 기준선 바를 배치해 동일한 기준선에서 비교한다는 의미를 보여줍니다. 숫자와 해시 문자열은 이미지 밖에서 설명하고, 이미지에는 짧은 한글 라벨만 표시합니다.
Camera: 정면 아이레벨, 16:9 캔버스의 좌우 대칭 비교 구도, 두 패널 사이에 넓은 여백, 화살표가 한눈에 분리되는 레이아웃.
Lighting: 균등한 소프트박스 조명, 카드 하단에 약한 그림자, 같은 값 경로는 부드러운 초록색, 변경 경로는 주황·파랑 대비로 강조.
Color grading: 배경 #FBFCFF, 동일 경로 #E9F7F1과 #61728C, 변경 경로 #FFF4E3·#EAF2FF·#F2EDFF, 텍스트 #1B2B45, 얇은 경계 #DCE5F2.
Texture/Medium: 매트한 벡터 비교표, 원형 체크 아이콘과 작은 변경 화살표, 웹 문서용 종이 인포그래픽 질감.
Text-in-image: 왼쪽 라벨은 "같은 값", "건너뜀", 오른쪽 라벨은 "바뀐 값", "변경 후보", "반영", 하단 기준선 라벨은 "같은 기준선에서 비교". 모든 텍스트는 한 번씩, 패널 안에서 또렷하고 크게 표시합니다. All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark.
AR 16:9
