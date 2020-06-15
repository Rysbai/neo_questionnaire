import string
import random


def generate_survey_code() -> str:
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(6))
