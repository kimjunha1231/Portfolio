# 풀스택 개발자 포트폴리오 PPT Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 김준하의 실제 프로젝트 성과와 기술적 사고 과정을 보여주는 15장 분량의 한국어 서류 제출용 풀스택 개발자 포트폴리오 PPTX를 제작한다.

**Architecture:** 저장소 MDX와 프로젝트 이미지를 사실의 기준으로 사용하고, GPT Image 2로 생성한 표지 아트워크 1점만 보조 시각 자료로 사용한다. `@oai/artifact-tool` JavaScript 모듈이 공통 테마·레이아웃 헬퍼와 15개 슬라이드 빌더를 조합해 PPTX를 생성하고, 렌더링·오버플로 검사·개별 이미지 검토를 거쳐 최종 파일만 시각화 출력 폴더에 전달한다.

**Tech Stack:** JavaScript ES modules, `@oai/artifact-tool`, GPT Image 2, Presentations container tools, LibreOffice 기반 렌더링·검증 도구

## Global Constraints

- 국내 기업 서류 제출용 풀스택 개발자 포트폴리오다.
- 모든 사용자 노출 문구는 자연스러운 한국어로 작성한다.
- 15장 모두 발표 설명 없이 이해 가능한 제출형 문서로 만든다.
- 밝은 오프화이트 배경, 차콜·딥 네이비 본문, 블루·민트·웜 옐로 포인트를 사용한다.
- 프로젝트마다 문제, 원인, 판단, 구현, 결과를 연결한다.
- 성과 수치는 저장소 MDX와 프로젝트 자료에 존재하는 값만 사용한다.
- GPT Image 2 생성 이미지는 텍스트·로고·가짜 UI가 없는 표지 아트워크 1점에 한정한다.
- 실제 프로젝트 이미지가 생성 이미지보다 압도적으로 많은 비중을 차지해야 한다.
- 제목 35pt 이상, 본문 16pt 이상을 유지하고 한 줄 제목은 줄바꿈하지 않는다.
- 모든 외부 주장·외부 에셋·생성 이미지 출처를 발표자 노트의 `[Sources]` 블록에 기록한다.
- 최종 PPTX는 전체 렌더링, 개별 슬라이드 시각 검토, 오버플로 검사를 통과해야 한다.

---

## File Map

- Create: `tmp/fullstack-portfolio-deck/source-notes.txt` — 저장소·웹·생성 이미지의 출처 원장
- Create: `tmp/fullstack-portfolio-deck/slide-plan.txt` — 15장 카피와 에셋 매핑
- Create: `tmp/fullstack-portfolio-deck/image-prompts.txt` — GPT Image 2 최종 프롬프트 기록
- Create: `tmp/fullstack-portfolio-deck/assets/cover-isometric.png` — 표지 아트워크
- Create: `tmp/fullstack-portfolio-deck/create-deck.mjs` — 전체 PPTX 생성 모듈
- Create: `tmp/fullstack-portfolio-deck/qa-ledger.txt` — 슬라이드별 시각 QA와 수정 기록
- Create: `/Users/junha/.codex/visualizations/2026/07/26/019f9e8d-71c8-7111-b719-9e5c3ad03c75/김준하_풀스택_개발자_포트폴리오.pptx` — 최종 제출물

---

### Task 1: 자료 원장과 슬라이드 카피 확정

**Files:**
- Create: `tmp/fullstack-portfolio-deck/source-notes.txt`
- Create: `tmp/fullstack-portfolio-deck/slide-plan.txt`

**Interfaces:**
- Consumes: `content/projects/*.mdx`, `src/lib/site.ts`, `public/images/projects/**`, 승인된 디자인 명세
- Produces: 슬라이드 번호별 `title`, `takeaway`, `body`, `asset`, `source` 매핑

- [ ] **Step 1: 대표 성과를 원문과 대조한다**

  JobSecretary의 `271 → 98`, `268 → 0`, 접근성 `80점대 → 95점대`와 Smart Messaging의 `1.99초 → 265ms`, `8.46초 → 350ms`, `268KB → 0.6KB`를 MDX 원문에서 확인한다.

