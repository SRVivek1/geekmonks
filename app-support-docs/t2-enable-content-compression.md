# Cache bruster - version static files

* **Step-1:** create a version tag in _config.yml
  * Cache burster for asset links
  * Change this manually on major updates
    * site_css_version: 0.1.0 
    * site_js_version: 0.1.0

* **Step-2:** suffix resource url with version query parameter
  * <script src="{{ '/assets/js/mermaid-diagram-render.js' | relative_url }}?v={{site.site_js_version}}"></script>

