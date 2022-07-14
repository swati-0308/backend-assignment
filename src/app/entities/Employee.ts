import{  Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import { AbstractEntity } from './AbstractEntity';
import { Address } from './Address';
import { Department } from './Department';
@Entity("employee")
export class Employee extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public name: string;

    @Column({ nullable: true})
    public password:string

    @Column({ nullable: true})
    public role:string

    @ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department;

        @Column({ nullable: false })
        public departmentId: string;
    
    @OneToOne(() => Address, {cascade:true})
    @JoinColumn()
    public address: Address;
    
        @Column({nullable:true})
        public addressId:string;
    
}
