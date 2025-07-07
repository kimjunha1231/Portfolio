// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "김준하 Portfolio";
export const SITE_DESCRIPTION = "안녕하세요, 프론트엔드 개발자 김준하입니다.";

// 개인 정보
export const PERSONAL_INFO = {
  name: "김준하",
  title: "프론트엔드 개발자",
  email: "rlawnsgk0610@gmail.com",
  github: "https://github.com/kimjunha1231",
  description:
    "함께 성장하는 개발자를 꿈꾸는 프론트엔드 엔지니어 김준하입니다.",
};

// 기술 스택
export const TECH_STACK = {
  frontend: ["React", "TypeScript", "JavaScript", "Flutter"],
  library: [
    "Tailwind CSS",
    "Styled Components",
    "Zustand",
    "Tanstack Query",
    "MSW",
  ],
  tools: ["Riverpod", "Go_router"],
};

// 프로젝트 데이터
export const PROJECTS = [
  {
    id: 1,
    title: "Dearfam : 가족의 이야기를 담아드립니다",
    description:
      "AI 및 LLM 기술을 활용하여 가족의 추억을 디지털 및 실물 콘텐츠로 제작하는 서비스입니다.",

    technologies: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Zustand",
      "Tanstack Query",
      "Zod",
      "MSW",
    ],
    link: "https://github.com/TEAM-POKIE/Dearfam-FrontEnd",
    demo: null,
  },
  {
    id: 2,
    title: "TITO 토론 보조 서비스",
    description: "LLM RAG 기술을 활용한 토픽 보조 서비스입니다.",

    technologies: [
      "Flutter",
      "Riverpod",
      "Go_router",
      "DIO",
      "Retrofit",
      "shared_preferences",
    ],
    link: "https://github.com/TEAM-POKIE/Tito-FrontEnd",
    demo: null,
  },
  {
    id: 3,
    title: "여행의 이유",
    description:
      "자신만의 여행방식이나 여행 코스, 추천 장소를 공유하는 커뮤니티 사이트입니다",

    technologies: [
      "React",
      "Styled-components",
      "JavaScript",
      "Zustand",
      "MSW",
    ],
    link: "https://github.com/Here-You/FrontEnd",
    demo: null,
  },
  {
    id: 4,
    title: "융합특성화 자유전공학부 커뮤니티 SSYUNG",
    description: "융합특성화 자유전공학부를 위한 커뮤니티 사이트입니다.",

    technologies: ["React", "Styled-components", "JavaScript"],
    link: "https://github.com/Convergence-Specialization/CS-Front",
    demo: null,
  },
  {
    id: 5,
    title: "POPPET ",
    description: "노약자를 위한 AI 말동무 서비스입니다",

    technologies: ["Flutter", "Riverpod", "Go_router"],
    link: "https://github.com/gdsc-ssu/poppet-app",
    demo: null,
  },
];
