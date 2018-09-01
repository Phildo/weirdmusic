var audioboy = function()
{
  var self = this;
  self.buff_s = 0.05;
  var buff_channels = 1;
  self.filled_playhead_s = 0;
  self.filled_playhead_gap_s = 0;

  var playing = false;

  var actx = new window.AudioContext();
  var buff = actx.createBuffer(buff_channels, actx.sampleRate*self.buff_s, actx.sampleRate);
  var source;

  self.vol = 1;
  self.freq = 440;

  var fill = function()
  {
    if(!playing)
    {
      source = null;
      return;
    }
    source = actx.createBufferSource()
    for(var channel = 0; channel < buff.numberOfChannels; channel++)
    {
      var data = buff.getChannelData(channel);
      for(var i = 0; i < buff.length; i++)
      {
        var x = ((i/buff.length*self.buff_s)+self.filled_playhead_s)*twopi*self.freq;
        var y = Math.sin(x);
        data[i] = y*self.vol;
      }
    }
    self.filled_playhead_s += self.buff_s+self.filled_playhead_gap_s;

    source.buffer = buff;
    source.connect(actx.destination);
    source.loop = 0;
    source.onended = fill;
    source.start();
  }
  fill();

  self.play = function()
  {
    playing = true;
    if(!source) fill();
  }
  self.stop = function()
  {
    playing = false;
  }
}

