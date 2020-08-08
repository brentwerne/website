<html>
	<body>
<?php
	function generateRandomString() {
	    $characters = 'a234567890kqla234567890kqla234567890kqla234567890kql';
	    $charactersLength = strlen($characters);
	    $randomcharacter = '';
	    $randomcharacter = $characters[rand(0, $charactersLength - 1)];
	    for ($i = 1; $i < $$charactersLength; $i++) {
	    	$characters = ltrim($characters, $randomcharacter);
	    }
	    return $randomcharacter;
	}

	$card = generateRandomString();
	echo $card;
?>

	

	</body>


</html>