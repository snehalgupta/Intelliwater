# Intelliwater
Intelliwater

MOTIVATION:
The continuous extraction of freshwater from earth for irrigation is reducing the water level tremendously. As a result, irrigation has become impossible on most of the land available.This is majorly due to unplanned use of water resources.At present,the farmers irrigate the land at regular intervals.This process consumes more water and  sometimes water reaches late due to which the crops get dried.Hence, it is imperative that we optimise the use of water for irrigation as efficiently as possible.
IntelliWater is an automated irrigation system that makes use of drip  irrigation system. In drip irrigation system, the most significant advantage is that water is supplied near the root zone of the plants drip by drip due to which a large quantity of water is saved.Apart from saving water,IntelliWater also helps in saving time and reducing labour-cost.It removes any scope for human error in adjusting soil moisture level.It will be highly helpful for drought-stricken areas and for crops which require constant monitoring.

ABSTRACT:
AutoWater is an automated irrigation system that makes use of drip irrigation system. The basic blueprint is as follows:
The system is installed in the field with soil moisture sensors, valves, etc., at appropriate positions. The system is connected to a GUI for monitoring field parameters and manual control of the system. IntelliWater  keeps track of two things-
 The moisture content of the soil at every "node" or the position where a sensor and a water outlet have been installed.
Real-time Meteorological data for the region
Whenever the soil moisture content is low concerning the crop that has been planted, the field will be watered at those nodes till the moisture threshold is passed. But the system also keeps track of the possibility of rain, so that it doesn't end up over-irrigating the field, which can lead to waste of water and environmental problems.

TECH STACK:
HTML and CSS : For front-end development of GUI
Javascript : For backend development of GUI
Arduino programming : For arduino implementation of system
Python : For development of interface between Serial monitor and arduino which helps in sending and receiving real-time data.


DEPENDENCIES: 
Our system has the following dependencies :
Arduino software should be installed in PC.
Windows operating system for GUI
Pyserial python module should be installed in PC.
GUI only works on Internet Explorer 11

ONE TIME SETUP PROCEDURE:
Before running the system , the following changes need to be made :
Replace the value of variable path in script.js with the path where the folder of the GUI of the system lies . Append the path of folder with \\settings.txt.Use double slashes instead of single slash while writing the path.
Replace the value of com port in arduino.py with the value of port number with which arduino is connected to the Serial Monitor.

USAGE:
The following steps need to be implemented for switching on the system :
Connect the arduino to the PC through a USB cable.
Upload the code of main.ino into the arduino using arduino software 
Open index.html in Internet Explorer 11 and click  “ON” button to switch on the system . Click on “WEATHER-ON” button if you want the system to keep track of real-time weather information.
Run arduino.py using the following commands in command prompt.
Cd  ------path to the folder of application-------
Python3 arduino.py
If messages start appearing on the command prompt window,your system has been switched on.

SOFTWARE FEATURES: 
A set of compact devices that can be planted into the soil at optimal positions, which measures the soil moisture content and then waters the crops automatically in regular time intervals.
A user interface that lets users set the node requirements and  provides information about their crops, including data about the moisture content and water required for the crops.
The system will detect the location of user and receive real-time weather forecast information corresponding to the user’s location.The system will adjust its schedule according the possibility of rain on any given day.

TECHNICAL DETAILS:
Detects the location of user using HTML5 geolocation and sends the user coordinates as parameters in a JSON request to the weather api - http://openweathermap.org/api
The location and weather information gets stored in a text file named settings.txt from which data is retrieved and displayed on the serial monitor using javascript.
The GUI lets the user set node requirements and view the corresponding node requirements . The node requirements are also stored in settings.txt file.
The system checks the present moisture value by retrieving value of “Present moisture :” in settings.txt  which is updated by arduino . The present moisture value is also displayed on the serial monitor.
Arduino system uses arduino.py in order to retrieve the information stored in settings.txt . It sets the minimum threshold value for the soil moisture reading after which the plant has to be automatically watered.
If the system detects possibility of rain, the threshold value is increased so that the soil maintains its moisture content even after raining. 

CONTRIBUTIONS:

Nihesh Anderson - Arduino implementation
Varun Ramanathan - Frontend development of GUI
Snehal Gupta - Backend development of GUI
Roshan Ajith - Hardware implementation and weekly reports









