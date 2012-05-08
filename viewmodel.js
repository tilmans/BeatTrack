var TrackModel = Backbone.Model.extend({
    defaults:{
        artist:"None",
        title:"Title",
        track:null,
        id:"None",
        bpm:0
    },
    initialize:function() {
        console.info("Creating TrackModel instance");
    }
});

var TrackCollection = Backbone.Collection.extend({
    model:TrackModel,
    comparator:function(track) {
        return track.get("bpm");
    }
});

var TableView = Backbone.View.extend({
    render:function() {
        console.info("Render Table View");
        var table =
            "<table>"+
            "<thead><td>Artist</td><td>Title</td><td>BPM</td></thead>";
        this.collection.each(function(t) {
            table += "<tr>"+
                "<td>"+t.get("artist")+"</td>"+
                "<td>"+t.get("title")+"</td>"+
                "<td>"+t.get("bpm")+"</td></tr>";
        });
        table += "</table>";
        $(this.el).html(table);
    }
});
