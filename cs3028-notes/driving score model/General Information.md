
## Information on Routes and Driver Profiles

In the current state of the DriveGauge project, our team is using "dummy" data extracted from the Forza Horizon 5 video game in combination with some data capture methods. The game map is a sufficiently detailed representation of a part of Mexico and its route system.
The selected route is intended to recreate a 10-minute drive in the real world consisting of different types of roads with different intesity of traffic and pedestrians. This would allow us to gather a more diverse and concrete data for our purposes. There are 3 main types of roads that we have concentrated on:

- pedestrian intesive roads with a speed limit of 30 km/h
- city roads with a speed limit of 50 km/h
- highway with a speed limit of 100 km/h

These speed limits are compliant with EU&UK regulations for real-world speed limits in the desginated areas.

In order to be as accurate as possible in our experiments and to provide greater diversity to our score calculating function we have decided to develop 3 driver profiles each of which with a completely different driving style in comparison with the other 2. We named them "Safe", "Regular", and "Reckless" driver.

- Typical for the "Safe" persona is calm driving style with a car which rarely reaches/exceeds the speed limits of the given route. Other characteristics are smooth acceleration and braking, higher fuel efficiency and compliance with all traffic rules.
- The "Regular" driver is the most common type of driver persona one can encounter. It is characterized by regularly driving with 5-10 km/h over the speed limit and rougher acceleration and braking in comparison with the "Safe" driver. Fuel efficiency is also lower and there are rare but occuring traffic rules violations.
- The "Reckless" driver is characterized by driving usually above the speed limit, especially on highways. Their style of acceleration and braking of the car are aggressive, they often do overtakes and are not driving very efficiently in terms of fuel. There are many traffic rules violations and  often tend to find themselves in risky situations on the road.

The experiments and data gathering were conducted under the same conditions with the cars listed in the "Forza data capture method" file over an extensive period of time.