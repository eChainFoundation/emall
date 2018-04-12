(function(b, f) {
    jPlayerPlaylist = function(a, c, d) {
        var e = this;
        this.current = 0;
        this.removing = this.shuffled = this.loop = !1;
        this.cssSelector = b.extend({},
        this._cssSelector, a);
        this.options = b.extend(!0, {
            keyBindings: {
                next: {
                    key: 39,
                    fn: function() {
                        e.next()
                    }
                },
                previous: {
                    key: 37,
                    fn: function() {
                        e.previous()
                    }
                }
            }
        },
        this._options, d);
        this.playlist = [];
        this.original = [];
        this._initPlaylist(c);
        this.cssSelector.title = this.cssSelector.cssSelectorAncestor + " .jp-title";
        this.cssSelector.playlist = this.cssSelector.cssSelectorAncestor + " .jp-playlist";
        this.cssSelector.next = this.cssSelector.cssSelectorAncestor + " .jp-next";
        this.cssSelector.previous = this.cssSelector.cssSelectorAncestor + " .jp-previous";
        this.cssSelector.shuffle = this.cssSelector.cssSelectorAncestor + " .jp-shuffle";
        this.cssSelector.shuffleOff = this.cssSelector.cssSelectorAncestor + " .jp-shuffle-off";
        this.options.cssSelectorAncestor = this.cssSelector.cssSelectorAncestor;
        this.options.repeat = function(a) {
            e.loop = a.jPlayer.options.loop
        };
        b(this.cssSelector.jPlayer).bind(b.jPlayer.event.ready,
        function() {
            e._init()
        });
        b(this.cssSelector.jPlayer).bind(b.jPlayer.event.ended,
        function() {
            e.next()
        });
        b(this.cssSelector.jPlayer).bind(b.jPlayer.event.play,
        function() {
            b(this).jPlayer("pauseOthers")
        });
        b(this.cssSelector.jPlayer).bind(b.jPlayer.event.resize,
        function(a) {
            a.jPlayer.options.fullScreen ? b(e.cssSelector.title).show() : b(e.cssSelector.title).hide()
        });
        b(this.cssSelector.previous).click(function() {
            e.previous();
            b(this).blur();
            return ! 1
        });
        b(this.cssSelector.next).click(function() {
            e.next();
            b(this).blur();
            return ! 1
        });
        b(this.cssSelector.shuffle).click(function() {
            e.shuffle(!0);
            return ! 1
        });
        b(this.cssSelector.shuffleOff).click(function() {
            e.shuffle(!1);
            return ! 1
        }).hide();
        this.options.fullScreen || b(this.cssSelector.title).hide();
        b(this.cssSelector.playlist + " ul").empty();
        this._createItemHandlers();
        b(this.cssSelector.jPlayer).jPlayer(this.options)
    };
    jPlayerPlaylist.prototype = {
        _cssSelector: {
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        },
        _options: {
            playlistOptions: {
                autoPlay: !1,
                loopOnPrevious: !1,
                shuffleOnLoop: !0,
                enableRemoveControls: !1,
                displayTime: "slow",
                addTime: "fast",
                removeTime: "fast",
                shuffleTime: "slow",
                itemClass: "jp-playlist-item",
                itemClasstitle:"jp-playlist-item-title",
                freeGroupClass: "jp-free-media",
                freeItemClass: "jp-playlist-item-free",
                removeItemClass: "jp-playlist-item-remove",
                itemtoggle:"jp-playlist-item-toggle",
                itemClassedit:"jp-playlist-item-edit"
            }
        },
        option: function(a, b) {
            if (b === f) return this.options.playlistOptions[a];
            this.options.playlistOptions[a] = b;
            switch (a) {
            case "enableRemoveControls":
                this._updateControls();
                break;
            case "itemClass":
            case "itemClasstitle":
            case "freeGroupClass":
            case "itemClassedit":
            case "freeItemClass":
            case "itemtoggle":
            case "removeItemClass":
                this._refresh(!0),
                this._createItemHandlers()
            }
            return this
        },
        _init: function() {
            var a = this;
            this._refresh(function() {
                a.options.playlistOptions.autoPlay ? a.play(a.current) : a.select(a.current)
            })
        },
        _initPlaylist: function(a) {
            this.current = 0;
            this.removing = this.shuffled = !1;
            this.original = b.extend(!0, [], a);
            this._originalPlaylist()
        },
        _originalPlaylist: function() {
            var a = this;
            this.playlist = [];
            b.each(this.original,
            function(b) {
                a.playlist[b] = a.original[b]
            })
        },
        _refresh: function(a) {
            var c = this;
            if (a && !b.isFunction(a)) b(this.cssSelector.playlist + " ul").empty(),
            b.each(this.playlist,
            function(a) {
                b(c.cssSelector.playlist + " ul").append(c._createListItem(c.playlist[a]))
            }),
            this._updateControls();
            else {
                var d = b(this.cssSelector.playlist + " ul").children().length ? this.options.playlistOptions.displayTime: 0;
                b(this.cssSelector.playlist + " ul").hide(d,
                function() {
                    var d = b(this);
                    b(this).empty();
                    b.each(c.playlist,
                    function(a) {
                        d.append(c._createListItem(c.playlist[a]))
                    });
                    c._updateControls();
                    b.isFunction(a) && a();
                    c.length ? b(this).show(c.options.playlistOptions.displayTime) : b(this).show()
                })
            }
        },
        _createListItem: function(a) {
            var c = this,
            d = "<li curid="+a.id+"><div style='float: left;width:500px;position:relative; '><textarea class='" + this.options.playlistOptions.itemClasstitle + "' tabindex='1' style='width:158px;height:17px; line-height:20px; padding:6px 5px; margin-bottom:5px; font-weight:bold; resize:none;overflow:hidden;'  >" + a.title + (a.artist ? " <span class='jp-artist'>by " + a.artist + "</span>": "") + "</textarea><div class='" + this.options.playlistOptions.itemClassedit + "' style='cursor:pointer; width:17px;height:18px;position:absolute; left:220px; top:5px; background:url(/func/images/HomeAdd.png) 55px 0'></div><a  style='width:150px;height:45px;line-height:45px;text-align:center; text-decoration:none;color:#fff; display:block; background: url(http://we.365wos.org/images/user/Voice.png) no-repeat;' href='javascript:;' onfocus='this.blur()' class='" + this.options.playlistOptions.itemClass + "' tabindex='1'>";
            
            return d += "点击播放</a><a  style='display:none !important; width:150px;height:45px;  background: url(http://we.365wos.org/images/user/Voice2.gif) no-repeat;' href='javascript:;' onfocus='this.blur()' class='" + this.options.playlistOptions.itemtoggle + "' tabindex='1'></a></div><div style='float: left;width:70px; overflow:hidden; text-align: center;font-weight: bold;'>"+a.filesize+"Kb</div><div style='cursor:pointer; float: left;width:108px;text-align: center;font-weight: bold;'><div  class='" + this.options.playlistOptions.removeItemClass + "' style='width:18px; height:17px; margin-left:45px; background:url(http://we.365wos.org/func/images/HomeAdd.png) -54px 0 no-repeat;'></div></div></li>"
        },
        _createItemHandlers: function() {
            var a = this;
            b(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.itemClass).on("click", "a." + this.options.playlistOptions.itemClass,
            function() {
            	
            	$(".jp-playlist-item").show();
            	$(".jp-playlist-item-toggle").hide()
            	b(this).hide();
            	b(this).next().show().css({display:"block"});
                var c = b(this).parent().parent().index();
                a.current != c ? a.play(c) : b(a.cssSelector.jPlayer).jPlayer("play");
                b(this).blur();
                return ! 1
            });
             b(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.itemtoggle).on("click", "a." + this.options.playlistOptions.itemtoggle,
	            function() {
	            	b(this).hide();
	            	b(this).prev().show().css({display:"block"});
	                var c = b(this).parent().parent().index();
	                a.current !== c ? a.play(c) : b(a.cssSelector.jPlayer).jPlayer("pause");
	                b(this).blur();
	                return ! 1
	            });
            b(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.freeItemClass).on("click", "a." + this.options.playlistOptions.freeItemClass,
            function() {
                b(this).parent().parent().parent().parent().find("." + a.options.playlistOptions.itemClass).click();
                b(this).blur();
                return ! 1
            });
            b(this.cssSelector.playlist).off("click", "div." + this.options.playlistOptions.removeItemClass).on("click", "div." + this.options.playlistOptions.removeItemClass,
            function() {
                var c = b(this).parent().index();
                if(confirm("是否确定删除？")){
					var id =$(this).parent().parent().attr("curid");
					var pagebegin = $(".pagebeignVoice").val();
	               // a.remove(c);
	               // b(this).blur();
	               $('html').tip({status:'right',width:330,content:'删除成功...'});
	                location.href="/materials.action?op=delMaterials&materialstype=voices&pagebegin="+pagebegin+"&id="+id;
	                //return ! 1
				}else{
					return false;
				}
            });
            b(this.cssSelector.playlist).off("bind", "textarea." + this.options.playlistOptions.itemClasstitle).on("blur", "textarea." + this.options.playlistOptions.itemClasstitle,
            function() {
            	b(this).css("color","#000");
            	var changemid = b(this).parent().parent().attr("curid");
            	var filename = b(this).val();
	            	$.ajax({
			            url: "/materials.action",
			            type:"POST",dataType:"json",
			            timeout: "10000",
			            data:{ "op":"updateMaterials",
			            	"filename":filename,
			            	"id":changemid
			            	},
			            success:function(data){
			                if(data.code == "A00006"){
			                //	var emid=".editefilename"+data.id;
			                //	$(emid).val(data.filename);
			                	b(this).val(data.filename);
			                }else if(data.code=="A00004"){
			    	    		location.href="/login.jsp";
			    	    	}
			            }
			        });
                return ! 1
            });
            
            b(this.cssSelector.playlist).off("click", "div." + this.options.playlistOptions.itemClassedit).on("click", "div." + this.options.playlistOptions.itemClassedit,
            function() {
             b(this).prev().focus();
             b(this).prev().css("color","#db7011");
            });
        },
        _updateControls: function() {
            this.shuffled ? (b(this.cssSelector.shuffleOff).show(), b(this.cssSelector.shuffle).hide()) : (b(this.cssSelector.shuffleOff).hide(), b(this.cssSelector.shuffle).show())
        },
        _highlight: function(a) {
            this.playlist.length && a !== f && (b(this.cssSelector.playlist + " .jp-playlist-current").removeClass("jp-playlist-current"), b(this.cssSelector.playlist + " li:nth-child(" + (a + 1) + ")").addClass("jp-playlist-current").find(".jp-playlist-item").addClass("jp-playlist-current"), b(this.cssSelector.title + " li").html(this.playlist[a].title + (this.playlist[a].artist ? " <span class='jp-artist'>by " + this.playlist[a].artist + "</span>": "")))
        },
        setPlaylist: function(a) {
            this._initPlaylist(a);
            this._init()
        },
        add: function(a, c) {
            b(this.cssSelector.playlist + " ul").prepend(this._createListItem(a)).find("li:last-child").hide().show(this.options.playlistOptions.addTime);
            this._updateControls();
            this.original.push(a);
            this.playlist.push(a);
            c ? this.play(this.playlist.length - 1) : 1 === this.original.length && this.select(0)
        },
        remove: function(a) {
        	console.log(a)
            var c = this;
            if (a === f) return this._initPlaylist([]),
            this._refresh(function() {
                b(c.cssSelector.jPlayer).jPlayer("clearMedia")
            }),
            !0;
            if (this.removing) return ! 1;
            a = 0 > a ? c.original.length + a: a;
            0 <= a && a < this.playlist.length && (this.removing = !0, b(this.cssSelector.playlist + " li:nth-child(" + (a + 1) + ")").hide(this.options.playlistOptions.removeTime,
            function() {
                b(this).remove();
                if (c.shuffled) {
                    var d = c.playlist[a];
                    
                    b.each(c.original,
                    function(a) {
                        if (c.original[a] === d) return c.original.splice(a, 1),
                        !1
                       
                    })
                } else c.original.splice(a, 1);
                c.playlist.splice(a, 1);
                c.original.length ? a === c.current ? (c.current = a < c.original.length ? c.current: c.original.length - 1, c.select(c.current)) : a < c.current && c.current--:(b(c.cssSelector.jPlayer).jPlayer("clearMedia"), c.current = 0, c.shuffled = !1, c._updateControls());
                //console.log(c.original)
                c.removing = !1
               
            }));
            return ! 0
        },
        select: function(a) {
            a = 0 > a ? this.original.length + a: a;
            0 <= a && a < this.playlist.length ? (this.current = a, this._highlight(a), b(this.cssSelector.jPlayer).jPlayer("setMedia", this.playlist[this.current])) : this.current = 0
        },
        play: function(a) {
            a = 0 > a ? this.original.length + a: a;
            0 <= a && a < this.playlist.length ? this.playlist.length && (this.select(a), b(this.cssSelector.jPlayer).jPlayer("play")) : a === f && b(this.cssSelector.jPlayer).jPlayer("play")
        },
        pause: function() {
            b(this.cssSelector.jPlayer).jPlayer("pause")
        },
        next: function() {
            var a = this.current + 1 < this.playlist.length ? this.current + 1 : 0;
            this.loop ? 0 === a && this.shuffled && this.options.playlistOptions.shuffleOnLoop && 1 < this.playlist.length ? this.shuffle(!0, !0) : this.play(a) : 0 < a && this.play(a)
        },
        previous: function() {
            var a = 0 <= this.current - 1 ? this.current - 1 : this.playlist.length - 1; (this.loop && this.options.playlistOptions.loopOnPrevious || a < this.playlist.length - 1) && this.play(a)
        },
        shuffle: function(a, c) {
            var d = this;
            a === f && (a = !this.shuffled); (a || a !== this.shuffled) && b(this.cssSelector.playlist + " ul").hide(this.options.playlistOptions.shuffleTime,
            function() { (d.shuffled = a) ? d.playlist.sort(function() {
                    return 0.5 - Math.random()
                }) : d._originalPlaylist();
                d._refresh(!0);
                c || !b(d.cssSelector.jPlayer).data("jPlayer").status.paused ? d.play(0) : d.select(0);
                b(this).show(d.options.playlistOptions.shuffleTime)
            })
        }
    }
})(jQuery);