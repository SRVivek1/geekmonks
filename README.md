# project

## _layout:
* Layouts are templates that can be used by any page in your site and wrap around page content. They are stored in a directory called **_layouts**.
* Create the **_layouts** directory in your site’s root folder and create a new default.html file.
* We can have differnt layouts for each page based on requirement.


## _includes:
* The include tag allows you to include content from another file stored in an **_includes** folder. 
* Includes are useful for having a single source for source code that repeats around the site or for improving the readability.


## _data:
* Jekyll supports loading data from YAML, JSON, and CSV files located in a **_data** directory.
* Data files are a great way to separate content from source code to make the site easier to maintain.
* Jekyll makes this data file available to you at ***site.data.navigation***.


## assets
* Using CSS, JS, images and other assets is straight forward with Jekyll. 
* Place them in your site folder and they’ll copy across to the built site.
* Jekyll sites often use this structure to keep assets organized:
  * assets
    * css
    * images
    * js
* So, from your assets folder, create folders called css, images and js.
* Additionally, directly under the root create another folder called ***_sass***, which you will need shortly.


## _sass:
* Inlining the styles used in _includes/navigation.html(adding or configuring within the same file) is not a best practice.
* Instead, let’s style the current page by defining our first class in a new css file instead.
* To do this, refer to the class (defined in .scss file) from within the navigation.html file by removing the inline styling code.

## _posts:
* Blog posts live in a folder called _posts
* The filename for posts have a special format: the publish date, then a title, followed by an extension.
* e.g. - Create your first post at ***_posts/2018-08-20-bananas.md***.


## index\.md / index.html:
* intial file to load by default.


## Configuration [_config.yml]:
* Jekyll configuration happens in a file called _config.yml (by default).
* Create _config.yml in the root.

### Collection:
  * To set up a collection you need to tell Jekyll about it.
  * _config.yml:
    ```yml 
        collections:
          authors:
            output: true
    ```
  * Documents (the items in a collection) live in a folder in the root of the site named **_*collection_name***. 
    * In this case, **_authors**.
  * By default, collections do not output a page for documents. 
  * In this case we want each author to have their own page so let’s tweak the collection configuration.

