"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PROJECT_PORT;
    app.setGlobalPrefix('api/v1');
    app.enableCors({
        origin: 'http://localhost:3000'
    }),
        await app.listen(port, () => console.log(`project listening on port: ${port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map