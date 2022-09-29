import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"


interface IUser {
    id?:string
    username: string;
    email: string;
    telefono: string;
    provincia: string;
    ciudad: string;
  }


class UserService {

  async create({ username, email, telefono, provincia, ciudad }: IUser) {
    if (!username || !email || !telefono || !provincia || !ciudad) {
      throw new Error("Por favor rellene todos los campos.");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const usernameAlreadyExists = await usersRepository.findOne({ username });

    if (usernameAlreadyExists) {
      throw new Error("El usuario ya creado");
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("Email ya registrado");
    }

    const telefonoAlreadyExists = await usersRepository.findOne({ telefono });

    if (telefonoAlreadyExists) {
      throw new Error("telefono ya registrado");
    }

    const user = usersRepository.create({ username, email, telefono, provincia, ciudad });
    console.log(user)

    await usersRepository.save(user);

    return user;

  }

  async delete(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();

    return user;

  }

  async getData(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    return user;
  }

  async list() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor rellene todos los campos");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .where("username like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("telefono like :search", { search: `%${search}%` })
      .orWhere("provincia like :search", { search: `%${search}%` })
      .orWhere("ciudad like :search", { search: `%${search}%` })
      .getMany();

    return user;

  }

  async update({ id, username, email, telefono, provincia, ciudad }: IUser) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ username, email, telefono, provincia, ciudad })
      .where("id = :id", { id })
      .execute();

    return user;

  }
}

export { UserService };