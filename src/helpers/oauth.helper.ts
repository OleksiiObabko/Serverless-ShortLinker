const removeBearer = (header: string): string => header.replace("Bearer ", "");

export {removeBearer};
