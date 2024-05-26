import { User, UserSchema } from 'src/user/entities/user.entity';
import { Child, ChildSchema } from 'src/child/entities/child.entity';
import { Course, CourseSchema } from 'src/course/entities/course.entity';

export default [
  { name: User.name, schema: UserSchema },
  { name: Child.name, schema: ChildSchema },
  { name: Course.name, schema: CourseSchema },
];
