<?php
if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('GMT');
}

 header('Content-type: text/json');

    require_once __DIR__ . '/php-graph-sdk-5.0.0/src/Facebook/autoload.php';	
		$fb = new Facebook\Facebook([
		  'app_id' => '437449763277720',
		  'app_secret' => '98dad51de63686d46e0230f7b845f660',
		  'default_graph_version' => 'v2.8',
		]);
		$token ="EAAGN27WZCS5gBAB3DZB40hotsH3ddBg5vlqrJBfbaNppSgBu9jvpaLIZBgDE6vVvlS6N4HC2TQGElFoFnagfLlyGfxL5pHm4EWk4cdsZB46D1h27McVOnMj6DdPjG0tOuatZABIKYZC2j9Upne3XARi1QpBbZCvzhkZD";
		$fb -> setDefaultAccessToken($token);

$url1="";$url2="";$url3="";$url4="";$url5="";
if(isset($_GET['keyword'])){
	// unset($_GET['id']);
    $url1= 'search?q='.$_GET['keyword'].'&type=user&fields=id,name,picture.width(700).height(700)&access_token='.$token;
    $url2= 'search?q='.$_GET['keyword'].'&type=page&fields=id,name,picture.width(700).height(700)&access_token='.$token;
	$url3= 'search?q='.$_GET['keyword'].'&type=event&fields=id,name,picture.width(700).height(700)&access_token='.$token;
	if(isset($_GET['lat'])){
	$url4= 'search?q='.$_GET['keyword'].'&type=place&fields=id,name,picture.width(700).height(700)&center='.$_GET['lat'].','.$_GET['long'].'&access_token='.$token;
};
	
	$url5= 'search?q='.$_GET['keyword'].'&type=group&fields=id,name,picture.width(700).height(700)&access_token='.$token;
    
    $batch=[
    	$fb->request('GET', $url1),
    	$fb->request('GET', $url2),
    	$fb->request('GET', $url3),
    	$fb->request('GET', $url4),
    	$fb->request('GET', $url5),
    ];

    $responses=$fb->sendBatchRequest($batch);
   echo $responses->getGraphNode();

}

if(isset($_GET['id'])){
$url6=$_GET['id'].'?fields= id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name, picture}},posts.limit(5)&access_token='.$token;
$detailResponse = $fb -> get($url6);
$array=$detailResponse->getGraphNode();
// echo $array;
// echo json_encode($array);
$photoUrl=array();
	if(isset($array['albums'])){
		foreach ($array['albums']as  $value) {
			if(isset($value['photos'])){
				// echo $value['photos']['data'][0]['id'].'s';
				foreach ($value['photos'] as $photoData) {
					$HighResUrl='https://graph.facebook.com/v2.8/'.$photoData["id"].'/picture?access_token='.$token;
					array_push($photoUrl, $HighResUrl);
					// echo $HighResUrl;
				}

			}

		}
	}
	$i=0;
	if(isset($array['albums'])){
		foreach ($array['albums'] as $v) {
		   if(isset($v['photos'])){
		   		foreach ($v['photos']as $photo) {
	
			$photo['picture']=$photoUrl[$i++];
			// echo $photo['picture'];
		   }
		   }
		   
	    }
	}
	

	// echo $array['albums'][1]['photos'][1]['picture'];
	// echo $photo['picture'];

	echo $array;
}

?>
    
    