from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "kim-junha-junior-developer-resume.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

FONT_DIR = Path.home() / "Library" / "Fonts"
pdfmetrics.registerFont(TTFont("NotoKR", str(FONT_DIR / "NOTOSANSKR-REGULAR.TTF")))
pdfmetrics.registerFont(TTFont("NotoKR-Medium", str(FONT_DIR / "NOTOSANSKR-MEDIUM.TTF")))
pdfmetrics.registerFont(TTFont("NotoKR-SemiBold", str(FONT_DIR / "NOTOSANSKR-SEMIBOLD.TTF")))
pdfmetrics.registerFont(TTFont("NotoKR-Bold", str(FONT_DIR / "NOTOSANSKR-BOLD.TTF")))

BLUE = colors.HexColor("#2E6FF2")
INK = colors.HexColor("#121314")
MUTED = colors.HexColor("#626262")
LINE = colors.HexColor("#D9DBE0")
SURFACE = colors.HexColor("#F3F5FA")
PAGE = colors.HexColor("#FAFBFD")


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", fontName="NotoKR-Bold", fontSize=23, leading=27, textColor=BLUE, spaceAfter=2))
styles.add(ParagraphStyle(name="Role", fontName="NotoKR-Medium", fontSize=10, leading=14, textColor=MUTED))
styles.add(ParagraphStyle(name="Intro", fontName="NotoKR-Medium", fontSize=9.5, leading=15, textColor=INK))
styles.add(ParagraphStyle(name="Section", fontName="NotoKR-Bold", fontSize=12, leading=16, textColor=BLUE, spaceAfter=6))
styles.add(ParagraphStyle(name="Label", fontName="NotoKR-SemiBold", fontSize=8.3, leading=12, textColor=BLUE))
styles.add(ParagraphStyle(name="Body", fontName="NotoKR", fontSize=8.4, leading=12.3, textColor=INK))
styles.add(ParagraphStyle(name="Small", fontName="NotoKR", fontSize=7.5, leading=10.5, textColor=MUTED))
styles.add(ParagraphStyle(name="ProjectTitle", fontName="NotoKR-Bold", fontSize=11.3, leading=15, textColor=BLUE))
styles.add(ParagraphStyle(name="ProjectMeta", fontName="NotoKR-Medium", fontSize=7.8, leading=11, textColor=MUTED, alignment=TA_LEFT))
styles.add(ParagraphStyle(name="BulletResume", fontName="NotoKR", fontSize=8.15, leading=12.2, leftIndent=8, firstLineIndent=-6, textColor=INK))


def p(text, style="Body"):
    return Paragraph(text, styles[style])


def section(title, body):
    table = Table([[p(title, "Section")], [body]], colWidths=[174 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.white),
        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
        ("ROUNDEDCORNERS", [7, 7, 7, 7]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8 * mm),
        ("TOPPADDING", (0, 0), (-1, 0), 5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 1 * mm),
        ("TOPPADDING", (0, 1), (-1, 1), 1 * mm),
        ("BOTTOMPADDING", (0, 1), (-1, 1), 5 * mm),
    ]))
    return table


def header():
    profile = Table([
        [p("김준하", "Name"), p("프론트엔드 중심 풀스택 개발자", "Role")],
        [p("복잡한 사용자 흐름을 작은 상태와 명확한 컴포넌트로 나누고, 측정 가능한 성능 개선으로 제품을 안정화합니다.", "Intro"), ""],
        [p("숭실대학교 컴퓨터학부 · 2026년 8월 졸업예정 · 학점 3.72 / 4.5", "Small"), ""],
    ], colWidths=[108 * mm, 66 * mm])
    profile.setStyle(TableStyle([
        ("SPAN", (0, 1), (1, 1)),
        ("SPAN", (0, 2), (1, 2)),
        ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
        ("BOX", (0, 0), (-1, -1), 1.2, BLUE),
        ("ROUNDEDCORNERS", [8, 8, 8, 8]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8 * mm),
        ("TOPPADDING", (0, 0), (-1, 0), 6 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 1 * mm),
        ("TOPPADDING", (0, 1), (-1, 1), 3 * mm),
        ("BOTTOMPADDING", (0, 1), (-1, 2), 2 * mm),
    ]))
    contact = Table([[p("GitHub  github.com/kimjunha1231", "Small"), p("010-9383-9023", "Small"), p("rlawnsgk0610@gmail.com", "Small")]], colWidths=[73 * mm, 43 * mm, 58 * mm])
    contact.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
        ("BOX", (0, 0), (-1, -1), 1.2, BLUE),
        ("LINEABOVE", (0, 0), (-1, 0), 0, SURFACE),
        ("LEFTPADDING", (0, 0), (-1, -1), 8 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
    ]))
    return [profile, contact, Spacer(1, 5 * mm)]


