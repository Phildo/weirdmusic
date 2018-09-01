var GamePlayScene = function(game, stage)
{
  var self = this;

  var canv;
  var canvas;
  var ctx;
  self.resize = function(s)
  {
    stage = s;
    canv = stage.canv;
    canvas = canv.canvas;
    ctx = canv.context;

    if(clicker) { clicker.detach(); clicker = new Clicker({source:stage.canv.canvas}); };
    if(dragger) { dragger.detach(); dragger = new Dragger({source:stage.canv.canvas}); };
  }
  self.resize(stage);

  var clicker;
  var dragger;

  var play_btn_a;
  var freq_slider_a;
  var vol_slider_a;
  var ab_a;
  var freq_window_a;
  var cycle_window_a;

  var play_btn_b;
  var freq_slider_b;
  var vol_slider_b;
  var ab_b;
  var freq_window_b;
  var cycle_window_b;

  self.ready = function()
  {
    clicker = new Clicker({source:stage.canv.canvas});
    dragger = new Dragger({source:stage.canv.canvas});
    ab_a = new audioboy();
    ab_b = new audioboy();

    var x = 10;
    var y = 0;
    var w = 0; var h = 0;

    y += h;
    y += 10;
    w = 10;
    h = 10;
    play_btn_a = new ToggleBox(x,y,w,h,0,function(v){ if(v) ab_a.play(); else ab_a.stop(); });
    y += h;
    y += 10;
    w = 200;
    h = 20;
    freq_slider_a = new SmoothSliderBox(x,y,w,h,20,20000,440,function(v){ ab_a.freq = v; });
    y += h;
    y += 10;
    w = 200;
    h = 20;
    vol_slider_a = new SmoothSliderBox(x,y,w,h,0,1,1,function(v){ ab_a.vol = v; if(ab_a.vol == 0) ab_a.stop(); else if(play_btn_a.on) ab_a.play(); });
    y += h;
    y += 10;
    w = 200;
    h = 40;
    freq_window_a = new Box(x,y,w,h);
    y += h;
    y += 10;
    w = 200;
    h = 40;
    cycle_window_a = new Box(x,y,w,h);

    y += h;
    y += 10;
    w = 10;
    h = 10;
    play_btn_b = new ToggleBox(x,y,w,h,0,function(v){ if(v) ab_b.play(); else ab_b.stop(); });
    y += h;
    y += 10;
    w = 200;
    h = 20;
    freq_slider_b = new SmoothSliderBox(x,y,w,h,20,20000,440,function(v){ ab_b.freq = v; });
    y += h;
    y += 10;
    w = 200;
    h = 20;
    vol_slider_b = new SmoothSliderBox(x,y,w,h,0,1,1,function(v){ ab_b.vol = v; if(ab_b.vol == 0) ab_b.stop(); else if(play_btn_b.on) ab_b.play();  });
    y += h;
    y += 10;
    w = 200;
    h = 40;
    freq_window_b = new Box(x,y,w,h);
    y += h;
    y += 10;
    w = 200;
    h = 40;
    cycle_window_b = new Box(x,y,w,h);
  };

  self.tick = function()
  {
    clicker.filter(play_btn_a);
    dragger.filter(freq_slider_a); freq_slider_a.tick();
    dragger.filter(vol_slider_a); vol_slider_a.tick();

    clicker.filter(play_btn_b);
    dragger.filter(freq_slider_b); freq_slider_b.tick();
    dragger.filter(vol_slider_b); vol_slider_b.tick();

    clicker.flush();
    dragger.flush();
  };

  self.draw = function()
  {
    play_btn_a.draw(canv);
    freq_slider_a.draw(canv);
    vol_slider_a.draw(canv);

    strokeBox(freq_window_a,ctx);
    ctx.beginPath();
    ctx.moveTo(freq_window_a.x,freq_window_a.y+freq_window_a.h/2);
    for(var i = 0; i < freq_window_a.w; i++)
    {
      var x = (i/freq_window_a.w)/1000*5; //5ms
      var y = Math.sin(x*twopi*ab_a.freq);
      ctx.lineTo(freq_window_a.x+i,freq_window_a.y+freq_window_a.h/2-y*freq_window_a.h/2*ab_a.vol);
    }
    ctx.stroke();
    strokeBox(cycle_window_a,ctx);

    play_btn_b.draw(canv);
    freq_slider_b.draw(canv);
    vol_slider_b.draw(canv);

    strokeBox(freq_window_b,ctx);
    ctx.beginPath();
    ctx.moveTo(freq_window_b.x,freq_window_b.y+freq_window_b.h/2);
    for(var i = 0; i < freq_window_b.w; i++)
    {
      var x = (i/freq_window_b.w)/1000*5; //5ms
      var y = Math.sin(x*twopi*ab_b.freq);
      ctx.lineTo(freq_window_b.x+i,freq_window_b.y+freq_window_b.h/2-y*freq_window_b.h/2*ab_b.vol);
    }
    ctx.stroke();
    strokeBox(cycle_window_b,ctx);
  };

  self.cleanup = function()
  {
    clicker.detach(); clicker = null;
    dragger.detach(); dragger = null;
  };

};

