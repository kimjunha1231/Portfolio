// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "김준하 Portfolio";
export const SITE_DESCRIPTION = "안녕하세요, 프론트엔드 개발자 김준하입니다.";

// 개인 정보
export const PERSONAL_INFO = {
  name: "김준하",
  title: "프론트엔드 개발자",
  email: "010-9383-9023",
  github: "https://github.com/kimjunha1231",
  description:
    "안녕하세요. 함께 성장하는 개발자를 꿈꾸는 프론트엔드 엔지니어 김준하입니다.\n\n생년월일: 2001년 6월 10일\n학교/전공: 숭실대학교/전자 컴퓨터학부 4학년 2학기 재학\n관심분야: Front-End 개발",
};

// 기술 스택
export const TECH_STACK = {
  frontend: ["React", "TypeScript", "JavaScript", "Flutter", "HTML/CSS"],
  library: [
    "Tailwind CSS",
    "Styled Components",
    "Zustand",
    "Tanstack Query",
    "React Hook Form",
    "Zod",
    "MSW",
  ],
  tools: ["GitHub", "Notion", "Obsidian", "Discord", "Linear", "Slack"],
};

// 프로젝트 데이터
export const PROJECTS = [
  {
    id: 1,
    title: "Dearfam : 가족의 이야기를 담아드립니다",
    description:
      "AI 및 LLM 기술을 활용하여 가족의 추억을 디지털 및 실물 콘텐츠로 제작하는 서비스입니다.",
    detailedDescription: `
      <p><strong>개발 기간:</strong> 2024.01 - 현재</p>
      <p><strong>프로젝트 개요:</strong><br>
      AI 및 LLM 기술을 활용하여 가족의 추억을 디지털 및 실물 콘텐츠로 제작하는 서비스입니다.</p>
      <p><strong>주요 기능:</strong></p>
      <ul>
        <li>가족 정보 추출 및 검색 기능</li>
        <li>Firebase의 Flutter을 사용하여 콘텐츠를 위한 MVP를 제작</li>
        <li>2024년 졸업작품 아이디어 공모전 (1차/2차/3차 통과)</li>
        <li>승천대학교 Pre 스타트업 선정, 창업 사업화에서 개발 중</li>
        <li>프론트엔드 리드로 발탁, 팀리더로서 상업화 및 신사업 조기 참여</li>
      </ul>
      <p><strong>기술적 성과:</strong><br>
      - React, TypeScript를 통한 체계적 개발<br>
      - MSW ↔ Mock 서버 사용하여 API 연동 최적화<br>
      - Jira 기반 Agile 방법론 협업 방식</p>
    `,
    technologies: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Zustand",
      "Tanstack Query",
      "Zod",
      "MSW",
    ],
    link: "https://github.com/TEAM-POKID/Dearfam-Frontend",
    demo: null,
  },
  {
    id: 2,
    title: "TITO 토픽 보조 서비스",
    description:
      "LLM RAG 기술을 활용한 토픽 보조 서비스입니다. 메인테이너로 참여했습니다.",
    detailedDescription: `
      <p><strong>개발 기간:</strong> 2024.03 - 2024.12</p>
      <p><strong>프로젝트 개요:</strong><br>
      LLM RAG 기술을 활용한 토픽 보조 서비스입니다. 메인테이너로 참여했습니다.</p>
      <p><strong>주요 기능:</strong></p>
      <ul>
        <li>총 5명 (백엔드 : 2명, 프론트엔드 : 2명, AI : 1명)</li>
        <li>프론트엔드 개발 리드로 맡아 초기개발 및 진행서버 호스팅 서비스 관리</li>
        <li>2024년 ICT토픽 프론트엔드 토큰 진행 (아이디어 발표/취업정보/실습 지원)</li>
        <li>Linear의 Discord, Obsidian을 활용하여 Agile 방법론 적용</li>
        <li>DIO, Retrofit, shared_preferences를 이용하여 REST API 연동 및 상태 관리</li>
      </ul>
      <p><strong>기술적 성과:</strong><br>
      - 패키지별 모듈 접근을 통한 최적화, 추후 출시 대응을 위한 아키텍처 구현<br>
      - Firebase Realtime Database를 이용하여 실시간 데이터 관리<br>
      - WebSocket을 활용한 실시간 메시지 시스템</p>
    `,
    technologies: [
      "Flutter",
      "Riverpod",
      "Go_router",
      "DIO",
      "Retrofit",
      "shared_preferences",
    ],
    link: "https://github.com/TEAM-POKID/Tito-Frontend",
    demo: null,
  },
  {
    id: 3,
    title: "여행의 이유",
    description:
      "자신만의 여행상식이 나열되며 추천 링크를 즐겨보는 커뮤니티 사이트입니다.",
    detailedDescription: `
      <p><strong>개발 기간:</strong> 2024.01.10 - 2024.02.19</p>
      <p><strong>프로젝트 개요:</strong><br>
      자신만의 여행상식이 나열되며 추천 링크를 즐겨보는 커뮤니티 사이트입니다.</p>
      <p><strong>주요 기능:</strong></p>
      <ul>
        <li>총 11명 (프론트엔드 : 5명, 백엔드 : 4명, 기획 : 1명, 디자인 : 1명)</li>
        <li>다양한 직군과의 협업을 통한 종합적인 웹사이트 개발</li>
        <li>프론트엔드에서 로그인 및 마이페이지 개발</li>
        <li>소셜 로그인 (구글, 카카오, 네이버) 개발</li>
        <li>MSW(Mock Service Worker) 사용</li>
      </ul>
      <p><strong>기술적 성과:</strong><br>
      - 컴포넌트 기반 아키텍처로 재사용성 향상<br>
      - Git message convention, 팀 내 컨벤션을 정하여 이슈 및 pull request 관리<br>
      - Git flow를 통한 체계적 버전 관리</p>
    `,
    technologies: [
      "React",
      "Styled-components",
      "JavaScript",
      "Zustand",
      "HTML/CSS",
    ],
    link: "https://github.com/Here-You/Frontend",
    demo: null,
  },
  {
    id: 4,
    title: "융합특성화 자유전공학부 커뮤니티 SSYUNG",
    description: "융합특성화 자유전공학부를 위한 커뮤니티 사이트입니다.",
    detailedDescription: `
      <p><strong>개발 기간:</strong> 2021.01.03 - 2021.03.07</p>
      <p><strong>프로젝트 개요:</strong><br>
      융합특성화 자유전공학부를 위한 커뮤니티 사이트입니다.</p>
      <p><strong>주요 기능:</strong></p>
      <ul>
        <li>총 6명 (프론트엔드 : 2명, 풀스택 : 2명, 백엔드 : 1명, 디자인 : 1명)</li>
        <li>권한별 프론트엔드 개발 및 백엔드 연동</li>
        <li>프론트엔드 UI/UX 모니터링 설정</li>
        <li>초기 숭실대학교 선별 인증 시스템 적용</li>
        <li>기획, 디자인, 개발까지 전반적인 협업</li>
        <li>상태 관리 및 라우팅 설정</li>
      </ul>
      <p><strong>기술적 성과:</strong><br>
      - 초기 개발 경험을 통한 협업 능력 향상<br>
      - Git 컨벤션을 정하여 이슈 및 pull request 관리<br>
      - 컴포넌트 기반 개발 패턴 학습</p>
    `,
    technologies: ["React", "Styled-components", "JavaScript", "HTML/CSS"],
    link: "https://github.com/Convergence-Specialization/CS-Front",
    demo: null,
  },
];
