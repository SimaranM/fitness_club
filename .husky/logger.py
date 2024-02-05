#!/usr/bin/env python
import logging

logFilePath = "./.husky/githooks.log"
formatter = logging.Formatter('%(asctime)s - %(levelname)-8s [%(filename)s] - %(message)s')

def getCustomLogger(moduleName):
    logger = logging.getLogger(moduleName)

    fileHandler = logging.FileHandler(logFilePath)
    fileHandler.setFormatter(formatter)
    fileHandler.setLevel(logging.DEBUG)

    streamHandler = logging.StreamHandler()
    streamHandler.setFormatter(formatter)
    streamHandler.setLevel(logging.WARNING)

    logger.addHandler(fileHandler)
    logger.addHandler(streamHandler)
    logger.setLevel(logging.DEBUG)

    return logger