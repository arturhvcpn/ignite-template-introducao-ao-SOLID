import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list();
    const { admin, id } = this.usersRepository.findById(user_id);

    if (!id) {
      throw new Error(`User does not exist`);
    }

    if (!admin) {
      throw new Error(`User unathorized`);
    }

    return users;
  }
}

export { ListAllUsersUseCase };
