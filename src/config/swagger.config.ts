import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

const theme = new SwaggerTheme();
const SWAGGER_UI_PATH = 'api';

const createSwaggerConfig = () =>
  new DocumentBuilder()
    .addBearerAuth()
    .setTitle('SafEzy API')
    .setDescription('SafEzy` description')
    .setVersion('1.0')
    .addServer('https://safezy-be.onrender.com', 'Deployed')
    .addServer('http://localhost:3000', 'Local')

    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
    })
    .build();

export function useSwagger(app: INestApplication): void {
  const config = createSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_UI_PATH, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  });
}
