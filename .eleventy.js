const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  /******************* Filters ************************/
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("todayDate", (dateObj) => {
    return DateTime.local().toFormat("yyyy-LL-dd");
  });
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter("isNavigation", (array) => {
    if (array) {
      return array.includes("nav") ? true : false;
    } else {
      return false;
    }
  });

  eleventyConfig.addFilter("currentContent", (articles) => {
    const currentDate = new Date();

    let currentContent = articles.reverse().filter((article) => {
      return article.data.date < currentDate;
    });
    return currentContent;
  });

  /**************** END Filters********************/

  eleventyConfig.addCollection("tagList", require("./src/_11ty/getTagList"));

  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/assets/geojson");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  /**************** Markdown Plugins********************/
  let markdownIt = require("markdown-it");
  var markdownItAttrs = require("markdown-it-attrs");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  let optsAnchor = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
  };
  let markdownLib = markdownIt(options)
    .use(markdownItAttrs)
    .use(markdownItAnchor, optsAnchor);
  eleventyConfig.setLibrary("md", markdownLib);
  /**************** END Markdown Plugins********************/

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("dist/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
  };
};
