import { app } from "./app";
import { PORT } from "./utils/config";
import { info } from "./utils/logger";

const port = PORT || 3000;

app.listen(port, () => {
  info(`Server is running on port ${port}`);
});
