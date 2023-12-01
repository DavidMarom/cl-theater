export const timeStampToUnixTime = (timestamp: number) => new Date(timestamp).getTime();
export const epochToString = (epoch: number) => new Date(epoch).toLocaleDateString();
