/* 최초 1회 초기 데이터 세팅 */

(() => {
  if (localStorage.getItem("SEEDED") === "Y") return;

  StorageDB.set("BOARD", []);
  StorageDB.set("BOARD_STAT", []);
  StorageDB.set("BOARD_HISTORY", []);

  localStorage.setItem("SEQ_BOARD_ID", 0);
  localStorage.setItem("SEQ_HISTORY_ID", 0);

  // 샘플 게시글
  const now = new Date().toISOString();
  const id = StorageDB.nextId("SEQ_BOARD_ID");

  StorageDB.set("BOARD", [{
    id,
    title: "공지사항 테스트",
    content: "초기 게시글입니다.",
    status: "ACTIVE",
    writer_id: 1,
    created_by: 1,
    updated_by: 1,
    created_at: now,
    updated_at: now,
    version: 1
  }]);

  StorageDB.set("BOARD_STAT", [{
    board_id: id,
    view_count: 0,
    like_count: 0,
    comment_count: 0
  }]);

  localStorage.setItem("SEEDED", "Y");
})();
