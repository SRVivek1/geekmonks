// assets/js/course.js
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.topic-link');
    const contentDiv = document.getElementById('topic-content');
    const courseLinks = document.querySelectorAll('.course-link');
    const baseurl = '{{ site.baseurl }}'; // Liquid variable, replaced during build

    function loadTopic(coursePath, topicId) {
        fetch(`${baseurl}${coursePath}/_topics/${topicId}.md`)
            .then(response => response.text())
            .then(md => {
                contentDiv.innerHTML = `<div class="topic-content"><h1>${topicId.replace(/-/g, ' ').toUpperCase()}</h1><p>Content for ${topicId}... Last updated: 09:04 PM IST, Thursday, September 18, 2025.</p></div>`;
            })
            .catch(err => console.error('Error loading topic:', err));
    }

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            courseLinks.forEach(cl => {
                const topicList = document.getElementById(`topics-${cl.dataset.course | slugify}`);
                if (topicList) topicList.classList.add('collapse');
            });
            this.classList.add('active');
            const topicId = this.dataset.topic;
            const coursePath = this.dataset.coursePath;
            loadTopic(coursePath, topicId);
            const topicList = document.getElementById(`topics-${coursePath.split('/').pop() | slugify}`);
            if (topicList) topicList.classList.remove('collapse');
        });
    });

    // Load default topic based on front matter
    const defaultTopic = '{{ page.default_topic | default: "ec2" }}';
    const defaultLink = document.querySelector(`[data-topic="${defaultTopic}"]`);
    if (defaultLink) defaultLink.click();
});