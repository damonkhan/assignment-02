<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Payment form</title>
	</head>
	<body>
		<?php
			$fname = $_GET["fname"];
			$lname = $_GET["lname"];
			$addr1 = $_GET["addr1"];
			$addr2 = $_GET["addr2"];
			$city = $_GET["city"];
			$state = $_GET["state"];
			$postal = $_GET["postal"];
			$contactNum = $_GET["contactNum"];
			$email = $_GET["email"];
			$room = $_GET["room-type"];
			$checkIn= $_GET["checkIn"];
			$checkOut = $_GET["checkOut"];
			$arrival = $_GET["arrival-time"];
			$numRooms = $_GET["num-rooms"];
			$numAdults = $_GET["num-adults"];
			$numChildren = $_GET["num-children"];
			$breakfast = $_GET["breakfast"];
			$card = $_GET["card"];
			$ccNum = $_GET["ccnum"];
			$cvvNum = $_GET["cvvnum"];
			$month = $_GET["mm"];
			$year = $_GET["yy"];
			
					
			echo "|<strong>ElementName</strong> | <strong>Form Data</strong> |<br>";	
			echo "|FirstName                  | $fname |</br>"; 
			echo "|LastName      | $lname |<br>";
			echo "|Address1      | $addr1 |<br>";
			echo "|Address2      | $addr2 |<br>";
			echo "|City          | $city |<br>";
			echo "|State         | $state |<br>";
			echo "|PostCode      | $postal |<br>";
			echo "|ContactNumber | $contactNum |<br>";
			echo "|Email         | $email |<br>";
			echo "|NumRooms      | $room |<br>";
			echo "|CheckIn       | $checkIn |<br>";
			echo "|CheckOut      | $checkOut |<br>";
			echo "|ArrivalTime   | $arrival |<br>";
			echo "|NumRooms      | $numRooms |<br>";
			echo "|NumAdults     | $numAdults | <br>";
			echo "|NumChildren   | $numChildren |<br>";
			echo "|Breakfast?    | $breakfast |<br>";
			echo "|CardType      | $card |<br>";
			echo "|CCNum         | ************", substr($ccNum, 12), " |<br>";
			echo "|CVVNum        | *** |<br>";
			echo "|ExpiryMonth   | $month |<br>";
			echo "|ExpiryYear    | $year |<br>";
		?>
	</body>
</html>