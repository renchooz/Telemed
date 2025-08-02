let io;
export const initIO = (serverInstance) => {
  io = serverInstance;
};
export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};