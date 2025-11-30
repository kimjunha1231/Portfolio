// 마크다운을 HTML로 변환하는 간단한 함수
function markdownToHtml(markdown) {
  if (!markdown) return "";

  return (
    markdown
      // 헤딩 처리
      .replace(/^### (.+)$/gm, "<h4>$1</h4>")
      .replace(/^## (.+)$/gm, "<h3>$1</h3>")
      .replace(/^# (.+)$/gm, "<h2>$1</h2>")
      // 굵은 글씨 처리
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // 리스트 처리
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      // 연속된 li 태그들을 ul로 감싸기
      .replace(/(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/gm, "<ul>$1</ul>")
      // 중첩 리스트 처리 (들여쓰기가 있는 경우)
      .replace(/  - (.+)$/gm, '  <li style="margin-left: 2rem;">$1</li>')
      // 링크 처리
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank">$1</a>'
      )
      // 이미지 처리
      .replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img src="$2" alt="$1" style="width: 100%; max-width: 500px; border-radius: 0.5rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); margin: 0.5rem 0;" />'
      )
      // 줄바꿈 처리
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>")
      // 단락 태그로 감싸기
      .replace(/^(.+)/, "<p>$1")
      .replace(/(.+)$/, "$1</p>")
      // 빈 단락 제거
      .replace(/<p><\/p>/g, "")
  );
}

// 프로젝트 데이터를 전역 변수에서 가져오기 (마크다운에서 로드됨)
function getProjectsData() {
  if (typeof window !== "undefined" && window.projectsData) {
    // 마크다운 본문을 HTML로 변환
    const processedData = {};
    for (const [key, project] of Object.entries(window.projectsData)) {
      processedData[key] = {
        ...project,
        role: `<ul><li>${project.role.replace(/,\s*/g, "</li><li>")}</li></ul>`,
        achievements: project.achievements
          ? `<ul><li>${project.achievements}</li></ul>`
          : "",
        features: project.features
          ? `<ul><li>${project.features.replace(/,\s*/g, "</li><li>")}</li></ul>`
          : "",
        details: markdownToHtml(project.details),
      };
    }
    return processedData;
  }
  return {};
}

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
    const projectsData = getProjectsData();
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
      const modalAchievementsHeader = document.getElementById(
        "modal-achievements-header"
      );

      if (modalRole) {
        modalRole.innerHTML = project.role;
      }

      if (modalAchievements) {
        if (project.features) {
          modalAchievements.innerHTML = project.features;
          if (modalAchievementsHeader)
            modalAchievementsHeader.textContent = "주요 기능";
        } else {
          modalAchievements.innerHTML = project.achievements;
          if (modalAchievementsHeader)
            modalAchievementsHeader.textContent = "성과";
        }
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
