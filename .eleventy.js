const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(EleventyVitePlugin);

    eleventyConfig.addPassthroughCopy({ 
        src:  '/'
    });


    return {
        dir: {
            input: "src"
        }
    }
};