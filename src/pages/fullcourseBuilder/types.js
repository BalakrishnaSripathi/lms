export const uid = () => crypto.randomUUID();

export const createTopic = () => ({
  id: uid(),
  backendId: null,
  title: "",
  duration: "",
  description: "",
  expanded: true,
  activeTab: "documents",
  documents: [],
  videos: [],
  urls: [],
});

export const createChapter = () => ({
  id: uid(),
  backendId: null,
  title: "",
  description: "",
  expanded: false,
  topics: [createTopic()],
});