- [ ] **Step 2: 15장 카피를 작성한다**

  각 슬라이드는 제목 한 줄, 핵심 문장 한 줄, 본문 최대 3개 항목으로 제한한다. 프로젝트 개요에는 역할·기간·스택을, 기술 슬라이드에는 문제·판단·결과를 배치한다.

- [ ] **Step 3: 출처 원장을 작성한다**

  로컬 MDX·이미지 경로와 웹 조사 URL을 슬라이드 번호별로 기록한다. 생성 이미지는 `GPT Image 2, 2026-07-26, prompt in image-prompts.txt`로 기록한다.

- [ ] **Step 4: 카피 무결성을 검증한다**

  Run: `rg -n "추정|임의|미확정|나중에" tmp/fullstack-portfolio-deck/*.txt`

  Expected: 출력 없음

---

### Task 2: 표지 아트워크 생성과 검증

**Files:**
- Create: `tmp/fullstack-portfolio-deck/image-prompts.txt`
- Create: `tmp/fullstack-portfolio-deck/assets/cover-isometric.png`

**Interfaces:**
- Consumes: 밝은 3D 아이소메트릭 프로젝트 스타일과 표지의 우측 42% 이미지 프레임
- Produces: 16:9 가로형, 좌측 여백이 넓고 텍스트가 없는 PNG

- [ ] **Step 1: 최종 프롬프트를 기록한다**

  프롬프트는 오프화이트 그리드 바닥 위에 브라우저 UI 모듈, API 게이트웨이, 데이터베이스, AI 코어가 하나의 경로로 연결된 절제된 3D 아이소메트릭 장면을 요청한다. 스카이블루·퍼플·민트·오렌지 포인트, 흰색 유리·플라스틱 재질, 부드러운 자연광을 사용하고 텍스트·로고·사람·가짜 코드·워터마크를 금지한다.

- [ ] **Step 2: GPT Image 2로 이미지를 생성한다**

  Built-in `image_gen`을 사용해 1점을 생성하고 결과 파일을 `assets/cover-isometric.png`로 복사한다.

- [ ] **Step 3: 이미지를 검증한다**

  `view_image`로 확인해 텍스트·워터마크·왜곡·과도한 SF 표현이 없어야 하며, 좌측 카피 영역을 침범하지 않고 우측 피사체가 명확해야 한다.

---

### Task 3: PPTX 생성 모듈 구현

**Files:**
- Create: `tmp/fullstack-portfolio-deck/create-deck.mjs`
- Create: `/Users/junha/.codex/visualizations/2026/07/26/019f9e8d-71c8-7111-b719-9e5c3ad03c75/김준하_풀스택_개발자_포트폴리오.pptx`

**Interfaces:**
- Consumes: `slide-plan.txt`, `source-notes.txt`, 로컬 프로젝트 이미지, `cover-isometric.png`
- Produces: 16:9 PPTX 15장

- [ ] **Step 1: Artifact Tool 작업공간을 초기화한다**

  Run: `node "$SKILL_DIR/container_tools/setup_artifact_tool_workspace.mjs" --workspace "$TMP_DIR"`

  Expected: `@oai/artifact-tool` import가 가능한 작업공간 생성

- [ ] **Step 2: 공통 테마와 헬퍼를 구현한다**

  `create-deck.mjs`에 `COLORS`, `FONTS`, `addHeader(slide, section, page)`, `addTitle(slide, title, subtitle)`, `addImage(slide, path, frame)`, `addSources(slide, lines)`를 정의한다. 슬라이드 크기는 13.333 × 7.5인치로 고정한다.

- [ ] **Step 3: 1~3장을 구현한다**

  표지는 왼쪽 텍스트와 오른쪽 생성 아트워크를 사용한다. 2장은 세 개의 대표 수치를 큰 숫자로 배치하고, 3장은 프로젝트를 Web·App·Backend·AI·Data 축에 매핑한다.

- [ ] **Step 4: 4~7장을 구현한다**

  JobSecretary 실제 화면과 기존 프로파일러 캡처를 사용한다. 문제와 해결을 별도 슬라이드로 나누고 7장에서 `271 → 98`, `268 → 0`, `95점대`를 비교한다.

