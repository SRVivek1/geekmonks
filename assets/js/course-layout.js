// assets/js/course.js
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens
}

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.topic-link');
  const contentDiv = document.getElementById('topic-content');
  const courseLinks = document.querySelectorAll('.course-link');
  const { baseurl, defaultTopic } = window.courseConfig;

  function loadTopic(coursePath, topicId) {
    fetch(`${baseurl}${coursePath}/_topics/${topicId}.md`)
      .then(response => response.text())
      .then(md => {
        contentDiv.innerHTML = `<div class="topic-content"><h1>${topicId.replace(/-/g, ' ').toUpperCase()}</h1><p>Let's learn ${topicId}...</p></div>`;
      })
      .catch(err => console.error('Error loading topic:', err));
  }
    
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      courseLinks.forEach(cl => {
        const topicList = document.getElementById(`topics-${slugify(cl.dataset.course)}`);
        /* Commenting this because submenus are auto collapsing while loading the page. */
        if (topicList) topicList.classList.remove('collapse');
      });
      this.classList.add('active');
      const topicId = this.dataset.topic;
      const coursePath = this.dataset.coursePath;
      loadTopic(coursePath, topicId);
      const topicList = document.getElementById(`topics-${slugify(coursePath.split('/').pop())}`);
      if (topicList) topicList.classList.remove('collapse');
    });
  });

  // Load default topic based on config
  const defaultLink = document.querySelector(`[data-topic="${defaultTopic}"]`);
  if (defaultLink) defaultLink.click();
});