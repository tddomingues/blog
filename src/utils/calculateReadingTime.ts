const calculateReadingTime = (content: string): number => {
  const wordsPerSeconds = 200 / 60;
  const words = content.split(" ").length;
  const seconds = words / wordsPerSeconds;
  return Math.ceil(seconds);
};

export default calculateReadingTime;
