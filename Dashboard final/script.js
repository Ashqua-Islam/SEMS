// ======= JavaScript for Smart Energy Dashboard =======

const $ = id => document.getElementById(id);

// Sidebar toggle
const sidebar = $("sidebar");
const menuBtn = $("menuBtn");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("open");
    sidebar.classList.toggle("closed");
  });

  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      sidebar.classList.add("closed");
    }
  });
}

// Dark mode toggle
const darkToggle = $("darkToggle");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    const icon = darkToggle.querySelector("i");
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      icon.classList.replace("fa-moon", "fa-sun");
      darkToggle.title = "Switch to light mode";
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
      darkToggle.title = "Switch to dark mode";
    }
  });
}

// Live Clock
function updateClock() {
  const clock = $("clock");
  if (clock) clock.textContent = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Profile dropdown
const profile = $("profileMenu");
const dropdownMenu = $("dropdownMenu");

if (profile && dropdownMenu) {
  profile.addEventListener("click", e => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
  });
  document.addEventListener("click", () => dropdownMenu.classList.remove("show"));
}

// Dummy data generation
function rand(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

// Set KPI values
const kwhDay = $("kwhDay");
const kwhWeek = $("kwhWeek");
const kwhMonth = $("kwhMonth");
const ampNow = $("ampNow");
const voltNow = $("voltNow");

if (kwhDay) kwhDay.textContent = rand(20, 40);
if (kwhWeek) kwhWeek.textContent = rand(140, 280);
if (kwhMonth) kwhMonth.textContent = rand(600, 1200);
if (ampNow) ampNow.textContent = rand(4, 12);
if (voltNow) voltNow.textContent = rand(210, 240).toFixed(0);

// Chart themes
function getChartColors() {
  return document.body.classList.contains("dark") ? {
    lineChart: { borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.3)' },
    barChart: { borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.3)' },
    pieChart: { backgroundColor: ['rgba(59,130,246,0.7)', 'rgba(16,185,129,0.7)'] },
  } : {
    lineChart: { borderColor: '#4f8cff', backgroundColor: 'rgba(79,140,255,0.2)' },
    barChart: { borderColor: '#68d391', backgroundColor: 'rgba(104,211,145,0.3)' },
    pieChart: { backgroundColor: ['rgba(79,140,255,0.7)', 'rgba(104,211,145,0.7)'] },
  };
}

Chart.defaults.font.family = "Inter";

// Line Chart
const energyLine = $("energyLine");
if (energyLine) new Chart(energyLine, {
  type: "line",
  data: {
    labels: [...Array(24)].map((_, i) => `${i}:00`),
    datasets: [{
      label: "kW",
      data: [...Array(24)].map(() => rand(1, 5)),
      ...getChartColors().lineChart,
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  },
  options: { responsive: true, plugins: { legend: { display: false } } }
});

// Weekly Bar Chart
const weeklyBar = $("weeklyBar");
if (weeklyBar) new Chart(weeklyBar, {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "kWh",
      data: [...Array(7)].map(() => rand(80, 160)),
      ...getChartColors().barChart
    }]
  },
  options: { responsive: true, plugins: { legend: { display: false } } }
});

// Monthly Bar Chart
const monthlyBar = $("monthlyBar");
if (monthlyBar) new Chart(monthlyBar, {
  type: "bar",
  data: {
    labels: [...Array(30)].map((_, i) => `Day ${i+1}`),
    datasets: [{
      label: "kWh",
      data: [...Array(30)].map(() => rand(20, 50)),
      ...getChartColors().barChart
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { ticks: { maxTicksLimit: 15 } } }
  }
});

// Pie Chart
const ivPie = $("ivPie");
if (ivPie && ampNow && voltNow) new Chart(ivPie, {
  type: "pie",
  data: {
    labels: ["Current (A)", "Voltage (V)"],
    datasets: [{
      data: [parseFloat(ampNow.textContent), parseFloat(voltNow.textContent)],
      backgroundColor: getChartColors().pieChart.backgroundColor,
      borderWidth: 0
    }]
  },
  options: { responsive: true, plugins: { legend: { position: "bottom" } } }
});

// Login Modal
const loginBtn = $("loginBtn");
const loginModal = $("loginModal");
const closeModalBtn = $("closeModal");

if (loginBtn && loginModal && closeModalBtn) {
  loginBtn.addEventListener("click", e => {
    e.preventDefault();
    dropdownMenu?.classList.remove("show");
    loginModal.style.display = "block";
  });
  closeModalBtn.addEventListener("click", () => loginModal.style.display = "none");
  window.addEventListener("click", e => {
    if (e.target === loginModal) loginModal.style.display = "none";
  });
}
// ==== Welcome Page Particles ====
document.addEventListener("DOMContentLoaded", () => {
  tsParticles.load("particles-bg", {
    background: {
      color: { value: "transparent" }
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "bubble" },
        resize: true
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        bubble: { distance: 150, duration: 2, size: 6, opacity: 0.8 }
      }
    },
    particles: {
      number: {
        value: 45,
        density: { enable: true, area: 800 }
      },
      color: {
        value:
          getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#0066ff"
      },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 4 } },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        outModes: { default: "bounce" }
      },
      links: {
        enable: true,
        distance: 150,
        color:
          getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#0066ff",
        opacity: 0.4,
        width: 1
      }
    },
    detectRetina: true
  });
});

function calculateCost() {
  const units = parseFloat(document.getElementById("unitInput").value);
  const rate = parseFloat(document.getElementById("rateInput").value);
  const resultBox = document.getElementById("costResult");

  if (!isNaN(units) && !isNaN(rate) && units >= 0 && rate >= 0) {
    const cost = units * rate;
    resultBox.textContent = `Estimated Cost: ₹${cost.toFixed(2)}`;
  } else {
    resultBox.textContent = "Please enter valid units and rate.";
  }
}