def bullets(items):
    return [p(f"• {item}", "BulletResume") for item in items]


def project(title, meta, items):
    content = [p(title, "ProjectTitle"), p(meta, "ProjectMeta"), Spacer(1, 1.5 * mm)] + bullets(items)
    table = Table([[content]], colWidths=[174 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.white),
        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
        ("ROUNDEDCORNERS", [7, 7, 7, 7]),
        ("LEFTPADDING", (0, 0), (-1, -1), 7 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
    ]))
    return table


def draw_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAGE)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setStrokeColor(BLUE)
    canvas.setLineWidth(1.4)
    canvas.line(18 * mm, 13 * mm, A4[0] - 18 * mm, 13 * mm)
    canvas.setFont("NotoKR-Medium", 7)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(A4[0] - 18 * mm, 8 * mm, f"김준하 · {doc.page}")
    canvas.restoreState()


frame = Frame(18 * mm, 18 * mm, A4[0] - 36 * mm, A4[1] - 31 * mm, id="normal", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
doc = BaseDocTemplate(str(OUTPUT), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=15 * mm, bottomMargin=17 * mm)
doc.addPageTemplates([PageTemplate(id="resume", frames=[frame], onPage=draw_page)])

story = []
story.extend(header())

tech_body = Table([
    [p("Frontend", "Label"), p("TypeScript, React, Next.js, Flutter, Dart", "Body")],
    [p("State / Data", "Label"), p("TanStack Query, Zustand, Riverpod, React Hook Form, Zod", "Body")],
    [p("Backend / Delivery", "Label"), p("Next.js API Routes, Spring Boot, MyBatis, Oracle, Redis, Firebase, Supabase, Vercel", "Body")],
    [p("자격증", "Label"), p("정보처리기사 · MOS Excel Expert 2016", "Body")],
], colWidths=[35 * mm, 139 * mm])
tech_body.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LINEBELOW", (0, 0), (-1, -2), 0.35, LINE),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 1.2 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2 * mm),
]))
story.append(section("기술 스택", tech_body))
story.append(Spacer(1, 4 * mm))

strength_body = Table([
    [p("성능", "Label"), p("JobSecretary 칸반 드래그 최적화: 전체 커밋 271회 → 98회, 비활성 컴포넌트 렌더링 268회 → 0회", "Body")],
    [p("상태 경계", "Label"), p("Dearfam에서 서버 상태와 클라이언트 상태를 분리하고, MSW로 성공·실패·빈 상태를 독립 검증", "Body")],
    [p("통신 설계", "Label"), p("TITO에서 초기 조회는 REST API, 실시간 채팅·투표는 WebSocket으로 분리", "Body")],
    [p("품질", "Label"), p("Lighthouse 접근성 80점대 → 95점대, Jest·Playwright·Sentry로 테스트와 모니터링 구성", "Body")],
], colWidths=[35 * mm, 139 * mm])
strength_body.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LINEBELOW", (0, 0), (-1, -2), 0.35, LINE),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 1.2 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2 * mm),
]))
story.append(section("핵심 역량", strength_body))
story.append(Spacer(1, 4 * mm))

activity_body = Table([
    [p("2024.11 ~ 2025.09", "Small"), p("Dearfam 프론트엔드 리드 · Pre-스타트업 선정 및 창업 사무실 입주", "Body")],
    [p("2024.09 ~ 2025.09", "Small"), p("Google Developer Groups on Campus · 숭실대학교", "Body")],
    [p("2023.09 ~ 2025.03", "Small"), p("숭실대학교 학생복지위원회 · 학생복지위원장", "Body")],
    [p("2024.01", "Small"), p("미래와 소프트웨어와 함께하는 꿈찾기 캠프 · 프로그래밍 STAFF", "Body")],
], colWidths=[45 * mm, 129 * mm])
activity_body.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LINEBELOW", (0, 0), (-1, -2), 0.35, LINE),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 1.2 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2 * mm),
]))
story.append(section("활동", activity_body))
story.append(Spacer(1, 4 * mm))

