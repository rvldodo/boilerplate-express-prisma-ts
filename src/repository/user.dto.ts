import BaseDTO, { prisma } from "./base.dto";

class UserDTO extends BaseDTO {
  constructor() {
    super("user");
  }

  async findByEmail(email: string) {
    return await prisma[this.model].findUnique({ where: { email } });
  }
}

export default UserDTO;
