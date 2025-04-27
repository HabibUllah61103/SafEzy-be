import { Injectable } from '@nestjs/common';
import { Client } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/modules/logger/logger.service';
import { Coordinates } from '../interfaces/coordinates.interface';

@Injectable()
export class GeocodingService {
  private client: Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.client = new Client({});
  }

  async geocode(address: string): Promise<Coordinates | null> {
    try {
      const response = await this.client.geocode({
        params: {
          address,
          key: this.configService.getOrThrow('GOOGLE_MAPS_API_KEY'),
        },
      });

      const { lat, lng } = response.data.results?.[0]?.geometry?.location ?? {};

      if (!lat || !lng) return null;

      return {
        lat,
        long: lng,
      };
    } catch (error) {
      this.logger.error(
        `Error in GeoCodingService#geocode for address ${address} - ${error.message}`,
        error.stack,
      );

      return null;
    }
  }
}
