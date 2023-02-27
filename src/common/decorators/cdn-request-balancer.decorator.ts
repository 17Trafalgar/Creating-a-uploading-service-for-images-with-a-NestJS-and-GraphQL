import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import geoip from 'geoip-lite';
import { google } from 'googleapis';

const cdnUrls = {
    US: 'cdn1.example.com',
    GB: 'cdn2.example.com',
    DE: 'cdn3.example.com',
};

const cdnCountries = {
    US: { lat: 37.09024, lng: -95.712891 },
    GB: { lat: 55.378051, lng: -3.435973 },
    DE: { lat: 51.165691, lng: 10.451526 },
};

export const Request = createParamDecorator(
    async (data, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        const ip =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const location = geoip.lookup(ip);

        if (location) {
            const origin = { lat: location.ll[0], lng: location.ll[1] };
            const destinations = Object.values(cdnCountries);

            const googleMapsClient = google.maps({
                version: 'v1',
                auth: 'YOUR_GOOGLE_MAPS_API_KEY',
            });

            const response = await googleMapsClient.distancematrix.get({
                origins: [origin],
                destinations,
            });

            if (response.data) {
                const distances = response.data.rows[0].elements;
                let closestCdn = null;
                let closestDistance = Infinity;
                for (let i = 0; i < destinations.length; i++) {
                    const distance = distances[i].distance.value;
                    if (distance < closestDistance) {
                        closestCdn = Object.keys(cdnCountries)[i];
                        closestDistance = distance;
                    }
                }

                return {
                    countryCode: location.country,
                    closestCdn,
                    closestCdnUrl: cdnUrls[closestCdn],
                };
            } else {
                // handle the error
                return null;
            }
        } else {
            return null;
        }
    },
);
