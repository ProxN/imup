import { config } from 'dotenv';

config({ path: './config.env' });

import app from './index';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));
