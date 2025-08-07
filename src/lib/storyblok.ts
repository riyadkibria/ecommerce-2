import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_API_TOKEN, // Put your token in .env.local
  cache: { clear: "auto", type: "memory" },
});

export default Storyblok;
