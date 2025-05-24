import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { Company } from "src/company/entities/company.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    sku: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: string;

    @Column('decimal', { precision: 10, scale: 2 })
    cost: string;

    @Column()
    stock: number;

    @Column()
    min_stock: number;

    @Column()
    max_stock?: number;

    @Column()
    barcode: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    category_id: string;

    @Column()
    brand_id: string;

    @Column()
    company_id: string;

    @ManyToOne(() => Category, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => Brand, { eager: true })
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;

    @ManyToOne(() => Company, { eager: true })
    @JoinColumn({ name: 'company_id' })
    company: Company;

}
