import { AddressRespository } from "../repository/AddressRepository";

export class AddressService{
    constructor(private addressrepo:AddressRespository){

    }
    async getAddress(){
        
        return this.addressrepo.getAddress();
    
}
    async createAddress(body:any){
        
        return this.addressrepo.createAddress(body);

}
}