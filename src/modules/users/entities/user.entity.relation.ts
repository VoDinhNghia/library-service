import { ServiceGroupStudy } from 'src/modules/library-services/entities/library-services.group-study.entity';
import { Library } from 'src/modules/library/entities/library.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class UserRelation {
  @OneToMany(() => Library, (library) => library.librarian)
  librarian?: Library[];

  @OneToMany(() => ServiceGroupStudy, (groupService) => groupService.user)
  userGroupService?: ServiceGroupStudy[];
}