- [ ] **Step 5: 8~11장을 구현한다**

  Smart Messaging 실제 화면·Network 패널·전후 캡처를 사용한다. 11장의 Redis 흐름은 `브라우저 draftId → Spring Boot → Redis Sorted Set/Hash → Oracle` 네 노드와 간결한 연결선으로 표현한다.

- [ ] **Step 6: 12~15장을 구현한다**

  Dearfam과 TITO는 실제 브랜드 이미지와 역할·기술 판단·성과를 조합한다. 14장은 POPPET·여행의 이유·SSYUNG의 폭을 압축하고, 15장은 GitHub·포트폴리오·연락처를 배치한다.

- [ ] **Step 7: 슬라이드별 발표자 노트에 출처를 삽입한다**

  각 슬라이드 노트의 마지막에 아래 형식을 사용한다.

  ```text
  [Sources]
  - /absolute/local/source/path
  - https://direct-source.example
  [/Sources]
  ```

- [ ] **Step 8: PPTX를 내보낸다**

  Run: `node tmp/fullstack-portfolio-deck/create-deck.mjs`

  Expected: 최종 경로에 15장 PPTX 생성, 프로세스 exit code 0

---

### Task 4: 렌더링과 시각 QA

**Files:**
- Create: `tmp/fullstack-portfolio-deck/김준하_풀스택_개발자_포트폴리오/slide-*.png`
- Create: `tmp/fullstack-portfolio-deck/qa-ledger.txt`
- Modify: `tmp/fullstack-portfolio-deck/create-deck.mjs`

**Interfaces:**
- Consumes: Task 3의 PPTX
- Produces: 수정 완료된 최종 PPTX와 QA 기록

- [ ] **Step 1: 전체 슬라이드를 렌더링한다**

  Run: `python "$SKILL_DIR/container_tools/render_slides.py" "$FINAL_PPTX"`

  Expected: `slide-1.png`부터 `slide-15.png`까지 생성

- [ ] **Step 2: 오버플로 검사를 실행한다**

  Run: `python "$SKILL_DIR/container_tools/slides_test.py" "$FINAL_PPTX"`

  Expected: overflow errors 0

- [ ] **Step 3: 몽타주로 흐름을 검토한다**

  Run: `python "$SKILL_DIR/container_tools/create_montage.py" --input_dir "$RENDER_DIR" --output_file "$TMP_DIR/montage.png"`

  Expected: 15장이 일정한 톤을 유지하고 인접 슬라이드의 실루엣이 반복되지 않음

- [ ] **Step 4: 각 슬라이드를 개별 확인한다**

  15개 PNG를 모두 전체 크기로 확인하고, 텍스트 줄바꿈·크롭·겹침·저해상도·수치 오기를 `qa-ledger.txt`에 기록한다.

- [ ] **Step 5: 발견한 문제를 수정하고 재검증한다**

  `create-deck.mjs`를 수정한 뒤 export, render, slides_test를 반복한다. `qa-ledger.txt`의 모든 항목을 `fixed`로 표시한 후 최종 PPTX의 수정 시각과 파일 크기를 확인한다.

---

### Task 5: 최종 전달 검증

**Files:**
- Verify: `/Users/junha/.codex/visualizations/2026/07/26/019f9e8d-71c8-7111-b719-9e5c3ad03c75/김준하_풀스택_개발자_포트폴리오.pptx`

**Interfaces:**
- Consumes: Task 4의 검증 완료 PPTX
- Produces: 사용자에게 전달할 단일 최종 파일

- [ ] **Step 1: 최종 파일을 확인한다**

  Run: `ls -lh "$FINAL_PPTX"`

  Expected: 파일이 존재하고 크기가 0보다 큼

- [ ] **Step 2: 슬라이드 수를 확인한다**

  Artifact Tool inspection 또는 렌더 결과에서 정확히 15장을 확인한다.

- [ ] **Step 3: 사용자에게 결과를 전달한다**

  최종 PPTX를 한 번만 output citation으로 연결하고, 대표 프로젝트·시각 방향·검증 결과를 짧게 요약한다.
