import traceback
import sys
import os

try:
    from src.predict import predict_text
    print(predict_text("Im happy"))
except BaseException as e:
    with open("error.txt", "w") as f:
        f.write(traceback.format_exc())
