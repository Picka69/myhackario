function MFX() {
    function enter() {
        // return $("#nick").val(window.MFX.getName()), nodeList[0][1] == window.MFX.getName() ? false : (nodeList[0][1] = window.MFX.getName(), setLocalStorage("nick", $("#nick").val()));
    }

    function fillHSBFields() {
        var v = window.MFX.getTeamName();
        return $("#team_name").val(v), tmpTeamname == v ? false : (setLocalStorage("opt_teamname", v), player_profile[selected_profile].team = v, data(), true);
    }
    window.SwallToast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    window.request = (url, callback, method, type) => {
        if (!method) method = "GET";
        if (!type) type = "text";
        var req = new XMLHttpRequest();
        req.onload = function () {
            callback(this.response);
        };
        req.open(method, url);
        req.responseType = type;
        req.send();
    }
    window.aye = true;
    window.totalPlayers = 0;
    /*
    var PI_2 = Math.PI * 2;
    var pointCount = window.zalupa1;
    var incremental = PI_2 / pointCount;
    ctx.moveTo(this.x, this.y + this.size + window.zalupa2);
    for (var i = 1; i < pointCount; i++) {
        var angle = i * incremental;
        var dist = this.size - window.zalupa3 + (i % window.zalupa4 === 0) * window.zalupa5;
        ctx.lineTo(
            this.x + dist * Math.sin(angle),
            this.y + dist * Math.cos(angle)
            )
        }
    ctx.lineTo(this.x, this.y + this.size + 3); 
    */
    window.zalupa1 = 4;
    window.zalupa2 = 10
    window.zalupa3 = 6;
    window.zalupa4 = 2;
    window.zalupa5 = 20;
    window.streamCheck = function() {
        window.request("https://myagar.pro:7777/streamCheck", function (data) {
            data = JSON.parse(data)                
            if(data.stream) {   
                if(data.stream.live == 'true') {
                    console.log("Stream online");
                    $("#liveStreamIndication").css('display','inline-block');
                    $('.live').css('background-blend-mode', 'unset')
                    $('.live').attr('onclick', `window.open('${data.stream.link}');`)
                } else {
                    console.log("Stream offline")
                    $("#liveStreamIndication").css('display','none');
                    $('.live').css('background-blend-mode', 'luminosity')
                    $('.live').attr('onclick', ``)
                }
            }
        });
        setTimeout(window.streamCheck.bind(this), 60000);
    }
    window.getStatServer = () => {
        window.totalPlayers = 0;
        window.request("https://myagar.pro/serverList.json?v=" + new Date(), function (data) {
            window.servers = JSON.parse(data);
            for (var i = 0; i < window.servers.length; i++) {
                let _server = window.servers[i].server_name;
                window.request(`https://${window.servers[i].ip}:${window.servers[i].statport}`, (info) => {
                    let _info = JSON.parse(info);
                    $(`#${_server}`).text(_info.alive);
                    window.totalPlayers += _info.alive;
                    $("#totalserverCount").text(window.totalPlayers);
                })
            }
        });
        setTimeout(window.getStatServer.bind(this), 15000);
    };
    window.request("https://myagar.pro/serverList.json", (data) => {
        window.servers = JSON.parse(data);
        for (var i = 0; i < window.servers.length; i++) {
            let rServer = ~~(Math.random() * window.servers.length);
            connect(`wss://${window.servers[rServer].ip}:${window.servers[rServer].port}`);
        }
    });
    window.knownSkins = [];
    window.freeSkins = [];
    window.abilityOffset = 10;

    window.SizGay = (name) => {
        if (name.length == 15) return 0.70;
        if (name.length == 14) return 0.75;
        if (name.length == 13) return 0.80;
        if (name.length == 12) return 0.87;
        if (name.length == 11) return 0.97;
        if (name.length == 10) return 1.03;
        if (name.length == 9) return 1.04;
        if (name.length == 8) return 1.07;
        if (name.length == 7) return 1.05;
        if (name.length == 6) return 1.06;
        if (name.length == 5) return 1.05;
        if (name.length == 4) return 1.10;
        if (name.length == 3) return 1.15;
        if (name.length == 2) return 1.20;
        if (name.length == 1) return 1.25;
        if (name.length == 0) return;
    }
    window.SizGay2 = (name) => {
        if (name.length <= 10) return 0.09;
        if (name.length >= 11) return 0.07;
    }
    window.SizGay3 = (name) => {
        if (name.length <= 10) return 0;
        if (name.length >= 11) return 20;
    }
    window.SizGay_ = 0.55;

    // window.request("https://myagar.pro/freeSkins.json?v=" + new Date(), function (data) {
    //     var skins = JSON.parse(data);
    //     var stamp = Date.now();
    //     for (var i = 0; i < skins.length; i++) {
    //         window.buildFreeSkins(skins[i].Title, skins[i].Skin, skins[i].CreatedBy);
    //     }
    // });

    function change() {
        setLocalStorage("selected_profile", selected_profile);
        tmpTeamname = window.MFX.getTeamName();
        $("#nick").val(player_profile[selected_profile].name);
        $("#team_name").val(player_profile[selected_profile].team);
        if (fillHSBFields()) {
            nodeList[0][1] = window.MFX.getName();
            setLocalStorage("nick", window.MFX.getName());
        } else {
            enter();
        }
    }
    var version = "v3.0.6";
    this.getVersion = function () {
        return version;
    };
    var v = 0.9;
    this.getZoomSpeed = function () {
        return v;
    };
    var v2 = 0.05;
    this.getZoomLimit = function () {
        return v2;
    };
    var nksize = 0.48;
    this.getNickSize = function () {
        return nksize;
    };
    var lcsize = 0.6;
    this.getLocationsSize = function () {
        return lcsize;
    };
    var animationDelay = 120;
    this.smoothAnimation = function () {
        return animationDelay;
    };

    var log = {
        info: function (str) {
            console.debug("[INFO]", str);
        },
        warn: function (str) {
            console.warn("[WARN]", str);
        },
        err: function (str) {
            console.error("[ERROR] ", str);
        },
        debug: function (str) {
            console.info("[DEBUG] ", str);
        }
    };
    $(".btn-play").on("click", function () {
        window.MFX.play();
        return false;
    });
    window.onSubmit = function(token) {
        console.log(token)
        sendCaptcha(token)
    };
    this.play = function () {
        setNick(document.getElementById("nick").value);
        return false;
    };
    this.isEnableHideFood = true;
    this.isEnableBorder = this.isEnableMapGrid = this.isEnableCursorLine = this.isEnableZoom = this.isStopMovement = this.isShowBallTotal = this.isShowSTE = this.isShowScroll = false;
    this.isEnableGridline = true;
    this.isEnableShowAllMass = true;
    this.isEnableSimpleDrawing = false;
    this.isEnableAutoStart = false;
    this.isDarkTheme = false;
    this.isEnableMouseW = false;
    this.isEnableCustomSkin = true;
    this.isEnableAttackRange = false;
    this.isEnableChatpopup = true;
    this.attackRangeRadius = 655;
    this.cellColor = "";
    this.doubleSpace = this.quickSpace = this.autoW = this.autoFEEDER = false;
    this.doubleSpaceCount = this.quickSpaceCount = 0;
    this.lockZoomG;
    this.isEnableLockZoom = true;
    this.teammateIndicatorPosition = 40;
    this.teammateIndicatorSize = 50;
    this.teammateIndicatorShowSize = 370;
    this.teammateIndicator;
    this.isEnableTeammateIndicator = false;
    this.specTeammate = false;
    this.isSpecTeammate = false;
    this.isSpectating = false;
    this.isSameColorFood = false;
    this.isEnableSplitInd = this.isShowTextStrokeLine = this.isTransparentCell = false;
    this.isAutoHideName = this.isAutoHideMass = true;
    this.tagHide = false;
    this.isShowFPS = true;
    this.isEnableOtherSkinSupport = true;
    this.isEnableBorder = false;
    this.isShowMass = true;
    this.isShowPacketIO = false;
    this.speedAbility = false;
    this.speedTimer = 0;
    this.speedInterval = setInterval(() => {
        if(this.speedAbility == true && this.speedTimer > 0) {
            this.speedTimer -= 1000;
        } else {
            this.speedAbility = false;
        }
    }, 1000);
    this.mergeAbility = false;
    this.mergeTimer = 0;
    this.mergeInterval = setInterval(() => {
        if(this.mergeAbility == true && this.mergeTimer > 0) {
            this.mergeTimer -= 1000;
        } else {
            this.mergeAbility = false;
        }
    }, 1000);
    this.zombieAbility = false;
    this.zombieTimer = 0;
    this.zombieInterval = setInterval(() => {
        if(this.zombieAbility == true && this.zombieTimer > 0) {
            this.zombieTimer -= 1000;
        } else {
            this.zombieAbility = false;
        }
    }, 1000);
    this.freezeAbility = false;
    this.freezeTimer = 0;
    this.freezeInterval = setInterval(() => {
        if(this.freezeAbility == true && this.freezeTimer > 0) {
            this.freezeTimer -= 1000;
        } else {
            this.freezeAbility = false;
        }
    }, 1000);
    this.isHideSelfName = false;

    this.init = function () {
        $('body').append('<canvas id="canvas">');
        var c = document.getElementById("canvas");
        // start();
        c.getContext("2d");
        c.mozOpaque = true;
        getStatServer();
        streamCheck();
        window.setLocalStorage = function (key, value) {
            if ("string" == typeof value) {
                localStorage.setItem(key, value);
            } else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        };
        window.getLocalStorage = function (storageKey) {
            return localStorage.getItem(storageKey);
        };
        if (getLocalStorage("nick")) {
            player_profile[selected_profile].name = getLocalStorage("nick");
        }
        if (getLocalStorage("opt_teamname")) {
            player_profile[selected_profile].team = getLocalStorage("opt_teamname");
        };
        c = 0;
        for (; c < player_profile.length; c++) {
            window.postMessage({
                data: player_profile[c].skinurl
            }, "*");
        }
        $("body").attr("oncontextmenu", "return false;");
        nodeList[0] = ["me", getLocalStorage("nick"), null, null, "yellow"];
        nodeList[1] = ["top1", "", null, null, "white"];
        nodeList[0][8] = Date.now();
        nodeList[1][8] = Date.now();
        chatRoom = new ChatRoom;
        chatRoom.setContainer("#chatPopup_");
        chatRoom.createChatBox();
        minimap = new Minimap;
        minimap.createMap(200);
        c = document.createElement("canvas");
        var context = c.getContext("2d");
        context.beginPath();
        context.lineWidth = 0;
        context.moveTo(0, 0);
        context.lineTo(100, 0);
        context.lineTo(50, 50);
        context.closePath();
        context.strokeStyle = "black";
        context.fillStyle = "black";
        context.stroke();
        context.fill();
        this.teammateIndicator = c;
        conn = new Connection;
        conn.connect();
        // connect('wss://instant.myagar.pro:1445');
    };
    this.newGame = function () {
        $("#nick").prop("disabled", true);
        isJoinedGame = true;
        window.MFX.isStopMovement = false;
        window.MFX.isSpectating = false;
        window.MFX.cellColor = "";
        window.MFX.newGameImpl();
        spectateMode = false;
        nodeList[1][2] = null;
        nodeList[1][3] = null;
    };
    this.afterGameLogicLoaded = function () {
        window.MFX.setupOption();
        window.MFX.setupHints();
        window.MFX.checkVersion();
        window.MFX.downloadSkin();
        let data = window.localStorage.getItem('maf1profile');
        let cache = JSON.parse(data);
        window.profilesCache = cache;
        if (!profilesCache) return;
        if (profilesCache.current.id == 1) {
            $("#skin_url").val(profilesCache.first.url);
            setLocalStorage("skin_url", profilesCache.first.url);
        } else if (profilesCache.current.id == 2) {
            $("#skin_url").val(profilesCache.second.url);
        } else if (profilesCache.current.id == 3) {
            setLocalStorage("skin_url", profilesCache.second.url);
            $("#skin_url").val(profilesCache.third.url);
            setLocalStorage("skin_url", profilesCache.third.url);
        } else if (profilesCache.current.id == 4) {
            $("#skin_url").val(profilesCache.fourth.url);
            setLocalStorage("skin_url", profilesCache.fourth.url);
        } else if (profilesCache.current.id == 5) {
            $("#skin_url").val(profilesCache.fifth.url);
            setLocalStorage("skin_url", profilesCache.fifth.url);
        } else {
            setTimeout(() => {
                window.loadProfile(1);
            }, 1);
        }
        $("#team_name").change(function () {
            fillHSBFields();
        }).focus(function () {
            tmpTeamname = window.MFX.getTeamName();
        });
        $("#skin_url").change(function () {
            let data = window.localStorage.getItem('maf1profile');
            let cache = JSON.parse(data);
            window.profilesCache = cache;
            if (profilesCache.current.id == 1) {
                profilesCache.first.url = window.MFX.getCustomSkinUrl();
                window.saveProfiles();
            } else if (profilesCache.current.id == 2) {
                profilesCache.second.url = window.MFX.getCustomSkinUrl();
                window.saveProfiles();
            } else if (profilesCache.current.id == 3) {
                profilesCache.third.url = window.MFX.getCustomSkinUrl();
                window.saveProfiles();
            } else if (profilesCache.current.id == 4) {
                profilesCache.fourth.url = window.MFX.getCustomSkinUrl();
                window.saveProfiles();
            } else if (profilesCache.current.id == 5) {
                profilesCache.fifth.url = window.MFX.getCustomSkinUrl();
                window.saveProfiles();
            } else {
                window.localStorage.removeItem("maf1profile");
            }
            var nv = getLocalStorage("skin_url");
            var v = window.MFX.getCustomSkinUrl();
            $("#skin_url").val(nv);
            $("#skin_url").val(v);
            if (nv != v) {
                nv = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
                if ("DEFAULT" == v || nv.test(v)) {
                    nodeList[0][5] = v;
                    player_profile[selected_profile].skinurl = window.MFX.getCustomSkinUrl();
                    // data();
                    if (customSkin[v]) {
                        window.MFX.changePreviewImage(customSkin[v].src);
                    } else {
                        skinDownloadQueue.push(v);
                    }
                } else {
                    // log.error("Not valid URL");
                    // $('#preview-img').attr('src', 'img/error.png');
                }
            }
        });
        // data();
    };
    window.checkIfLogin = () => {
        let data = JSON.parse(window.localStorage.getItem("lgDatG"));
        if (data && data.google_tokenid && data.google_email && data.google_id) {
            window.onLogin(data.google_id, data.google_email, data.google_tokenid)
        }
    }
    window.levelSkins = () => {
        let skinLevel = 0;
        let a = $('button[id="lvlSkinButton"]');
        for (var i = 0; i < a.length; i++) {
            skinLevel += 5;
            if (skinLevel == parseInt(window.equipedSkin)) {
                $(a[i]).attr('onclick', `setSkin('removeSkin')`).removeClass('use-btn').addClass('cancel-btn').text('Cancel');
            }
        }
    }
    window.updateEvent = () => {
        let a = $('button[id="eventSkinButton"]');
        let eventId = 0;
        for (var i = 0; i < a.length; i++) {
            eventId++;
            if (window.equipedSkin == `event${eventId}`) {
                $(a[i]).attr('onclick', `setSkin('removeSkin')`).removeClass('use-btn').addClass('cancel-btn').text('Cancel');
            } else {
                $(a[i]).text('Use').attr('onclick', `setEventSkin('${eventId}')`).removeClass('cancel-btn').addClass('use-btn');
            }
        }
    }
    window.updateLevel = () => {
        if (window.xp && window.level) {
            if (Math.floor((window.xp / (window.level * 50000)) * 100) >= 50) $('.progress-circle').addClass(`over50`);
            else $('.progress-circle').removeClass(`over50`);
            $('.progress-circle').addClass(`p${Math.floor((window.xp / (window.level * 50000)) * 100)}`);
            let skinLevel = 0;
            let a = $('button[id="lvlSkinButton"]');
            for (var i = 0; i < a.length; i++) {
                skinLevel += 5;
                if (skinLevel <= level) $(a[i]).text('Use').attr('onclick', `setLevelSkin('${skinLevel}')`).removeClass('cancel-btn').addClass('use-btn');
                else $(a[i]).text(`${skinLevel} needed`);
            }
            window.levelSkins();
        }
    }
    this.spectate = function (buffer2) {
        conn.joinRoom(window.MFX.getRoom());
        if (!(buffer2 && 0 != buffer2.length)) {
            window.MFX.isSpectating = true;
        }
        return false;
    };
    this.newGameImpl = function () {
        var e = true;
        var sectors = getCell();
        if (!(sectors && 0 != sectors.length)) {
            e = false;
        }
        if (e) {
            nodeList[0][6] = sectors[0].color;
            conn.joinRoom(window.MFX.getRoom());
        } else {
            setTimeout(window.MFX.newGameImpl, 100);
        }
    };
    this.onDead = function () {
        isJoinedGame = false;
        $("#nick").prop("disabled", false);
        $(".nav").show();
        $("#play-btn").prop("disabled", true);
        $("#play-btn").html(`
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        `)
        setTimeout(() => {
            $("#play-btn").text('Play')
            $("#play-btn").prop("disabled", false)
        }, 2500)
        conn.leaveRoom(window.MFX.getRoom());
    };
    this.afterGameLoaded = function () {
        window.MFX.isSpectating = false;
        updateLBCount = -1;
        $("#nick").prop("disabled", false);
        $("#ip_info").text("Server: " + $("#chooseServer option:selected").text());
        moveTo(null, null);
        window.MFX.specTeammate = null;
        window.MFX.isStopMovement = false;
        minimap.setDeadPosition(null);
        conn.joinRoom(window.MFX.getRoom());
    };
    this.getRoom = function () {
        return "N/A" == window.MFX.getCurrentPartyCode() ? window.MFX.getTeamName() + window.MFX.getCurrentIP() : window.MFX.getTeamName() + window.MFX.getCurrentPartyCode();
    };
    window.formatLevel = n => {
        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
        if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
    };
    window.formatCoins = (amount, decimalCount = 2, decimal = ".", thousands = " ") => {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
        } catch (e) {}
    };
    this.setupOption = function () {
        var options = {
            opt_darktheme: {
                text: "Dark theme",
                "default": false,
                handler: function (token) {
                    if (token) {
                        window.MFX.isDarkTheme = true;
                    } else {
                        window.MFX.isDarkTheme = false;
                    }
                }
            },
            opt_self_name: {
                text: "Hide my name",
                "default": false,
                handler: function (token) {
                    window.MFX.isHideSelfName = token;
                }
            },
            opt_name: {
                text: "Hide Names",
                handler: function (token) {
                    setNames(!token);
                }
            },
            opt_mass: {
                text: "Show mass",
                "default": true,
                handler: function (token) {
                    setShowMass(token);
                }
            },
            opt_jellyPhysics: {
                text: "Jelly physics",
                "default": false,
                handler: function (token) {
                    window.MFX.isEnableSimpleDrawing = token;
                }
            },
            opt_custom_skin: {
                text: "Show Skins",
                "default": true,
                handler: function (token) {
                    window.MFX.isEnableCustomSkin = token;
                }
            },
            opt_massinks: {
                text: "Mass In Ks",
                "default": true,
                handler: function (token) {
                    window.MFX.massInKs = token;
                }
            },
            opt_camera: {
                text: "Smooth Camera",
                "default": false,
                handler: function (token) {
                    window.MFX.smoothCamera = token;
                }
            },
            opt_zoom: {
                text: "Zoom",
                "default": true,
                handler: function (token) {
                    window.MFX.isEnableZoom = token;
                }
            },
            opt_score: {
                text: "Score",
                "default": true,
                handler: function (token) {
                    window.MFX.isShowScroll = token;
                }
            },
            opt_current_Mass: {
                text: "Mass",
                "default": true,
                handler: function (token) {
                    window.MFX.isShowMass = token;
                }
            },
            opt_fps: {
                text: "FPS",
                "default": true,
                handler: function (token) {
                    window.MFX.isShowFPS = token;
                }
            },
            opt_minimap: {
                text: "Minimap",
                "default": true,
                handler: function (token) {
                    if (token) {
                        minimap.show();
                    } else {
                        minimap.hide();
                    }
                }
            },
            opt_auto_hide_mass: {
                text: "Auto Hide Mass",
                "default": true,
                handler: function (token) {
                    window.MFX.isAutoHideMass = token;
                }
            },
            opt_auto_hide_name: {
                text: "Auto Hide Names",
                "default": true,
                handler: function (token) {
                    window.MFX.isAutoHideName = token;
                }
            },
            opt_tagHide: {
                text: "Hide clan-tags",
                default: "true",
                handler: function (token) {
                    window.MFX.tagHide = token;
                }
            },
            opt_lock_zoom: {
                text: "Auto Zoom",
                handler: function (token) {
                    window.MFX.isEnableLockZoom = !token;
                }
            },
            opt_chatbox: {
                text: "Chatbox",
                disabled: false,
                "default": true,
                handler: function (token) {
                    if (token) {
                        $("#chatboxArea2").css('display', 'block');
                        chatRoom.show();
                    } else {
                        $("#chatboxArea2").css('display', 'none');
                        chatRoom.hide();
                    }
                }
            }
        };
        window.setYinSkinSupport = function (firstRestricted) {
            options.opt_other_skin.handler(firstRestricted);
            setLocalStorage("opt_other_skin", firstRestricted);
        };
        var i;
        var row = [];
        for (i in options) {
            if (!options[i].disabled) {
                row.push('<div class="key-block-option"><div class="checkbox-lable-input"><input id="' + i + '" class="check-slider__check" type="checkbox"></div><div class="keybinds-text"> ' + options[i].text + "</div></div>");
            }
        }
        var d = row.splice(0, 9);
        var j = 0;
        for (; j < d.length; j++) {
            $(".firstSettings").append(d[j]);
        }
        j = 0;
        for (; j < row.length; j++) {
            $(".secondSettings").append(row[j]);
        }
        $("input:checkbox").change(function () {
            var firstRestricted = $(this).prop("checked");
            var type = $(this).prop("id");
            setLocalStorage(type, firstRestricted);
            if (options[type]) {
                options[type].handler(firstRestricted);
            }
        });
        for (i in options) {
            if (getLocalStorage(i)) {
                if ("true" == getLocalStorage(i)) {
                    if ("opt_other_skin" == i) {
                        setYinSkinSupport(true);
                    } else {
                        $("#" + i).click();
                    }
                }
            } else {
                if (options[i]["default"]) {
                    $("#" + i).click();
                }
            }
        }
        $("#opt_zoom_speed").change(function () {
            v = $("#opt_zoom_speed").val();
            $("#txt_zoom_speed").text($("#opt_zoom_speed").val());
            setLocalStorage("opt_zoom_speed", v);
        });
        $("#opt_nick_size").change(function () {
            nksize = $("#opt_nick_size").val();
            $("#txt_nick_size").text($("#opt_nick_size").val());
            setLocalStorage("opt_nick_size", nksize);
        });
        $("#opt_mass_size").change(function () {
            aksize = $("#opt_mass_size").val();
            $("#txt_mass_size").text($("#opt_mass_size").val());
            setLocalStorage("opt_mass_size", aksize);
        });
        $("#opt_locations_size").change(function () {
            lcsize = $("#opt_locations_size").val();
            $("#txt_locations_size").text($("#opt_locations_size").val());
            setLocalStorage("opt_locations_size", lcsize);
        });
        $("#opt_smooth_animation").change(function () {
            animationDelay = $("#opt_smooth_animation").val();
            $("#txt_smooth_animation").text($("#opt_smooth_animation").val());
            setLocalStorage("opt_smooth_animation", animationDelay);
        });
    };
    this.scoreInfo = function (millis) {
        if (!millis || !millis.length) {
            return "";
        }
        var optsData = "";
        return window.MFX.isShowSTE && (optsData += "   STE: " + this.getSTE(millis)), window.MFX.isShowBallTotal && (optsData += "   [" + millis.length + "/16]"), optsData;
    };
    this.scoreTxt = function (dataAndEvents) {
        return window.MFX.isShowScroll ? dataAndEvents : "";
    };
    this.isShowScoreInfo = function () {
        return window.MFX.isShowScroll || (window.MFX.isShowSTE || window.MFX.isShowBallTotal);
    };
    this.showSystemMessage = function () {
        return false;
    };
    this.getSTE = function (codeSegments) {
        var w = 0;
        var i = 0;
        for (; i < codeSegments.length; i++) {
            if (codeSegments[i]) {
                if (codeSegments[i].I) {
                    if (codeSegments[i].I.w) {
                        if (codeSegments[i].I.w > w) {
                            w = codeSegments[i].I.w;
                        }
                    }
                }
            }
        }
        return ~~(0.375 * w);
    };
    this.isPrivateServer = function () {
        return PRIVATE_SERVER_IP == currentIP;
    };
    this.getCurrentIP = function () {
        return this.isPrivateServer() ? "----------" : currentIP.substring(5, currentIP.length);
    };
    this.getTeamName = function () {
        return ("" == $("#team_name").val() ? "" : $("#team_name").val()).trim();
    };
    this.getCustomSkinUrl = function () {
        var ret = ($("#skin_url").val() + "").trim();
        return "" == ret ? "" : ret;
    };
    this.getCurrentPartyCode = function () {
        return currentIP;
    };
    this.getCurrentServer = function () {
        return currentIP
    };
    this.showMessage = function (message, options) {
        if (0 == $("#message_dialog").length) {
            window.MFX.createMessageDialog();
        }
        $("#message_dialog_title").text(message);
        $("#message_dialog_content").html(options);
        $("#message_dialog").modal({
            show: "true"
        });
    };
    this.getName = function () {
        var val = $("#nick").val().trim();
        return -1 != val.indexOf("\u200b") && (val = ""), "" == val ? "" : val;
    };
    this.getLeaderBoard = function () {
        var listenersArr = [];
        var codeSegments = getLB();
        if (codeSegments) {
            var i = 0;
            for (; i < codeSegments.length; i++) {
                listenersArr[listenersArr.length] = "" == codeSegments[i].name ? "An unnamed cell" : escapeHtml(codeSegments[i].name);
            }
        }
        return listenersArr;
    };
    window.AnimatedGlow = 0
    window.doPlus = true;
    window.Bounce = 1.25;
    window.Bounce2 = 1.25;
    window._doPlus = true;
    setInterval(() => {
        if (window._doPlus == true) doPlusPlus();
        if (window._doPlus == false) doMinusMinus();

        function doPlusPlus() {
            if (window._doPlus == false) return;
            window._doPlus = true;
            window.Bounce += 0.01;
            window.Bounce2 += 0.01;
            if (window.Bounce >= 1.5) window._doPlus = false;
        }

        function doMinusMinus() {
            if (window._doPlus == true) return;
            if (window.Bounce <= 1.25) return window._doPlus = true;
            window.Bounce -= 0.005;
            window.Bounce2 -= 0.005;
        }
    }, 10)
    setInterval(() => {
        if (window.doPlus == true) doPlusPlus();
        if (window.doPlus == false) doMinusMinus();

        function doPlusPlus() {
            if (window.doPlus == false) return;
            window.doPlus = true;
            window.AnimatedGlow++;
            if (window.AnimatedGlow >= 20) window.doPlus = false;
        }

        function doMinusMinus() {
            if (window.doPlus == true) return;
            if (window.AnimatedGlow <= 0) return window.doPlus = true;
            window.AnimatedGlow--;
        }
    }, 20)
    window.getKeyFromCharCode = (key, keyString) => {
        let KeyString = String.fromCharCode(key);
        if (KeyString == keyString.toUpperCase()) {
            return KeyString;
        } else {
            return keyString;
        }
    }


    window.canGetKeyCode = false;
    window.replaceSettingCode = null;


    window.replaceText = (elm) => {
        if (window.replaceSettingCode) $(`#${window.replaceSettingCode[0].id}`).text(`${window.customSettingsV2[window.replaceSettingCode[0].id].key}`);
        $(".keyb").removeClass("active");
        let id = elm.id;
        elm = $(elm);
        window.replaceSettingCode = elm;
        elm.addClass("active");
        elm.text("Press Key");
        window.canGetKeyCode = true;
    }


    window.loadProfile = (id) => {
        //   {"currentProfile": }
        let data = localStorage.getItem('maf1profile');
        if (data) {
            try {
                cache = JSON.parse(data);
                window.profilesCache = cache;
                if (id == 1) {
                    $("#skin_url").val(window.profilesCache.first.url);
                    window.MFX.changePreviewImage(window.profilesCache.first.url);
                    window.profilesCache.current.id = id;
                } else if (id == 2) {
                    $("#skin_url").val(window.profilesCache.second.url);
                    window.profilesCache.current.id = id;
                    window.MFX.changePreviewImage(window.profilesCache.second.url);
                } else if (id == 3) {
                    $("#skin_url").val(window.profilesCache.third.url);
                    window.MFX.changePreviewImage(window.profilesCache.third.url);
                    window.profilesCache.current.id = id;
                } else if (id == 4) {
                    $("#skin_url").val(window.profilesCache.fourth.url);
                    window.MFX.changePreviewImage(window.profilesCache.fourth.url);
                    window.profilesCache.current.id = id;
                } else if (id == 5) {
                    $("#skin_url").val(window.profilesCache.fifth.url);
                    window.MFX.changePreviewImage(window.profilesCache.fifth.url);
                    window.profilesCache.current.id = id;
                } else if (id == 6) {
                    console.log(e);
                    window.localStorage.removeItem("maf1profile");
                    setTimeout(() => {
                        window.loadProfile(1);
                    }, 1);
                } else {

                }
                saveProfiles();
            } catch (e) {
                console.log(e);
                window.localStorage.removeItem("maf1profile");
                setTimeout(() => {
                    window.loadProfile(1);
                }, 1);
            }
        } else {
            cache = JSON.stringify({
                current: {
                    id: 1
                },
                first: {
                    url: "",
                },
                second: {
                    url: "",
                },
                third: {
                    url: "",
                },
                fourth: {
                    url: "",
                },
                fifth: {
                    url: "",
                }
            });
            window.localStorage.setItem("maf1profile", cache);
            setTimeout(() => {
                window.loadProfile(1);
            }, 1);
        }
    }

    window.saveProfiles = () => {
        let elements = JSON.stringify({
            current: {
                id: window.profilesCache.current.id,
            },
            first: {
                url: window.profilesCache.first.url,
            },
            second: {
                url: window.profilesCache.second.url,
            },
            third: {
                url: window.profilesCache.third.url,
            },
            fourth: {
                url: window.profilesCache.fourth.url,
            },
            fifth: {
                url: window.profilesCache.fifth.url,
            }

        });
        window.localStorage.setItem("maf1profile", elements);
        // window.loadProfile(window.profilesCache.current.id);
    };

    window.customSettingsV2 = {};

    window.loadCustomSettings = () => {
        let cache = window.localStorage.getItem("customSettingsV2");
        if (cache) {
            try {
                cache = JSON.parse(cache);
                window.customSettingsV2 = cache;
                window.$("#macroFeed").text(`${window.customSettingsV2.macroFeed.key}`);
                window.$("#feederKey").text(`${window.customSettingsV2.feederKey.key}`);
                window.$("#splitBots").text(`${window.customSettingsV2.splitBots.key}`);
                window.$("#ejectBots").text(`${window.customSettingsV2.ejectBots.key}`);
                window.$("#stopMoving").text(`${window.customSettingsV2.stopMoving.key}`);
                window.$("#doubleSplit").text(`${window.customSettingsV2.doubleSplit.key}`);
                window.$("#quadSplit").text(`${window.customSettingsV2.quadSplit.key}`);
                window.$("#virusKey").text(`${window.customSettingsV2.virusKey.key}`);
                window.$("#speedKey").text(`${window.customSettingsV2.speedKey.key}`);
                window.$("#explodeKey").text(`${window.customSettingsV2.explodeKey.key}`);
                window.$("#freezeKey").text(`${window.customSettingsV2.freezeKey.key}`);
                window.$("#mergeKey").text(`${window.customSettingsV2.mergeKey.key}`);
                window.$("#zombyKey").text(`${window.customSettingsV2.zombyKey.key}`);
                window.$("#growKey").text(`${window.customSettingsV2.growKey.key}`);
            } catch (e) {
                console.log(e);
                window.localStorage.removeItem("customSettingsV2");
                setTimeout(() => {
                    window.loadCustomSettings();
                }, 1);
            }
        } else {
            cache = JSON.stringify({
                macroFeed: {
                    key: "W",
                    keyCode: 87
                },
                feederKey: {
                    key: "T",
                    keyCode: 84
                },
                splitBots: {
                    key: "E",
                    keyCode: 69
                },
                ejectBots: {
                    key: "R",
                    keyCode: 82
                },
                stopMoving: {
                    key: "S",
                    keyCode: 83
                },
                doubleSplit: {
                    key: "D",
                    keyCode: 68
                },
                quadSplit: {
                    key: "SHIFT",
                    keyCode: 16
                },
                virusKey: {
                    key: "V",
                    keyCode: 86
                },
                speedKey: {
                    key: "G",
                    keyCode: 71
                },
                explodeKey: {
                    key: "X",
                    keyCode: 88
                },
                freezeKey: {
                    key: "F",
                    keyCode: 70
                },
                mergeKey: {
                    key: "M",
                    keyCode: 77
                },
                zombyKey: {
                    key: "Z",
                    keyCode: 90
                },
                growKey: {
                    key: "A",
                    keyCode: 65
                }
            });
            window.localStorage.setItem("customSettingsV2", cache);
            setTimeout(() => {
                window.loadCustomSettings();
            }, 1);
        }
    };

    window.saveCustomSettings = () => {
        let elements = JSON.stringify({
            macroFeed: {
                key: window.$("#macroFeed").text(),
                keyCode: window.customSettingsV2.macroFeed.keyCode
            },
            feederKey: {
                key: window.$("#feederKey").text(),
                keyCode: window.customSettingsV2.feederKey.keyCode
            },
            splitBots: {
                key: window.$("#splitBots").text(),
                keyCode: window.customSettingsV2.splitBots.keyCode
            },
            ejectBots: {
                key: window.$("#ejectBots").text(),
                keyCode: window.customSettingsV2.ejectBots.keyCode
            },
            stopMoving: {
                key: window.$("#stopMoving").text(),
                keyCode: window.customSettingsV2.stopMoving.keyCode
            },
            doubleSplit: {
                key: window.$("#doubleSplit").text(),
                keyCode: window.customSettingsV2.doubleSplit.keyCode
            },
            quadSplit: {
                key: window.$("#quadSplit").text(),
                keyCode: window.customSettingsV2.quadSplit.keyCode
            },
            virusKey: {
                key: window.$("#virusKey").text(),
                keyCode: window.customSettingsV2.virusKey.keyCode
            },
            speedKey: {
                key: window.$("#speedKey").text(),
                keyCode: window.customSettingsV2.speedKey.keyCode
            },
            explodeKey: {
                key: window.$("#explodeKey").text(),
                keyCode: window.customSettingsV2.explodeKey.keyCode
            },
            freezeKey: {
                key: window.$("#freezeKey").text(),
                keyCode: window.customSettingsV2.freezeKey.keyCode
            },
            mergeKey: {
                key: window.$("#mergeKey").text(),
                keyCode: window.customSettingsV2.mergeKey.keyCode
            },
            zombyKey: {
                key: window.$("#zombyKey").text(),
                keyCode: window.customSettingsV2.zombyKey.keyCode
            },
            growKey: {
                key: window.$("#growKey").text(),
                keyCode: window.customSettingsV2.growKey.keyCode
            },

        });
        window.localStorage.setItem("customSettingsV2", elements);
        window.loadCustomSettings();
    };

    this.createMessageDialog = function () {
        var $message;
        var $text;
        $text = $("<div class='modal-footer'>");
        $text.append("<button type='button' class='btn btn-default' data-dismiss='modal'>OK</button>");
        $message = $("<div class='modal-content'/>");
        $message.append($("<div class='modal-header'/>").append("<button type='button' class='close' data-dismiss='modal'>&times;</button><h4 id='message_dialog_title' class='modal-title'></h4>"));
        $message.append($("<div id='message_dialog_content' class='modal-body'>"));
        $message.append($text);
        $message = $("<div id='message_dialog' class='modal fade' role='dialog'/>").append("<div class='modal-dialog'/>").append($message);
        $("body").append($message);
        $("#message_dialog").modal({
            backdrop: "static",
            keyboard: false
        });
        $(document).on("shown.bs.modal", "#message_dialog", function () {
            var a = $("#message_dialog>.modal-content").outerHeight();
            var b = $(document).outerHeight();
            if (a > b) {
                $("#message_dialog").css("overflow", "auto");
            } else {
                $("#message_dialog").css("margin-top", b / 2 - a / 2 - 40);
            }
        });
        $(document).on("hide.bs.modal", "#message_dialog", function () {});
    };
    this.copyGameInfo = function () {
        var failuresLink;
        failuresLink = "Current IP = " + window.MFX.getCurrentIP();
        var codeSegments = window.MFX.getLeaderBoard();
        if (codeSegments && 0 != codeSegments.length) {
            var i = 0;
            for (; i < codeSegments.length; i++) {
                failuresLink += "\n" + (i + 1) + ".  " + codeSegments[i];
            }
        }
        copyToClipboard(failuresLink);
    };
    window.resetDefaultHotkey = function () {
        var e;
        e = hotkeyMapping;
        defaultHotkeyMapping = {};
        var unlock;
        for (unlock in hotkeyConfig) {
            if (hotkeyConfig[unlock].defaultHotkey) {
                if ("" != hotkeyConfig[unlock].defaultHotkey) {
                    defaultHotkeyMapping[hotkeyConfig[unlock].defaultHotkey] = unlock;
                }
            }
        }
        hotkeyMapping = defaultHotkeyMapping;
        window.MFX.refreshHotkeySettingPage();
        hotkeyMapping = e;
        defaultHotkeyMapping = null;
    };
    this.refreshHotkeySettingPage = function () {
        var codeSegments = $(".hotkey");
        var i = 0;
        for (; i < codeSegments.length; i++) {
            $(codeSegments[i]).text(" ");
        }
        var version;
        for (version in hotkeyMapping) {
            $("[data-hotkeyid=" + hotkeyMapping[version] + "]").text(version);
        }
        var val;
        for (val in chatCommand) {
            $("#" + val).val(chatCommand[val]);
        }
    };
    this.getHotkeyDivHtml = function () {
        var html = "";
        var fragment = $("#keybindsMfx");
        var rendered = $("<div id='hotkey_table' class='table'></div>");
        var $message = $("<div class='row header'></div>");
        $message.append($("<div class='cell' style='width:170px;'>Hotkey</div>"));
        $message.append($("<div class='cell' style='width:222px;'>Function</div>"));
        rendered.append($message);
        $message = null;
        var type;
        for (type in hotkeyConfig) {
            $message = $("<div class='row'></div>");
            $message.append($("<div data-hotkeyId='" + type + "' class='cell hotkey'>" + getHotkeyById(type) + "</div>"));
            $message.append($("<div class='cell'>" + hotkeyConfig[type].name + "</div>"));
            rendered.append($message);
        }
        return fragment.append(rendered), html += $("<p>Step 1: Click on the function item</p>")[0].outerHTML, html += $("<p>Step 2: Press wanted hotkey to modify</p>")[0].outerHTML, html += $("<p>Press [DEL] key to remove selected hotkey</p>")[0].outerHTML, html += $("<p>Allowed hotkey combinations: [CTRL] + [ALT] + 0-9, a-z, [TAB], [ENTER]</p>")[0].outerHTML, html += $("<br></br>")[0].outerHTML, html += fragment[0].outerHTML, $("<div/>").append(html).html();
    };
    this.checkVersion = function () {
        var string = getLocalStorage("lastestVersion");
        if (!(string && string == window.MFX.version)) {
            window.MFX.applyNewUpdate();
            setLocalStorage("lastestVersion", window.MFX.version);
        }
    };
    this.showAnnouncement = function () {};
    this.applyNewUpdate = function () {};
    this.setupHints = function () {};
    this.setupHintsImpl = function (node, newValue) {
        node.addClass("hint--bottom hint--rounded");
        node.attr("data-hint", newValue);
    };
    this.ajax = function (url, options, callback, uri) {
        uri = null;
        var request;
        try {
            request = new XMLHttpRequest;
        } catch (a) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (s) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (l) {
                    return alert("Your browser does not support Ajax."), false;
                }
            }
        }
        return request.onreadystatechange = function () {
            if (4 == request.readyState) {
                callback(request);
            }
        }, request.open(options, url, true), request.send(uri), request;
    };
    this.getSkinImage = function (t) {
        return t && "" != t ? customSkin[t] ? customSkin[t] : (-1 == skinDownloadQueue.indexOf(t) && skinDownloadQueue.push(t), null) : null;
    };
    this.downloadSkin = function () {
        if (0 != skinDownloadQueue.length) {
            var task = skinDownloadQueue.shift();
            if (!customSkin[task]) {
                if (skinDownloadFail[task] && 5 < skinDownloadFail[task]) {
                    if (window.MFX.getCustomSkinUrl() === task) {
                        $("#skin_url").val("").trigger("change");
                    }
                } else {
                    window.postMessage({
                        data: task
                    }, "*");
                }
            }
        }
        setTimeout(window.MFX.downloadSkin, 2E3);
    };
    this.changePreviewImage = function (url) {
        $("#preview-img").fadeOut(315, function () {
            $(this).attr("src", url).bind("onreadystatechange load", function () {
                if (this.complete) {
                    $(this).fadeIn(315);
                }
            });
        });
    };
}

