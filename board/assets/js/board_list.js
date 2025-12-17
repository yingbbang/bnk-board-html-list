document.addEventListener("DOMContentLoaded", () => {
  const boards = StorageDB.get("BOARD", []);
  const stats  = StorageDB.get("BOARD_STAT", []);

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
