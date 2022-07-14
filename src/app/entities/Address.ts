import{ Column, Entity, BaseEntity, JoinColumn, PrimaryGeneratedColumn, OneToOne} from 'typeorm'
@Entity("address")
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public addr_line1: string;

    @Column({ nullable: false })
    public addr_line2: string;

    @Column({ nullable: false })
    public city: string;

    @Column({ nullable: false })
    public zip: string;

    @Column({ nullable: false })
    public state: string;

}