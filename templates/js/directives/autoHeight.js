/*DailyToolsApp.directive("autoHeight", function () {
    return {
        restrict: "EAC",
        link: function (scope, element, attrs) {
            element[0].style.height = (element[0].scrollHeight < 30) ? 30 + "px" : element[0].scrollHeight + "px";
        }
    };
});
*/
//angular.module('DailyToolsApp', []).directive("autoHeight", function ($timeout) {

/*
DailyToolsApp.directive("autoHeight", function ($timeout) {
return {
    restrict: 'A',
    link: function($scope, element) {
      if(element[0].scrollHeight < 30){
          element[0].style.height = 30;
      }else{
          element[0].style.height = (element[0].scrollHeight) + "px";
      }

      var resize = function() {
        return element[0].style.height = "" + element[0].scrollHeight + "px";
      };

      element.on("blur keyup change", resize);
      $timeout(resize, 0);
};});
*/
console.log('resize loading')

DailyToolsApp.directive('autoHeight', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                console.log('resizing')
                element = element[0];
                var resize = function(){
                    element.style.height = 'auto';
                    element.style.height = (element.scrollHeight)+'px';
                };
                element.addEventListener('change', resize, false);
                element.addEventListener('cut',    resize, false);
                element.addEventListener('paste',  resize, false);
                element.addEventListener('drop',   resize, false);
                element.addEventListener('keydown',resize, false);

                setTimeout(resize, 100);
            }
        };
    });
