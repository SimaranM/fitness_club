import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
    siteMetadata: {
        title: `Jamflow Templates`,
        siteUrl: `https://www.jamflow.de`,
        author: `BitTwister IT GmbH`,
        description: `BitTwister IT GmbH - Hair saloon template`,
    },
    graphqlTypegen: true,
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-typescript",
        "gatsby-transformer-json",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "data",
                path: "./src/data/",
            },
            __key: "data",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "logo",
                path: "./src/images/logo/",
            },
            __key: "logo",
        },
    ],
};

export default config;
