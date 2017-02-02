// ==UserScript==
// @name         JIRA Rapid Board Score Counter
// @namespace    http://www.kalee.hu
// @version      0.0.3
// @description  Counting the story points I have delivered.
// @author       Moondancer83
// @include      /jira.*/secure/RapidBoard.jspa*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var colors = {
        pointCounter: "#ccccff"
    };
    var head = $("head");
    var username = $("#header-details-user-fullname").data('username');

    setTimeout(function() {
        setStyles();
        countMypoints();
    }, 2000);

    function setStyles() {
        head.append("<style>" +
                    ".aui-badge.point-counter {background-color:" + colors.pointCounter + "} " +
                    "</style>");
    }
    function countMypoints() {
        var points = 0;
        var myPoints = 0;

        // Total points in sprint
        $(".ghx-backlog-container.ghx-sprint-active .ghx-end img.ghx-avatar-img")
            .next("[title='Story Points']")
            .toArray()
            .forEach(
            (item) => {
                var point = parseInt($(item).text());
                if (!isNaN(point)) {
                    points += point;
                }
            });

        // Scored points of me
        $(".ghx-backlog-container.ghx-sprint-active .ghx-done .ghx-end img[src*=" + username +"].ghx-avatar-img")
            .next("[title='Story Points']")
            .toArray()
            .forEach(
            (item) => {
                var point = parseInt($(item).text());
                if (!isNaN(point)) {
                    myPoints += point;
                }
            });

        var badge = '<span class="aui-badge point-counter" title="Points (my/all): ' + myPoints + ' / ' + points + '">' + myPoints + ' / ' + points + '</span>';
        $('.ghx-badge-group').prepend(badge);
    }
})();
