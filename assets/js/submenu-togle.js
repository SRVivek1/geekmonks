  // Sidebar toggle for small screens
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('course-sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('show');
    });
  }