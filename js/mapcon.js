// Controls the board

var boardcon = {


    create_board: function () {
        let board = new maptalks.Map("board", {
            center: [0, 0],
            zoom: 4,
            pitch: 45
        });

        return board
    },


    create_spaces: function () {
        let row = 1;
        let col = 1;

        // Create spaces layer
        let spaces = new maptalks.VectorLayer('vector');

        blackPolyStyle = {
            lineWidth: 0,
            polygonFill: 'rgb(5,5,5)'
        };

        whitePolyStyle = {
            lineWidth: 0,
            polygonFill: 'rgb(255,255,255)'
        };
        // [X, Y]
        // [col, row]
        // Create spaces polygons
        let black = true;
        let id = 1;

        for (let rowI = 0; rowI < 9; rowI++) {
            for (let colI = 0; colI < 9; colI++) {
                let style = black ? blackPolyStyle : whitePolyStyle;
                let poly = new maptalks.Polygon([
                [
                    [col, row],
                    [col + 1, row],
                    [col + 1, row + 1],
                    [col, row + 1]
                ]
                ], {
                    symbol: style
                });
                poly.id = id;
                poly.location = [row, col]
                poly.midpoint = [row + 0.5, col + 0.5]
                poly.black = black;
                poly.on('click', function() {
                    console.log(poly.id, poly.location);
                })

                black = !black;
                id++;
                col++;
                poly.addTo(spaces);
            };
            col = 1;
            row++;
        };
        

        
        return spaces
    },


    create_pieces: function () {

    }
};
