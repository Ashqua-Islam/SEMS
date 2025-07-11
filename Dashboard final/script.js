const $ = id => document.getElementById(id);

// Sidebar toggle
const sidebar = $("sidebar");
const menuBtn = $("menuBtn");

if (menuBtn && sidebar) {
  // Toggle sidebar when clicking the button
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent it from triggering outside click
    sidebar.classList.toggle("open");
    sidebar.classList.toggle("closed");
  });

  // Close sidebar when clicking outside of it
  document.addEventListener("click", (e) => {
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnMenuBtn = menuBtn.contains(e.target);

    if (!isClickInsideSidebar && !isClickOnMenuBtn && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      sidebar.classList.add("closed");
    }
  });
}

const darkToggle = $("darkToggle");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    const icon = darkToggle.querySelector("i");

    // Toggle the theme first
    document.body.classList.toggle("dark");

    // Then update the icon to indicate the mode it will switch to next
    if (document.body.classList.contains("dark")) {
      if (icon) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
      darkToggle.title = "Switch to light mode";
    } else {
      if (icon) {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
      darkToggle.title = "Switch to dark mode";
    }

    // Apply the background color dynamically
    if (document.body.classList.contains("dark")) {
      document.body.style.backgroundColor = "#1e1e28";  // Dark mode background
    } else {
      document.body.style.backgroundColor = "#f5f7fa";  // Light mode background
    }
  });
}

// Live Clock
function updateClock() {
  const clock = $("clock");
  if (clock) {
    clock.textContent = new Date().toLocaleTimeString();
  }
}
updateClock();
setInterval(updateClock, 1000);

// Profile dropdown toggle
const profile = $("profileMenu");
const dropdownMenu = $("dropdownMenu");

if (profile && dropdownMenu) {
  profile.addEventListener("click", e => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
  });

  // Close dropdown if clicking outside
  document.addEventListener("click", () => {
    dropdownMenu.classList.remove("show");
  });
}

// Dummy data and chart rendering
function rand(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

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

// Chart color schemes based on light/dark mode
const chartColorsLight = {
  lineChart: {
    borderColor: '#4f8cff',   // Soft light blue
    backgroundColor: 'rgba(79, 140, 255, 0.2)', // Soft light blue with transparency
  },
  barChart: {
    borderColor: '#68d391',   // Soft green
    backgroundColor: 'rgba(104, 211, 145, 0.3)', // Light green
  },
  pieChart: {
    backgroundColor: [
      'rgba(79, 140, 255, 0.7)',   // Light blue for current
      'rgba(104, 211, 145, 0.7)', // Light green for voltage
    ],
  },
};

const chartColorsDark = {
  lineChart: {
    borderColor: '#3b82f6',   // Bright blue for dark mode
    backgroundColor: 'rgba(59, 130, 246, 0.3)', // Lighter blue with transparency
  },
  barChart: {
    borderColor: '#10b981',   // Bright green
    backgroundColor: 'rgba(16, 185, 129, 0.3)', // Lighter green
  },
  pieChart: {
    backgroundColor: [
      'rgba(59, 130, 246, 0.7)',   // Blue for current
      'rgba(16, 185, 129, 0.7)', // Green for voltage
    ],
  },
};

// Apply chart colors based on the current theme
function getChartColors() {
  if (document.body.classList.contains("dark")) {
    return chartColorsDark;
  }
  return chartColorsLight;
}

Chart.defaults.font.family = "Inter";

// Line Chart (Energy Profile)
const energyLine = $("energyLine");
if (energyLine) {
  new Chart(energyLine, {
    type: "line",
    data: {
      labels: [...Array(24)].map((_, h) => `${h}:00`),
      datasets: [{
        label: "kW",
        data: [...Array(24)].map(() => rand(1, 5)),
        borderColor: getChartColors().lineChart.borderColor,
        backgroundColor: getChartColors().lineChart.backgroundColor,
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}

// Weekly Consumption Bar Chart
const weeklyBar = $("weeklyBar");
if (weeklyBar) {
  new Chart(weeklyBar, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "kWh",
        data: [...Array(7)].map(() => rand(80, 160)),
        borderColor: getChartColors().barChart.borderColor,
        backgroundColor: getChartColors().barChart.backgroundColor,
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}

// Monthly Consumption Bar Chart
const monthlyBar = $("monthlyBar");
if (monthlyBar) {
  new Chart(monthlyBar, {
    type: "bar",
    data: {
      labels: [...Array(30)].map((_, i) => `Day ${i + 1}`),
      datasets: [{
        label: "kWh",
        data: [...Array(30)].map(() => rand(20, 50)),
        borderColor: getChartColors().barChart.borderColor,
        backgroundColor: getChartColors().barChart.backgroundColor,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { x: { ticks: { maxTicksLimit: 15 } } }
    }
  });
}

// Current vs Voltage Pie Chart
const ivPie = $("ivPie");
if (ivPie && ampNow && voltNow) {
  new Chart(ivPie, {
    type: "pie",
    data: {
      labels: ["Current (A)", "Voltage (V)"],
      datasets: [{
        data: [parseFloat(ampNow.textContent), parseFloat(voltNow.textContent)],
        backgroundColor: getChartColors().pieChart.backgroundColor,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}

// Login Modal Logic
const loginBtn = $("loginBtn");       // the new login link inside dropdown
const loginModal = $("loginModal");
const closeModalBtn = $("closeModal");

if (loginBtn && loginModal && closeModalBtn) {
  // Open modal on loginBtn click
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (dropdownMenu) dropdownMenu.classList.remove("show"); // close dropdown
    loginModal.style.display = "block";    // show modal
  });

  // Close modal on close button click
  closeModalBtn.addEventListener("click", () => {
    loginModal.style.display = "none";
  });

  // Close modal on clicking outside modal content
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = "none";
    }
  });
}
