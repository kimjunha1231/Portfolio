# 통합재고 작업 기록용 이미지 프롬프트

이 문서의 프롬프트는 `image-prompt` 지침에 맞춰 기술적 관계를 이미지에 전부 맡기지 않고, 구조·라벨·수치·판정 기준은 MDX/코드 도식에 남기는 전제로 작성했습니다. 생성 이미지는 표지나 개념 보조용으로 사용하고, 구현 사실을 전달하는 핵심 도식은 텍스트·표·소스 코드로 관리합니다.

## 공통 스타일 토큰

- 밝은 아이보리 배경 `#F7F4EC`
- 잉크 색상 `#172A46`
- 파랑 `#2F6FCB`, 초록 `#3A916E`, 주황 `#D9861C`, 보라 `#7054B9`
- 얇은 라인, 넉넉한 여백, 평면 아이콘과 약한 깊이감
- 16:9 가로형, 포트폴리오 본문에 배치할 수 있는 선명한 가장자리
- 생성 이미지에는 기술 용어·숫자·한글 라벨을 넣지 않음
- 실제 테이블명·필드명·상태·산식은 MDX 표와 코드 도식에서 제공

## 표지 — 원천에서 canonical 업무 데이터로 이어지는 개념 흐름

```text
Create a clean editorial technical illustration in a light ivory paper-like environment, 16:9 landscape. Show four distinct source data cards represented only by simple colored database symbols on the left, converging into a central neutral translation and validation bridge, then branching to a canonical business data cube and two separate outcome symbols: a sync check and a risk shield. Use navy ink lines with blue, green, orange, and purple accents, generous whitespace, precise alignment, flat vector-like geometry with subtle depth, calm documentation aesthetic, no text, no numbers, no logos, no letters, no labels, no UI screenshots. This is a decorative cover for a software architecture worklog; keep all technical wording out of the image so the surrounding HTML and Markdown remain the source of truth.
```

## 본문 보조 이미지 — 원천 current와 매핑 경계

```text
Create a bright 16:9 software architecture infographic with no text. On the left, show four separate source database containers with visibly different shapes and accent colors. In the center, show a single structured bridge with three sequential visual stages: a column alignment grid, a verified mapping link, and a typed record card. On the right, show existing canonical business records for product, SKU, LOT, inventory balance, and risk assessment as separate connected blocks. Use clean navy outlines, blue verification marks, green source accents, orange transformation accents, purple canonical accents, white space, consistent line weight, sharp readable silhouettes, no words, no digits, no letters, no logos. Keep the composition horizontal and leave empty space above and below for Markdown captions.
```

## 본문 보조 이미지 — 동기화 lifecycle

```text
Create a light editorial technical illustration, 16:9 landscape, with no text. Visualize a lifecycle from a browser button symbol to a short database guard lock, then a background batch worker, then a verified publish transaction, then two independent snapshot branches. Use solid arrows for the implemented core path and a subtle dotted visual treatment for optional future branches, but do not use labels or numbers. Use ivory background, navy structure, blue API accents, orange transaction accents, green batch accents, purple snapshot accents, clean flat icons, generous whitespace, no text, no letters, no numerals, no logos, no gradients that reduce contrast. The image is a conceptual supplement; exact statuses and API paths will be written in HTML/Markdown outside the image.
```

## 위험도 산정 보조 이미지 — 수량·예측·안전재고·LOT

```text
Create a clean 4:3 technical concept illustration with no text. Show four input symbols arranged around a central rule engine: an inventory cylinder, a downward demand forecast chart, a safety-stock shield, and a calendar with a lot tag. The central engine emits three outcome symbols with distinct visual severity: an urgent red-orange alert, a yellow caution, and a calm green check, plus a neutral gray unknown symbol for missing input. Use ivory background, navy line art, restrained accent colors, clear arrows, balanced spacing, flat vector style, no letters, no words, no digits, no logos. Do not imply a machine-learning black box; make the rule engine visibly deterministic and auditable.
```

## 사용 원칙

1. 생성 이미지는 구조를 기억시키는 보조 수단으로 사용합니다.
2. 실제 컬럼명, 상태값, 수치, 산식, 현재 적용 여부는 이미지에 넣지 않습니다.
3. 이미지와 코드가 다르면 코드·SQL·테스트·문서가 우선입니다.
4. 이미지 생성 결과에 문자가 생기거나 도형 관계가 흐려지면 사용하지 않고 MDX 도식으로 대체합니다.
