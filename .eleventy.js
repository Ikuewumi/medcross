const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const pluginWebc = require("@11ty/eleventy-plugin-webc");


module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(pluginWebc, {
        components: "src/_includes/webc/**/*.webc"
    })


    eleventyConfig.addPassthroughCopy("./src/js/*.js");
    eleventyConfig.addPassthroughCopy("./src/css/base.css");




    return {
        dir: {
            input: "src"
        }
    }
};