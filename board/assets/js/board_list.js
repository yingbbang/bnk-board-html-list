document.addEventListener("DOMContentLoaded", () => {
  const boards = StorageDB.get("BOARD") || [];

  // 최신글 우선 정렬 (created_at DESC) 상태 ACTIVE만 노출 + 최신 정렬
  boards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  boards.sort((a, b) => {
  if (a.is_notice && !b.is_notice) return -1;
  if (!a.is_notice && b.is_notice) return 1;
  return new Date(b.created_at) - new Date(a.created_at);
});

  const stats = StorageDB.get("BOARD_STAT", []);

  const tbody = document.getElementById("boardList");
  tbody.innerHTML = "";

  boards
    .filter(b => b.status === "ACTIVE")
    .forEach(b => {
      const stat = stats.find(s => s.board_id === b.id) || {
        view_count: 0
      };

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${b.id}</td>
        <td class="title">
          <a href="view.html?id=${b.id}">
            ${Util.escape(b.title)}
          </a>
        </td>
        <td>
          <span class="status ${b.status}">
            ${b.status}
          </span>
        </td>
        <td>${stat.view_count}</td>
        <td>${Util.fmt(b.created_at)}</td>
      `;

      tbody.appendChild(tr);
    });
});
