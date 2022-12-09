//angular.module('DailyToolsApp', []).directive('resizeTextarea', function () {
DailyToolsApp.directive('resizeTextarea', function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: "<textarea placeholder='please fill in...'></textarea>",
        link: function (scope, element, attrs) {
            var HEIGHT = 25;
            var el = angular.element(element[0])
            el.css('lineHeight', HEIGHT + "px");
            el.css('height', HEIGHT + "px");

            var resize = function (e) {
                el.css({
                    'height': 'auto',
                        'height': this.scrollHeight + 'px'
                });

            };
            el.on('input', resize);
        }
    };
});
