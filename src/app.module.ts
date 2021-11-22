import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ElectionModule} from "./Election/election.module";
import {CreateElectionModule} from "./CreateElection/createElection.module";
import {StellarModule} from "./Stellar/stellar.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            entities: ['dist/**/*.entity{.ts,.js}'],
            migrationsTableName: 'migration',
            migrations: ["dist/migrations/*{.ts,.js}"],
            cli: {
                migrationsDir: 'src/migrations',
            },
            synchronize: true,
            extra: {
                ssl: {
                    rejectUnauthorized: false,
                },
            },
        }),
        ElectionModule,
        CreateElectionModule,
        StellarModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
