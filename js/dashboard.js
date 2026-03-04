const revenueCtx = document.getElementById("revenueChart");
const categoryCtx = document.getElementById("categoryChart");

let revenueChart;

function createRevenueChart(range) {
  const labels =
    range === "month"
      ? ["Week 1", "Week 2", "Week 3", "Week 4"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data =
    range === "month"
      ? [18000, 22000, 19500, 25000]
      : [2200, 3200, 2800, 3500, 4100, 4800, 4300];

  if (revenueChart) {
    revenueChart.data.labels = labels;
    revenueChart.data.datasets[0].data = data;
    revenueChart.update();
    return;
  }

  if (!revenueCtx) return;

  revenueChart = new Chart(revenueCtx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Revenue ($)",
          data,
          backgroundColor: "rgba(246, 213, 138, 0.8)",
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: { color: "#e5ded4" },
          grid: { display: false },
        },
        y: {
          ticks: { color: "#e5ded4" },
          grid: { color: "rgba(255,255,255,0.08)" },
        },
      },
      plugins: {
        legend: {
          labels: { color: "#f8f5f0" },
        },
      },
    },
  });
}

function createCategoryChart() {
  if (!categoryCtx) return;

  new Chart(categoryCtx, {
    type: "doughnut",
    data: {
      labels: ["Pizza", "Burgers", "Mains", "Desserts", "Drinks"],
      datasets: [
        {
          data: [28, 22, 18, 16, 16],
          backgroundColor: [
            "rgba(246, 213, 138, 0.9)",
            "rgba(201, 155, 58, 0.9)",
            "rgba(142, 116, 44, 0.9)",
            "rgba(255, 255, 255, 0.2)",
            "rgba(255, 255, 255, 0.08)",
          ],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#f8f5f0", usePointStyle: true },
        },
      },
    },
  });
}

const rangeSelect = document.getElementById("revenue-range");
if (rangeSelect) {
  rangeSelect.addEventListener("change", () => {
    createRevenueChart(rangeSelect.value);
  });
}

createRevenueChart("week");
createCategoryChart();

const reservationSearch = document.getElementById("reservation-search");
const reservationTableBody = document.getElementById("reservation-table-body");

if (reservationSearch && reservationTableBody) {
  reservationSearch.addEventListener("input", () => {
    const query = reservationSearch.value.toLowerCase();
    const rows = reservationTableBody.querySelectorAll("tr");
    rows.forEach((row) => {
      const nameCell = row.children[0];
      const name = nameCell.textContent?.toLowerCase() || "";
      row.style.display = name.includes(query) ? "" : "none";
    });
  });
}

  