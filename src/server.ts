// src/server.ts
import app from './app';
import { QR_APP_PORT } from './constants/app.constants';

app.listen(QR_APP_PORT, () => {
    console.log(`Server is running on port ${QR_APP_PORT}`);
});
