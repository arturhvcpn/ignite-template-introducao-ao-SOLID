import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error(`User does not exist`);
    }

    const userAdmin = this.usersRepository.turnAdmin(user);

    if (!userAdmin.admin) {
      throw new Error(`User is not admin`);
    }

    return userAdmin;
  }
}

export { TurnUserAdminUseCase };
