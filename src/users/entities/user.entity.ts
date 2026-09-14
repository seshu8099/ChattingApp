import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity('users') // This will create a table named "users"
export class User {
  @PrimaryColumn('uuid')
  id: string; // We use UUIDs so user IDs aren't guessable (1, 2, 3...)

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv7();
    }
  }

  @Column({ unique: true })
  username: string; // Must be unique across the app

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string; // We store the hash, never the raw password

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
