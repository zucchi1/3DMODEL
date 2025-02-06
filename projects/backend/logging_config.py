import logging
from logging.handlers import RotatingFileHandler

def setup_logging():
    # ログフォーマットの設定
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    # ログファイルの設定
    handler = RotatingFileHandler('app.log', maxBytes=10000, backupCount=1)
    handler.setFormatter(formatter)
    handler.setLevel(logging.INFO)

    # ロガーの設定
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    logger.addHandler(handler)

    return logger