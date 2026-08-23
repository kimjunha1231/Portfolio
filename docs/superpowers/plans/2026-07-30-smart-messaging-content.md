# Smart Messaging 프로젝트 콘텐츠 확장 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `jobSecretary`의 문제 해결 중심 서술 방식을 참고해 Smart Messaging 프로젝트 페이지에 실제 코드 기반의 링크 추적, 수신거부, 멀티채널, 통계, 테스트 내용을 추가한다.

**Architecture:** 기존 `content/projects/smart-messaging-system.mdx`의 프로젝트 개요와 두 개발 기록은 유지한다. 새 개발 기록은 각 섹션을 문제 상황·해결 과정·간단한 코드 예시·결과의 순서로 작성하며, 실제 구현을 확인할 수 있는 JavaScript/Java 조각만 사용한다.

**Tech Stack:** MDX, Java, Spring Boot, MyBatis, Redis, Thymeleaf, JavaScript, JUnit/Mockito

## Global Constraints

- 기존 성능 수치는 변경하지 않고, 측정값과 구현 기준을 구분해 표시한다.
- RabbitMQ의 초기 인프라 구축을 사용자 단독 작업으로 표현하지 않는다.
- 코드 예시는 실제 저장소의 클래스·메서드·필드명을 사용하고, 동작을 과장하지 않는다.
- 기존 한국어 문체와 이미지·비디오 컴포넌트 패턴을 유지한다.
- 이번 변경에서는 MDX 콘텐츠 파일만 수정한다.

---

### Task 1: 프로젝트 범위와 담당 기능 확장

**Files:**
- Modify: `content/projects/smart-messaging-system.mdx` frontmatter, `프로젝트 개요`, `담당 기능`

- [x] **Step 1: 담당 범위와 설명 문구를 실제 기여 범위에 맞게 확장한다**

`description`과 담당 범위에 고객 조회·Redis Draft뿐 아니라 메시지 링크 추적, 수신거부·구매 전환, 멀티채널 발송 로직, 통계·테스트 보강을 추가한다. RabbitMQ는 직접 구축으로 표현하지 않고 기존 비동기 발송 구조와의 연동·보강으로 한정한다.

- [x] **Step 2: 구현 범위와 성과 수치를 분리한다**

기존의 API 시간·응답 크기 수치는 `주요 성과`에 유지하고, Redis TTL·청크 크기·배치 크기·테스트 시나리오 수는 `구현 기준`으로 별도 설명한다.

- [x] **Step 3: 변경된 개요를 문맥상 검토한다**

프로젝트 설명만 읽어도 고객 선택부터 발송·추적·분석까지의 제품 흐름이 드러나는지 확인한다.

### Task 2: 링크 추적·수신거부·구매 전환 개발 기록 추가

**Files:**
- Modify: `content/projects/smart-messaging-system.mdx` after the Redis Draft section

- [x] **Step 1: 링크 추적 섹션을 문제-해결-결과 구조로 작성한다**

`ShortUrlPurpose`의 목적별 URL 생성, 발송 대상별 추적, 클릭 통계, 구매 전환 여부를 설명한다. 예시는 `shortUrlService.createTrackedUrl(targetId, originalUrl, ShortUrlPurpose.PURCHASE)`처럼 실제 코드에 있는 호출 형태를 사용한다.

- [x] **Step 2: 수신거부 섹션을 광고성 메시지 흐름으로 작성한다**

광고성 SMS에 수신거부 URL을 요구하고, 수신거부 요청에서 광고 차단·SMS 동의 철회·거부 이력 저장이 이어지는 흐름을 쉬운 말로 설명한다. 결제나 법적 인증 기능으로 과장하지 않는다.

- [x] **Step 3: 구매 전환을 결제 기능과 구분해 작성한다**

구매 링크 생성 시 전환 상태를 추적하고 완료 요청에서 상태를 갱신하는 기능으로 표현한다. 실제 결제 게이트웨이 구현으로 서술하지 않는다.

### Task 3: 멀티채널 발송과 통계·검토 UX 개발 기록 추가

**Files:**
- Modify: `content/projects/smart-messaging-system.mdx`

- [x] **Step 1: 멀티채널 라우팅 섹션을 추가한다**

Kakao OAuth·친구 API, SOLAPI SMS/LMS, AWS SES 이메일을 채널별 책임으로 나누고 `MessageRouterService`가 채널 타입과 결과를 통일하는 구조를 설명한다. 기존 RabbitMQ 인프라 담당과 혼동되지 않게 큐 구축 주장은 제외한다.

- [x] **Step 2: 발송 검토와 통계 UX 섹션을 추가한다**

발송 대상 수·예상 비용·확인 모달·성공/실패 결과 모달·통계 업데이트 시각·fallback 차트를 설명한다. 프론트 예시는 `send-review.js`의 확인 메시지와 결과 모달 흐름처럼 짧게 제시한다.

- [x] **Step 3: 구현 기준과 사용자 효과를 구분한다**

03:00 업데이트 시각이나 차트 라벨은 화면 정책으로, 사용자가 발송 전에 대상과 비용을 확인할 수 있다는 점은 UX 효과로 구분한다.

### Task 4: 테스트와 협업 범위 섹션 추가

**Files:**
- Modify: `content/projects/smart-messaging-system.mdx`

- [x] **Step 1: 테스트 시나리오를 파일 단위가 아니라 행동 단위로 요약한다**

Mapper XML 파싱, 태그 검색, 예약시간 검증, 발송 이력 저장, 채널 우선순위, 가상/실제 고객 발송 비용, 통계 fallback 차트 등 실제 PR 테스트에서 확인되는 시나리오를 정리한다.

- [x] **Step 2: 협업 범위를 명시한다**

사용자의 주 담당은 고객 조회 성능, Redis Draft, 링크 추적·수신거부·구매 전환, 발송·통계 UI와 테스트 보강으로 표현하고, RabbitMQ 초기 구축은 팀 협업 영역으로 구분한다.

### Task 5: MDX 렌더링과 문체 검증

**Files:**
- Test: `content/projects/smart-messaging-system.mdx` rendered at `/projects/smart-messaging-system`

- [x] **Step 1: MDX 문법과 코드 블록을 확인한다**

중첩 목록, 인라인 코드, 코드 블록, 기존 `ZoomableImage`·`video` 컴포넌트가 깨지지 않는지 확인한다.

- [x] **Step 2: 페이지 흐름을 확인한다**

프로젝트 개요에서 새 개발 기록까지 문제 해결 흐름이 끊기지 않고, 긴 문단이 모바일 화면에서 과도하게 이어지지 않는지 확인한다.

- [x] **Step 3: 사실성 검토를 수행한다**

RabbitMQ 구축, 결제 처리, 실제 발송 성능 수치처럼 코드 기록만으로 확정할 수 없는 주장을 제거하거나 범위를 좁힌다.
