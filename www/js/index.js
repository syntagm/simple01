/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {console.log('deviceready');
        app.main();
    },

    main: function() {
        var output = PUBNUB.$('output'),
            input = PUBNUB.$('input'),
            button = PUBNUB.$('button'),
            avatar = PUBNUB.$('avatar'),
            presence = PUBNUB.$('presence');

        var channel = 'mchat';

        // Assign a random avatar in random color
        avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);

        var p = PUBNUB.init({
            subscribe_key: 'sub-c-84105db0-f4d1-11e5-8cfb-0619f8945a4f',
            publish_key:   'pub-c-aecc91c5-160e-411a-8773-3a22171f396a'
        });

        p.subscribe({
            channel  : "Channel-qc6qq09xb",
            callback : function(m) {
                output.innerHTML = '<p><i class="' + m.avatar + '"></i><span>' +  m.text.replace( /[<>]/ig, '' ) + '</span></p>' + output.innerHTML;
            },
            presence: function(m){
                if(m.occupancy > 1) {
                    presence.textContent = m.occupancy + ' people online';
                } else {
                    presence.textContent = 'Nobody else is online';
                }
            }
        });

        p.bind('keyup', input, function(e) {
            (e.keyCode || e.charCode) === 13 && publish()
        });

        p.bind('click', button, publish);

        function publish() {
            p.publish({
                channel : "Channel-qc6qq09xb",
                message : {
                    avatar: avatar.className,
                    text: input.value
                },
                x : (input.value='')
            });
        }

    }
};

app.initialize();