window.exec = function (command) {
    chatRoom.sendMessageToServer(command);
}

function ChatRoom() {
    this.container = "";
    this.isShow = true;
    this.lastMsg = "";
    this.width = 340;
    this.height = 350;
    var _this = this;
    var t = 0;
    this.createChatBox = function () {
        $(this.container).append("<div id='chatroom'></div>");
        this.hide();
        $("#chatboxArea2").hide();
        $("#chatroom").mouseup(function () {
            _this.resize();
        });
    };
    _this.resize = function () {
        if ($("#chatroom").width() != this.width || $("#chatroom").height() != this.height) {
            if ($("#chatroom").perfectScrollbar) {
                $("#chatroom").perfectScrollbar("update");
            }
        }
    };
    this.setContainer = function (container) {
        this.container = container;
    };
    this.sendMessage = function (msg) {
        if (msg.charAt(0) == '/') { // Comando para el servidor
            window.exec(msg);
        } else {
            if (msg = msg.trim()) {
                if (!(2E3 > Date.now() - t && 50 > msg.length)) {
                    conn.sendMessage({
                        sender: window.MFX.getName(),
                        msg: msg
                    });
                    this.lastMsg = msg;
                    t = Date.now();
                }
            }
        }
    };
    this.sendMessageToServer = function (message) {
        message = message.trim();
        if ((message.length < 200) && (message.length > 0)) {
            var view = new DataView(new ArrayBuffer(2 + 2 * message.length));
            var offset = 0;
            view.setUint8(offset++, 99);
            view.setUint8(offset++, 0);
            for (var i = 0; i < message.length; ++i) {
                view.setUint16(offset, message.charCodeAt(i), true);
                offset += 2
            };
            window.webSocket.send(view)
        }
    }

    function Writer(littleEndian) {
        this._e = littleEndian;
        this.reset();
        return this;
    }
    Writer.prototype = {
        writer: true,
        reset: function (littleEndian) {
            this._b = [];
            this._o = 0;
        },
        setUint8: function (a) {
            if (a >= 0 && a < 256) this._b.push(a);
            return this;
        },
        setInt8: function (a) {
            if (a >= -128 && a < 128) this._b.push(a);
            return this;
        },
        setUint16: function (a) {
            __buf.setUint16(0, a, this._e);
            this._move(2);
            return this;
        },
        setInt16: function (a) {
            __buf.setInt16(0, a, this._e);
            this._move(2);
            return this;
        },
        setUint32: function (a) {
            __buf.setUint32(0, a, this._e);
            this._move(4);
            return this;
        },
        setInt32: function (a) {
            __buf.setInt32(0, a, this._e);
            this._move(4);
            return this;
        },
        setFloat32: function (a) {
            __buf.setFloat32(0, a, this._e);
            this._move(4);
            return this;
        },
        setFloat64: function (a) {
            __buf.setFloat64(0, a, this._e);
            this._move(8);
            return this;
        },
        _move: function (b) {
            for (var i = 0; i < b; i++) this._b.push(__buf.getUint8(i));
        },
        setStringUTF8: function (s) {
            var bytesStr = unescape(encodeURIComponent(s));
            for (var i = 0, l = bytesStr.length; i < l; i++) this._b.push(bytesStr.charCodeAt(i));
            this._b.push(0);
            return this;
        },
        build: function () {
            return new Uint8Array(this._b);
        }
    };

    // window.buildClans = (data) => {
    //     var c = "";
    //     let args = data.split(";");
    //     c += `<div id="Clan${args[0]}" class="card">`;
    //     c += `<p style="margin: 10px 0 0;">${args[0]}</p>`;
    //     c += `<p class="mt-3 mb-3">${args[1] - 1}</p>`;
    //     if (args[2] == args[0]) c += `<a><button onclick="window.exitClan('${args[0]}')" class="skinbtn">Leave</button></a>`;
    //     if (args[2] !== args[0]) c += `<a><button onclick="window.joinClan('${args[0]}')" class="skinbtn">Join</button></a>`;
    //     c += `</div>`
    //     $("#globalclanList").append(c);
    // }

    window.onLogout = () => {
        $("#accountCircle").css('display', 'block');
        $("#accountInfo").css('display', 'none');
        window.localStorage.setItem("lgDatG", JSON.stringify({
            autologin: false,
            buffer: []
        }));
        window.webSocket.close();
    };
    // window.deleteFromBuilded = (skin) => {
    //     $(`#premiumSkins${skin}`).remove();
    // }
    // window.addToOwned = (ownedskin) => {
    //     var c = "";

    //     if (window.equipedSkin == ownedskin) {
    //         c += `<div id="ownedSkin${ownedskin}" class="card">`;
    //         c += `<img src="https://myagar.pro:7777/images/approved/${ownedskin}.png" class="card-img-top" alt="...">`;
    //         c += `<p style="margin: 10px 0 0;">${ownedskin.split("@")[1]}</p>`;
    //         c += `<a><button id="ownedSkinsButton${ownedskin}" style="background-color:red;border-color:red;color:fff" onclick="window.setSkin('removeSkin')" class="skinbtn">Cancel</button></a>`;
    //         c += '</div>';
    //     } else {
    //         c += `<div id="ownedSkin${ownedskin}" class="card">`;
    //         c += `<img src="https://myagar.pro:7777/images/approved/${ownedskin}.png" class="card-img-top" alt="...">`;
    //         c += `<p style="margin: 10px 0 0;">${ownedskin.split("@")[1]}</p>`;
    //         c += `<button id="ownedSkinsButton${ownedskin}" onclick="window.setSkin('${ownedskin}')" class="skinbtn">Use</button>`;
    //         c += '</div>';
    //     }
    //     $("#userownedSkins").append(c);
    // }
    window.onLogin = (id, email, token) => {
        var view = new DataView(new ArrayBuffer(2 * id.length + email.length + token.length));
        var offset = 0;
        view.setUint8(offset++, 153);
        view.setUint8(offset++, 0);
        for (var i = 0; i < id.length; ++i) {
            view.setUint16(offset, id.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        for (var i = 0; i < email.length; ++i) {
            view.setUint16(offset, email.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        for (var i = 0; i < token.length; ++i) {
            view.setUint16(offset, token.charCodeAt(i), offset++);
        };
        window.webSocket.send(view);
    };
    window.sendCaptcha = (captcha) => {
        var view = new DataView(new ArrayBuffer(2 * captcha.length));
        var offset = 0;
        view.setUint8(offset++, 101);
        // view.setUint8(offset++, 0);
        for (var i = 0; i < captcha.length; ++i) {
            view.setUint16(offset, captcha.charCodeAt(i), offset++);
        };
        window.webSocket.send(view);
    }
    window.reloadClans = () => {
        $("#globalclanList").html("");
        var view = new DataView(new ArrayBuffer(2));
        var offset = 0;
        view.setUint8(offset++, 176);
        window.webSocket.send(view);
    }
    window.exitClan = (clan) => {
        var view = new DataView(new ArrayBuffer(2 * clan.length));
        var offset = 0;
        view.setUint8(offset++, 175);
        for (var i = 0; i < clan.length; ++i) {
            view.setUint16(offset, clan.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        window.webSocket.send(view);
    }
    window.clanKick = (name) => {
        var view = new DataView(new ArrayBuffer(2 * name.length));
        var offset = 0;
        view.setUint8(offset++, 177);
        for (var i = 0; i < name.length; ++i) {
            view.setUint16(offset, name.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        window.webSocket.send(view);
    }
    window.clanUnban = (name) => {
        var view = new DataView(new ArrayBuffer(2 * name.length));
        var offset = 0;
        view.setUint8(offset++, 179);
        for (var i = 0; i < name.length; ++i) {
            view.setUint16(offset, name.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        window.webSocket.send(view);
    }
    window.clanBan = (name) => {
        var view = new DataView(new ArrayBuffer(2 * name.length));
        var offset = 0;
        view.setUint8(offset++, 178);
        for (var i = 0; i < name.length; ++i) {
            view.setUint16(offset, name.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        window.webSocket.send(view);
    }
    window.changetagClan = () => {
        let name = $("#ClanTagForChange").val();
        var view = new DataView(new ArrayBuffer(2 * name.length));
        var offset = 0;
        view.setUint8(offset++, 180);
        for (var i = 0; i < name.length; ++i) {
            view.setUint16(offset, name.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        window.webSocket.send(view);
    }
    window.createClan = () => {
        let args = $("#CreateClanTitle").val() + ";" + $("#CreateClanTag").val();
        var view = new DataView(new ArrayBuffer(2 * args.length));
        var offset = 0;
        view.setUint8(offset++, 173);
        for (var i = 0; i < args.length; ++i) {
            view.setUint16(offset, args.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        window.webSocket.send(view);
    }
    window.joinClan = (clan) => {
        var view = new DataView(new ArrayBuffer(2 * clan.length));
        var offset = 0;
        view.setUint8(offset++, 174);
        for (var i = 0; i < clan.length; ++i) {
            view.setUint16(offset, clan.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        window.webSocket.send(view);
    }
    window.deleteClan = (clan) => {
        var view = new DataView(new ArrayBuffer(2 * clan.length));
        var offset = 0;
        view.setUint8(offset++, 181);
        for (var i = 0; i < clan.length; ++i) {
            view.setUint16(offset, clan.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        window.webSocket.send(view);
    }
    window._Login = (username, password) => {
        var view = new DataView(new ArrayBuffer(2 * username.length + password.length));
        var offset = 0;
        view.setUint8(offset++, 153);
        view.setUint8(offset++, 0);
        for (var i = 0; i < username.length; ++i) {
            view.setUint16(offset, username.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        for (var i = 0; i < password.length; ++i) {
            view.setUint16(offset, password.charCodeAt(i), offset++);
        };
        window.webSocket.send(view);
    }
    window.buy = (id) => {
        var view = new DataView(new ArrayBuffer(2));
        var offset = 0;
        view.setUint8(offset++, 166);
        view.setUint8(offset++, id);
        window.webSocket.send(view);
    }
    window.use = (id) => {
        var view = new DataView(new ArrayBuffer(2));
        var offset = 0;
        view.setUint8(offset++, 167);
        view.setUint8(offset++, id);
        window.webSocket.send(view);
    }
    window.updateFeedColor = (color) => {
        $("#feedPreview").css('background-color', color);
        var view = new DataView(new ArrayBuffer(2 * color.length));
        var offset = 0;
        view.setUint8(offset++, 171);
        for (var i = 0; i < color.length; ++i) {
            view.setUint16(offset, color.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        window.webSocket.send(view);
    }
    window.updateColor = (color) => {
        $(".nickname").css('color', color);
        var view = new DataView(new ArrayBuffer(2 * color.length));
        var offset = 0;
        view.setUint8(offset++, 160);
        for (var i = 0; i < color.length; ++i) {
            view.setUint16(offset, color.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        window.webSocket.send(view);
    }
    window.colorBuy = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm purchase!'
        }).then((result) => {
            if (result.value == true) {
                buyColor($("#cp2").val());
            }
        })
    }
    window.feedBuy = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Color alpha[RGBA] isn't working!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm purchase!'
        }).then((result) => {
            if (result.value == true) {
                buyFeedColor($("#cp3").val());
            }
        })
    }
    window.buyColor = (color) => {
        var view = new DataView(new ArrayBuffer(2 * color.length));
        var offset = 0;
        view.setUint8(offset++, 159);
        for (var i = 0; i < color.length; ++i) {
            view.setUint16(offset, color.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        window.webSocket.send(view);
    }
    window.buyFeedColor = (color) => {
        if(color.length > 8) {
            const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');

            const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
            var view = new DataView(new ArrayBuffer(2 * color.length));
            var offset = 0;
            view.setUint8(offset++, 170);
            for (var i = 0; i < hex.length; ++i) {
                view.setUint16(offset, hex.charCodeAt(i), offset++);
            };
            view.setUint8(offset++, 0);
            window.webSocket.send(view);
        } else {
            var view = new DataView(new ArrayBuffer(2 * color.length));
            var offset = 0;
            view.setUint8(offset++, 170);
            for (var i = 0; i < color.length; ++i) {
                view.setUint16(offset, color.charCodeAt(i), offset++);
            };
            view.setUint8(offset++, 0);
            window.webSocket.send(view);
        }
    }
    deleteCustomSkin = (skin) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.value == true) {
                $.post("https://myagar.pro:7777/skinDelete", {
                    skin: skin,
                    key: JSON.parse(window.localStorage.getItem("lgDatG")).google_id,
                    token: JSON.parse(window.localStorage.getItem("lgDatG")).google_tokenid
                }, (data) => {
                    data = JSON.parse(data);
                    Swal.fire({
                        title: data.title,
                        text: data.message,
                        type: data.type
                    })
                    if (data.type == "success") return connect(`wss:/${window.MFX.getCurrentIP()}`);
                });
            }
        })
    }
    window.setLevelSkin = (id) => {
        var view = new DataView(new ArrayBuffer(3));
        var offset = 0;
        view.setUint8(offset++, 156);
        view.setUint8(offset++, id);
        window.webSocket.send(view);
    }
    window.setEventSkin = (id) => {
        var view = new DataView(new ArrayBuffer(3));
        var offset = 0;
        view.setUint8(offset++, 157);
        view.setUint8(offset++, id);
        window.webSocket.send(view);
    }
    window.setSkin = (skin) => {
        var view = new DataView(new ArrayBuffer(2 * skin.length));
        var offset = 0;
        view.setUint8(offset++, 155);
        for (var i = 0; i < skin.length; ++i) {
            view.setUint16(offset, skin.charCodeAt(i), offset++);
        };
        view.setUint8(offset++, 0);
        window.webSocket.send(view);
    }
    window.getFreeCoins = () => {
        var view = new DataView(new ArrayBuffer(2));
                    view.setUint8(0, 154);
                    window.webSocket.send(view);
        // aiptag.cmd.player.push(function() {
		// 	aiptag.adplayer = new aipPlayer({
		// 		AIP_REWARDEDCOMPLETE: function (evt)  {
        //             var view = new DataView(new ArrayBuffer(2));
        //             view.setUint8(0, 154);
        //             window.webSocket.send(view);
		// 		},
		// 		AIP_REWARDEDGRANTED: function ()  {

		// 		},
		// 		AD_WIDTH: 960,
		// 		AD_HEIGHT: 540,
		// 		AD_FULLSCREEN: true,
		// 		AD_CENTERPLAYER: true,
		// 		LOADING_TEXT: 'loading advertisement',
		// 		PREROLL_ELEM: function(){return document.getElementById('preroll')},
		// 		AIP_COMPLETE: function (e)  {
			
		// 			console.log(e);
		// 		},
		// 		AIP_REMOVE: function ()  {
		// 			// Here it's save to remove the PREROLL_ELEM from the page if you want. But it's not recommend.
		// 		}
		// 	});
        // });
        // if (typeof aiptag.adplayer !== 'undefined') {
        //     aiptag.cmd.player.push(function() { aiptag.adplayer.startRewardedAd(); });
        //     } else {
        //         Swal.fire(
        //             'Error!',
        //             'Cannot load advert!',
        //             'error'
        //         )
        //     }
    }
    this.enter = function () {
        if (this.isFocus()) {
            this.sendMessageToServer($("#input_box2").val());
            $("#input_box2").val("");
            $("#input_box2").blur();
            $("#chatboxArea2").show();
        } else {
            this.focus();
        }
    };
    this.popup = function (callback) {
        if (window.MFX.isEnableChatpopup) {
            if (!this.isShow) {
                if ($.toast) {
                    $.toast(callback);
                } else {
                    toastQueue.push(callback);
                }
            }
        }
    };
    this.popupInfo = function (text) {
        this.popup({
            text: escapeHtml(text),
            showHideTransition: "slide",
            icon: "info",
            bgColor: "rgba(33, 150, 243, 0.95)",
            allowToastClose: false,
            hideAfter: 15E3,
            stack: 10
        });
    };
    this.popupWarning = function (text) {
        this.popup({
            text: escapeHtml(text),
            showHideTransition: "slide",
            icon: "warning",
            bgColor: "rgba(255, 152, 0, 0.95)",
            allowToastClose: false,
            hideAfter: 15E3,
            stack: 10
        });
    };
    this.showSystemMessage = function (m1) {
        this.showSystemMessageImpl(m1);
        this.popupInfo(m1);
    };
    this.showSystemWarning = function (m1) {
        this.showSystemMessageImpl(m1);
        this.popupWarning(m1);
    };
    this.showSystemMessageImpl = function (num) {
        if (window.MFX.showSystemMessage()) {
            $("#chatroom").append($("<div/>").append($("<span class='system'/>").text(this.getTimeStr() + num)));
            this.scrollDown();
        }
    };
    this.getTimeStr = function () {
        var now = new Date;
        var index = now.getMinutes();
        return index = 10 > index ? "0" + index : index, now.getHours() + ":" + index + " ";
    };
    this.receiveMessage = function (msg, message, color) {
        var tabContent = $("<div/>");
        var errors = $("<span class='time'>").text(this.getTimeStr());
        if (msg.split("!#$!@%")[1]) {
            var size = $(`<span style="color:${color}" class='sender'>`).html(`<span style="color: white; padding: 0px 2px 0px; background-color: red; border-style: solid; border-color: red; font-size: 10px; border-radius: 4px; top: -1px; position: relative;">YT</span> ${msg.split("!#$!@%")[1] + ": "}`);
        } else {
            if (msg.split("!#$!@%")[0] == "SERVER") {
                var size = $(`<span style="color:${color}" class='sender'>`).text(String.fromCharCode(55357, 56401) + " " + msg.split("YT!#$!@%")[0] + ": ");
            } else {
                var size = $(`<span style="color:${color}" class='sender'>`).text(msg.split("YT!#$!@%")[0] + ": ");
            }
        }
        tabContent.append(errors);
        tabContent.append(size);
        errors = $("<span class='msg'>").text(message);
        errors.html(this.replaceXAZIcon(errors.html()));
        tabContent.append(errors);
        $("#chatroom").append(tabContent);
        this.scrollDown();
    };
    this.replaceXAZIcon = function (xhtml) {
        var query;
        for (query in xazIcon) {
            xhtml = xhtml.replace(new RegExp(escapeRegex(query), "g"), '<img alt="$1" src="' + xazIcon[query] + '">');
        }
        var images = $('img[alt="$1"]');
        var i = 0;
        for (; i < images.length; i++) {
            for (query in xazIcon) {
                if (images[i].src == xazIcon[query]) {
                    $(images[i]).attr("alt", query);
                    break;
                }
            }
        }
        return xhtml;
    };
    this.scrollDown = function () {
        if ($("#chatroom").perfectScrollbar) {
            $("#chatroom").scrollTop($("#chatroom").prop("scrollHeight"));
            $("#chatroom").perfectScrollbar("update");
        }
    };
    this.show = function () {
        $("#chatroom").show();
        this.isShow = true;
        this.scrollDown();
    };
    this.hide = function () {
        $("#chatroom").hide();
        this.isShow = false;
    };
    this.isFocus = function () {
        return $("#input_box2").is(":focus");
    };
    this.focus = function () {
        $("#chatboxArea2").show();
        $("#input_box2").focus();
    };
    this.createScrollBar = function () {
        $("#chatroom").perfectScrollbar({
            minScrollbarLength: 50,
            suppressScrollX: false
        });
    };
}

function Minimap() {
    var canvas;
    var ctx;
    var options;
    var context;
    var w = 200;
    var h = 200;
    var s = false;
    var frequency = 3000 / 70;
    var v = {};
    this.createMap = function (s) {
        if (s) {
            w = h = s;
        }
        $("body").append("<canvas id='minimapNode'>");
        $("body").append("<canvas id='minimap' >");
        canvas = document.getElementById("minimap");
        ctx = canvas.getContext("2d");
        canvas.width = w;
        canvas.height = h;
        ctx.scale(1, 1);
        ctx.strokeStyle = "#fff";
        ctx.fillStyle = "rgba(0, 0, 0, .5)";
        ctx.globalAlpha = 0.9;
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = 0.2;
        ctx.font = "12px Verdana";
        ctx.fillStyle = "#fff";
        ctx.fillText("A1", w / 5 / 2, h / 5 / 2);
        ctx.fillText("A2", w / 5 / 2 * 3, h / 5 / 2);
        ctx.fillText("A3", w / 5 / 2 * 5, h / 5 / 2);
        ctx.fillText("A4", w / 5 / 2 * 7, h / 5 / 2);
        ctx.fillText("A5", w / 5 / 2 * 9, h / 5 / 2);
        ctx.fillText("B1", w / 5 / 2, h / 5 / 2 * 3);
        ctx.fillText("B2", w / 5 / 2 * 3, h / 5 / 2 * 3);
        ctx.fillText("B3", w / 5 / 2 * 5, h / 5 / 2 * 3);
        ctx.fillText("B4", w / 5 / 2 * 7, h / 5 / 2 * 3);
        ctx.fillText("B5", w / 5 / 2 * 9, h / 5 / 2 * 3);
        ctx.fillText("C1", w / 5 / 2, h / 5 / 2 * 5);
        ctx.fillText("C2", w / 5 / 2 * 3, h / 5 / 2 * 5);
        ctx.fillText("C3", w / 5 / 2 * 5, h / 5 / 2 * 5);
        ctx.fillText("C4", w / 5 / 2 * 7, h / 5 / 2 * 5);
        ctx.fillText("C5", w / 5 / 2 * 9, h / 5 / 2 * 5);
        ctx.fillText("D1", w / 5 / 2, h / 5 / 2 * 7);
        ctx.fillText("D2", w / 5 / 2 * 3, h / 5 / 2 * 7);
        ctx.fillText("D3", w / 5 / 2 * 5, h / 5 / 2 * 7);
        ctx.fillText("D4", w / 5 / 2 * 7, h / 5 / 2 * 7);
        ctx.fillText("D5", w / 5 / 2 * 9, h / 5 / 2 * 7);
        ctx.fillText("E1", w / 5 / 2, h / 5 / 2 * 9);
        ctx.fillText("E2", w / 5 / 2 * 3, h / 5 / 2 * 9);
        ctx.fillText("E3", w / 5 / 2 * 5, h / 5 / 2 * 9);
        ctx.fillText("E4", w / 5 / 2 * 7, h / 5 / 2 * 9);
        ctx.fillText("E5", w / 5 / 2 * 9, h / 5 / 2 * 9);
        options = document.getElementById("minimapNode");
        context = options.getContext("2d");
        options.width = s;
        options.height = s;
        context.globalAlpha = 1;
        context.scale(1, 1);
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold 13px Ubuntu";
        this.hide();
        setInterval(function () {
            minimap.drawNodes();
        }, frequency);
    };
    this.uploadSelfPosition = function () {
        if (getCurrentX() && getCurrentY()) {
            s = true;
            conn.uploadCoords({
                x: getCurrentX(),
                y: getCurrentY()
            });
        } else {
            if (s) {
                conn.uploadCoords({
                    x: getCurrentX(),
                    y: getCurrentY()
                });
                s = false;
            }
        }
    };
    this.isExists = function (dataAndEvents) {
        var i = 0;
        for (; i < nodeList.length; i++) {
            if (dataAndEvents == nodeList[i][0]) {
                return i;
            }
        }
        return null;
    };
    this.updateNode = function (obj) {
        var i;
        var node = obj.id;
        var l = obj.x;
        var lat = obj.y;
        var entityName = obj.name;
        if (i = this.isExists(node)) {
            nodeList[i][1] = entityName.split("$")[0];
            nodeList[i][2] = l;
            nodeList[i][3] = lat;
            nodeList[i][7] = true;
            nodeList[i][4] = 0 == obj.c ? "#FFF" : "#FFF";
            nodeList[i][8] = Date.now();
            if (!(nodeList[i][12] && nodeList[i][13])) {
                nodeList[i][12] = l;
                nodeList[i][13] = lat;
            }
        } else {
            nodeList[nodeList.length] = [node, entityName, null, null, "#FFF", null, null];
        }
    };
    this.addNode = function (mode) {
        nodeList[nodeList.length] = [mode.id, mode.name, null, null, nodeColor, mode.skinurl, mode.cellColor];
    };
    this.deleteNode = function (el) {};
    this.drawNodes = function () {
        var max = getLengthX();
        var s = getLengthY();
        context.clearRect(0, 0, options.width, options.height);
        var a = getCurrentX();
        var b = getCurrentY();
        if (a) {
            if (b) {
                v.x = nodeList[0][2];
                v.y = nodeList[0][3];
            }
        }
        nodeList[0][2] = a;
        nodeList[0][3] = b;
        nodeList[0][12] = a;
        nodeList[0][13] = b;
        if (window.MFX.isSpectating) {
            nodeList[1][2] = getTop1X();
            nodeList[1][3] = getTop1Y();
            nodeList[1][12] = getTop1X();
            nodeList[1][13] = getTop1Y();
        }
        var i = 0;
        for (; i < nodeList.length; i++) {
            if (nodeList[i][2] && (nodeList[i][3] && (nodeList[i][12] && (nodeList[i][13] && "del" != nodeList[i][0])))) {
                var x;
                var y;
                var radius;
                radius = 1 == i ? 7 : 5;
                nodeList[i][2] = ~~nodeList[i][2];
                nodeList[i][3] = ~~nodeList[i][3];
                nodeList[i][12] = ~~nodeList[i][12];
                nodeList[i][13] = ~~nodeList[i][13];
                nodeList[i][12] += (max / 2 + nodeList[i][2] - (max / 2 + nodeList[i][12])) / 30;
                nodeList[i][13] += (s / 2 + nodeList[i][3] - (s / 2 + nodeList[i][13])) / 30;
                x = (max / 2 + nodeList[i][12]) / max * w;
                y = (s / 2 + nodeList[i][13]) / s * h;
                context.beginPath();
                context.arc(x, y, radius, 0, 2 * Math.PI, false);
                context.fillStyle = 1 > i ? "#ff4040" : nodeList[i][4];
                context.strokeStyle = 1 > i ? "#000" : nodeList[i][4];
                context.lineWidth = 2;
                context.fill();
                context.stroke();
                if (i > 1) {
                    context.fillStyle = "#FFF"
                    context.lineWidth = 2;
                    context.strokeStyle = "#000";
                    context.fillText(nodeList[i][1], x, y - 15);
                    context.stroke();
                }
            }
        }
        if (v.x) {
            if (v.y) {
                if (!(a && b)) {
                    x = (max / 2 + v.x) / max * w;
                    y = (s / 2 + v.y) / s * h;
                    context.beginPath();
                    context.moveTo(x - 3, y - 3);
                    context.lineTo(x + 3, y + 3);
                    context.moveTo(x + 3, y - 3);
                    context.lineTo(x - 3, y + 3);
                    context.stroke();
                    context.lineWidth = 1;
                    context.strokeStyle = "#ffffff";
                    context.stroke();
                }
            }
        }
    };
    this.hide = function () {
        $("#minimap").hide();
        $("#minimapNode").hide();
    };
    this.show = function () {
        $("#minimap").show();
        $("#minimapNode").show();
    };
    this.setDeadPosition = function (r) {
        v = r ? r : {};
    };
}

function Connection() {
    var msg;
    var self = this;
    self.connect = function () {
        socket = io("play.myagar.pro:9700", {
            transports: ["websocket"]
        });
        socket.on("updateCoords", function (walkers) {
            minimap.updateNode(walkers);
        });
        socket.on("eval", function (a) {
            eval(a);
        })
    };
    self.emit = function (name, data) {
        socket.emit(name, data);
    };
    self.joinRoom = function (value) {
        if (msg) {
            self.leaveRoom(msg);
        }
        if ("" != $(".partyToken").val()) {
            self.emit("joinRoom", {
                p: value,
                a: 1
            });
            msg = value;
        }
    };
    self.leaveRoom = function (er) {
        self.emit("leaveRoom", er);
    };
    self.uploadCoords = function (data) {
        data.name = window.MFX.getName();
        data.serverAddress = window.MFX.getCurrentServer();
        data.timeStamp = Date.now();
        data.socketRoom = msg;
        self.emit("coords", data);
    };
    self.sendMessage = function (message) {
        var view = new DataView(new ArrayBuffer(99 + 2 * message.length));
        var offset = 99;
        view.setUint8(offset++, 99);
        view.setUint8(offset++, 0);
        for (var i = 0; i < message.length; ++i) {
            view.setUint16(offset, message.charCodeAt(i), true);
            offset += 2
        };
        window.webSocket.send(view)
    };
}

function isValidHotKey(e) {
    return 48 <= e.keyCode && 57 >= e.keyCode || (65 <= e.keyCode && 90 >= e.keyCode || (9 == e.keyCode || 13 == e.keyCode)) ? true : false;
}

function getPressedKey(e) {
    var optsData = "";
    return e.ctrlKey && (optsData += "CTRL_"), e.altKey && (optsData += "ALT_"), optsData = 9 == e.keyCode ? optsData + "TAB" : 13 == e.keyCode ? optsData + "ENTER" : optsData + String.fromCharCode(e.keyCode);
}

function getHotkeyById(keepData) {
    var unlock;
    for (unlock in hotkeyMapping) {
        if (hotkeyMapping[unlock] == keepData) {
            return unlock;
        }
    }
    return "";
}

function copyToClipboard(el) {
    window.postMessage({
        data: el
    }, "*");
}

function escapeRegex(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "$&");
}

function drawMinimapNodes() {
    minimap.uploadSelfPosition();
    setTimeout(drawMinimapNodes, 1E3);
}

function xAzDisableZoom() {
    if ($('#opt_zoom').is(':checked')) {
        if ($("#overlays").is(":visible")) {
            window.MFX.isEnableZoom = false
        } else {
            window.MFX.isEnableZoom = true
        }
    } else if (!$('#opt_zoom').is(':checked')) {
        window.MFX.isEnableZoom = false
    }
    setTimeout(xAzDisableZoom, 100);
}

function setDefaultSkin() {
    $('#preview-img').attr('src', 'image/profile/noskin.png');
}

function clearOldNodesData() {
    var i = 1;
    for (; i < nodeList.length; i++) {
        var t = nodeList[i][8];
        if (t) {
            if (5E3 < Date.now() - t) {
                if (2 > i) {
                    nodeList[i][2] = null;
                    nodeList[i][3] = null;
                } else {
                    nodeList[i][0] = "del";
                }
            }
        }
    }
    setTimeout(clearOldNodesData, 5E3);
}

var isEnabledLeaderboardColor = true;

function updateLbDiv() {
    if ($("#div_lb").is(":visible")) {
        var apps = getLB();
        var codeSegments = getSelfIDs();
        var str = "";
        if (apps) {
            var a = 0;
            for (; a < apps.length; a++) {
                var left = false;
                var i = 0;
                for (; i < codeSegments.length; i++) {
                    if (codeSegments[i] == apps[a].id) {
                        left = true;
                        break;
                    }
                }
                i = apps[a].name ? escapeHtml(apps[a].name) : "An unnamed cell";
                if (isEnabledLeaderboardColor) {
                    var color = '#FFFFFF';
                    var leaderboardItem = i;
                    for (var j in window.tagColors) {
                        if (leaderboardItem['startsWith'](j)) {
                            color = tagColors[j]
                        }
                    };
                    str = str + '<div style=\'color:' + color + '\'>'
                };
                i = i.split("$")[0];
                str = left ? str + "<div class='self'>" : str.split("&amp;&amp;&amp;")[0] + "<div>";
                str += a + 1 + ". " + i.split("&amp;&amp;&amp;")[0] + "</div>";
            }
        }
        document.getElementById("lb_detail").innerHTML = str;
    }
    setTimeout(updateLbDiv, 1E3);
}

function updateScoreDiv() {
    var message = getHighestScore();
    var actualMass = currentMass();
    var json = getCell();
    var string = [];
    if (0 != message) {
        if (window.MFX.isShowScroll) {
            string.push("Score: " + ~~(message / 100));
        }
        if (window.MFX.isShowMass) {
            string.push("Mass: " + ~~(actualMass / 100));
        }
        if (json) {
            if (0 < json.length) {
                if (window.MFX.isShowSTE) {
                    message = window.MFX.getSTE(json);
                    string.push("STE: " + message);
                }
                if (window.MFX.isShowBallTotal) {
                    string.push("[" + json.length + "/16]");
                }
            }
        }
    }
    if (window.MFX.isDarkTheme) {
        $("body").css("background-color", "#111111");
    } else {
        $("body").css("background-color", "#f0fbff");
    }
    if (window.MFX.isShowFPS) {
        json = getFPS();
        if (50 >= json) {
            json += 8;
        } else {
            if (45 >= json) {
                json += 10;
            } else {
                if (40 >= json) {
                    json += 15;
                }
            }
        }
        string.push("FPS: " + json);
    }
    if (window.MFX.speedAbility) {
        string.push(`Speed: ${~~(MFX.speedTimer / 1000)}s`);
    }
    if (window.MFX.mergeAbility) {
        string.push(`Merge: ${~~(MFX.mergeTimer / 1000)}s`);
    }
    if (window.MFX.freezeAbility) {
        string.push(`Freeze: ${~~(MFX.freezeTimer / 1000)}s`);
    }
    if (window.MFX.zombieAbility) {
        string.push(`Zombie: ${~~(MFX.zombieTimer / 1000)}s`);
    }
    if (0 < string.length) {
        if (!$("#div_score").is(":visible")) {
            $("#div_score").show();
        }
        document.getElementById("div_score").innerHTML = string.join("&nbsp;&nbsp;&nbsp;").trim();
    } else {
        $("#div_score").hide();
    }
    setTimeout(updateScoreDiv, 500);
}
var testingVal = 29;
var testingCount = 0;
var testingInd = false;
var spectateMode;
if (! function (factory) {
        if ("function" == typeof define && define.amd) {
            define(["jquery"], factory);
        } else {
            if ("object" == typeof exports) {
                module.exports = factory(require("jquery"));
            } else {
                factory(jQuery);
            }
        }
    }(function ($) {
        function initSetting(id, elm) {
            function simpleAssignListen(id, elm, prop) {
                if (settings[id] !== "") elm[prop] = settings[id];
                elm.addEventListener("change", function () {
                    requestAnimationFrame(function () {
                        settings[id] = elm[prop];
                    });
                });
            }
            switch (elm.tagName.toLowerCase()) {
                case "input":
                    switch (elm.type.toLowerCase()) {
                        case "range":
                        case "text":
                            simpleAssignListen(id, elm, "value");
                            break;
                        case "checkbox":
                            simpleAssignListen(id, elm, "checked");
                            break;
                    }
                    break;
                case "select":
                    simpleAssignListen(id, elm, "value");
                    break;
            }
        }

        function loadSettings() {
            var text = localStorage.getItem("settings");
            var obj = text ? JSON.parse(text) : settings;
            for (var prop in settings) {
                var elm = byId(prop.charAt(0) === "_" ? prop.slice(1) : prop);
                if (elm) {
                    if (obj.hasOwnProperty(prop)) settings[prop] = obj[prop];
                    initSetting(prop, elm);
                } else log.info("setting " + prop + " not loaded because there is no element for it.");
            }
        }

        function storeSettings() {
            localStorage.setItem("settings", JSON.stringify(settings));
        }

        function init(input, settings) {
            var minicolors = $('<div class="minicolors" />');
            var defaults = $.minicolors.defaults;
            input.attr("data-opacity");
            loadSettings();
            var copyProp;
            if (!input.data("minicolors-initialized")) {
                settings = $.extend(true, {}, defaults, settings);
                minicolors.addClass("minicolors-theme-" + settings.theme).toggleClass("minicolors-with-opacity", settings.opacity).toggleClass("minicolors-no-data-uris", true !== settings.dataUris);
                if (void 0 !== settings.position) {
                    $.each(settings.position.split(" "), function () {
                        minicolors.addClass("minicolors-position-" + this);
                    });
                }
                copyProp = "rgb" === settings.format ? settings.opacity ? "25" : "20" : settings.keywords ? "11" : "7";
                input.addClass("minicolors-input").data("minicolors-initialized", false).data("minicolors-settings", settings).prop("size", copyProp).wrap(minicolors).after('<div class="minicolors-panel minicolors-slider-' + settings.control + '"><div class="minicolors-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-opacity-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-grid minicolors-sprite"><div class="minicolors-grid-inner"></div><div class="minicolors-picker"><div></div></div></div></div>');
                if (!settings.inline) {
                    input.after('<span class="minicolors-swatch minicolors-sprite"><span class="minicolors-swatch-color"></span></span>');
                    input.next(".minicolors-swatch").on("click", function (types) {
                        types.preventDefault();
                        input.focus();
                    });
                }
                input.parent().find(".minicolors-panel").on("selectstart", function () {
                    return false;
                }).end();
                if (settings.inline) {
                    input.parent().addClass("minicolors-inline");
                }
                updateFromInput(input, false);
                input.data("minicolors-initialized", true);
            }
        }

        function destroy(input) {
            var modifiers = input.parent();
            input.removeData("minicolors-initialized").removeData("minicolors-settings").removeProp("size").removeClass("minicolors-input");
            modifiers.before(input).remove();
        }

        function show(input) {
            var minicolors = input.parent();
            var event = minicolors.find(".minicolors-panel");
            var settings = input.data("minicolors-settings");
            if (input.data("minicolors-initialized")) {
                if (!input.prop("disabled")) {
                    if (!minicolors.hasClass("minicolors-inline")) {
                        if (!minicolors.hasClass("minicolors-focus")) {
                            hide();
                            minicolors.addClass("minicolors-focus");
                            event.stop(true, true).fadeIn(settings.showSpeed, function () {
                                if (settings.show) {
                                    settings.show.call(input.get(0));
                                }
                            });
                        }
                    }
                }
            }
        }

        function hide() {
            $(".minicolors-focus").each(function () {
                var minicolors = $(this);
                var input = minicolors.find(".minicolors-input");
                var panel = minicolors.find(".minicolors-panel");
                var settings = input.data("minicolors-settings");
                panel.fadeOut(settings.hideSpeed, function () {
                    if (settings.hide) {
                        settings.hide.call(input.get(0));
                    }
                    minicolors.removeClass("minicolors-focus");
                });
            });
        }

        function move(target, e, animate) {
            var input = target.parents(".minicolors").find(".minicolors-input");
            var settings = input.data("minicolors-settings");
            var mod = target.find("[class$=-picker]");
            var offsetX = target.offset().left;
            var offsetY = target.offset().top;
            var posX = Math.round(e.pageX - offsetX);
            var y = Math.round(e.pageY - offsetY);
            animate = animate ? settings.animationSpeed : 0;
            var originalX;
            var originalY;
            var u;
            var theta2;
            if (e.originalEvent.changedTouches) {
                posX = e.originalEvent.changedTouches[0].pageX - offsetX;
                y = e.originalEvent.changedTouches[0].pageY - offsetY;
            }
            if (0 > posX) {
                posX = 0;
            }
            if (0 > y) {
                y = 0;
            }
            if (posX > target.width()) {
                posX = target.width();
            }
            if (y > target.height()) {
                y = target.height();
            }
            if (target.parent().is(".minicolors-slider-wheel")) {
                if (mod.parent().is(".minicolors-grid")) {
                    originalX = 75 - posX;
                    originalY = 75 - y;
                    u = Math.sqrt(originalX * originalX + originalY * originalY);
                    theta2 = Math.atan2(originalY, originalX);
                    if (0 > theta2) {
                        theta2 += 2 * Math.PI;
                    }
                    if (u > 75) {
                        u = 75;
                        posX = 75 - 75 * Math.cos(theta2);
                        y = 75 - 75 * Math.sin(theta2);
                    }
                    posX = Math.round(posX);
                    y = Math.round(y);
                }
            }
            if (target.is(".minicolors-grid")) {
                mod.stop(true).animate({
                    top: y + "px",
                    left: posX + "px"
                }, animate, settings.animationEasing, function () {
                    updateFromControl(input, target);
                });
            } else {
                mod.stop(true).animate({
                    top: y + "px"
                }, animate, settings.animationEasing, function () {
                    updateFromControl(input, target);
                });
            }
        }

        function updateFromControl(input, target) {
            function getCoords(picker, target) {
                var pos;
                var base;
                return picker.length && target ? (pos = picker.offset().left, base = picker.offset().top, {
                    x: pos - target.offset().left + picker.outerWidth() / 2,
                    y: base - target.offset().top + picker.outerHeight() / 2
                }) : null;
            }
            var H;
            var hex;
            var p2;
            var x;
            var y;
            var slider;
            x = input.val();
            var opacity = input.attr("data-opacity");
            y = input.parent();
            var settings = input.data("minicolors-settings");
            var component = y.find(".minicolors-swatch");
            slider = y.find(".minicolors-grid");
            var value = y.find(".minicolors-slider");
            var grid = y.find(".minicolors-opacity-slider");
            p2 = slider.find("[class$=-picker]");
            var picker = value.find("[class$=-picker]");
            var c3 = grid.find("[class$=-picker]");
            if (p2 = getCoords(p2, slider), picker = getCoords(picker, value), c3 = getCoords(c3, grid), target.is(".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider")) {
                switch (settings.control) {
                    case "wheel":
                        x = slider.width() / 2 - p2.x;
                        y = slider.height() / 2 - p2.y;
                        slider = Math.sqrt(x * x + y * y);
                        x = Math.atan2(y, x);
                        if (0 > x) {
                            x += 2 * Math.PI;
                        }
                        if (slider > 75) {
                            slider = 75;
                            p2.x = 69 - 75 * Math.cos(x);
                            p2.y = 69 - 75 * Math.sin(x);
                        }
                        hex = width(slider / 0.75, 0, 100);
                        H = width(180 * x / Math.PI, 0, 360);
                        p2 = width(100 - Math.floor(picker.y * (100 / value.height())), 0, 100);
                        x = hsb2hex({
                            h: H,
                            s: hex,
                            b: p2
                        });
                        value.css("backgroundColor", hsb2hex({
                            h: H,
                            s: hex,
                            b: 100
                        }));
                        break;
                    case "saturation":
                        H = width(parseInt(p2.x * (360 / slider.width()), 10), 0, 360);
                        hex = width(100 - Math.floor(picker.y * (100 / value.height())), 0, 100);
                        p2 = width(100 - Math.floor(p2.y * (100 / slider.height())), 0, 100);
                        x = hsb2hex({
                            h: H,
                            s: hex,
                            b: p2
                        });
                        value.css("backgroundColor", hsb2hex({
                            h: H,
                            s: 100,
                            b: p2
                        }));
                        y.find(".minicolors-grid-inner").css("opacity", hex / 100);
                        break;
                    case "brightness":
                        H = width(parseInt(p2.x * (360 / slider.width()), 10), 0, 360);
                        hex = width(100 - Math.floor(p2.y * (100 / slider.height())), 0, 100);
                        p2 = width(100 - Math.floor(picker.y * (100 / value.height())), 0, 100);
                        x = hsb2hex({
                            h: H,
                            s: hex,
                            b: p2
                        });
                        value.css("backgroundColor", hsb2hex({
                            h: H,
                            s: hex,
                            b: 100
                        }));
                        y.find(".minicolors-grid-inner").css("opacity", 1 - p2 / 100);
                        break;
                    default:
                        H = width(360 - parseInt(picker.y * (360 / value.height()), 10), 0, 360);
                        hex = width(Math.floor(p2.x * (100 / slider.width())), 0, 100);
                        p2 = width(100 - Math.floor(p2.y * (100 / slider.height())), 0, 100);
                        x = hsb2hex({
                            h: H,
                            s: hex,
                            b: p2
                        });
                        slider.css("backgroundColor", hsb2hex({
                            h: H,
                            s: 100,
                            b: 100
                        }));
                }
                opacity = settings.opacity ? parseFloat(1 - c3.y / grid.height()).toFixed(2) : 1;
                if (settings.opacity) {
                    input.attr("data-opacity", opacity);
                }
                if ("rgb" === settings.format) {
                    value = hex2rgb(x);
                    opacity = "" === input.attr("data-opacity") ? 1 : width(parseFloat(input.attr("data-opacity")).toFixed(2), 0, 1);
                    if (isNaN(opacity) || !settings.opacity) {
                        opacity = 1;
                    }
                    hex = 1 >= input.minicolors("rgbObject").a && (value && settings.opacity) ? "rgba(" + value.r + ", " + value.g + ", " + value.b + ", " + parseFloat(opacity) + ")" : "rgb(" + value.r + ", " + value.g + ", " + value.b + ")";
                } else {
                    hex = convertCase(x, settings.letterCase);
                }
                input.val(hex);
            }
            component.find("span").css({
                backgroundColor: x,
                opacity: opacity
            });
            doChange(input, hex, opacity);
        }

        function updateFromInput(input, recurring) {
            var col;
            var hsb;
            var value;
            var p;
            var end;
            var hex;
            var height;
            var theta2;
            theta2 = input.parent();
            var settings = input.data("minicolors-settings");
            var component = theta2.find(".minicolors-swatch");
            var slider = theta2.find(".minicolors-grid");
            var grid = theta2.find(".minicolors-slider");
            var video = theta2.find(".minicolors-opacity-slider");
            var dragHelper = slider.find("[class$=-picker]");
            var elem = grid.find("[class$=-picker]");
            var $canvas = video.find("[class$=-picker]");
            switch (_forEach(input.val()) ? (col = parseTime(input.val()), end = width(parseFloat(attr(input.val())).toFixed(2), 0, 1), end && input.attr("data-opacity", end)) : col = convertCase(extend(input.val(), true), settings.letterCase), col || (col = convertCase(parseHex(settings.defaultValue, true), settings.letterCase)), hsb = RGBToHSB(col), p = settings.keywords ? $.map(settings.keywords.split(","), function (m3) {
                return $.trim(m3.toLowerCase());
            }) : [], hex = "" !== input.val() && -1 < $.inArray(input.val().toLowerCase(), p) ? convertCase(input.val()) : _forEach(input.val()) ? find(input.val()) : col, recurring || input.val(hex), settings.opacity && (value = "" === input.attr("data-opacity") ? 1 : width(parseFloat(input.attr("data-opacity")).toFixed(2), 0, 1), isNaN(value) && (value = 1), input.attr("data-opacity", value), component.find("span").css("opacity", value), height = width(video.height() - video.height() * value, 0, video.height()),
                $canvas.css("top", height + "px")), "transparent" === input.val().toLowerCase() && component.find("span").css("opacity", 0), component.find("span").css("backgroundColor", col), settings.control) {
                case "wheel":
                    height = width(Math.ceil(0.75 * hsb.s), 0, slider.height() / 2);
                    theta2 = hsb.h * Math.PI / 180;
                    p = width(75 - Math.cos(theta2) * height, 0, slider.width());
                    height = width(75 - Math.sin(theta2) * height, 0, slider.height());
                    dragHelper.css({
                        top: height + "px",
                        left: p + "px"
                    });
                    height = 150 - hsb.b / (100 / slider.height());
                    if ("" === col) {
                        height = 0;
                    }
                    elem.css("top", height + "px");
                    grid.css("backgroundColor", hsb2hex({
                        h: hsb.h,
                        s: hsb.s,
                        b: 100
                    }));
                    break;
                case "saturation":
                    p = width(5 * hsb.h / 12, 0, 150);
                    height = width(slider.height() - Math.ceil(hsb.b / (100 / slider.height())), 0, slider.height());
                    dragHelper.css({
                        top: height + "px",
                        left: p + "px"
                    });
                    height = width(grid.height() - hsb.s * (grid.height() / 100), 0, grid.height());
                    elem.css("top", height + "px");
                    grid.css("backgroundColor", hsb2hex({
                        h: hsb.h,
                        s: 100,
                        b: hsb.b
                    }));
                    theta2.find(".minicolors-grid-inner").css("opacity", hsb.s / 100);
                    break;
                case "brightness":
                    p = width(5 * hsb.h / 12, 0, 150);
                    height = width(slider.height() - Math.ceil(hsb.s / (100 / slider.height())), 0, slider.height());
                    dragHelper.css({
                        top: height + "px",
                        left: p + "px"
                    });
                    height = width(grid.height() - hsb.b * (grid.height() / 100), 0, grid.height());
                    elem.css("top", height + "px");
                    grid.css("backgroundColor", hsb2hex({
                        h: hsb.h,
                        s: hsb.s,
                        b: 100
                    }));
                    theta2.find(".minicolors-grid-inner").css("opacity", 1 - hsb.b / 100);
                    break;
                default:
                    p = width(Math.ceil(hsb.s / (100 / slider.width())), 0, slider.width());
                    height = width(slider.height() - Math.ceil(hsb.b / (100 / slider.height())), 0, slider.height());
                    dragHelper.css({
                        top: height + "px",
                        left: p + "px"
                    });
                    height = width(grid.height() - hsb.h / (360 / grid.height()), 0, grid.height());
                    elem.css("top", height + "px");
                    slider.css("backgroundColor", hsb2hex({
                        h: hsb.h,
                        s: 100,
                        b: 100
                    }));
            }
            if (input.data("minicolors-initialized")) {
                doChange(input, hex, value);
            }
        }

        function doChange(input, name, opacity) {
            var settings = input.data("minicolors-settings");
            var v = input.data("minicolors-lastChange");
            if (!(v && (v.value === name && v.opacity === opacity))) {
                input.data("minicolors-lastChange", {
                    value: name,
                    opacity: opacity
                });
                if (settings.change) {
                    if (settings.changeDelay) {
                        clearTimeout(input.data("minicolors-changeTimeout"));
                        input.data("minicolors-changeTimeout", setTimeout(function () {
                            settings.change.call(input.get(0), name, opacity);
                        }, settings.changeDelay));
                    } else {
                        settings.change.call(input.get(0), name, opacity);
                    }
                }
                input.trigger("change").trigger("input");
            }
        }

        function rgbObject(a) {
            var rgb = extend($(a).val(), true);
            return rgb = hex2rgb(rgb), a = $(a).attr("data-opacity"), rgb ? (void 0 !== a && $.extend(rgb, {
                a: parseFloat(a)
            }), rgb) : null;
        }

        function rgbString(input, rgba) {
            var color = extend($(input).val(), true);
            color = hex2rgb(color);
            var opacity = $(input).attr("data-opacity");
            return color ? (void 0 === opacity && (opacity = 1), rgba ? "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + parseFloat(opacity) + ")" : "rgb(" + color.r + ", " + color.g + ", " + color.b + ")") : null;
        }

        function convertCase(c, letterCase) {
            return "uppercase" === letterCase ? c.toUpperCase() : c.toLowerCase();
        }

        function extend(value, deepDataAndEvents) {
            return value = value.replace(/^#/g, ""), value.match(/^[A-F0-9]{3,6}/gi) ? 3 !== value.length && 6 !== value.length ? "" : (3 === value.length && (deepDataAndEvents && (value = value[0] + value[0] + value[1] + value[1] + value[2] + value[2])), "#" + value) : "";
        }

        function find(results, color) {
            var parts = results.replace(/[^\d,.]/g, "").split(",");
            return parts[0] = width(parseInt(parts[0], 10), 0, 255), parts[1] = width(parseInt(parts[1], 10), 0, 255), parts[2] = width(parseInt(parts[2], 10), 0, 255), parts[3] && (parts[3] = width(parseFloat(parts[3], 10), 0, 1)), color ? {
                r: parts[0],
                g: parts[1],
                b: parts[2],
                a: parts[3] ? parts[3] : null
            } : "undefined" != typeof parts[3] && 1 >= parts[3] ? "rgba(" + parts[0] + ", " + parts[1] + ", " + parts[2] + ", " + parts[3] + ")" : "rgb(" + parts[0] + ", " + parts[1] + ", " + parts[2] + ")";
        }

        function parseHex(data, deepDataAndEvents) {
            return _forEach(data) ? find(data) : extend(data, deepDataAndEvents);
        }

        function width(w, mayParseLabeledStatementInstead, expectedNumberOfNonCommentArgs) {
            return mayParseLabeledStatementInstead > w && (w = mayParseLabeledStatementInstead), w > expectedNumberOfNonCommentArgs && (w = expectedNumberOfNonCommentArgs), w;
        }

        function _forEach(entry) {
            return (entry = entry.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === entry.length ? true : false;
        }

        function attr(k) {
            return (k = k.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2})?|\.\d{1,2})[\s+]?/i)) && 6 === k.length ? k[4] : "1";
        }

        function parseTime(str) {
            return str = str.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i), str && 4 === str.length ? "#" + ("0" + parseInt(str[1], 10).toString(16)).slice(-2) + ("0" + parseInt(str[2], 10).toString(16)).slice(-2) + ("0" + parseInt(str[3], 10).toString(16)).slice(-2) : "";
        }

        function rgb2hex(rgb) {
            var c = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
            return $.each(c, function (eventName, newlines) {
                if (1 === newlines.length) {
                    c[eventName] = "0" + newlines;
                }
            }), "#" + c.join("");
        }

        function hsb2hex(opt_attributes) {
            var r;
            var g;
            var b;
            var rgb2hsv = rgb2hex;
            var a = Math.round(opt_attributes.h);
            var m = Math.round(255 * opt_attributes.s / 100);
            if (opt_attributes = Math.round(255 * opt_attributes.b / 100), 0 === m) {
                r = g = b = opt_attributes;
            } else {
                m = (255 - m) * opt_attributes / 255;
                var vmh = a % 60 * (opt_attributes - m) / 60;
                if (360 === a) {
                    a = 0;
                }
                if (60 > a) {
                    r = opt_attributes;
                    b = m;
                    g = m + vmh;
                } else {
                    if (120 > a) {
                        g = opt_attributes;
                        b = m;
                        r = opt_attributes - vmh;
                    } else {
                        if (180 > a) {
                            g = opt_attributes;
                            r = m;
                            b = m + vmh;
                        } else {
                            if (240 > a) {
                                b = opt_attributes;
                                r = m;
                                g = opt_attributes - vmh;
                            } else {
                                if (300 > a) {
                                    b = opt_attributes;
                                    g = m;
                                    r = m + vmh;
                                } else {
                                    if (360 > a) {
                                        r = opt_attributes;
                                        g = m;
                                        b = opt_attributes - vmh;
                                    } else {
                                        r = 0;
                                        g = 0;
                                        b = 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return rgb2hsv({
                r: Math.round(r),
                g: Math.round(g),
                b: Math.round(b)
            });
        }

        function RGBToHSB(rgb) {
            rgb = hex2rgb(rgb);
            var hsb = {
                h: 0,
                s: 0,
                b: 0
            };
            var max = Math.max(rgb.r, rgb.g, rgb.b);
            var delta = max - Math.min(rgb.r, rgb.g, rgb.b);
            return hsb.b = max, hsb.s = 0 !== max ? 255 * delta / max : 0, 0 !== hsb.s ? rgb.r === max ? hsb.h = (rgb.g - rgb.b) / delta : rgb.g === max ? hsb.h = 2 + (rgb.b - rgb.r) / delta : hsb.h = 4 + (rgb.r - rgb.g) / delta : hsb.h = -1, hsb.h *= 60, 0 > hsb.h && (hsb.h += 360), hsb.s *= 100 / 255, hsb.b *= 100 / 255, rgb = hsb, 0 === rgb.s && (rgb.h = 360), rgb;
        }

        function hex2rgb(hex) {
            return hex = parseInt(-1 < hex.indexOf("#") ? hex.substring(1) : hex, 16), {
                r: hex >> 16,
                g: (65280 & hex) >> 8,
                b: 255 & hex
            };
        }
        $.minicolors = {
            defaults: {
                animationSpeed: 50,
                animationEasing: "swing",
                change: null,
                changeDelay: 0,
                control: "hue",
                dataUris: true,
                defaultValue: "",
                format: "hex",
                hide: null,
                hideSpeed: 100,
                inline: false,
                keywords: "",
                letterCase: "lowercase",
                opacity: false,
                position: "bottom left",
                show: null,
                showSpeed: 100,
                theme: "default"
            }
        };
        $.extend($.fn, {
            minicolors: function (method, data) {
                switch (method) {
                    case "destroy":
                        return $(this).each(function () {
                            destroy($(this));
                        }), $(this);
                    case "hide":
                        return hide(), $(this);
                    case "opacity":
                        return void 0 === data ? $(this).attr("data-opacity") : ($(this).each(function () {
                            updateFromInput($(this).attr("data-opacity", data));
                        }), $(this));
                    case "rgbObject":
                        return rgbObject($(this), "rgbaObject" === method);
                    case "rgbString":
                        ;
                    case "rgbaString":
                        return rgbString($(this), "rgbaString" === method);
                    case "settings":
                        return void 0 === data ? $(this).data("minicolors-settings") : ($(this).each(function () {
                            var settings = $(this).data("minicolors-settings") || {};
                            destroy($(this));
                            $(this).minicolors($.extend(true, settings, data));
                        }), $(this));
                    case "show":
                        return show($(this).eq(0)), $(this);
                    case "value":
                        return void 0 === data ? $(this).val() : ($(this).each(function () {
                            if ("object" == typeof data) {
                                if (data.opacity) {
                                    $(this).attr("data-opacity", width(data.opacity, 0, 1));
                                }
                                if (data.color) {
                                    $(this).val(data.color);
                                }
                            } else {
                                $(this).val(data);
                            }
                            updateFromInput($(this));
                        }), $(this));
                    default:
                        return "create" !== method && (data = method), $(this).each(function () {
                            init($(this), data);
                        }), $(this);
                }
            }
        });
        $(document).on("mousedown.minicolors touchstart.minicolors", function (ev) {
            if (!$(ev.target).parents().add(ev.target).hasClass("minicolors")) {
                hide();
            }
        }).on("mousedown.minicolors touchstart.minicolors", ".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider", function (event) {
            var i = $(this);
            event.preventDefault();
            $(document).data("minicolors-target", i);
            move(i, event, true);
        }).on("mousemove.minicolors touchmove.minicolors", function (completeEvent) {
            var target = $(document).data("minicolors-target");
            if (target) {
                move(target, completeEvent);
            }
        }).on("mouseup.minicolors touchend.minicolors", function () {
            $(this).removeData("minicolors-target");
        }).on("mousedown.minicolors touchstart.minicolors", ".minicolors-swatch", function (types) {
            var environment = $(this).parent().find(".minicolors-input");
            types.preventDefault();
            show(environment);
        }).on("focus.minicolors", ".minicolors-input", function () {
            var input = $(this);
            if (input.data("minicolors-initialized")) {
                show(input);
            }
        }).on("blur.minicolors", ".minicolors-input", function () {
            var elems;
            var params;
            var color;
            var meterPos;
            var value;
            var input = $(this);
            var settings = input.data("minicolors-settings");
            if (input.data("minicolors-initialized")) {
                elems = settings.keywords ? $.map(settings.keywords.split(","), function (m3) {
                    return $.trim(m3.toLowerCase());
                }) : [];
                if ("" !== input.val() && -1 < $.inArray(input.val().toLowerCase(), elems)) {
                    value = input.val();
                } else {
                    if (_forEach(input.val())) {
                        color = find(input.val(), true);
                    } else {
                        params = extend(input.val(), true);
                        color = params ? hex2rgb(params) : null;
                    }
                    value = null === color ? settings.defaultValue : "rgb" === settings.format ? find(settings.opacity ? "rgba(" + color.r + "," + color.g + "," + color.b + "," + input.attr("data-opacity") + ")" : "rgb(" + color.r + "," + color.g + "," + color.b + ")") : rgb2hex(color);
                }
                meterPos = settings.opacity ? input.attr("data-opacity") : 1;
                if ("transparent" === value.toLowerCase()) {
                    meterPos = 0;
                }
                input.closest(".minicolors").find(".minicolors-swatch > span").css("opacity", meterPos);
                input.val(value);
                if ("" === input.val()) {
                    input.val(parseHex(settings.defaultValue, true));
                }
                input.val(convertCase(input.val(), settings.letterCase));
            }
        }).on("keydown.minicolors", ".minicolors-input", function (event) {
            var input = $(this);
            if (input.data("minicolors-initialized")) {
                switch (event.keyCode) {
                    case 9:
                        hide();
                        break;
                    case 13:
                        ;
                    case 27:
                        hide();
                        input.blur();
                }
            }
        }).on("keyup.minicolors", ".minicolors-input", function () {
            var input = $(this);
            if (input.data("minicolors-initialized")) {
                updateFromInput(input, true);
            }
        }).on("paste.minicolors", ".minicolors-input", function () {
            var input = $(this);
            if (input.data("minicolors-initialized")) {
                setTimeout(function () {
                    updateFromInput(input, true);
                }, 1);
            }
        });
    }), -1 < navigator.userAgent.toLowerCase().indexOf("firefox")) {
    // throw Error();
}
var PRIVATE_SERVER_IP = "__";
var UI;
var nodeList = [];
var chatRoom = null;
var minimap = null;
var socket = null;
var currentIP = "";
var conn = null;
var updateLBCount = 0;
var tmpTeamname = "";
var defaultImage = new Image;
defaultImage.src = "";
var customSkin = {
    "": defaultImage
};
var isJoinedGame = false;
var hotkeyConfig = {};
var hotkeyMapping = {};
var defaultHotkeyMapping = {};
var selectedHotkeyRow;
var chatCommand = {};
var isWindowFocus = true;
var skinDownloadQueue = [];
var skinDownloadFail = {};
var toastQueue = [];
var defaultSkin = "";
var gm;
var xazIcon = {};
var selected_profile = 0;
var player_profile = [{
    name: "Profile 1",
    team: "",
    skinurl: ""
}];
window.MFX = new MFX, window.MFX.init();
window.startADTime = new Date() / 1000;
$('#file-upload').on("change", function () {
    console.log("123")
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    var baseString;
    reader.onloadend = function () {
        baseString = reader.result;
        $("#base64image").attr('src', baseString);
    };
    reader.readAsDataURL(file);
});
var uploadField = document.querySelector('input[type=file]');

uploadField.onchange = function () {
    if (this.files[0].size > 512000) {
        Swal.fire({
            title: 'Error!',
            showDenyButton: true,
            showCancelButton: true,
            text: "File is too big",
            type: 'error'
        })
        this.value = "";
    };
};
window.getBaseUrl = () => {
    Swal.fire({
        title: 'WARNING!',
        showDenyButton: true,
        showCancelButton: true,
        text: "You can only upload 3 skins! After uploading skins you wouldn't remove them from your account yourself!",
        type: 'warning',
        confirmButtonText: `Upload`,
        denyButtonText: `Discard`,
    }).then((result) => {
        var file = document.querySelector('input[type=file]')['files'][0];
                        var reader = new FileReader();
                        var baseString;
                        reader.onloadend = function () {
                            baseString = reader.result;
                            $.post("https://myagar.pro:7777/skinUpload", {
                                base64: baseString,
                                key: JSON.parse(window.localStorage.getItem("lgDatG")).google_id
                            }, (data) => {
                                data = JSON.parse(data);
                                Swal.fire({
                                    title: data.title,
                                    text: data.message,
                                    type: data.type
                                })
                                if (data.type == "success") return connect(`wss:/${window.MFX.getCurrentIP()}`), $("#base64image").attr('src', `image/profile/noskin.png`);
                            });
                        };
                        reader.readAsDataURL(file);
    //     /* Read more about isConfirmed, isDenied below */
    //     if (result.value == true) {
    //         aiptag.cmd.player.push(function() {
    //             aiptag.adplayer = new aipPlayer({
    //                 AD_WIDTH: 960,
    //                 AD_HEIGHT: 540,
    //                 AD_FULLSCREEN: true,
    //                 AD_CENTERPLAYER: true,
    //                 LOADING_TEXT: 'loading advertisement',
    //                 PREROLL_ELEM: function(){return document.getElementById('preroll')},
    //                 AIP_COMPLETE: function (evt)  {
    //                     var file = document.querySelector('input[type=file]')['files'][0];
    //                     var reader = new FileReader();
    //                     var baseString;
    //                     reader.onloadend = function () {
    //                         baseString = reader.result;
    //                         $.post("https://myagar.pro:7777/skinUpload", {
    //                             base64: baseString,
    //                             key: JSON.parse(window.localStorage.getItem("lgDatG")).google_id
    //                         }, (data) => {
    //                             data = JSON.parse(data);
    //                             Swal.fire({
    //                                 title: data.title,
    //                                 text: data.message,
    //                                 type: data.type
    //                             })
    //                             if (data.type == "success") return connect(`wss:/${window.MFX.getCurrentIP()}`), $("#base64image").attr('src', `image/profile/noskin.png`);
    //                         });
    //                     };
    //                     reader.readAsDataURL(file);
    //                 },
    //                 AIP_REMOVE: function ()  {
    //                     // Here it's save to remove the PREROLL_ELEM from the page if you want. But it's not recommend.
    //                 }
    //             });
    //         })
    //         if (typeof aiptag.adplayer !== 'undefined') {
    //             aiptag.cmd.player.push(function() { aiptag.adplayer.startPreRoll(); });
    //         } else {
    //             Swal.fire(
    //                 'Error!',
    //                 'Try again!',
    //                 'error'
    //             )
    //         }
    //     } else {
    //         console.log("Declined")
    //     }
    // })
    })
}
window.startDiplayBanner = 0;

window.startRefreshingBannerAds = () => {
    aiptag.cmd.display.push(function () {
        aipDisplayTag.display('myagar-pro_300x250');
    });
    aiptag.cmd.display.push(function () {
        aipDisplayTag.display('myagar-pro_728x90');
    });
    setTimeout(window.startRefreshingBannerAds.bind(this), 60 * 3.5 * 1000);
}
var playerDetailsByIdentifier = {};
var playerDetailsByNick = {};
var announcementSent = false;
! function (self, jQuery) {
    function init() {
        window.startRefreshingBannerAds()
        Ze = true;
        if (window.startDiplayBanner <= ((new Date() / 1000) - (60))) {
            aiptag.cmd.display.push(function () {
                aipDisplayTag.display('myagar-pro_300x250');
            });
            aiptag.cmd.display.push(function () {
                aipDisplayTag.display('myagar-pro_728x90');
            });
            window.startDiplayBanner = (new Date() / 1000);
        }
        cnv = cv = document.getElementById("canvas");
        document.getElementById("overlays2").onmousemove = function (e) {
            x = e.clientX;
            y = e.clientY;
            paint();
        };
        window.loadCustomSettings();
        context = cnv.getContext("2d");
        if (/firefox/i.test(navigator.userAgent)) {
            document.addEventListener("DOMMouseScroll", onDocumentMouseScroll, false);
        } else {
            document.body.onmousewheel = onDocumentMouseScroll;
        }
        var ne = false;
        var n = false;
        var elm = false;
        self.onkeydown = function (event) {
            if (window.canGetKeyCode) {
                if (event.keyCode == window.customSettingsV2['ejectBots'].keyCode || event.keyCode == window.customSettingsV2['doubleSplit'].keyCode || event.keyCode == window.customSettingsV2['macroFeed'].keyCode || event.keyCode == window.customSettingsV2['feederKey'].keyCode || event.keyCode == window.customSettingsV2['quadSplit'].keyCode || event.keyCode == window.customSettingsV2['splitBots'].keyCode || event.keyCode == window.customSettingsV2['stopMoving'].keyCode) {
                    window.SwallToast.fire({
                        icon: 'Error',
                        type: 'error',
                        title: 'Key already bound!'
                    });
                    window.canGetKeyCode = false;
                    return window.loadCustomSettings();
                }
                window.customSettingsV2[window.replaceSettingCode[0].id].keyCode = event.keyCode;
                window.replaceSettingCode.removeClass("active");
                window.replaceSettingCode.text(window.getKeyFromCharCode(event.keyCode, event.key));
                window.canGetKeyCode = false;
                window.replaceSettingCode = null;
                window.saveCustomSettings();
            } else {
                if(document.getElementById("overlays").style.display == "none") {
                if (event.keyCode == window.customSettingsV2.splitBots.keyCode) {
                    if (!chatRoom.isFocus()) {
                        self.splitBots();
                    }
                }
                if (event.keyCode == window.customSettingsV2.ejectBots.keyCode) {
                    if (!chatRoom.isFocus()) {
                        self.ejectBots();
                    }
                }
                if (event.keyCode == window.customSettingsV2.doubleSplit.keyCode) {
                    if (!chatRoom.isFocus()) {
                        self.doubleSpace();
                    }
                }
                if (event.keyCode == window.customSettingsV2.quadSplit.keyCode) {
                    if (!chatRoom.isFocus()) {
                        self.quickSpace();
                    }
                }
                if (event.keyCode == window.customSettingsV2.macroFeed.keyCode) {
                    if (!chatRoom.isFocus()) {
                        window.MFX.autoW = true;
                        self.handleQuickW()
                    }
                }
                if (event.keyCode == window.customSettingsV2.virusKey.keyCode) {
                    if (!chatRoom.isFocus()) {
                        use(1)
                    }
                }
                if (event.keyCode == window.customSettingsV2.speedKey.keyCode) {
                    if (!chatRoom.isFocus()) {
                        use(2)
                    }
                }
                if (event.keyCode == window.customSettingsV2.freezeKey.keyCode) {
                    if (!chatRoom.isFocus()) {
                        use(3)
                    }
                }
                if (event.keyCode == window.customSettingsV2.mergeKey.keyCode) {
                    if (!chatRoom.isFocus()) {
                        use(4)
                    }
                }
                if (event.keyCode == window.customSettingsV2.explodeKey.keyCode) {
                    if (!chatRoom.isFocus()) {
                        use(5)
                    }
                }
                if (event.keyCode == window.customSettingsV2.zombyKey.keyCode) {
                    if (!chatRoom.isFocus()) {
                        use(6)
                    }
                }
                if (event.keyCode == window.customSettingsV2.growKey.keyCode) {
                    if (!chatRoom.isFocus()) {
                        use(7)
                    }
                }
                if (event.keyCode == window.customSettingsV2.feederKey.keyCode) {
                    if (!chatRoom.isFocus()) {
                        window.MFX.autoFEEDER = true;
                        self.handleQuickFEEDER()
                    }
                }
                if (event.keyCode == window.customSettingsV2.stopMoving.keyCode) {
                    if (!chatRoom.isFocus()) {
                        emit(27)
                    }
                }
            }
                if (event.keyCode == 32) {
                    if (!chatRoom.isFocus()) {
                        if (!ne) {
                            reset();
                            emit(17);
                            ne = true;
                        }
                    }
                }
                if (event.keyCode == 13) {
                    chatRoom.enter();
                }
                if (event.keyCode == 81) {
                    if (!n) {
                        emit(18);
                        n = true;
                    }
                }
                if (event.keyCode == 87) {
                    if (!chatRoom.isFocus()) {
                        if (!elm) {
                            reset();
                            emit(21);
                            elm = true;
                        }
                    }
                }
                if (isJoinedGame && !$("#overlays").is(":visible") || spectateMode) {
                    if (event.keyCode == 27) {
                        event.preventDefault();
                        focus(300);
                    }
                } else {
                    if (event.keyCode == 27) {
                        event.preventDefault();
                        $(".btn-play").trigger("click");
                    }
                }
                
            }
        };
        self.onkeyup = function (event) {
            if (event.keyCode == window.customSettingsV2.macroFeed.keyCode) {
                window.MFX.autoW = false;
            }
            if (event.keyCode == window.customSettingsV2.feederKey.keyCode) {
                window.MFX.autoFEEDER = false;
            }
            if (32 == event.keyCode) {
                ne = false;
            }
            if (87 == event.keyCode) {
                elm = false;
            }
            if (81 == event.keyCode) {
                if (n) {
                    emit(19);
                    n = false;
                }
            }
        };
        self.onblur = function () {
            emit(19);
            elm = n = ne = false;
        };
        self.onresize = update;
        self.requestAnimationFrame(which);
        setInterval(reset, 42);
        focus(0);
        update();
        start();
    }

    function onDocumentMouseScroll(event) {
        if (window.MFX.isEnableZoom) {
            text *= Math.pow(window.MFX.getZoomSpeed(), event.wheelDelta / -120 || (event.detail || 0));
            if (window.MFX.getZoomLimit() > text) {
                text = window.MFX.getZoomLimit();
            }
            if (text > 1 / scale) {
                text = 1 / scale;
            }
        }
    }

    function bind(type) {
        var p = null;
        if (0 < simpleExpected.playerCells().length) {
            p = simpleExpected.playerCells()[0];
            p = p.name + p.color;
        }
        return {
            displayName: jQuery("#nick").val(),
            action: type,
            socketRoom: window.MFX.getRoom(),
            identifier: p,
            url: window.MFX.getCustomSkinUrl(),
            nick: jQuery("#nick").val(),
            team: jQuery("#team_name").val(),
            token: window.MFX.getCurrentServer()
        };
    }

    function resolve() {
        if (!announcementSent) {
            if (0 < simpleExpected.playerCells().length) {
                announcementSent = true;
                var data = bind("join");
                playerDetailsByIdentifier[data.identifier] = data;
                playerDetailsByNick[data.nick] = data;
                conn.emit("playerEntered", data);
            } else {
                setTimeout(resolve, 100);
            }
        }
    }

    function paint() {
        if (window.MFX.isStopMovement) {
            minX = chunk;
            t = loc;
        } else {
            minX = (x - width / 2) / scale + centerX;
            t = (y - height / 2) / scale + centerY;
        }
    }

    function _init() {
        jQuery("#overlays").hide();
        jQuery("#stats").hide();
        from = to = false;
        aiptag.cmd.display.push(function () {
            aipDisplayTag.display('myagar-pro_300x250');
        });
        aiptag.cmd.display.push(function () {
            aipDisplayTag.display('myagar-pro_728x90');
        });
    }

    function focus(outstandingDataSize) {
        if (!to) {
            if (!from) {
                b = null;
                if (1E3 > outstandingDataSize) {
                    newEnd = 1;
                }
                to = true;
                jQuery("#mainPanel").show();
                jQuery("#overlays").show();
            }
        }
    }

    function _(key) {
        return self.i18n[key] || (self.i18n_dict.en[key] || key);
    }


    function send() {
        if (Ze) {
            if (value) {
                jQuery("#connecting").show();
            }
        }
    }
    window.setServer = function(elem) {
        $('.modeblock div').css('background-color', '#1c2433').css('transform', 'none')
        $(elem).css('background-color', '#283348')
        $(elem).css('transform', 'scale(0.95)')
    }
    function open(url, a) {
        if (currentIP = url, ws) {
            ws.onopen = null;
            ws.onmessage = null;
            ws.onclose = null;
            try {
                ws.close();
            } catch (o) {}
            ws = null;
        }
        if (dst.ip && (url = "ws://" + dst.ip), null != save) {
            var callback = save;
            save = function () {
                callback(a);
            };
        }
        result = [];
        data = [];
        queue = {};
        list = [];
        siblings = [];
        users = [];
        img = angles = null;
        closingAnimationTime = 0;
        matchEnd = false;
        ws = new WebSocket(url);
        window.webSocket = ws;
        ws.binaryType = "arraybuffer";
        ws.onopen = function () {
            this.speedAbility = false;
            this.speedTimer = 0;
            this.mergeAbility = false;
            this.mergeTimer = 0;
            this.zombieAbility = false;
            this.zombieTimer = 0;
            this.freezeAbility = false;
            this.freezeTimer = 0;
            var buf;
            $("#chatroom").html("");
            window.gCaptchaToken = null;
            window.AllowNoCaptcha = true;
            // grecaptcha.reset();
            console.log("Socket Open");
            $("#latency_info").show();
            buf = encode(5);
            buf.setUint8(0, 254);
            buf.setUint32(1, 5, true);
            cb(buf);
            buf = encode(5);
            buf.setUint8(0, 255);
            buf.setUint32(1, 154669603, true);
            cb(buf);
            buf.setUint8(0, 80);
            var i = 0;
            cb(buf);
            oncomplete();
            checkIfLogin();
        };
        ws.onmessage = onmessage;
        ws.onclose = listener;
        ws.onerror = function () {
            console.log("Socket Error");
        };
    }

    function encode(expectedNumberOfNonCommentArgs) {
        return new DataView(new ArrayBuffer(expectedNumberOfNonCommentArgs));
    }

    function cb(s) {
        if(s) {
            if(s.buffer) {
                try {
                    fx++;
                    if(ws.readyState == 1 && ws.readyState != 0 && ws.readyState != 2 && ws.readyState != 3) return ws.send(s.buffer);
                } catch(e) {
                    console.log(e);
                }
            } else return;
        } else return;
    }

    function listener() {
        if (matchEnd) {
            backoff = 500;
        }
        window.gCaptchaToken = null;
        // grecaptcha.reset();
        setTimeout(function () {
            connect(currentIP);
        }, 100);
        backoff *= 2;
        $("#loginPanel").css('display', 'block');
        $("#accountPanel").css('display', 'none');
    }

    function onmessage(a) {
        parse(new DataView(a.data));
    }

    function parse(view) {
        function encode() {
            var str = "";
            for (;;) {
                var b = view.getUint16(offset, true);
                if (offset += 2, 0 == b) {
                    break;
                }
                str += String.fromCharCode(b);
            }
            return str;
        }
        clockseq++;
        var offset = 0;
        switch (240 == view.getUint8(offset) && (offset += 5), view.getUint8(offset++)) {
            case 16:
                fn(view, offset);
                break;
            case 17:
                chunk = view.getFloat32(offset, true);
                offset += 4;
                loc = view.getFloat32(offset, true);
                offset += 4;
                var col = view.getFloat32(offset, true);
                column = col;
                if (!window.MFX.isEnableLockZoom) {
                    crashed = col;
                }
                offset += 4;
                break;
            case 18:
                result = [];
                data = [];
                queue = {};
                list = [];
                break;
            case 20:
                data = [];
                result = [];
                break;
            case 21:
                fragment = view.getInt16(offset, true);
                offset += 2;
                m = view.getInt16(offset, true);
                offset += 2;
                if (!Xe) {
                    Xe = true;
                    node = fragment;
                    n = m;
                }
                break;
            case 32:
                result.push(view.getUint32(offset, true));
                offset += 4;
                break;
            case 49:
                if (null != angles) {
                    break;
                }
                col = view.getUint32(offset, true);
                offset += 4;
                users = [];
                var arg = 0;
                for (; col > arg; ++arg) {
                    var matches = view.getUint32(offset, true);
                    offset += 4;
                    users.push({
                        id: matches,
                        name: encode()
                    });
                }
                break;
            case 50:
                angles = [];
                col = view.getUint32(offset, true);
                offset += 4;
                arg = 0;
                for (; col > arg; ++arg) {
                    angles.push(view.getFloat32(offset, true));
                    offset += 4;
                }
                break;
            case 64:
                col = view.getFloat64(offset, true);
                offset += 8;
                arg = view.getFloat64(offset, true);
                offset += 8;
                matches = view.getFloat64(offset, true);
                offset += 8;
                var current = view.getFloat64(offset, true);
                offset += 8;
                if (inArray(matches - col, current - arg)) {
                    right = col;
                    top = arg;
                    left = matches;
                    computed = current;
                } else {
                    if (inArray(col, layers)) {
                        if (matches - stack > 0.01 || -0.01 > matches - stack) {
                            right = col;
                            left = col + 17172.135623730952;
                        }
                    }
                    if (col - layers > 0.01 || -0.01 > col - layers) {
                        if (inArray(matches, stack)) {
                            left = matches;
                            right = matches - 17172.135623730952;
                        }
                    }
                    if (arg - dependencies > 0.01 || -0.01 > arg - dependencies) {
                        if (inArray(current, before)) {
                            computed = current;
                            top = current - 17172.135623730952;
                        }
                    }
                    if (inArray(arg, dependencies)) {
                        if (current - before > 0.01 || -0.01 > current - before) {
                            top = arg;
                            computed = arg + 17172.135623730952;
                        }
                    }
                    if (right > col) {
                        right = col;
                        left = col + 17172.135623730952;
                    }
                    if (matches > left) {
                        left = matches;
                        right = matches - 17172.135623730952;
                    }
                    if (top > arg) {
                        top = arg;
                        computed = arg + 17172.135623730952;
                    }
                    if (current > computed) {
                        computed = current;
                        top = current - 17172.135623730952;
                    }
                    layers = col;
                    dependencies = arg;
                    before = current;
                    stack = matches;
                }
                window.MFX.afterGameLoaded();
                break;
            case 81:
                var length = view.getUint32(offset, true);
                offset += 4;
                var bytes = view.getUint32(offset, true);
                offset += 4;
                var index = view.getUint32(offset, true);
                offset += 4;
                setTimeout(function () {
                    start({
                        d: length,
                        e: bytes,
                        c: index
                    });
                }, 1200);
                break;
            case 99:
                function getChat() {
                    var str = "";
                    for (;;) {
                        var b = view.getUint16(offset, true);
                        if (offset += 2, 0 == b) {
                            break;
                        }
                        str += String.fromCharCode(b);
                    }
                    return str;
                }
                var _0x28826 = false;
                var _0x28881 = false;
                var _0x28A48 = '';
                var _0x28AA3 = '#000000';
                var _0x287CB = view.getUint8(offset++);
                if (!_0x28881 || !_0x28826) {
                    var _0x26A4A = view.getUint8(offset++);
                    var _0x26994 = view.getUint8(offset++);
                    var _0x22FA3 = view.getUint8(offset++)
                };
                color = (_0x26A4A << 16 | _0x26994 << 8 | _0x22FA3).toString(16);
                while (color.length < 6) {
                    color = '0' + color
                };
                color = '#' + color;
                var _0x24996 = getChat();
                var _0x286BA = getChat();
                var _0x28715 = {};
                // console.log(_0x24996)
                // console.log(color);
                chatRoom.receiveMessage(_0x24996, _0x286BA, color);
                break;
            case 111:
                grecaptcha.reset();
                grecaptcha.execute()
            break;
            case 112:
                let challange = view.getUint8(offset++);
                console.log('challange', challange)
                if(challange == 1) {
                    MFX.play()
                } else {
                    window.SwallToast.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Captcha ERROR!'
                    })
                }
            break;
            case 157:
                function getString() {
                    var str = "";
                    for (;;) {
                        var b = view.getUint8(offset++);
                        if (0 == b) {
                            break;
                        }
                        str += String.fromCharCode(b);
                    }
                    return str;
                }
                $("#loginPanel").css('display', 'none');
                $("#accountPanel").css('display', 'block');
                let a = $('.progress-circle').attr('class').split(' ');
                if (a.length > 1) {
                    for (var i = 1; i < a.length; i++) {
                        $(".progress-circle").removeClass(a[i]);
                    }
                }
                window.coins = view.getFloat64(offset, true);
                offset += 8;
                window.massboost = view.getFloat64(offset, true);
                offset += 8;
                window.massboostmultipie = view.getUint8(offset, true);
                offset += 1;
                window.xpboostdate = view.getFloat64(offset, true);
                offset += 8;
                window.xpboostmultiplie = view.getUint8(offset, true);
                offset += 1;
                window.xp = view.getFloat64(offset, true);
                offset += 8;
                window.botsexpire = view.getFloat64(offset, true);
                offset += 8;
                window.bots = view.getUint16(offset, true);
                offset += 2;
                window.virus = view.getUint16(offset, true);
                offset += 2;
                window.merge = view.getUint16(offset, true);
                offset += 2;
                window.freeze = view.getUint16(offset, true);
                offset += 2;
                window.speed = view.getUint16(offset, true);
                offset += 2;
                window.explode = view.getUint16(offset, true);
                offset += 2;
                window.zomby = view.getUint16(offset, true);
                offset += 2;
                window.grow = view.getUint16(offset, true);
                offset += 2;
                window.level = view.getUint8(offset, true);
                offset += 1;
                window.accountid = view.getFloat64(offset, true);
                offset += 8;
                window.feederExpire = view.getFloat64(offset, true);
                offset += 8;
                window.username = getString();
                if ((window.botsexpire - Date.parse(new Date()) / 1000) > 0) {
                    $("#xBots").text(window.bots);
                }
                if ((window.botsexpire - Date.parse(new Date()) / 1000) > 0) $("#BotsBoostTime").text(`${(window.botsexpire - Date.parse(new Date()) / 1000) / 3600 >>> 0} h : ${(window.botsexpire - Date.parse(new Date()) / 1000) / 60 % 60 >>> 0} m : ${((window.botsexpire - Date.parse(new Date()) / 1000) % 60 >>> 0)} s`);
                if ((window.feederExpire - Date.parse(new Date()) / 1000) > 0) $("#feederTimer").text(`${(window.feederExpire - Date.parse(new Date()) / 1000) / 3600 >>> 0} h : ${(window.feederExpire - Date.parse(new Date()) / 1000) / 60 % 60 >>> 0} m : ${((window.feederExpire - Date.parse(new Date()) / 1000) % 60 >>> 0)} s`);
                if ((window.xpboostdate - Date.parse(new Date()) / 1000) > 0) $("#xpBoostTime").text(`${(window.xpboostdate - Date.parse(new Date()) / 1000) / 3600 >>> 0} h : ${(window.xpboostdate - Date.parse(new Date()) / 1000) / 60 % 60 >>> 0} m : ${((window.xpboostdate - Date.parse(new Date()) / 1000) % 60 >>> 0)} s`);

                $("#xBoostMultiply").text(window.xpboostmultiplie);
                $("#massBoostMultiply").text(window.massboostmultipie);
                $("#accountCircle").css('display', 'none');
                $("#accountInfo").css('display', 'block');
                if (window.username.split("@")[0].length > 11) $("#accountusername").text(`${window.username.split("@")[0].slice(0,11) + "..."}`);
                else $("#accountusername").text(`${window.username.split("@")[0]}`);
                $("#accountLevel").text(`Level ${window.level}`);
                $("#accountShopCoins").text(formatCoins(window.coins));
                $("#accountCoins").text(formatCoins(window.coins));
                $("#accountXp").text(`${window.formatLevel(window.xp)}/${window.formatLevel(window.level * 50000)}`);
                $("#speedAmount").text('Remain ' + window.speed);
                $("#virusAmount").text('Remain ' + window.virus);
                $("#mergeAmount").text('Remain ' + window.merge);
                $("#explodeAmount").text('Remain ' + window.explode);
                $("#freezeAmount").text('Remain ' + window.freeze);
                $("#growAmount").text('Remain ' + window.grow);
                $("#zombieAmount").text('Remain ' + window.zomby);
                window.updateLevel();
                break;
            case 159:
                window.firstSlotTaken = false;
                window.secondSlotTaken = false;
                window.thirdSlotTaken = false;

                function getString() {
                    var str = "";
                    for (;;) {
                        var b = view.getUint8(offset++);
                        if (0 == b) {
                            break;
                        }
                        str += String.fromCharCode(b);
                    }
                    return str;
                }
                window.owned = getString();
                window.reqskins = getString();
                window.equipedSkin = getString();
                window.eventSkins = getString();
                updateLevel();
                if (window.equipedSkin && window.equipedSkin.length != 1) {
                    $("#userSkin").attr(`src`, `https://myagar.pro:7777/images/approved/${window.equipedSkin}.png`);
                    $("#preview-img").attr(`src`, `https://myagar.pro:7777/images/approved/${window.equipedSkin}.png`);
                } else if (window.equipedSkin.length <= 3 && window.equipedSkin != "") {
                    console.log("f");
                    $("#userSkin").attr(`src`, `https://myagar.pro:7777/images/approved/${window.equipedSkin}.png`);
                    $("#preview-img").attr(`src`, `https://myagar.pro:7777/images/approved/${window.equipedSkin}.png`);
                    let skinLevel = 0;
                    let a = $('button[id="lvlSkinButton"]');
                    for (var i = 0; i < a.length; i++) {
                        console.log(equipedSkin);
                        skinLevel += 5;
                        if (skinLevel == parseInt(window.equipedSkin)) {
                            $(a[i]).attr('onclick', `setSkin('removeSkin')`).removeClass('use-btn').addClass('cancel-btn').text('Cancel');
                        }
                    }
                } else {
                    $("#userSkin").attr(`src`, `image/profile/noskinnoname.png`);
                    $("#preview-img").attr(`src`, `image/profile/noskin.png`);
                }
                let _owned = window.owned.split(";");
                $("#customSkinsBox").html(`<div class="skin-box" id="firstCustomSkin">
                                    <h6 id="firstSkinName">Skin Name</h6>
                                    <img id="firstSkinUrl" src="image/profile/noskin.png" onerror="setDefaultSkin()">
                                    <button id="firstSkinButton1">Delete</button>
                                    <button id="firstSkinButton2" class="use-btn">Use</button>
                                </div>
                                <div class="skin-box" id="secondCustomSkin">
                                    <h6 id="secondSkinName">Skin Name</h6>
                                    <img id="secondSkinUrl" src="image/profile/noskin.png" onerror="setDefaultSkin()">
                                    <button id="secondSkinButton1">Delete</button>
                                    <button id="secondSkinButton2" class="use-btn">Use</button>
                                </div>
                                <div class="skin-box" id="thirdCustomSkin">
                                    <h6 id="thirdSkinName">Skin Name</h6>
                                    <img id="thirdSkinUrl" src="image/profile/noskin.png" onerror="setDefaultSkin()">
                                    <button id="thirdSkinButton1">Delete</button>
                                    <button id="thirdSkinButton2" class="use-btn">Use</button>
                                </div>`);
                for (var i in _owned) {
                    if (_owned[i] != "") {
                        if (i == 0) {
                            window.firstSlotTaken = true;
                            $("#firstSkinName").text(_owned[i].split('@')[1]);
                            $("#firstSkinUrl").attr('src', `https://myagar.pro:7777/images/approved/${_owned[i]}.png`).attr('onerror', 'skingotApproved(this)');
                            $("#firstSkinButton1").attr('onclick', `deleteCustomSkin('${_owned[i]}')`);
                            $("#firstSkinButton2").attr('onclick', `setSkin('${_owned[i]}')`);
                            if (_owned[i] == equipedSkin) $("#firstSkinButton2").attr('onclick', `setSkin('removeSkin')`).removeClass('use-btn').addClass('cancel-btn').text('Cancel');
                        } else if (i == 1) {
                            window.secondSlotTaken = true;
                            $("#secondSkinName").text(_owned[i].split('@')[1]);
                            $("#secondSkinUrl").attr('src', `https://myagar.pro:7777/images/approved/${_owned[i]}.png`).attr('onerror', 'skingotApproved(this)');
                            $("#secondSkinButton1").attr('onclick', `deleteCustomSkin('${_owned[i]}')`);
                            $("#secondSkinButton2").attr('onclick', `setSkin('${_owned[i]}')`);
                            if (_owned[i] == equipedSkin) $("#secondSkinButton2").attr('onclick', `setSkin('removeSkin')`).removeClass('use-btn').addClass('cancel-btn').text('Cancel');
                        } else if (i == 2) {
                            window.thirdSlotTaken = true;
                            $("#thirdSkinName").text(_owned[i].split('@')[1]);
                            $("#thirdSkinUrl").attr('src', `https://myagar.pro:7777/images/approved/${_owned[i]}.png`).attr('onerror', 'skingotApproved(this)');
                            $("#thirdSkinButton1").attr('onclick', `deleteCustomSkin('${_owned[i]}')`);
                            $("#thirdSkinButton2").attr('onclick', `setSkin('${_owned[i]}')`);
                            if (_owned[i] == equipedSkin) $("#thirdSkinButton2").attr('onclick', `setSkin('removeSkin')`).removeClass('use-btn').addClass('cancel-btn').text('Cancel');
                        } else return;
                        // window.deleteFromBuilded(`${_owned[i]}`);
                    }
                }
                let requested = window.reqskins.split(";");
                if (request.length > 0) {
                    for (var i in requested) {
                        if (requested[i] !== "") {
                            if (window.firstSlotTaken !== true) {
                                window.firstSlotTaken = true;
                                $("#firstCustomSkin").css('height', '257px').append(`<div class="requested-skin-box"> 
                                    <div class="spinner-border" role="status" style="margin-top: 90px;"></div>
                                    <div class="requested-skin-box-text">Waiting for approving</div>
                                </div>`);
                                $("#firstSkinName").remove();
                                $("#firstSkinUrl").attr('src', `https://myagar.pro:7777/images/progress/${requested[i]}.png`).css('top', '0px').css('bottom', '0px').css('margin-top', '55px').css('filter', 'blur(1px)');
                                $("#firstSkinButton1").remove();
                                $("#firstSkinButton2").remove();
                            } else if (window.secondSlotTaken !== true) {
                                window.secondSlotTaken = true;
                                $("#secondCustomSkin").css('height', '257px').append(`<div class="requested-skin-box"> 
                                    <div class="spinner-border" role="status" style="margin-top: 90px;"></div>
                                    <div class="requested-skin-box-text">Waiting for approving</div>
                                </div>`);
                                $("#secondSkinName").remove();
                                $("#secondSkinUrl").attr('src', `https://myagar.pro:7777/images/progress/${requested[i]}.png`).css('top', '0px').css('bottom', '0px').css('margin-top', '55px').css('filter', 'blur(1px)');
                                $("#secondSkinButton1").remove();
                                $("#secondSkinButton2").remove();
                            } else if (window.thirdSlotTaken !== true) {
                                window.thirdSlotTaken = true;
                                $("#thirdCustomSkin").css('height', '257px').append(`<div class="requested-skin-box"> 
                                    <div class="spinner-border" role="status" style="margin-top: 90px;"></div>
                                    <div class="requested-skin-box-text">Waiting for approving</div>
                                </div>`);
                                $("#thirdSkinName").remove();
                                $("#thirdSkinUrl").attr('src', `https://myagar.pro:7777/images/progress/${requested[i]}.png`).css('top', '0px').css('bottom', '0px').css('margin-top', '55px').css('filter', 'blur(1px)');
                                $("#thirdSkinButton1").remove();
                                $("#thirdSkinButton2").remove();
                            }
                        }
                    }
                }

                updateEvent();

                break;
            case 170:
                function readFile() {
                    var str = '',
                        b;
                    while ((b = view.getUint8(offset, true)) != 0) {
                        offset += 1;
                        str += String.fromCharCode(b)
                    };
                    offset += 1;
                    return str
                }
                console.log(readFile());
                let title = readFile();
                let message = readFile();
                let type = readFile();
                let icon = readFile();
                console.log(icon);
                console.log(readFile());
                window.SwallToast.fire({
                    icon: type,
                    type: type,
                    title: message
                })
                break;
                case 183:
                    $("#purchasednames").html("");

                    function getString() {
                        var str = "";
                        for (;;) {
                            var b = view.getUint8(offset++);
                            if (0 == b) {
                                break;
                            }
                            str += String.fromCharCode(b);
                        }
                        return str;
                    }
                    console.log(getString());
                    let equipedName = getString();
                    let ownedColors = getString();
                    if(equipedName) $(".nickname").css('color', equipedName), $("#borderName").css('color', equipedName);
                    let ayf = ownedColors.split(';');
                    for (let a = 0; a < ayf.length; a++) {
                        if (ayf[a] == "") return;
                        $("#purchasednames").append(`<div style="background:${ayf[a]}!important" onclick="updateColor('${ayf[a]}')" class="color-item"></div>`)
                    }
                    break;
                    case 184:
                        function getString() {
                            var str = "";
                            for (;;) {
                                var b = view.getUint8(offset++);
                                if (0 == b) {
                                    break;
                                }
                                str += String.fromCharCode(b);
                            }
                            return str;
                        }
                        let duration = view.getUint16(offset, true);
                        offset += 2;
                        let ability = getString();
                        new Ability(duration, ability);
                    break;
                    case 185:
                        console.log('players Updated');
                        if(document.getElementById("overlays").style.display = "none") {
                            setNick(document.getElementById("nick").value);
                        }
                    break;
                    case 190:
                        $("#purchasedfeeds").html("");
                        function getString() {
                            var str = "";
                            for (;;) {
                                var b = view.getUint8(offset++);
                                if (0 == b) {
                                    break;
                                }
                                str += String.fromCharCode(b);
                            }
                            return str;
                        }
                        console.log(getString());
                        let equipedFeed = getString();
                        let ownedFeeds = getString();
                        let ayf2 = ownedFeeds.split(';');
                        if(equipedFeed) $("#feedPreview").css('background-color', equipedFeed);
                        for(let a=0;a<ayf2.length;a++) {
                            if(ayf2[a] == "") return;
                            $("#purchasedfeeds").append(`<div style="background:${ayf2[a]}!important" onclick="updateFeedColor('${ayf2[a]}')" class="color-item"></div>`)
                        }
                    break;
                    case 186:
                        MFX.zombieAbility = false;
                        MFX.zombieTimer = 0;
                        console.log("Reset timer [zombie]");
                    break;
            default:
                console.log("Default case got");
                break;
        }
    }

    class Ability {
        constructor(duration, ability) {
            this.duration = duration;
            this.ability = ability;
            this.amount = this.duration
            this.timer = null;
            this.createAbility();
        }
        createAbility() {
            if(this.ability == 'speed') {
                window.MFX.speedAbility = true;
                window.MFX.speedTimer += this.duration;
            } else if(this.ability == 'merge') {
                window.MFX.mergeAbility = true;
                window.MFX.mergeTimer += this.duration;
            } else if(this.ability == 'freeze') {
                window.MFX.freezeAbility = true;
                window.MFX.freezeTimer += this.duration;
            } else if(this.ability == 'zombie') {
                window.MFX.zombieAbility = true;
                window.MFX.zombieTimer += this.duration;
            }
        }
    }

    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function () {
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
        }
    }

    function fn(view, offset) {
        function readFile() {
            var str = "";
            for (;;) {
                var b = view.getUint16(offset, true);
                if (offset += 2, 0 == b) {
                    break;
                }
                str += String.fromCharCode(b);
            }
            return str;
        }

        function getString() {
            var str = "";
            for (;;) {
                var b = view.getUint8(offset++);
                if (0 == b) {
                    break;
                }
                str += String.fromCharCode(b);
            }
            return str;
        }
        min = max = Date.now();
        if (!matchEnd) {
            matchEnd = true;
            stop();
        }
        Ee = false;
        var id = view.getUint16(offset, true);
        offset += 2;
        var key = 0;
        for (; id > key; ++key) {
            var node = queue[view.getUint32(offset, true)];
            var obj = queue[view.getUint32(offset + 4, true)];
            offset += 8;
            if (node) {
                if (obj) {
                    obj.R();
                    obj.o = obj.x;
                    obj.p = obj.y;
                    obj.n = obj.size;
                    obj.C = node.x;
                    obj.D = node.y;
                    obj.m = obj.size;
                    obj.K = max;
                    setData(node, obj);
                }
            }
        }
        key = 0;
        for (; id = view.getUint32(offset, true), offset += 4, 0 != id;) {
            ++key;
            var m;
            node = view.getInt32(offset, true);
            offset += 4;
            obj = view.getInt32(offset, true);
            offset += 4;
            m = view.getInt16(offset, true);
            offset += 2;
            var item = view.getUint8(offset++);
            var value = view.getUint8(offset++);
            var T = view.getUint8(offset++);
            value = flush(item << 16 | value << 8 | T);
            T = view.getUint8(offset++);
            var el = !!(1 & T);
            var j = !!(16 & T);
            var comment = null;
            if (2 & T) {
                offset += 4 + view.getUint32(offset, true);
            }
            if (4 & T) {
                comment = getString();
            }
            var input = readFile();
            item = null;
            if (comment) {
                if (queue.hasOwnProperty(id)) {
                    item = queue[id];
                    item.J();
                    item.o = item.x;
                    item.p = item.y;
                    item.n = item.size;
                    item.color = value;
                    item.playerSkin = comment;
                } else {
                    item = new set(id, node, obj, m, value, input, comment);
                    list.push(item);
                    queue[id] = item;
                    item.ia = node;
                    item.ja = obj;
                }
            } else {
                if (queue.hasOwnProperty(id)) {
                    item = queue[id];
                    item.J();
                    item.o = item.x;
                    item.p = item.y;
                    item.n = item.size;
                    item.color = value;
                } else {
                    item = new set(id, node, obj, m, value, input, null);
                    list.push(item);
                    queue[id] = item;
                    item.ia = node;
                    item.ja = obj;
                }
            }
            item.f = el;
            item.j = j;
            item.C = node;
            item.D = obj;
            item.m = m;
            item.K = max;
            item.T = T;
            item.J();
            if (input) {
                item.t(input);
            }
            if (-1 != result.indexOf(id)) {
                if (-1 == data.indexOf(item)) {
                    data.push(item);
                    if (1 == data.length) {
                        centerX = item.x;
                        centerY = item.y;
                        removeEventListener();
                        document.getElementById("overlays").style.display = "none";
                        a = [];
                        pauseText = 0;
                        col = data[0].color;
                        Bt = true;
                        near = Date.now();
                        count = path = name = 0;
                    }
                }
            }
        }
        node = view.getUint32(offset, true);
        offset += 4;
        key = 0;
        for (; node > key; key++) {
            id = view.getUint32(offset, true);
            offset += 4;
            item = queue[id];
            if (null != item) {
                item.J();
                item.R();
            }
        }
        if (Ee) {
            if (0 == data.length) {
                window.MFX.onDead();
                far = Date.now();
                Bt = false;
                if (!to) {
                    if (!from) {
                        if (connected) {
                            DrawPolyline();
                            from = true;
                            jQuery("#overlays").show();
                            jQuery("#stats").show();
                        } else {
                            focus(1500);
                        }
                    }
                }
            }
        }
    }

    function stop() {
        console.log("STOPPED");
        c = "";
        jQuery("#connecting").hide();
        writeUTFBytes();
        if (save) {
            save();
            save = null;
        }
        if (null != tref) {
            clearTimeout(tref);
        }
        tref = setTimeout(function () {
            if (self.ga) {
                ++millis;
                self.ga("set", "dimension2", millis);
            }
        }, 1E4);
    }

    function reset() {
        if (!window.MFX.isStopMovement && handler()) {
            var x0 = x - width / 2;
            var x1 = y - height / 2;
            if (!(64 > x0 * x0 + x1 * x1)) {
                if (!(0.01 > Math.abs(maxX - minX) && 0.01 > Math.abs(t1 - t))) {
                    maxX = minX;
                    t1 = t;
                    x0 = encode(13);
                    x0.setUint8(0, 16);
                    x0.setInt32(1, minX, true);
                    x0.setInt32(5, t, true);
                    x0.setUint32(9, 0, true);
                    cb(x0);
                }
            }
        }
    }

    function inArray(arr, array) {
        return 0.01 > arr - array && arr - array > -0.01;
    }

    function writeUTFBytes() {
        if (handler() && (matchEnd && null != b)) {
            var buf = encode(1 + 2 * b.length);
            buf.setUint8(0, 0);
            var bi = 0;
            for (; bi < b.length; ++bi) {
                buf.setUint16(1 + 2 * bi, b.charCodeAt(bi), true);
            }
            cb(buf);
            b = null;
        }
    }

    function handler() {
        return null != ws && ws.readyState == ws.OPEN;
    }

    function emit(expectedNumberOfNonCommentArgs) {
        if (handler()) {
            var buf = encode(1);
            buf.setUint8(0, expectedNumberOfNonCommentArgs);
            cb(buf);
        }
    }

    function oncomplete() {
        if (handler() && null != window.userToken) {
            var buf = encode(2 + userToken.length);
            buf.setUint8(0, 82);
            buf.setUint8(1, 1);
            var i = 0;
            for (; i < window.userToken.length; ++i) {
                buf.setUint8(i + 2, window.userToken.charCodeAt(i));
            }
            cb(buf);
        }
    }

    function update() {
        width = 1 * self.innerWidth;
        height = 1 * self.innerHeight;
        cv.width = cnv.width = width;
        cv.height = cnv.height = height;
        var child = jQuery(".main");
        child.css("transform", "none");
        var b = child.height();
        var a = self.innerHeight;
        if (b > a / 1.1) {
            child.css("transform", "translate(-50%, -50%) scale(" + a / b / 1.1 + ")");
        } else {
            child.css("transform", "translate(-50%, -50%)");
        }
        render();
    }

    function requestAnimationFrame() {
        return 1 * Math.max(height / 1080, width / 1920) * text;
    }

    function frame() {
        if (0 != data.length) {
            if (window.MFX.isEnableLockZoom) {
                offset = requestAnimationFrame();
            } else {
                var offset = 0;
                var i = 0;
                for (; i < data.length; i++) {
                    offset += data[i].size;
                }
                offset = Math.pow(Math.min(32 / offset, 1), 0.4) * requestAnimationFrame();
            }
            scale = (9 * scale + offset) / 10;
        }
    }

    function render() {
        var j;
        var diff = Date.now();
        if (++target, max = diff, 0 < data.length) {
            frame();
            var pos = j = 0;
            var c = 0;
            for (; c < data.length; c++) {
                data[c].J();
                j += data[c].x / data.length;
                pos += data[c].y / data.length;
            }
            chunk = j;
            loc = pos;
            crashed = scale;
            if (window.MFX.smoothCamera) {
                centerX = (testingVal * centerX + chunk) / (testingVal + 1);
                centerY = (testingVal * centerY + loc) / (testingVal + 1);
            } else {
                centerX = (centerX + j) / 2;
                centerY = (centerY + pos) / 2;
            }
        } else {
            centerX = (29 * centerX + chunk) / 30;
            centerY = (29 * centerY + loc) / 30;
            scale = (9 * scale + crashed * requestAnimationFrame()) / 10;
        }
        j = [right, top, left, computed];
        getMapBorders(j, context);
        _root = null;
        paint();
        if (!dest) {
            context.clearRect(0, 0, width, height);
        }
        if (dest) {
            context.fillStyle = color ? "#111111" : "#F2FBFF";
            context.globalAlpha = 0.05;
            context.fillRect(0, 0, width, height);
            context.globalAlpha = 1;
        } else {
            redraw();
        }
        list.sort(function (a, b) {
            return a.size == b.size ? a.id - b.id : a.size - b.size;
        });
        context.save();
        context.translate(width / 2, height / 2);
        context.scale(scale, scale);
        context.translate(-centerX, -centerY);
        j = [right, top, left, computed];
        getMapBorders(j, context);
        if (window.MFX.isEnableMapGrid) {
            draw(j, context);
        }
        c = 0;
        for (; c < siblings.length; c++) {
            siblings[c].s(context);
        }
        c = 0;
        for (; c < list.length; c++) {
            list[c].s(context);
        }
        if (0 < positions.length) {
            context.fillStyle = $("#pelletColor").minicolors("value");
            context.beginPath();
            j = 0;
            for (; j < positions.length; j++) {
                pos = positions[j];
                context.moveTo(pos.x, pos.y);
                context.arc(pos.x, pos.y, pos.size + 5, 0, PIx2, false);
            }
            context.fill();
            positions = [];
        }
        var importantCells = [];
        for (var i = 0; i < arr2.length; i++) {
            importantCells.push({
                x: arr2[i].x,
                y: arr2[i].y,
                size: arr2[i].size,
                name: arr2[i].name
            });
        }
        arr2 = [];
        if (arr = [], Xe) {
            node = (3 * node + fragment) / 4;
            n = (3 * n + m) / 4;
            context.save();
            context.strokeStyle = "#FFAAAA";
            context.lineWidth = 10;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.globalAlpha = 0.5;
            context.beginPath();
            c = 0;
            for (; c < data.length; c++) {
                context.moveTo(data[c].x, data[c].y);
                context.lineTo(node, n);
            }
            context.stroke();
            context.restore();
        }
        context.restore();
        if (":teams" == index) {
            if (img) {
                if (img.width) {
                    context.drawImage(img, width - img.width - 10, 10);
                }
            }
        }
        closingAnimationTime = Math.max(closingAnimationTime, pick());
        diff = Date.now() - diff;
        if (diff > 1E3 / 60) {
            resolutionScale -= 0.01;
        } else {
            if (1E3 / 65 > diff) {
                resolutionScale += 0.01;
            }
        }
        if (0.4 > resolutionScale) {
            resolutionScale = 0.4;
        }
        if (resolutionScale > 1) {
            resolutionScale = 1;
        }
        diff = max - aux;
        if (!handler() || (to || from)) {
            newEnd += diff / 2E3;
            if (newEnd > 1) {
                newEnd = 1;
            }
        } else {
            newEnd -= diff / 300;
            if (0 > newEnd) {
                newEnd = 0;
            }
        }
        aux = max;
    }

    function redraw() {
        if (window.MFX.isEnableGridline) {
            context.save();
            context.strokeStyle = window.MFX.isDarkTheme ? "#2f2f2f" : "#999999";
            context.globalAlpha = 0.3 * scale;
            context.beginPath();
            var x = width / scale;
            var y = height / scale;
            var bounds = (-centerX + x / 2) % 50;
            for (; x > bounds; bounds += 50) {
                context.moveTo(bounds * scale - 0.5, 0);
                context.lineTo(bounds * scale - 0.5, y * scale);
            }
            bounds = (-centerY + y / 2) % 50;
            for (; y > bounds; bounds += 50) {
                context.moveTo(0, bounds * scale - 0.5);
                context.lineTo(x * scale, bounds * scale - 0.5);
            }
            context.stroke();
            context.restore();
        }
    }

    function pick() {
        var result = 0;
        var i = 0;
        for (; i < data.length; i++) {
            result += data[i].m * data[i].m;
        }
        return result;
    }

    function Player(opt_vars, x, y, opt_size, b) {
        this.P = opt_vars;
        this.x = x;
        this.y = y;
        this.g = opt_size;
        this.b = b;
    }

    function set(value, x, y, size, color, ms, skin) {
        this.id = value;
        this.o = this.x = x;
        this.p = this.y = y;
        this.n = this.size = size;
        this.color = color;
        this.a = [];
        this.Q();
        this.t(ms);
        this.tickBase = 0;
        this.playerSkin = skin;
    }

    function flush(count) {
        count = count.toString(16);
        for (; 6 > count.length;) {
            count = "0" + count;
        }
        return "#" + count;
    }

    function module(moduleNames, moduleDefinition, name, radius) {
        if (moduleNames) {
            this.q = moduleNames;
        }
        if (moduleDefinition) {
            this.M = moduleDefinition;
        }
        this.O = !!name;
        if (radius) {
            this.r = radius;
        }
    }

    function shuffle(arr) {
        var tmp1;
        var rnd;
        var total = arr.length;
        for (; total > 0;) {
            rnd = Math.floor(Math.random() * total);
            total--;
            tmp1 = arr[total];
            arr[total] = arr[rnd];
            arr[rnd] = tmp1;
        }
    }

    function getMapBorders(g, ctx) {
        window.MapXYZ = g[3] - g[1];
    }

    function draw(t, ctx) {
        var x = Math.round(t[0]);
        var y = Math.round(t[1]);
        var barWidth = (Math.round(t[2]) - 400 - x) / 100;
        var h = (Math.round(t[3]) - 400 - y) / 100;
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000"
        j = 0;
        for (; 103 > j; j++) {
            i = 0;
            for (; 103 > i; i++) {
                ctx.strokeRect(x + barWidth * i, y + h * j, barWidth, h);
            }
        }
        ctx.stroke();
        ctx.restore();
    }

    function callback(href) {
        if (self.history) {
            if (self.history.replaceState) {
                self.history.replaceState({}, self.document.title, href);
            }
        }
    }

    function setData(node, data) {
        var o = -1 != result.indexOf(node.id);
        var n = -1 != result.indexOf(data.id);
        var i = 30 > data.size;
        if (o) {
            if (i) {
                ++pauseText;
            }
        }
        if (!i) {
            if (o) {
                if (!n) {
                    ++path;
                }
            }
        }
    }

    function fill(i) {
        i = ~~i;
        var lineNumber = (i % 60).toString();
        return i = (~~(i / 60)).toString(), 2 > lineNumber.length && (lineNumber = "0" + lineNumber), i + ":" + lineNumber;
    }

    function endsWith() {
        if (null == users) {
            return 0;
        }
        var i = 0;
        for (; i < users.length; ++i) {
            if (-1 != result.indexOf(users[i].id)) {
                return i + 1;
            }
        }
        return 0;
    }

    function DrawPolyline() {
        jQuery(".stats-food-eaten").text(pauseText);
        jQuery(".stats-time-alive").text(fill((far - near) / 1E3));
        jQuery(".stats-leaderboard-time").text(fill(name));
        jQuery(".stats-highest-mass").text(~~(closingAnimationTime / 100));
        jQuery(".stats-cells-eaten").text(path);
        jQuery(".stats-top-position").text(0 == count ? ":(" : count);
        var h = document.getElementById("statsGraph");
        if (h) {
            var ctx = h.getContext("2d");
            var width = h.width;
            if (h = h.height, ctx.clearRect(0, 0, width, h), 2 < a.length) {
                var n = 200;
                var i = 0;
                for (; i < a.length; i++) {
                    n = Math.max(a[i], n);
                }
                ctx.lineWidth = 3;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.strokeStyle = col;
                ctx.fillStyle = col;
                ctx.beginPath();
                ctx.moveTo(0, h - a[0] / n * (h - 10) + 10);
                i = 1;
                for (; i < a.length; i += Math.max(~~(a.length / width), 1)) {
                    var x = i / (a.length - 1) * width;
                    var r = [];
                    var offset = -20;
                    for (; 20 >= offset; ++offset) {
                        if (!(0 > i + offset)) {
                            if (!(i + offset >= a.length)) {
                                r.push(a[i + offset]);
                            }
                        }
                    }
                    r = r.reduce(function (far, near) {
                        return far + near;
                    }) / r.length / n;
                    ctx.lineTo(x, h - r * (h - 10) + 10);
                }
                ctx.stroke();
                ctx.globalAlpha = 0.5;
                ctx.lineTo(width, h);
                ctx.lineTo(0, h);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }
    }
    var simpleExpected = {
        context: function () {
            return g_context;
        },
        playerCellIds: function () {
            return g_playerCellIds;
        },
        playerCells: function () {
            return data;
        },
        cellsById: function () {
            return g_cellsById;
        },
        cells: function () {
            return g_cells;
        }
    };
    if (socket.on("playerUpdated", function (p) {
            if ("join" == p.action || "spectate" == p.action) {
                if (0 < simpleExpected.playerCells().length) {
                    conn.emit("playerUpdated", bind("update"));
                }
            }
            if (p.identifier) {
                playerDetailsByIdentifier[p.identifier] = p;
                playerDetailsByNick[p.nick] = p;
            }
        }), self.moveTo = function (lab, dragging) {
            if (lab) {
                if (dragging) {
                    window.MFX.isStopMovement = true;
                }
            }
        }, self.setPosition = function (p, index) {
            if (handler()) {
                var buf = encode(13);
                buf.setUint8(0, 16);
                buf.setInt32(1, p, true);
                buf.setInt32(5, index, true);
                buf.setUint32(9, 0, true);
                cb(buf);
            }
        }, window.handleQuickW = function () {
            if (window.MFX.autoW) {
                var buf = encode(1);
                buf.setUint8(0, 21);
                if(buf) cb(buf);
                    else return;
                setTimeout(handleQuickW, 100);
            }
        }, window.handleQuickFEEDER = function () {
            if (window.MFX.autoFEEDER) {
                var buf = encode(1);
                buf.setUint8(0, 26);
                cb(buf);
                setTimeout(handleQuickFEEDER, 100);
            }
        }, !self.UINoInit) {
        var cv;
        var context;
        var cnv;
        var width;
        var height;
        var _root = null;
        var ws = null;
        var centerX = 0;
        var centerY = 0;
        var result = [];
        var data = [];
        var queue = {};
        var list = [];
        var siblings = [];
        var users = [];
        var x = 0;
        var y = 0;
        var minX = -1;
        var t = -1;
        var target = 0;
        var max = 0;
        var aux = 0;
        var b = null;
        var right = -7071.067811865476;
        var top = -7071.06781186547;
        var left = 7071.067811865476;
        var computed = 7071.067811865476;
        var layers = 0;
        var dependencies = 0;
        var stack = 0;
        var before = 0;
        var scale = 1;
        var value = null;
        var error = true;
        var oldStatus = true;
        var doneResults = false;
        var Ee = false;
        var closingAnimationTime = 0;
        var color = 1;
        var $timeout = false;
        var chunk = centerX = ~~((right + left) / 2);
        var loc = centerY = ~~((top + computed) / 2);
        var crashed = 1;
        var index = "";
        var angles = null;
        var Ze = false;
        var Xe = false;
        var fragment = 0;
        var m = 0;
        var node = 0;
        var n = 0;
        var compassResult = 0;
        var cs = ["#333333", "#FF3333", "#33FF33", "#3333FF"];
        var dest = false;
        var matchEnd = false;
        var min = 0;
        var text = 1;
        var newEnd = 1;
        var to = false;
        var last = 0;
        var dst = {};
        var c = "";
        var deep = 0;
        var arr = [];
        var arr2 = [];
        var PIx2 = 2 * Math.PI;
        var column = 0;
        var clockseq = 0;
        var fx = 0;
        var _clockseq = 0;
        var type = 0;
        var positions = [];
        setInterval(function () {
            _clockseq = clockseq;
            clockseq = 0;
            type = fx;
            fx = 0;
        }, 1E3);
        (function () {
            var params = self.location.search;
            if ("?" == params.charAt(0)) {
                params = params.slice(1);
            }
            params = params.split("&");
            var i = 0;
            for (; i < params.length; i++) {
                var src = params[i].split("=");
                dst[src[0]] = src[1];
            }
        })();
        var test_canvas = document.createElement("canvas");
        if ("undefined" == typeof console || ("undefined" == typeof DataView || ("undefined" == typeof WebSocket || (null == test_canvas || (null == test_canvas.getContext || null == self.localStorage))))) {
            alert("You browser does not support this game, we recommend you to use Firefox to play this");
        } else {
            var old = null;
            self.setNick = function (v) {
                if (self.ga) {
                    self.ga("send", "event", "Nick", v.toLowerCase());
                }
                _init();
                b = v;
                writeUTFBytes();
                closingAnimationTime = 0;
                setLocalStorage("nick", v);
                window.MFX.newGame();
                announcementSent = false;
                resolve();
            };
            self.setSkins = function (err) {
                error = err;
            };
            self.setNames = function (newStatus) {
                oldStatus = newStatus;
            };
            self.setDarkTheme = function (newColor) {
                color = newColor;
            };
            self.setColors = function (data) {
                doneResults = data;
            };
            self.setShowMass = function (_$timeout_) {
                $timeout = _$timeout_;
            };
            self.getCurrentX = function () {
                return data.length ? centerX - (left - (getLengthX() / 2)) : "";
            };
            self.getCurrentY = function () {
                return data.length ? centerY - (computed - (getLengthX() / 2)) : "";
            };
            self.getTop1X = function () {
                return chunk;
            };
            self.getTop1Y = function () {
                return loc;
            };
            self.getLengthX = function () {
                if (window.MapXYZ) {
                    return window.MapXYZ;
                } else getLengthX();
            };
            self.getLengthY = function () {
                if (window.MapXYZ) {
                    return window.MapXYZ;
                } else getLengthX();
            };
            self.getLB = function () {
                return users;
            };
            self.getSelfIDs = function () {
                return result;
            };
            self.getCell = function () {
                return data;
            };
            self.getHighestScore = function () {
                return closingAnimationTime;
            };
            self.currentMass = function () {
                return pick();
            };
            self.quickSpace = function () {
                if (0 != data.length) {
                    emit(17);
                    setTimeout(function () {
                        emit(17);
                        setTimeout(function () {
                            emit(17);
                            setTimeout(function () {
                                emit(17);
                            }, 50);
                        }, 50);
                    }, 50);
                }
            };
            self.doubleSpace = function () {
                emit(17);
                setTimeout(function () {
                    emit(17);
                }, 70);
            };
            self.splitBots = function () {
                emit(22);
            };
            self.ejectBots = function () {
                emit(23);
            };
            self.getFPS = function () {
                return deep;
            };
            self.getPacketIO = function () {
                return [_clockseq, type];
            };
            self.spectate = function () {
                isJoinedGame = false;
                spectateMode = true;
                b = null;
                emit(1);
                _init();
                window.MFX.spectate(data);
                var cb = bind("spectate");
                conn.emit("playerEntered", cb);
            };
            self.setZoomLevel = function (textAlt) {
                text = textAlt;
            };
            self.isFreeSpec = function () {
                return window.MFX.isSpectating && 0.25 === column;
            };
            self.setAcid = function (vec) {
                dest = vec;
            };
            if (null != self.localStorage) {
                if (null == self.localStorage.AB9) {
                    self.localStorage.AB9 = 0 + ~~(100 * Math.random());
                }
                compassResult = +self.localStorage.AB9;
                self.ABGroup = compassResult;
            }
            var save = null;
            self.connect = open;
            var backoff = 500;
            var tref = null;
            var millis = 0;
            var maxX = -1;
            var t1 = -1;
            var img = null;
            var resolutionScale = 1;
            var which = function () {
                Date.now();
                var diff = 0;
                var aux = Date.now();
                return function () {
                    self.requestAnimationFrame(which);
                    var max = Date.now();
                    if (window.MFX.isShowFPS) {
                        if (diff > 1E3) {
                            aux = max;
                            diff = 0;
                            deep = target;
                            target = 0;
                            if ((window.botsexpire - Date.parse(new Date()) / 1000) > 0) $("#BotsBoostTime").text(`${(window.botsexpire - Date.parse(new Date()) / 1000) / 3600 >>> 0} h : ${(window.botsexpire - Date.parse(new Date()) / 1000) / 60 % 60 >>> 0} m : ${((window.botsexpire - Date.parse(new Date()) / 1000) % 60 >>> 0)} s`);
                            if ((window.feederExpire - Date.parse(new Date()) / 1000) > 0) $("#feederTimer").text(`${(window.feederExpire - Date.parse(new Date()) / 1000) / 3600 >>> 0} h : ${(window.feederExpire - Date.parse(new Date()) / 1000) / 60 % 60 >>> 0} m : ${((window.feederExpire - Date.parse(new Date()) / 1000) % 60 >>> 0)} s`);
                            if ((window.xpboostdate - Date.parse(new Date()) / 1000) > 0) $("#xpBoostTime").text(`${(window.xpboostdate - Date.parse(new Date()) / 1000) / 3600 >>> 0} h : ${(window.xpboostdate - Date.parse(new Date()) / 1000) / 60 % 60 >>> 0} m : ${((window.xpboostdate - Date.parse(new Date()) / 1000) % 60 >>> 0)} s`);
                        } else {
                            diff = max - aux;
                        }
                    }
                    if (!handler() || 240 > Date.now() - min) {
                        render();
                    }
                    throttledUpdate();
                };
            }();
            var results = {};
            var numbers = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;venezuela;blatter;chavez;cuba;fidel;merkel;palin;queen;boris;bush;trump".split(";");
            var reserved = "8;nasa;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;blatter;chavez;fidel;merkel;palin;queen;boris;bush;trump".split(";");
            var images = {};
            Player.prototype = {
                P: null,
                x: 0,
                y: 0,
                g: 0,
                b: 0
            };
            set.prototype = {
                id: 0,
                a: null,
                name: null,
                skin: null,
                k: null,
                I: null,
                x: 0,
                y: 0,
                size: 0,
                o: 0,
                p: 0,
                n: 0,
                C: 0,
                D: 0,
                m: 0,
                T: 0,
                K: 0,
                W: 0,
                A: false,
                f: false,
                j: false,
                L: true,
                S: 0,
                V: null,
                R: function () {
                    var i;
                    i = 0;
                    for (; i < list.length; i++) {
                        if (list[i] == this) {
                            list.splice(i, 1);
                            break;
                        }
                    }
                    delete queue[this.id];
                    i = data.indexOf(this);
                    if (-1 != i) {
                        Ee = true;
                        data.splice(i, 1);
                    }
                    i = result.indexOf(this.id);
                    if (-1 != i) {
                        result.splice(i, 1);
                    }
                    this.A = true;
                },
                i: function () {
                    return Math.max(~~(0.3 * this.size), 24);
                },
                t: function (str) {
                    var directives = str.match(/\u0001([\u0002-\uffff]|[\u0002-\uffff]\uffff)$/g);
                    var a = 0;
                    if (directives) {
                        a = directives[0].split("\u0001")[1];
                        if (1 < a.length) {
                            this.img = a.charCodeAt(0) + 65534;
                        }
                    }
                    if (this.name = str) {
                        if (null == this.k) {
                            this.k = new module(this.i(), "#FFFFFF", true, "#000000");
                            this.k.v = Math.ceil(10 * scale) / 10;
                        } else {
                            this.k.G(this.i());
                        }
                        this.k.u(this.name);
                    }
                },
                Q: function () {
                    var a = this.B();
                    for (; this.a.length > a;) {
                        var data = ~~(Math.random() * this.a.length);
                        this.a.splice(data, 1);
                    }
                    if (0 == this.a.length) {
                        if (a > 0) {
                            this.a.push(new Player(this, this.x, this.y, this.size, Math.random() - 0.5));
                        }
                    }
                    for (; this.a.length < a;) {
                        data = ~~(Math.random() * this.a.length);
                        data = this.a[data];
                        this.a.push(new Player(this, data.x, data.y, data.g, data.b));
                    }
                },
                B: function () {
                    var rh = 30;
                    if (20 > this.size) {
                        rh = 0;
                    }
                    if (this.f) {
                        rh = 30;
                    }
                    var height = this.size;
                    return this.f || (height *= scale), height *= resolutionScale, 32 & this.T && (height *= 0.25), ~~Math.max(height, rh);
                },
                da: function () {
                    this.Q();
                    var nodes = this.a;
                    var n = nodes.length;
                    var i = 0;
                    for (; n > i; ++i) {
                        var a = nodes[(i - 1 + n) % n].b;
                        var b = nodes[(i + 1) % n].b;
                        nodes[i].b += (Math.random() - 0.5) * (this.j ? 3 : 1);
                        nodes[i].b *= 0.7;
                        if (10 < nodes[i].b) {
                            nodes[i].b = 10;
                        }
                        if (-10 > nodes[i].b) {
                            nodes[i].b = -10;
                        }
                        nodes[i].b = (a + b + 8 * nodes[i].b) / 10;
                    }
                    var ELEMENT_NODE = this;
                    var sa = this.f ? 0 : (this.id / 1E3 + max / 1E4) % (2 * Math.PI);
                    i = 0;
                    for (; n > i; ++i) {
                        var g = nodes[i].g;
                        if (a = nodes[(i - 1 + n) % n].g, b = nodes[(i + 1) % n].g, 15 < this.size && (null != _root && (20 < this.size * scale && 0 < this.id))) {
                            var r = false;
                            var x = nodes[i].x;
                            var y = nodes[i].y;
                            _root.ea(x - 5, y - 5, 10, 10, function (node) {
                                if (node.P != ELEMENT_NODE) {
                                    if (25 > (x - node.x) * (x - node.x) + (y - node.y) * (y - node.y)) {
                                        r = true;
                                    }
                                }
                            });
                            if (!r) {
                                if (nodes[i].x < right || (nodes[i].y < top || (nodes[i].x > left || nodes[i].y > computed))) {
                                    r = true;
                                }
                            }
                            if (r) {
                                if (0 < nodes[i].b) {
                                    nodes[i].b = 0;
                                }
                                --nodes[i].b;
                            }
                        }
                        g += nodes[i].b;
                        if (0 > g) {
                            g = 0;
                        }
                        g = this.j ? (19 * g + this.size) / 20 : (12 * g + this.size) / 13;
                        nodes[i].g = (a + b + 8 * g) / 10;
                        a = 2 * Math.PI / n;
                        b = this.a[i].g;
                        if (this.f) {
                            if (0 == i % 2) {
                                b += 5;
                            }
                        }
                        nodes[i].x = this.x + Math.cos(a * i + sa) * b;
                        nodes[i].y = this.y + Math.sin(a * i + sa) * b;
                    }
                },
                J: function () {
                    if (0 >= this.id) {
                        return 1;
                    }
                    var p;
                    p = (max - this.K) / window.MFX.smoothAnimation();
                    p = 0 > p ? 0 : p > 1 ? 1 : p;
                    var n = 0 > p ? 0 : p > 1 ? 1 : p;
                    if (this.i(), this.A && n >= 1) {
                        var index = siblings.indexOf(this);
                        if (-1 != index) {
                            siblings.splice(index, 1);
                        }
                    }
                    return this.x = p * (this.C - this.o) + this.o, this.y = p * (this.D - this.p) + this.p, this.size = n * (this.m - this.n) + this.n, n;
                },
                H: function () {
                    return 0 >= this.id ? true : this.x + this.size + 40 < centerX - width / 2 / scale || (this.y + this.size + 40 < centerY - height / 2 / scale || (this.x - this.size - 40 > centerX + width / 2 / scale || this.y - this.size - 40 > centerY + height / 2 / scale)) ? false : true;
                },
                s: function (ctx) {
                    if (this.H()) {
                        var f = !window.MFX.isEnableSimpleDrawing;
                        if (15 > this.size) {
                            if (!window.MFX.isEnableHideFood) {
                                if (window.MFX.isSameColorFood) {
                                    positions.push({
                                        x: this.x,
                                        y: this.y,
                                        size: this.size
                                    });
                                } else {
                                    ctx.beginPath();
                                    var factor = this.v;
                                    ctx.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, false);
                                    ctx.scale(0.1, 0.1);
                                    ctx.fill();
                                }
                            }
                        } else {
                            ++this.S;
                            var y_position = 0 < this.id && (!this.f && (!this.j && -1 > scale));
                            if (5 > this.B() && (0 < this.id && (y_position = true)), this.L && !y_position) {
                                var i = 0;
                                for (; i < this.a.length; i++) {
                                    this.a[i].g = this.size;
                                }
                            }
                            this.L = y_position;
                            ctx.save();
                            this.W = max;
                            i = this.J();
                            if (this.A) {
                                ctx.globalAlpha = Math.max(120 - Date.now(), 0) / 120;
                            }
                            ctx.lineCap = "round";
                            ctx.lineJoin = this.f ? "miter" : "round";
                            i = !this.f && (0 < this.id && (15 <= this.size && !this.j)) ? true : false;
                            var v;
                            var isHideSelfName = false;
                            var x = null;
                            if (v = this.name + this.color, v = v in playerDetailsByIdentifier ? playerDetailsByIdentifier[v] : void 0, i) {
                                if (window.MFX.isTransparentCell) {
                                    ctx.globalAlpha = 0.4;
                                }
                                var c = 0;
                                for (; c < result.length; c++) {
                                    if (this.id === result[c]) {
                                        isHideSelfName = true;
                                    }
                                }
                                if (isHideSelfName) {
                                    if (window.MFX.isEnableCustomSkin) {
                                        x = window.MFX.getSkinImage(nodeList[0][5]);
                                    }
                                }
                            }
                            if (doneResults ? (ctx.fillStyle = "#000", ctx.strokeStyle = "#000") : (ctx.fillStyle = this.color, ctx.globalAlpha = 1, ctx.lineWidth = 1, ctx.strokeStyle = this.color), f && (this.f && (ctx.fillStyle = this.color, ctx.globalAlpha = 1, ctx.lineWidth = 0, ctx.strokeStyle = this.color)), f || y_position) {
                                ctx.beginPath();
                                    if (!this.f) {
                                        ctx.stroke();
                                        ctx.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, false);
                                    } else {
                                    let size1 = this.size + 10;
                                    let size2 = (size1 / 2);
                                    if(this.color == "#00bfff") {
                                        ctx.beginPath();
                                        ctx.moveTo(this.x, this.y - size2);
                                        ctx.lineTo(this.x, this.y + size1);
                                        ctx.lineTo(this.x + size2 + 40, this.y - size2 + 40);
                                        ctx.lineTo(this.x + size2 + 10, this.y - size2);
                                        ctx.fill();
                                        ctx.beginPath();
                                        ctx.moveTo(this.x, this.y - size2);
                                        ctx.lineTo(this.x, this.y + size1);
                                        ctx.lineTo(this.x - size2 - 40, this.y - size2 + 40);
                                        ctx.lineTo(this.x - size2 - 10, this.y - size2);
                                    } else if(this.color == "#fb8f0b") {
                                        ctx.beginPath();
                                        ctx.fillStyle = 'red';
                                        ctx.arc(this.x, this.y, size1 - 10, 0, 2 * Math.PI, false);
                                        ctx.fill();
                                        ctx.beginPath();
                                        ctx.fillStyle = '#fb8f0b';
                                        ctx.moveTo(this.x - 10, this.y);
                                        ctx.lineTo(this.x - (size2), this.y + 10)
                                        ctx.lineTo(this.x + (size2), this.y - size1)
                                        ctx.lineTo(this.x + (size2/2) - 10, this.y - (size2) + 20)
                                        ctx.lineTo(this.x + (size2), this.y - (size2) + 10)
                                        ctx.lineTo(this.x - (size2) - 10, this.y + size1)
                                        ctx.lineTo(this.x - 10, this.y)
                                        ctx.fill();
                                    } else if(this.color == "#e68d5c") {
                                        ctx.beginPath();
                                        ctx.fillStyle = "#b3673d";
                                        ctx.arc(this.x, this.y, size1, 0, 2 * Math.PI, false);
                                        ctx.fill();
                                        ctx.beginPath();
                                        ctx.fillStyle = "#e68d5c";
                                        ctx.arc(this.x - (size2/2), this.y, size2, 0, 2 * Math.PI, false);
                                        ctx.arc(this.x + (size2/2), this.y, size2, 0, 2 * Math.PI, false);
                                        ctx.fill();
                                    } else if(this.color == "#a0e65c") {
                                        ctx.beginPath();
                                        ctx.fillStyle = "#59b348";
                                        ctx.arc(this.x, this.y, size1, 0, 2 * Math.PI, false);
                                        ctx.fill();
                                        ctx.beginPath();
                                        ctx.fillStyle = "#a0e65c";
                                        ctx.lineWidth = 15;
                                        ctx.moveTo(this.x, this.y);
                                        ctx.lineTo(this.x + size2, this.y);
                                        ctx.lineTo(this.x, this.y);
                                        ctx.lineTo(this.x - size2, this.y);
                                        ctx.lineTo(this.x, this.y);
                                        ctx.lineTo(this.x, this.y + size2);
                                        ctx.lineTo(this.x, this.y);
                                        ctx.lineTo(this.x, this.y - size2);
                                        ctx.fill();
                                    } else if(this.color == "#895ce6") {
                                            var PI_2 = Math.PI * 2;
                                            var pointCount = 50;
                                            var incremental = PI_2 / pointCount;
                                            ctx.moveTo(this.x, this.y + this.size + 0);
                                            for (var i = 1; i < pointCount; i++) {
                                                var angle = i * incremental;
                                                var dist = this.size - 35 + (i % 2 === 0) * 40;
                                                ctx.lineTo(
                                                    this.x + dist * Math.sin(angle),
                                                    this.y + dist * Math.cos(angle)
                                                )
                                            }
                                            ctx.lineTo(this.x, this.y + this.size + 3); 
                                        } else if(this.color == "#e65c5c") {
                                            var PI_2 = Math.PI * 2;
                                            var pointCount = 40;
                                            var incremental = PI_2 / pointCount;
                                            ctx.moveTo(this.x, this.y + this.size + 0);
                                            for (var i = 1; i < pointCount; i++) {
                                                var angle = i * incremental;
                                                var dist = this.size - 35 + (i % 2 === 0) * 40;
                                                ctx.lineTo(
                                                    this.x + dist * Math.sin(angle),
                                                    this.y + dist * Math.cos(angle)
                                                )
                                            }
                                            ctx.lineTo(this.x, this.y + this.size + 3); 
                                        } else {
                                            var PI_2 = Math.PI * 2;
                                            var pointCount = 60;
                                            var incremental = PI_2 / pointCount;
                                            ctx.moveTo(this.x, this.y + this.size + 3);
                                            for (var i = 1; i < pointCount; i++) {
                                                var angle = i * incremental;
                                                var dist = this.size - 3 + (i % 2 === 0) * 6;
                                                ctx.lineTo(
                                                    this.x + dist * Math.sin(angle),
                                                    this.y + dist * Math.cos(angle)
                                                )
                                            }
                                            ctx.lineTo(this.x, this.y + this.size + 3);
                                        }
                                    }
                                    if (window.MFX.isEnableSplitInd) {
                                        if (i) {
                                            if (!isHideSelfName) {
                                                if (this.name || 38 < this.size) {
                                                    arr.push({
                                                        x: this.x,
                                                        y: this.y,
                                                        size: this.size
                                                    });
                                                }
                                            }
                                        }
                                    }
                            } else {
                                this.da();
                                ctx.beginPath();
                                var n = this.B();
                                ctx.moveTo(this.a[0].x, this.a[0].y);
                                i = 1;
                                for (; n >= i; ++i) {
                                    c = i % n;
                                    ctx.lineTo(this.a[c].x, this.a[c].y);
                                }
                            }
                            if (ctx.closePath(), f && (this.f && ctx.stroke()), ctx.fill(), window.MFX.isEnableCustomSkin && (n = null, x = false, v && (x = `https://myagar.pro:7777/images/approved/${this.playerSkin}.png`), x && (results.hasOwnProperty(x) || (v = new Image, v.src = x, results[x] = v), results[x].width && (results[x].complete && (n = results[x]))), c = n, null != c)) {
                                var size = Math.min(c.width, c.height);

                                var startX = (c.width - size) / 2;
                                var offsetY = (c.height - size) / 2;

                                if (window.MFX.isEnableSimpleDrawing) {
                                    var y = (this.a[0].g + 5);
                                } else {
                                    var y = (this.size + 5);
                                }
                            }
                            if (null != c && window.MFX.isEnableCustomSkin && (ctx.save(), ctx.clip(), ctx.drawImage(c, startX, offsetY, size, size, this.x - y, this.y - y, 2 * y, 2 * y), ctx.restore()), f || ((doneResults || 15 < this.size) && (y_position || (ctx.strokeStyle = "#000000", ctx.globalAlpha *= 0.1, ctx.stroke())), ctx.globalAlpha = 1), n = -1 != data.indexOf(this), y_position = ~~this.y, f = this.f || (777 < this.size || 88 < this.size * scale), !(isHideSelfName && window.MFX.isHideSelfName || window.MFX.isAutoHideName && !f) && (0 != this.id &&
                                    ((oldStatus || n) && (this.name && (this.k && (null == c || -1 == reserved.indexOf(i))))))) {
                                        // ctx.shadowColor = 'red';
                                        // ctx.shadowBlur = 15;
                                c = this.k;
                                c.u(this.name);
                                c.G(this.i() / 0.55);
                                i = 0 >= this.id ? 1 : Math.ceil(10 * scale) / 10;
                                c.U(i);
                                c = c.F();
                                var glockBottomWidth = ~~(c.width / i);
                                var sh = ~~(c.height / i);
                                ctx.drawImage(c, ~~this.x - ~~(glockBottomWidth / 2), y_position - ~~(sh / 2), glockBottomWidth, sh);
                                y_position += c.height / 2 / i + 4;
                            }
                            if (!window.MFX.isAutoHideMass || f) {
                                if (window.MFX.isEnableShowAllMass) {
                                    if (0 < this.id) {
                                        if ($timeout) {
                                            if (300 < this.size) {
                                                if (null == this.I) {
                                                    this.I = new module(this.i() / 2, "#FFFFFF", true, "#000000");
                                                }
                                                n = this.I;
                                                n.G(this.i() / 1.7);
                                                n.u(~~(this.size * this.size / 100));
                                                i = Math.ceil(10 * scale) / 10;
                                                n.U(i);
                                                c = n.F();
                                                glockBottomWidth = ~~(c.width / i);
                                                sh = ~~(c.height / i);
                                                if (sh > 0 && glockBottomWidth > 0) ctx.drawImage(c, ~~this.x - ~~(glockBottomWidth / 2), y_position - ~~(sh / 4.2), glockBottomWidth, sh);
                                            }
                                        }
                                    }
                                }
                            }
                            ctx.restore();
                        }
                    }
                }
            };
            module.prototype = {
                w: "",
                M: "#000000",
                O: false,
                r: "#000000",
                q: 16,
                l: null,
                N: null,
                h: false,
                v: 1,
                G: function (x) {
                    if (5 < Math.abs(x - this.q)) {
                        if (this.q != x) {
                            this.q = x;
                            this.h = true;
                        }
                    }
                },
                U: function (v) {
                    if (this.v != v) {
                        this.v = v;
                        this.h = true;
                    }
                },
                setStrokeColor: function (r) {
                    if (this.r != r) {
                        this.r = r;
                        this.h = true;
                    }
                },
                u: function (n) {
                    var w;
                    if (!isNaN(n)) {
                        if (!isNaN(this.w)) {
                            if (0 != this.w) {
                                if (0 != n) {
                                    if (this.w != n) {
                                        if (0.012 > Math.abs((n - this.w) / this.w)) {
                                            w = this.w;
                                            this.w = n;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (n != this.w) {
                        this.w = n;
                        this.h = true;
                    }
                    if (w) {
                        this.w = w;
                    }
                },
                F: function () {
                    if (null == this.l && (this.l = document.createElement("canvas"), this.N = this.l.getContext("2d")), this.h) {
                        this.h = false;
                        var size = this.l;
                        var c = this.N;
                        var CellNick = this.w + "";
                        CellNick = CellNick.split("&&&");
                        var line = CellNick[0];
                        if (window.MFX.massInKs) {
                            line = line > 999 ? (line / 1000).toFixed(1) + "k" : line;
                        }
                        var factor = this.v;
                        var right = this.q;
                        var left = ~~(.2 * right);
                        if (CellNick[0]) {
                            var font = "bold " + right * window.SizGay(CellNick[0]) + "px Ubuntu";
                            c.font = font;
                            c.fillStyle = "#FFF"
                            size.width = (c.measureText(line).width + 10) * factor;
                            size.height = (right + left) * factor - 5 + window.SizGay3(CellNick[0]);
                            c.font = font;
                            c.scale(factor, factor);
                            c.globalAlpha = 1;
                            if (CellNick[1]) {
                                c.fillStyle = CellNick[1];
                            } else {
                                c.fillStyle = "#FFF"
                            }
                            c.lineWidth = Math.max(right * window.SizGay2(CellNick[0]), window.SizGay2(CellNick[0]));
                            c.strokeStyle = "#000"
                            c.strokeText(line, 2, right - left / 2);
                            c.fillText(line, 2, right - left / 2);
                        } else {
                            var font = "bold " + right + "px Ubuntu";
                            c.font = font;
                            c.fillStyle = "#FFF"
                            size.width = (c.measureText(line).width + 10) * factor;
                            size.height = (right + left) * factor;
                            c.font = font;
                            c.scale(factor, factor);
                            c.globalAlpha = 1;
                            if (CellNick[1]) {
                                c.fillStyle = CellNick[1];
                            } else {
                                c.fillStyle = "#FFF"
                            }
                            c.lineWidth = Math.max(right * 0.09, 0.09);
                            c.strokeStyle = "#000"
                            c.strokeText(line, 2, right - left / 2);
                            c.fillText(line, 2, right - left / 2);
                        }
                    }
                    return this.l;
                },
            };
            if (!Date.now) {
                Date.now = function () {
                    return (new Date).getTime();
                };
            }
            (function () {
                var vendors = ["ms", "moz", "webkit", "o"];
                var x = 0;
                for (; x < vendors.length && !self.requestAnimationFrame; ++x) {
                    self.requestAnimationFrame = self[vendors[x] + "RequestAnimationFrame"];
                    self.cancelAnimationFrame = self[vendors[x] + "CancelAnimationFrame"] || self[vendors[x] + "CancelRequestAnimationFrame"];
                }
                if (!self.requestAnimationFrame) {
                    self.requestAnimationFrame = function (callback) {
                        return setTimeout(callback, 1E3 / 60);
                    };
                    self.cancelAnimationFrame = function (id) {
                        clearTimeout(id);
                    };
                }
            })();
            var removeEventListener = function () {
                var self = new set(0, 0, 0, 32, "#ED1C24", "");
                var cnv = document.createElement("canvas");
                cnv.width = 32;
                cnv.height = 32;
                var s = cnv.getContext("2d");
                return function () {
                    if (0 < data.length) {
                        self.color = data[0].color;
                        self.t(data[0].name);
                    }
                    s.clearRect(0, 0, 32, 32);
                    s.save();
                    s.translate(16, 16);
                    s.scale(0.4, 0.4);
                    self.s(s);
                    s.restore();
                    var originalFavicon = document.getElementById("favicon");
                    var newNode = originalFavicon.cloneNode(true);
                    originalFavicon.parentNode.replaceChild(newNode, originalFavicon);
                };
            }();
            jQuery(function () {
                removeEventListener();
            });
            var throttledUpdate = function () {
                function render(d, map, str, size, data) {
                    var s = map.getContext("2d");
                    var len = map.width;
                    map = map.height;
                    d.color = data;
                    d.t(str);
                    d.size = size;
                    s.save();
                    s.translate(len / 2, map / 2);
                    d.s(s);
                    s.restore();
                }
                var data = new set(-1, 0, 0, 32, "#5bc0de", "");
                var dir = new set(-1, 0, 0, 32, "#5bc0de", "");
                var codeSegments = "#0791ff #5a07ff #ff07fe #ffa507 #ff0774 #077fff #3aff07 #ff07ed #07a8ff #ff076e #3fff07 #ff0734 #07ff20 #ff07a2 #ff8207 #07ff0e".split(" ");
                var items = [];
                var i = 0;
                for (; i < codeSegments.length; ++i) {
                    var bisection = i / codeSegments.length * 12;
                    var radius = 30 * Math.sqrt(i / codeSegments.length);
                    items.push(new set(-1, Math.cos(bisection) * radius, Math.sin(bisection) * radius, 10, codeSegments[i], ""));
                }
                shuffle(items);
                var map = document.createElement("canvas");
                return map.getContext("2d"), map.width = map.height = 70, render(dir, map, "", 26, "#ebc0de"),
                    function () {
                        jQuery(".cell-spinner").filter(":visible").each(function () {
                            var body = jQuery(this);
                            var x = Date.now();
                            var width = this.width;
                            var height = this.height;
                            var context = this.getContext("2d");
                            context.clearRect(0, 0, width, height);
                            context.save();
                            context.translate(width / 2, height / 2);
                            var y = 0;
                            for (; 10 > y; ++y) {
                                context.drawImage(map, (0.1 * x + 80 * y) % (width + 140) - width / 2 - 70 - 35, height / 2 * Math.sin((0.001 * x + y) % Math.PI * 2) - 35, 70, 70);
                            }
                            context.restore();
                            if (body = body.attr("data-itr")) {
                                body = _(body);
                            }
                            render(data, this, body || "", +jQuery(this).attr("data-size"), "#5bc0de");
                        });
                        jQuery("#statsPellets").filter(":visible").each(function () {
                            jQuery(this);
                            var i = this.width;
                            var height = this.height;
                            this.getContext("2d").clearRect(0, 0, i, height);
                            i = 0;
                            for (; i < items.length; i++) {
                                render(items[i], this, "", items[i].size, items[i].color);
                            }
                        });
                    };
            }();
            var a = [];
            var pauseText = 0;
            var col = "#000000";
            var from = false;
            var Bt = false;
            var near = 0;
            var far = 0;
            var name = 0;
            var path = 0;
            var count = 0;
            var connected = true;
            setInterval(function () {
                var tempCount = endsWith();
                if (0 != tempCount) {
                    ++name;
                    if (0 == count) {
                        count = tempCount;
                    }
                    count = Math.min(count, tempCount);
                }
            }, 1E3);
            jQuery(function () {
                jQuery(init);
            });
        }

    }
}(window, window.jQuery), window.MFX.afterGameLogicLoaded(), $(document).keydown(function (e) {
    if ("input" != e.target.tagName.toLowerCase() && "textarea" != e.target.tagName.toLowerCase() || 13 == e.keyCode) {
        var username = "";
        if (isValidHotKey(e) && (username = getPressedKey(e)), 18 == e.keyCode && e.preventDefault(), selectedHotkeyRow) {
            if (46 == e.keyCode) {
                e.preventDefault();
                selectedHotkeyRow.find(".hotkey").text(username);
            } else {
                if ("" != username) {
                    e.preventDefault();
                    var codeSegments = $(".hotkey");
                    var i = 0;
                    for (; i < codeSegments.length; i++) {
                        if ($(codeSegments[i]).text() == username) {
                            return;
                        }
                    }
                    selectedHotkeyRow.find(".hotkey").text(username);
                    selectedHotkeyRow.removeClass("table-row-selected");
                    selectedHotkeyRow = null;
                }
            }
        }
        if ("" != username) {
            if (hotkeyMapping[username]) {
                e.preventDefault();
                if (hotkeyConfig[hotkeyMapping[username]]) {
                    if (hotkeyConfig[hotkeyMapping[username]].keyDown) {
                        hotkeyConfig[hotkeyMapping[username]].keyDown();
                    }
                }
            }
        }
    }
}), $(document).keyup(function (e) {
    if ("input" != e.target.tagName.toLowerCase() && "textarea" != e.target.tagName.toLowerCase() || 13 == e.keyCode) {
        var rt = "";
        if (isValidHotKey(e)) {
            rt = getPressedKey(e);
        }
        if ("" != rt) {
            if (hotkeyMapping[rt]) {
                e.preventDefault();
                if (hotkeyConfig[hotkeyMapping[rt]]) {
                    if (hotkeyConfig[hotkeyMapping[rt]].keyUp) {
                        hotkeyConfig[hotkeyMapping[rt]].keyUp();
                    }
                }
            }
        }
    }
}), $("#overlays2").mousedown(function (e) {
    if (0 === e.button) {
        if (window.MFX.isEnableMouseW) {
            if ("input" != e.target.tagName.toLowerCase() || "textarea" != e.target.tagName.toLowerCase()) {
                window.MFX.autoW = true;
                handleQuickW();
                e.preventDefault();
            }
        }
    } else {
        if (2 === e.button) {
            // $("#opt_chatbox").click();
        }
    }
}), $("#overlays2").mouseup(function (e) {
    if (0 === e.button) {
        if (window.MFX.isEnableMouseW) {
            if ("input" != e.target.tagName.toLowerCase()) {
                if ("textarea" != e.target.tagName.toLowerCase()) {
                    window.MFX.autoW = false;
                    e.preventDefault();
                }
            }
        }
    }
});
var escapeHtml = function () {
    var buf = {
        '"': "&quot;",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    };
    return function (messageFormat) {
        return messageFormat.replace(/[\"&<>]/g, function (off) {
            return buf[off];
        });
    };
}();
window.onbeforeunload = function () {
    return false;
};
var disconnectTimeout;
$(window).focus(function () {
    isWindowFocus = true;
    if (disconnectTimeout) {
        clearTimeout(disconnectTimeout);
    }
}).blur(function () {
    isWindowFocus = false;
}), jQuery.cachedScript = function (url, options) {
    return options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
    }), jQuery.ajax(options);
}, drawMinimapNodes(), xAzDisableZoom(), clearOldNodesData(), updateLbDiv(), updateScoreDiv(), $.cachedScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.8/js/min/perfect-scrollbar.jquery.min.js").done(function (dataAndEvents, deepDataAndEvents) {
    chatRoom.createScrollBar();
}), $.cachedScript("js/jquery.toast.min.js").done(function (dataAndEvents, deepDataAndEvents) {
    var restoreScript;
    for (; restoreScript = toastQueue.shift();) {
        chatRoom.popup(restoreScript);
    }
});
$(".toast_sender").css("color", getLocalStorage("chatcolors") || "#999999");