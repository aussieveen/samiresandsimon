const Image = require('@11ty/eleventy-img');

module.exports = async function () {
    
    const siteData = {
        title: "Samires and Simon's Wedding",
        description: "Save the date for the wedding of Samires Martins and Simon McWhinnie",
    };

    const iconDefaults = {
        formats: ["png", "svg"],
        outputDir: "./_site/images/",
        urlPath: "/images/",
        widths: [48, 192, 512, 1024],
    };

    const iconBackground = await Image('src/assets/favicons/favicon.png', iconDefaults);
    const iconTransparent = await Image('src/assets/favicons/favicon.svg', iconDefaults);
    
    const icons = {
        ico: '/favicon.ico',
        svg: '/favicon.svg',
        maskIcon: '/favicon.svg',
        apple: iconBackground.png.filter(image => image.width === 192).pop().url,
    };

    const formatIcons = (icon, purpose = 'any') => {
        return {
            src: icon.url,
            type: icon.sourceType,
            sizes: `${icon.width}x${icon.height}`,
            purpose,
        };
    };

    const manifest = {
        colours: {
            theme: "#a7bd9f",
            background: "#fdfdfa",
        },
        icons: [
            ...iconBackground.png.map(icon => formatIcons(icon)),
            ...iconTransparent.svg.map(icon => formatIcons(icon, 'maskable')),
            ...iconTransparent.png.map(icon => formatIcons(icon)),
        ],
    };

    return {
        ...siteData,
        manifest,
        icons,
    };
};