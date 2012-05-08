sp = getSpotifyApi(1);
models = sp.require("sp://import/scripts/api/models");
views = sp.require("sp://import/scripts/api/views");
ui = sp.require("sp://import/scripts/ui");
player = models.player;
library = models.library;
application = models.application;
playerImage = new views.Player();
tracksToLoad = [];

// Handle items 'dropped' on your icon
application.observe(models.EVENT.LINKSCHANGED, handleLinks);
function handleLinks() {
    console.log("Handling links");

    // Playlist link: "spotify:user:tilmans:playlist:1QJT8yzAXcEBoOYwFlBlC1"
    var links = models.application.links;
    allTracks = new TrackCollection();
    if(links.length) {
        switch(links[0].split(":")[3]) {
            case "playlist":
                tracksToLoad = 0;
                var playlist = models.Playlist.fromURI(links[0], function() {console.log("Done loading")});
                for (var it=0; it<playlist.length; it++) {
                    var item = playlist.get(it);
                    var id = item.uri.split(":")[2];
                    var artist = item.artists[0].name;
                    var title = item.name;
                    var track = new TrackModel();
                    track.set({
                        id:id,
                        title:title,
                        artist:artist,
                        track:item,
                        error:function(error){console.error("Error")}
                    });
                    allTracks.push(track);
                    tracksToLoad++;
                    EchoNest.getBPM(track, function(calledTrack,bpm) {
                        tracksToLoad--;
                        if (calledTrack === null) {
                            console.error("Unable to find BPM for "+artist+"-"+title);
                        } else {
                            calledTrack.set("bpm",bpm);
                        }
                        if (tracksToLoad == 0) {
                            console.log("All loaded: Render!");
                            allTracks.sort();
                            table = new TableView({collection:allTracks});
                            table.setElement($("#backbone"));

                            table.render();
                        }
                    });
                }
                break;
            default:
                // Play the given item
                player.play(models.Track.fromURI(links[0]));
                break;
        }
    }
}