award_body = Table([
    [p("2024.12", "Label"), p("2024 클라우드 아이디어 공모전", "Body"), p("대상 · 부산시장상", "Body")],
    [p("2024.12", "Label"), p("2024 한이음 ICT멘토링 공모전", "Body"), p("은상 · 정보통신기획평가원장상", "Body")],
    [p("2025.10", "Label"), p("제15회 숭실캡스톤디자인 경진대회", "Body"), p("장려상", "Body")],
    [p("2025.11", "Label"), p("2025 한이음 드림업 공모전", "Body"), p("장려상 · 한국정보산업연합회장상", "Body")],
    [p("2024.11", "Label"), p("숭실 발명아이디어 경진대회", "Body"), p("최우수상 · 숭실대학교 총장상", "Body")],
], colWidths=[24 * mm, 83 * mm, 67 * mm])
award_body.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LINEBELOW", (0, 0), (-1, -2), 0.35, LINE),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 1 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 1.1 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 1.1 * mm),
]))
story.append(section("수상", award_body))

story.append(PageBreak())
story.append(p("프로젝트", "Section"))
story.append(Spacer(1, 1 * mm))
story.append(project("JobSecretary · AI 취업 준비 관리 서비스", "2025.11 ~ 2025.12 · 개인 프로젝트 · 기획/설계/개발/테스트/배포 100%", [
    "Next.js, TypeScript, Supabase, Gemini API, Vercel로 채용 공고·지원 현황·자기소개서·면접 준비를 하나의 흐름으로 연결했습니다.",
    "dnd-kit의 드래그 상태와 카드 콘텐츠를 분리하고 React.memo를 적용해 전체 커밋 271회 → 98회, 비활성 렌더링 268회 → 0회를 달성했습니다.",
    "React Hook Form·Zod·TanStack Query·Zustand를 조합하고 Jest·Playwright·Sentry를 연결해 입력 안정성과 회귀 검증 환경을 구성했습니다. Lighthouse 접근성은 80점대에서 95점대로 향상했습니다.",
]))
story.append(Spacer(1, 3 * mm))
story.append(project("Dearfam · AI 가족 추억 콘텐츠 서비스", "2024.11 ~ 2025.09 · 프론트엔드 리드 · 기여도 80%", [
    "Flutter·Firebase MVP를 React·TypeScript 웹 서비스로 전환하고 Zustand·TanStack Query로 클라이언트/서버 상태를 분리했습니다.",
    "MSW로 가족·게시글·댓글·인증 API를 모킹해 백엔드와 병렬 개발했으며, mutation 실패 시 캐시 롤백을 포함한 낙관적 업데이트를 구현했습니다.",
    "2024 클라우드 아이디어 공모전 대상(부산시장상), Pre-스타트업 선정 및 숭실캡스톤디자인 장려상으로 이어진 팀 프로젝트입니다.",
]))
story.append(Spacer(1, 3 * mm))
story.append(project("TITO · LLM 기반 실시간 토론 보조 서비스", "2024.03 ~ 2024.12 · 프론트엔드 리드 · 기여도 80%", [
    "Flutter·Dart·Riverpod·Dio·Retrofit·WebSocket으로 소셜 로그인, 토론 탐색, 실시간 채팅·투표·AI 코칭 화면을 구현했습니다.",
    "토론방 초기 정보와 과거 내역은 REST API로 먼저 조회하고, 채팅·턴 상태·투표만 WebSocket으로 분리해 진입 시 UI 깜빡임과 순서 의존성을 줄였습니다.",
    "2024 한이음 ICT멘토링 은상(정보통신기획평가원장상) 및 App Store·One Store 배포를 달성했습니다.",
]))
story.append(Spacer(1, 3 * mm))
story.append(project("POPPET · 노약자를 위한 AI 말동무 서비스", "2025.05 · 프론트엔드 담당 · 기여도 100%", [
    "Flutter·Dart·Riverpod·GoRouter·Dio·Retrofit·Secure Storage로 음성 대화, 인증, 보호자 설정 화면을 구현했습니다.",
    "녹음·업로드·응답 대기·재생 상태를 분리해 사용자가 현재 처리 단계를 이해할 수 있도록 피드백 UI를 구성했습니다.",
    "2025 GDG Solution Challenge에 참여한 크로스 플랫폼 팀 프로젝트입니다.",
]))
story.append(Spacer(1, 4 * mm))
story.append(p("Other projects: 여행의 이유(React) · SSYUNG(React) · 식권대장 KOSA(Next.js/Firebase) · 상세 기술 기록은 포트폴리오에서 확인할 수 있습니다.", "Small"))

doc.build(story)
print(OUTPUT)
