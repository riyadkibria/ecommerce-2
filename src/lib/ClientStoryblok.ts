import StoryblokClient from "storyblok-js-client";

const ClientStoryblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN, // Use NEXT_PUBLIC_ token here
  cache: { clear: "auto", type: "memory" },
});

export default ClientStoryblok;
