import logger from "./logger.js"

const demoFunc = () => {
  for (let i = 0; i < 100000; i++) {
    logger.info("i: " + i);
  }
};

logger.info("i: " + demoFunc());

for (let i = 0; i < 5; i++) {
  logger.info("Main Code Loop");
}

