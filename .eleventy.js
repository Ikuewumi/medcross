const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const pluginWebc = require("@11ty/eleventy-plugin-webc");


module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(pluginWebc, {
        components: "_includes/**/*.webc"
    })



    return {
        dir: {
            input: "src"
        }
    }
};