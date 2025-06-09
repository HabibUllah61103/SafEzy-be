import { Module, forwardRef } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseController } from './firebase/firebase.controller';
import { IamModule } from 'src/modules/iam/iam.module';
import { VehicleModule } from 'src/modules/vehicle/vehicle.module';
import { firebaseConfig } from 'src/config';

@Module({
  imports: [IamModule, forwardRef(() => VehicleModule)],
  providers: [FirebaseService, firebaseConfig],
  controllers: [FirebaseController],
  exports: [FirebaseService],
})
export class GoogleModule {}
