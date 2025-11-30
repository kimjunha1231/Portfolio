---
title: "JobSecretary : AI 기반 자기소개서 코칭 및 채용 관리 비서"
period: "약 5일 (약 30시간 소요)"
role: "1인 + AI, 기획, 디자인, 프론트엔드, 백엔드, DB구축, AI기능 개발"
features: "AI 자기소개서 초안 작성, AI 자기소개서 교정, AI 면접 질문 생성, 칸반 보드형 지원 관리"
github: ""
demo: "https://jobsecretary.vercel.app"
order: 1
featured: true
technologies:
  [
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Zustand",
    "Supabase",
    "Gemini",
    "Jest",
    "Playwright",
  ]
---

## 프로젝트 개요

취업 준비 과정에서 자기소개서 관리와 다양한 플랫폼을 사용해야하는 번거로움을 없애기 위해 개발했습니다.

## 주요 개발 내용

### 1. 기술 스택 (Tech Stack)

| 구분 | 기술 스택 | 활용 및 선정 이유 |
| **Frontend** | Next.js 15 (App Router), TypeScript | 최신 React 기능을 활용하여 개발 생산성을 높이고, 엄격한 타입 시스템으로 안정성을 확보했습니다. |
| **Style** | Tailwind CSS, Shadcn UI | 통일성 있는 디자인 구축을 위해 사용했습니다. |
| **State** | Zustand | 복잡한 보일러플레이트 없이 직관적인 전역 상태 관리를 위해 도입했습니다. |
| **Backend** | Supabase | PostgreSQL 기반의 DB 설계 및 Authentication, RLS(Row Level Security)를 통한 보안 강화를 위해 사용했습니다. |
| **Infra** | Vercel | CI/CD 파이프라인 구축 및 배포 자동화를 위해 활용했습니다. |
| **AI** | Google Gemini 2.0 Flash, GenAI SDK | 고성능 LLM을 활용한 텍스트 분석 및 생성과 안정적인 AI 모델 연동을 위해 사용했습니다. |
| **Testing** | Jest, Playwright | 핵심 비즈니스 로직 단위 테스트와 사용자 시나리오(E2E) 자동화 테스트를 위해 도입했습니다. |

### 2. 기술적 도전 및 해결 경험 (Troubleshooting)

① RAG 기반 개인화된 AI 초안 작성 (Auto-Drafting)

**문제:** 일반적인 AI 작문 도구는 사용자의 개인적인 경험이나 문체를 반영하지 못해, 결과물이 기계적이고 이질적인 느낌을 주는 한계가 있었습니다.

**해결:**

- **RAG-Lite 패턴 적용:** 벡터 DB 없이도 사용자의 이전 합격 자소서(Documents)를 프롬프트 컨텍스트로 주입하는 경량화된 RAG 패턴을 구현했습니다.
- **Context-Aware Prompting:** AI가 사용자의 고유한 경험(프로젝트, 성과)과 문체를 모방하여 작성하도록 유도함으로써, 수정 소요를 획기적으로 줄인 '나만의 초안'을 제공했습니다.

② 낙관적 업데이트(Optimistic Updates)를 통한 반응성 향상

**문제:** 칸반 보드에서 카드를 이동할 때마다 서버 응답을 기다린 후 UI를 갱신하면, 미세한 딜레이가 발생하여 사용자 경험이 저해되는 문제가 있었습니다.

**해결:**

- **Optimistic UI 패턴 적용:** `useKanban` 훅에서 서버 요청과 동시에 로컬 상태(State)를 즉시 변경하여 UI에 선반영하고, 백그라운드에서 비동기로 DB 동기화를 처리했습니다. 이를 통해 네트워크 지연과 관계없이 네이티브 앱처럼 빠르고 쾌적한 조작감을 제공했습니다.

③ 커스텀 훅을 활용한 로직 분리 

**내용:** `useKanban`, `useDraftStore` 등 핵심 로직을 커스텀 훅으로 분리하여 UI 컴포넌트의 복잡도를 낮추고 재사용성을 높였습니다. 이를 통해 뷰(View)와 로직(Logic)을 명확히 분리하는 유지보수 용이한 아키텍처를 설계했습니다.
