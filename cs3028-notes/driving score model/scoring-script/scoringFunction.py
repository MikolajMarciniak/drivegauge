import csv
import os
import math

def calcAccelMagnitude(aX, aY, aZ):
  return math.sqrt(aX * aX + aY * aY + aZ * aZ)

def verifySpeed(speed):
  """Verify that the speed does not exceed the UK speed limit of 70mph. Returns True if the speed is less than 70mph, False otherwise."""
  if speed > 70:
    return False
  return True

def scoringFunction():
  file = "data/focus_2017@ford@safe_route.csv"
  file_dir = os.path.dirname(os.path.abspath(__file__))
  file_path = os.path.join(file_dir, file)
  with open(file_path) as f:
    reader = csv.DictReader(f)
    line_count = 0
    for row in reader:
      if line_count == 0:
        line_count += 1
        continue
      print(f'{row["CurrentEngineRpm"]}')
      line_count += 1

scoringFunction()