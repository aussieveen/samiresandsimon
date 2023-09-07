const Image = require('@11ty/eleventy-img');

// Get all site information
module.exports = async function () {
    const defaults = {
        formats: ["avif", "webp", "jpeg"],
        outputDir: "./_site/images/",
        urlPath: "/images/",
    };

    const images = [];

    const resized = {};

    await images.forEach(async image => {
        resized[image.name] = 
            await Image(image.url, {
                ...defaults,
                widths: image.widths,
            });
    });

    return {
        'images': resized,
    };
};
