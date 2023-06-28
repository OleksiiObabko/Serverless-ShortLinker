import {hash} from "bcryptjs";

const hashPassword = (password: string): Promise<string> => hash(password, 10);

export {hashPassword};
