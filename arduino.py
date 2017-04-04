# arduino.py
# Author: Nihesh Anderson K
# Date  : 23-03-2017

import serial
import os
import time

def timestamp():
	strtime = time.ctime().split()
	strtime = strtime[3]
	return "["+strtime+"]"
	

def cleanSerialData(data):
	data = data.decode('utf-8')
	data = data.rstrip("\n")
	data = data.rstrip("\r")
	return data

if(__name__ == "__main__"):
	while(1):
		try:
			arduinoSerialData = serial.Serial('com3', 9600)
			break
		except serial.serialutil.SerialException:
			pass

	while(1):
		mode = ""
		try:
			if(arduinoSerialData.inWaiting() > 0):
				mode = cleanSerialData(arduinoSerialData.readline())
		except serial.serialutil.SerialException:
			try:
				arduinoSerialData = serial.Serial('com3', 9600)
			except serial.serialutil.SerialException:
				pass
		if(mode == "fetch"):
			print(timestamp()+" fetching data")
			data = ""
			while(1):
				if(arduinoSerialData.inWaiting() > 0):
					data = cleanSerialData(arduinoSerialData.readline())
					data = data.split(" ")
					file = open("settings.txt", "r")
					file2 = open("temp.txt", "w")
					flag = 0
					count = -1
					if(data[0] == "1"):
						for line in file:
							if(count!=-1):
								if(count == 1):
									file2.write("Present Moisture : "+data[1]+"\n")
									count = -1
									continue
								count+=1


							if(flag == 0 and line[:9] == "Node ID :"):
								flag = 1
								count = 0
							file2.write(line)						
						file.close()
						file2.close()
						os.remove("settings.txt")
						os.rename("temp.txt", "settings.txt")
					else:
						flag2 = 0
						for line in file:
							if(count!=-1):
								if(count == 1):
									file2.write("Present Moisture : "+data[1]+"\n")
									count = -1
									continue
								count+=1


							if(flag == 0 and line[:9] == "Node ID :"):
								if(flag2 == 0):
									flag2 = 1
								else:
									flag = 1
									count = 0
							file2.write(line)						
						file.close()
						file2.close()
						os.remove("settings.txt")
						os.rename("temp.txt", "settings.txt")
					print(timestamp()+" fetched and uploaded to settings.txt")
					mode = ""
					break
		elif(mode == "throw"):
			print(timestamp()+" sending settings.txt data to arduino")
			file = open("settings.txt", "r")
			line = file.readline()
			line = line.rstrip("\n")
			time.sleep(1.1)
			while(1):
				try:
					arduinoSerialData.write(line[line.rfind(" ")+1:].encode())
					break
				except:
					pass				
			line = file.readline()
			line = line.rstrip("\n")
			time.sleep(1.1)
			while(1):
				try:
					arduinoSerialData.write(line[line.rfind(" ")+1:].encode())
					break
				except:
					pass
			line = file.readline()
			line = file.readline()
			line = line.rstrip("\n")
			time.sleep(1.1)
			while(1):
				try:
					arduinoSerialData.write(line[line.rfind(" ")+1:].encode())
					break
				except:
					pass
			line = file.readline()
			line = file.readline()
			line = file.readline()
			line = line.rstrip("\n")
			time.sleep(1.1)
			while(1):
				try:
					arduinoSerialData.write(line[line.rfind(" ")+1:].encode())
					break
				except:
					pass
					time.sleep(1.1)
			file.close()
			print(timestamp()+" sent data")
			mode = ""




		




	
