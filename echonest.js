EchoNest = {
    getBPM : function(track, callback) {
        var artist = track.get("artist");
        var title = track.get("track");
        var id = track.get("id");
        id = "spotify-WW:track:"+id;
        var url = 'http://developer.echonest.com/api/v4/track/profile?api_key=N6E4NIOVYMTHNDM8J'+
            '&id='+id+
            '&bucket=audio_summary';
        $.ajax( {
                url:url,
                success: function(data) {
                    if (data.response.status.code === 0) {
                        var bpm = data.response.track.audio_summary.tempo;
                        console.info(bpm);
                        callback(track,bpm);
                    }
                    else {
                        console.info("Unable to find "+artist+"-"+title);
                        callback(null);
                    }
                },
                error:function(data, text, error) {
                    console.error("Fail loading! "+text+": "+error);
                }
            }
        );

    }
}