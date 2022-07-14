import { getConnection } from "typeorm";
import { Address } from "../entities/Address";

export class AddressRespository{
    async getAddress(){
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.find()
    }
    async createAddress(request:Address): Promise<Address>{
        const addressRepo = getConnection().getRepository(Address)
        const address: Address = await addressRepo.save(request)
        return address
    }
}