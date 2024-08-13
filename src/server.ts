import app from '@app';
import { QR_APP_PORT } from '@constants/app.constants';
import logger from '@libs/logger.lib';

app.listen(QR_APP_PORT, () => {
    logger.info(`Server is running on port ${QR_APP_PORT}`);
});
