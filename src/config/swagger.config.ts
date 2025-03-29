import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

const theme = new SwaggerTheme();
const SWAGGER_UI_PATH = 'api';

const createSwaggerConfig = () =>
  new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Fit-Chick Moment API')
    .setDescription('Fit-Chick API description')
    .setVersion('1.0')
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
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  });
}
