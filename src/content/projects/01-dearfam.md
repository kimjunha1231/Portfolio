---
title: "Dearfam : 가족의 이야기를 담아드립니다"
period: "2024.11 ~ 현재"
role: "프론트엔드 리드 담당, 기획, 디자인, 서류 작성 참여"
achievements: "2024년 클라우드 아이디어 공모전 대상(부산시장상), Pre-스타트업 선정, 제 15회 숭실캡스톤디자인 경진대회 장려상"
github: "https://github.com/TEAM-POKIE/Dearfam-Frontend"
order: 2
featured: true
technologies:
  - "React"
  - "TypeScript"
  - "TailwindCSS"
  - "Zustand"
  - "Tanstack Query"
  - "Zod"
  - "MSW"
---

## 주요 개발 내용

### 1. 기술 스택 (Tech Stack)

| 구분 | 기술 스택 | 활용 및 선정 이유 |
| **Core** | React 19, TypeScript, Vite | 최신 React 기능을 활용하여 개발 생산성을 높이고, 엄격한 타입 시스템으로 안정성을 확보했습니다. |
| **State** | Zustand, React Query | 전역 상태(UI)와 서버 상태(Data)를 분리하여 효율적으로 관리했습니다. |
| **Style** | Tailwind CSS, Shadcn UI, Framer Motion | 디자인 시스템 기반으로 컴포넌트를 구성하여 재사용성이 높고 일관적인 디자인 구현에 집중하였습니다. |
| **Testing** | MSW (Mock Service Worker) | 백엔드 API 없이도 프론트엔드 독립적인 개발 및 테스트 환경을 구축했습니다. |
| **Form** | React Hook Form, Zod | 복잡한 폼의 상태 관리를 최적화하고 런타임 유효성 검사를 강화했습니다. |

### 2. 기술적 도전 및 해결 경험 (Troubleshooting)

① 페이지 중심의 아키텍처 설계 
프로젝트 규모가 커짐에 따라 컴포넌트와 로직의 의존성이 복잡해지는 문제를 방지하기 위해, `pages/` 폴더 하위에 각 페이지별로 독립적인 `components`와 `hooks`를 두는 응집도 높은 폴더 구조를 설계했습니다. 이를 통해 유지보수 시 수정 범위를 명확히 하고, 팀원 간 코드 충돌을 최소화할 수 있었습니다.

② MSW를 활용한 개발 병목 해소
백엔드 API 개발이 완료되기 전까지 프론트엔드 개발이 지연되는 병목 현상을 해결하기 위해 **MSW(Mock Service Worker)**를 도입했습니다. 네트워크 레벨에서 API를 모킹함으로써 백엔드 개발 속도와 무관하게 UI/UX 개발을 병렬로 진행하여 전체적인 생산성을 향상시켰습니다.


- **커스텀 훅 사용**: `usePostMemoryPost`, `useAuthFlow` 등 커스텀 훅을 적극 활용하여 UI 컴포넌트에서 분리함으로써 코드의 가독성과 재사용성을 높였습니다.
