export const uid = () =>
  crypto.randomUUID();

export const createTopic = () => ({
  id: uid(),
  title: "",
  duration: "",
  description: "",
  expanded: true,
  activeTab: "documents",
  documents: [{ id: uid(), title: "" }],
  videos: [],
  urls: [],
});

export const createChapter = () => ({
  id: uid(),
  title: "",
  description: "",
  expanded: true,
  topics: [createTopic()],
});