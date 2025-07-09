// 프로젝트 데이터를 consts.ts의 PROJECTS와 일치시킴
const projectsData = {
  1: {
    title: "Dearfam : 가족의 이야기를 담아드립니다",
    period: "2024.11 ~ 현재",
    role: `
			<ul>
				<li>프론트엔드 리드 담당</li>
				<li>기획, 디자인, 서류 작성 참여</li>
			</ul>
		`,
    achievements: `
			<ul>
				<li>2024년 클라우드 아이디어 공모전 대상(부산시장상)</li>
        <li>Pre-스타트업 선정</li>
			</ul>
		`,
    details: `
			<ul>
				<li>FireBase와 Flutter를 사용해서 공모전을 위한 MVP를 빠르게 제작 후 수상</li>
				<li>TypeScript + React + Vite 를 사용해 웹앱 제작 중</li>
				<li>디자인 시스템을 기반으로 Tailwind CSS와 Shadcn UI를 사용한 재사용 가능한 디자인 및 컴포넌트 초기세팅</li>
				<li>MSW (Mock Service Worker)를 사용하여 API 연동 테스트 및 코드 변경 최소화</li>
				<li>Jira 기반 Agile 방법론 협업 방식</li>
				<li>6월부터 기획, 디자인 구체화 진행 중으로 초기 UI/UX 개발 집중</li>
				<li>추후 Tanstack query, zustand를 적절하게 사용하는 등 성능 개선에 집중해 보는 것이 목표</li>
			</ul>
		`,
    github: "https://github.com/TEAM-POKIE/Dearfam-Frontend",
  },
  2: {
    title: "TITO 토론 보조 서비스",
    period: "2024.03 ~ 2024.12",
    role: `
			<ul>
				<li>프론트엔드 개발 리드 담당</li>
				<li>기획, 디자인, 서류 작성 참여</li>
			</ul>
		`,
    achievements: `
			<ul>
				<li>2024년 ICT멘토링 프로젝트 한이음 트랙 은상 (정보통신기획평가원장상)</li>
        <li>Apple Store, One Store출시</li>
				<li>App Store URL : <a href="https://apps.apple.com/kr/app/tito/id6737821941" target="_blank">https://apps.apple.com/kr/app/tito/id6737821941</a></li>
        <li>One Store URL : <a href="https://m.onestore.co.kr/ko-kr/apps/appsDetail.omp?prodId=0000779043" target="_blank">https://m.onestore.co.kr/ko-kr/apps/appsDetail.omp?prodId=0000779043</a></li>
			</ul>
		`,
    details: `
			<ul>
      <li>linear와 discord, obsidian을 활용하여 Agile방법론 협업 
      <div style="margin-top: 0.5rem; margin-bottom: 0.5rem;">
				  <img src="/Tito1.png" alt="SSYUNG 커뮤니티 스크린샷" style="width: 100%; max-width: 500px; border-radius: 0.5rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);" />
			  </div>
      <ul>
        
           <li style="margin-left: 2rem;">매주 2회 대면 회의 실시</li>
           <li style="margin-left: 2rem;">매주 중간 정검 및 각자 파트 개발 및 공부 내용 공유</li>
           <li style="margin-left: 2rem;">매주 좋았던 점, 힘들었던 점, 배웠던 점을 공유하는 시간 진행</li>
           <li style="margin-left: 2rem;">discord와 obsidian을 활용해 매일 아침 10시마다 어제까지 한 일, 막히는 부분, 오늘 할 일, 도움이 필요한 부분, 특이사항을 공유</li>
          </ul>
      </li>
        <li>DIO, Retrofit, shared_preferences을 이용하여 Rest API 연동
        <ul>
         
           <li style="margin-left: 2rem;">성능, 유지보수, 코드 간결화에 유리하다고 생각해서 DIO, Retrofit, shared_preferences를 활용</li>
          </ul>
        </li>
        </li>
				<li>Firebase Realtime Database를 이용하여 실시간 데이터 관리
            <ul>
         
           <li style="margin-left: 2rem;">백엔드 연동 전 자체 서버 구축으로 코드 변동이 최소화, 추후 통신 방법만 변경하여 빠르게 기능 구현 가능</li>
          </ul></li>
				<li>WebSocket 실시간 채팅 구현
        <ul>
            
           <li style="margin-left: 2rem;">WebSocket과 Rest API 통신 방법이 다르고 해당 데이터를 받아오는 속도에서 차이점이 존재</li>
           <li style="margin-left: 2rem;">이런 점을 고려하여 riverPod를 이용해 미리 Rest API정보를 받아와 저장해서 사용하거나 실시간으로 받아온 WebSocket 정보를 riverPod에 저장하여 데이터를 교체하는 식의 방법으로 해결</li>
          </ul>
        </li>
        <li>새로운 게시물로 업데이트 할 때 polling 방식으로 처리하면 사용자가 몰렸을 때 과부하가 발생할 수 있다 판단하여 새로고침 버튼으로 변경</li>
				<li>소셜 로그인(카카오, 애플, 구글), 실시간 채팅, 게시글, Splash 페이지, 온보딩 페이지, 토론 등 대부분 페이지 제작</li>
				<li>Flutter hook 채택
        <ul>
           <li style="margin-left: 2rem;">짧은 개발 학습 기간, 앱 관련 지식 문제로 라이프사이클 오류 발생</li>
           <li style="margin-left: 2rem;">React hook과 비슷한 Flutter hook으로 해결</li>
          </ul>
        </li>
			</ul>
		`,
    github: "https://github.com/TEAM-POKIE/Tito-Frontend",
  },
  3: {
    title: "여행의 이유",
    period: "2024.01.10 ~ 2024.02.19",
    role: `
			<ul>
				<li>총 11명 (프론트엔드 : 5명, 백엔드 : 4명, 기획 : 1명, 디자인 : 1명) 중 프론트엔드 개발 담당</li>
				<li>프론트엔드에서 로그인 및 마이페이지 개발 담당</li>
			</ul>
		`,
    achievements: `
			<ul>
				<li>배포 후 동아리 데모데이 참석하여 사용자 반응을 확인</li>
			</ul>
		`,
    details: `
			<ul>
				<li>소셜 로그인(구글, 카카오) 개발</li>
        <li>PM, 디자이너, 백엔드, 프론트엔드 등 업무가 완전 분리된 협업 경험</li>
				<li>MSW(Mock Service Worker) 사용
        <ul>
           <li style="margin-left: 2rem;">백엔드 연동전 MSW사용으로 코드 변동이 최소화, 추후 통신 방법만 변경하여 빠르게 기능 구현</li>
          </ul>
        </li>
        <li>Styled-components로 css 디자인 코드 작성</li>
				<li>git message convention
        <ul>
           <li style="margin-left: 2rem;">팀 내 컨벤션을 정하여 이슈 및 pull request 관리</li>
          </ul>
        </li>
				<li>git flow 전략
        <ul>
          <li style="margin-left: 2rem;">git flow 전략을 모두 채용하는 것은 프로젝트 규모에 비해 과하다고 생각하여 일부만 사용</li>
        </ul>
        </li>
			</ul>
		`,
    github: "https://github.com/Here-You/Frontend",
  },
  4: {
    title: "융합특성화 자유전공학부 커뮤니티 SSYUNG",
    period: "2021.01.03 ~ 2021.03.07",
    role: `
			<ul>
				<li>총 6명 중 프론트엔드 개발 담당</li>
        <li>기획, 디자인, 학생회 컨택 참여</li>
			</ul>
		`,
    achievements: `
			<ul>
				<li>1학년만 130명 있는 학과에서 동시 접속자 50명 달성</li>
        <div style="margin-top: 0.5rem; margin-bottom: 0.5rem;">
				  <img src="/SSyung.png" alt="SSYUNG 커뮤니티 스크린샷" style="width: 100%; max-width: 500px; border-radius: 0.5rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);" />
			  </div>
        <li>코로나 시기 디스코드, 줌, 카카오톡을 통한 비대면 협업 방식에 능숙해짐</li>
			</ul>
		`,
    details: `
			
			<ul>
				<li>프론트엔드 50% 개발 진행</li>
          <div style="margin-top: 0.5rem; margin-bottom: 0.5rem;">
				  <img src="/Ssyung1.png" alt="SSYUNG 커뮤니티 스크린샷" style="width: 100%; max-width: 500px; border-radius: 0.5rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);" />
			  </div>
				<li>초기 개발 경험을 통한 협업 능력 향상</li>
				<li>Git 컨벤션을 정하여 이슈 및 pull request 관리</li>
				<li>컴포넌트 기반 개발 패턴 학습</li>
				<li>학부 학생들이 편리하게 사용할 수 있는 직관적인 커뮤니티 플랫폼 구현</li>
				<li>대학 커뮤니티의 특성을 고려한 사용자 인터페이스 설계</li>
				<li>첫 번째 팀 프로젝트 경험을 통한 협업 능력 및 개발 역량 향상</li>
			</ul>
		`,
    github: "https://github.com/Convergence-Specialization/CS-Front",
  },
  5: {
    title: "POPPET - 노약자를 위한 AI 말동무 서비스",
    period: "2025.05.20 ~ 현재",
    role: `
			<ul>
				<li>총 4명 (프론트엔드 : 1명, 백엔드 : 2명, 디자인 : 1명) 중 프론트엔드 개발 담당</li>
			</ul>
		`,
    achievements: `
			<ul>
				<li>Google APAC Solution Challenge 참가</li>
        <li>데모데이 및 One Store, App Store 배포 예정</li>
			</ul>
		`,
    details: `
			<ul>
				<li>프론트엔드 혼자 개발 담당</li>
        <li>소셜 로그인(애플, 카카오, 구글) 개발</li>
        <li>사용자와 백엔드와 소통하여 AI 음성 기능 개발</li>

			</ul>
		`,
    github: "https://github.com/gdsc-ssu/poppet-app",
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

// 모달 기능 초기화
function initModalFunctionality() {
  console.log("모달 기능 초기화 시작");

  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalRole = document.getElementById("modal-role");
  const modalAchievements = document.getElementById("modal-achievements");
  const modalDetails = document.getElementById("modal-details");
  const modalGithub = document.getElementById("modal-github");
  const modalClose = document.getElementById("modal-close");
  const modalPeriod = document.getElementById("modal-period-text");
  console.log("모달 요소들:", {
    modal: !!modal,
    modalTitle: !!modalTitle,
    modalPeriod: !!modalPeriod,
    modalRole: !!modalRole,
    modalAchievements: !!modalAchievements,
    modalDetails: !!modalDetails,
    modalGithub: !!modalGithub,
    modalClose: !!modalClose,
  });

  // 모달을 여는 함수
  function openModal(projectId) {
    console.log("모달 열기 시도:", projectId);
    const project = projectsData[projectId];

    if (!project) {
      console.error("프로젝트 데이터를 찾을 수 없습니다:", projectId);
      return;
    }

    console.log("프로젝트 데이터:", project);

    if (
      modalTitle &&
      modalPeriod &&
      modalRole &&
      modalAchievements &&
      modalDetails &&
      modalGithub &&
      modal
    ) {
      modalTitle.textContent = project.title;
      modalPeriod.textContent = `개발 기간: ${project.period}`;

      // GitHub 링크 설정
      if (project.github) {
        modalGithub.href = project.github;
        modalGithub.style.display = "inline-flex";
      } else {
        modalGithub.style.display = "none";
      }

      console.log("모달 링크 설정:", {
        github: project.github,
        githubElement: modalGithub.href,
      });

      // 각 섹션에 프로젝트별 데이터 설정
      if (modalRole) {
        modalRole.innerHTML = project.role;
      }

      if (modalAchievements) {
        modalAchievements.innerHTML = project.achievements;
      }

      if (modalDetails) {
        modalDetails.innerHTML = project.details;
      }

      // 외부 스크롤 비활성화
      document.body.style.overflow = "hidden";

      // 모바일 뒤로가기 버튼을 위한 히스토리 엔트리 추가
      history.pushState({ modalOpen: true }, "", window.location.href);

      modal.classList.add("show");

      // 모달이 표시된 후 맨 위로 스크롤하고 포커스 설정
      setTimeout(() => {
        // 모달 컨테이너를 맨 위로 스크롤
        const modalContent = modal.querySelector(".modal-content");
        if (modalContent) {
          modalContent.scrollTop = 0;
          // 모달 컨테이너에 tabindex 추가 (포커스 가능하게 만들기)
          modalContent.setAttribute("tabindex", "-1");
          // 모달의 맨 위(모달 컨테이너)에 포커스
          modalContent.focus();
          modalContent.scrollIntoView({ behavior: "instant", block: "start" });
        }
      }, 100); // 딜레이를 조금 늘려서 안정성 확보

      console.log("모달 열림 완료");
    } else {
      console.error("모달 요소가 없습니다");
    }
  }

  // 모달을 닫는 함수
  function closeModal() {
    console.log("모달 닫기");
    if (modal) {
      modal.classList.remove("show");
      // 외부 스크롤 다시 활성화
      document.body.style.overflow = "";
    }
  }

  // 프로젝트 카드 클릭 이벤트 - data-project-id 속성 사용
  const projectCards = document.querySelectorAll(".project-card");
  console.log("프로젝트 카드 개수:", projectCards.length);

  projectCards.forEach((card, index) => {
    const projectId = card.getAttribute("data-project-id");
    console.log(`카드 ${index + 1}의 project-id:`, projectId);

    card.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("카드 클릭됨:", projectId);
      if (projectId) {
        openModal(projectId);
      } else {
        console.error("프로젝트 ID가 없습니다:", card);
      }
    });
  });

  // 모달 닫기 이벤트
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // 모달 외부 클릭으로 닫기
  if (modal) {
    modal.addEventListener("click", function (e) {
      // 링크 버튼들을 클릭한 경우에는 모달을 닫지 않음
      if (
        e.target === modal &&
        !e.target.closest(".btn") &&
        !e.target.closest(".modal-links")
      ) {
        closeModal();
      }
    });
  }

  // GitHub 링크 클릭 이벤트 처리
  if (modalGithub) {
    modalGithub.addEventListener("click", function (e) {
      e.preventDefault(); // 기본 링크 동작 방지
      e.stopPropagation(); // 이벤트 버블링 방지

      console.log("GitHub 링크 클릭됨:", this.href);

      // 링크가 제대로 설정되어 있는지 확인하고 직접 열기
      if (
        this.href &&
        this.href !== "#" &&
        this.href !== "javascript:void(0)" &&
        this.href !== window.location.href + "#" &&
        this.href.startsWith("http")
      ) {
        window.open(this.href, "_blank", "noopener,noreferrer");
      }
    });
  }

  // ESC 키로 모달 닫기
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // 모바일 뒤로가기 버튼 처리
  window.addEventListener("popstate", function (e) {
    if (modal && modal.classList.contains("show")) {
      closeModal();
    }
  });

  console.log("모달 기능 초기화 완료");
}

// DOM 로드 완료 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  initScrollAnimations();
  initSmoothScrolling();
  initModalFunctionality();
});
