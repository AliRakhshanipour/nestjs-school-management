import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GradeModule } from './grade/grade.module';
import { FieldModule } from './field/field.module';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'alirakhshanipur',
      password: '',
      database: 'nest-school-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    GradeModule,
    FieldModule,
    ClassModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
