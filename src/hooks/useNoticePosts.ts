import { useEffect, useState } from "react";
import { fetchNoticePosts, getNoticePosts, sortNoticePosts, type NoticePost } from "../data/notices";

export default function useNoticePosts(limit?: number) {
  const [posts, setPosts] = useState<NoticePost[]>(() => sortNoticePosts(getNoticePosts()));

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const nextPosts = await fetchNoticePosts();
        if (active) setPosts(nextPosts);
      } catch {
        // The curated posts remain available if the network is temporarily unavailable.
      }
    };
    const sync = (event: Event) => {
      const nextPosts = (event as CustomEvent<NoticePost[]>).detail;
      if (Array.isArray(nextPosts)) setPosts(sortNoticePosts(nextPosts));
      else void load();
    };
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("seoulind-notices") : null;

    void load();
    window.addEventListener("seoulind-notices-updated", sync);
    if (channel) channel.onmessage = () => void load();

    return () => {
      active = false;
      window.removeEventListener("seoulind-notices-updated", sync);
      channel?.close();
    };
  }, []);

  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}
