


var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope, $http) {
         $scope.proBar=false;
         $scope.tabShow=false;
         $scope.changeShow=function(){
          $scope.proBar=true;
          
          // alert("changeshow");
         }
        //get geo code
        var lat,long;
        function success(pos) {
  lat = pos.coords.latitude;
  long=pos.coords.longitude;
$scope.myFunc=function(){
                $http({
    method : "GET",
    // url : "http://localhost/~wentao/index.php",
    // url : "http://cs-server.usc.edu:32874/hw8/index.php",
    url: "/index.php",
    params:{'keyword':$scope.kw,
            'lat':lat,
            'long':long,

            }
  }).then(function mySucces(response) {
      $scope.userDataBody = JSON.parse(response.data[0].body);
      var $index=0;
      $scope.userData=$scope.userDataBody['data'];
      $scope.userPage=$scope.userDataBody['paging'];
      // console.log("pag");
      // console.log($scope.userPage);     

     $scope.pageDataBody = JSON.parse(response.data[1].body);
     $scope.pageData=$scope.pageDataBody['data'];
     $scope.pagePage=$scope.pageDataBody['paging'];

     $scope.eventDataBody = JSON.parse(response.data[2].body);
     $scope.eventData=$scope.eventDataBody['data'];
     $scope.eventPage=$scope.eventDataBody['paging'];

     $scope.placeDataBody = JSON.parse(response.data[3].body);
     $scope.placeData=$scope.placeDataBody['data'];
     $scope.placePage=$scope.placeDataBody['paging'];

     $scope.groupDataBody = JSON.parse(response.data[4].body);
     $scope.groupData=$scope.groupDataBody['data'];
     $scope.groupPage=$scope.groupDataBody['paging'];
     $scope.tabShow=true;
     $scope.proBar=false;

    }, function myError(response) {
      alert("error");
  });
        }


};

navigator.geolocation.getCurrentPosition(success,error);

function error(){
  alert("Can't get current location");
  $scope.myFunc=function(){
                $http({
    method : "GET",
    // url : "http://localhost/~wentao/index.php",
    // url : "http://cs-server.usc.edu:32874/hw8/index.php",
    url: "/index.php",
    params:{'keyword':$scope.kw,
            'lat':lat,
            'long':long,

            }
  }).then(function mySucces(response) {
      $scope.userDataBody = JSON.parse(response.data[0].body);
      var $index=0;
      $scope.userData=$scope.userDataBody['data'];
      $scope.userPage=$scope.userDataBody['paging'];
      // console.log("pag");
      // console.log($scope.userPage);     

     $scope.pageDataBody = JSON.parse(response.data[1].body);
     $scope.pageData=$scope.pageDataBody['data'];
     $scope.pagePage=$scope.pageDataBody['paging'];

     $scope.eventDataBody = JSON.parse(response.data[2].body);
     $scope.eventData=$scope.eventDataBody['data'];
     $scope.eventPage=$scope.eventDataBody['paging'];

     $scope.placeDataBody = JSON.parse(response.data[3].body);
     $scope.placeData=$scope.placeDataBody['data'];
     $scope.placePage=$scope.placeDataBody['paging'];

     $scope.groupDataBody = JSON.parse(response.data[4].body);
     $scope.groupData=$scope.groupDataBody['data'];
     $scope.groupPage=$scope.groupDataBody['paging'];
     $scope.tabShow=true;
     $scope.proBar=false;

    }, function myError(response) {
      alert("error");
  });
        }
}

$scope.detailId="";
    $scope.detailPic="";
    $scope.detailName="";
    $scope.detailType="";

        
// next/previous page function
        $scope.page=function(type,url){
            $http({
    method : "GET",
    url : url
    
  }).then(function mySucces(response) {
      if(type=="user"){
        $scope.userData=response.data.data;
        $scope.userPage=response.data.paging;
      }else if(type=="page"){
        $scope.pageData=response.data.data;
        $scope.pagePage=response.data.paging;
      }else if(type=="event"){
        $scope.eventData=response.data.data;
        $scope.eventPage=response.data.paging;
      }else if(type=="place"){
        $scope.placeData=response.data.data;
        $scope.placePage=response.data.paging;
      }else if(type=="group"){
        $scope.groupData=response.data.data;
        $scope.groupPage=response.data.paging;
      }


    }, function myError(response) {
      alert("error");
  });
       
        }


        $scope.eventDetails=function(id,pic,name,type){
          $scope.detailId=id;
    $scope.detailPic=pic;
    $scope.detailName=name;
    $scope.detailType=type;
 $scope.show=true;
 $scope.noPost=true;
    $scope.noAlbum=true;

        }

 $scope.details=function(id,pic,name,type){
    $scope.show=true;
    $scope.noPost=false;
    $scope.noAlbum=false;
    $scope.detailBar=false;
    // alert(id);
    $scope.detailId=id;
    $scope.detailPic=pic;
    $scope.detailName=name;
    $scope.detailType=type;

        $http({
    method : "GET",
    // url : "http://localhost/~wentao/index.php",
    // url : "http://cs-server.usc.edu:32874/hw8/index.php",
    url: "/index.php",

    params:{'id':id},
    dataType:'json'
  }).then(function mySucces(response) {
      $scope.resData=response.data;
        console.log($scope.resData);
      
        
            if($scope.resData.posts==null) {
              $scope.noPost=true;
              // alert("nopost");
            }
            if($scope.resData.albums==null) {
              $scope.noAlbum=true;
              // alert("nopost");
            }
      // post
      $scope.postName=$scope.resData.name;
      $scope.postData=$scope.resData.posts;
      $scope.icon=$scope.resData.picture.url;
       // console.log($scope.postData);
      // console.log($scope.resData);
      // console.log($scope.icon);

// albums
      $scope.albumData=$scope.resData.albums;
      
     console.log($scope.albumData);
      $scope.show=true;
      $scope.detailBar=true;

    }, function myError(response) {
      alert("error");
  });
    
  }

// back button
  $scope.back=function(){
    $scope.show=false;
        
    }


    // favorite function
    $scope.favor=function(idData,picUrl,nameData,typeData){
        if(!localStorage.getItem(idData)){
            var arr={id:idData,pic:picUrl,name:nameData,type:typeData};
            console.log("favor");
            console.log(arr.name);
            localStorage.setItem(idData,JSON.stringify(arr));
            // $scope.favorData.push(arr);
            // console.log($scope.favorData);
        }else{
            localStorage.removeItem(idData);


        }

    }

// change star icon 
    $scope.star=function(id){
        if(localStorage.getItem(id)){
            return "glyphicon glyphicon-star";
        }else{
            return "glyphicon glyphicon-star-empty";
        }
    }

// // nrxt botton margin
// $scope.nextBotMargin=function(pre){
//    if(pre==null) return "margin-left:50%"   
// else return "margin-left:20px";

// }
  // show favorite
  $scope.showFavor=function(){
    $scope.show=false;
    $scope.favorData=[];
    for(i=0;i<localStorage.length;i++){
        var temp=JSON.parse(localStorage.getItem(localStorage.key(i)));
        $scope.favorData.push(temp);
    }
    
    console.log($scope.favorData);
    // console.log($scope.favorData[0].id);
  }  
  $scope.removeFavor=function(id,index){
    localStorage.removeItem(id);
    $scope.favorData.splice(index,1);
    console.log("splice");
    console.log($scope.favorData);

    
  }




  $scope.postFB=function(pic,detailName){

    FB.init({ 
      appId: '437449763277720',
      status: true, 
      cookie: true, 
      xfbml: true,
      version: 'v2.4'
    });

console.log("detailName");

console.log(detailName);
console.log(pic);

  FB.ui({
app_id: '437449763277720',
method: 'feed',
link: window.location.href, 
picture: pic, 
name: detailName, 
caption: "FB SEARCH FROM USC CSCI571",
}, function(response){
if (response && !response.error_message)
alert("Posted Successfully")
else
alert("Not Posted");
});

}


});




  
