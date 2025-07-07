// 프로젝트 데이터 (JavaScript에서 사용)
const projectsData = {
  1: {
    title: "Dearfam : 가족의 이야기를 담아드립니다",
    description: `
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
    github: "https://github.com/TEAM-POKID/Dearfam-Frontend",
    demo: null,
  },
  2: {
    title: "TITO 토픽 보조 서비스",
    description: `
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
    github: "https://github.com/TEAM-POKID/Tito-Frontend",
    demo: null,
  },
  3: {
    title: "여행의 이유",
    description: `
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
    github: "https://github.com/Here-You/Frontend",
    demo: null,
  },
  4: {
    title: "융합특성화 자유전공학부 커뮤니티 SSYUNG",
    description: `
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
    github: "https://github.com/Convergence-Specialization/CS-Front",
    demo: null,
  },
};

// 스크롤 애니메이션 함수
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // 애니메이션 요소들을 관찰
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right"
  );
  animatedElements.forEach((el) => observer.observe(el));
}

// 네비게이션 스크롤 함수
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const href = anchor.getAttribute("href");
      if (href) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}

// 모달 기능 함수
function initModalFunctionality() {
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalGithub = document.getElementById("modal-github");
  const modalDemo = document.getElementById("modal-demo");
  const modalClose = document.getElementById("modal-close");

  // 프로젝트 카드 클릭 이벤트
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = card.dataset.projectId;
      if (projectId && projectsData[projectId]) {
        const project = projectsData[projectId];

        if (
          modalTitle &&
          modalDescription &&
          modalGithub &&
          modalDemo &&
          modal
        ) {
          modalTitle.textContent = project.title;
          modalDescription.innerHTML = project.description;
          modalGithub.href = project.github;
          modalDemo.href = project.demo;

          // 데모 링크가 없으면 숨기기
          if (!project.demo) {
            modalDemo.style.display = "none";
          } else {
            modalDemo.style.display = "inline-block";
          }

          modal.style.display = "block";
          document.body.style.overflow = "hidden";
        }
      }
    });
  });

  // 모달 닫기
  if (modalClose && modal) {
    modalClose.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  // 모달 배경 클릭 시 닫기
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // ESC 키로 모달 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

// DOM 로드 후 초기화
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initSmoothScrolling();
  initModalFunctionality();
});
