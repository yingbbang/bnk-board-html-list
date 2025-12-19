/* 게시글 등록 */

function bufToHex(buffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", enc);
  return bufToHex(hash);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("writeForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    /* =========================
     * 1. 기본 데이터 로드
     * ========================= */
    const boards = StorageDB.get("BOARD") || [];
    const stats  = StorageDB.get("BOARD_STAT") || [];

    const category = form.category.value;
    const title    = form.title.value.trim();
    const content  = form.content.value.trim();
    const writer   = form.writer.value.trim() || "익명";
    const password = form.password.value.trim();
    const files    = form.attachments?.files || [];

    /* =========================
     * 2. 유효성 검사
     * ========================= */
    if (!category) { alert("카테고리를 선택하세요."); return; }
    if (!title)    { alert("제목을 입력하세요."); return; }
    if (!content)  { alert("내용을 입력하세요."); return; }
    if (!password) { alert("비밀번호를 입력하세요."); return; }

    if (files.length > 5) {
      alert("첨부파일은 최대 5개까지 등록할 수 있습니다.");
      return;
    }

    /* =========================
     * 3. 첨부파일 메타데이터 처리 (실파일 저장 ❌)
     * ========================= */
    const attachments = Array.from(files).map(file => ({
      file_name: file.name,
      file_size: file.size,
      mime_type: file.type
    }));

    /* =========================
     * 4. 게시글 저장
     * - 평문 password 저장 금지 → 해시 저장
     * ========================= */
    const now = new Date().toISOString();
    const id  = StorageDB.nextId("SEQ_BOARD_ID");

    const deletePasswordHash = await sha256(password);

    boards.push({
      id,
      category,
      title,
      content,
      writer,

      // ✅ 익명 삭제용 비밀번호(해시)
      is_anonymous: writer === "익명",
      delete_password_hash: deletePasswordHash,

      attachments,
      status: "ACTIVE",
      is_notice: false,
      is_pinned: false,
      created_at: now
    });

    /* =========================
     * 5. 통계 초기화
     * ========================= */
    stats.push({
      board_id: id,
      view_count: 0,
      like_count: 0,
      comment_count: 0
    });

    StorageDB.set("BOARD", boards);
    StorageDB.set("BOARD_STAT", stats);

    /* =========================
     * 6. 이동
     * ========================= */
    location.href = "index.html";
  });
});
