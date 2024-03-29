// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.data = [];

// * UI "global constructors"

// Defines width and height of each cell of the table
Alloy.Globals.cellWidthAndHeight = (columns) => {
    var cellWidthAndHeight = 0;

    if(columns === 2){
        if(Ti.Platform.name === "android"){
            if(Alloy.isTablet){
                if(Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) < 200){
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - (Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - 149);
                }else{
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - (Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - 229);
                }
            } else {
                if(Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) < 230){
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - 115;
                } else{
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - 190;
                }
            }
        } else {
            if(Alloy.isTablet){
                cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - 50;
            } else {
                if(Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) < 145){
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - 35;
                } else if(Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) > 145 && Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) < 165){
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - 44;
                }else{
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - 43;
                }
            }
        }
    } else {
        if(Ti.Platform.name === "android"){
            if(Alloy.isTablet){
                if(Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) - 145 < 100){
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) - (Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) - 160);
                }else{
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) - (Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) - 240);
                }
            } else {
                if(Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) - 145 < 100){
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) - (Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) - 170);
                }else{
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) - (Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) - 190);
                }
            }
        } else {
            if(Alloy.isTablet){
                cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) - 16;
            } else {
                if(Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) < 120){
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) + 40;
                } else if(Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) > 120 && Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) < 140 ){
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) + 35;
                }
                else{
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / 3) + 44;
                }
            }
        }
    }

    return cellWidthAndHeight;
};

// Creates a table as a grid with xGrid columns and yGrid rows
Alloy.Globals.setTable = (xGrid, yGrid, cellWidthAndHeight, horizontalPadding, data, arg = null, saturation = false) => {
    var tableData = [];
    var verticalPadding = 30;
    var cellIndex = 0;

    for (var y = 0; y < yGrid; y++){

        var row = Ti.UI.createTableViewRow({
            className : 'grid',
            layout : 'horizontal',
            height : cellWidthAndHeight + horizontalPadding,
            backgroundSelectedColor : 'transparent',
            backgroundColor: 'transparent'
        });

        var nameRow = ((Ti.Platform.name === "android") ? (Ti.UI.createTableViewRow({
            layout : 'horizontal',
            height : Ti.UI.SIZE,
            width : Ti.UI.SIZE,
            backgroundSelectedColor : 'transparent',
            backgroundColor: 'transparent',
            top : 5,
            bottom : 16,
        })) : undefined );

        for (var x = 0; x < xGrid; x++){
            if(data[cellIndex] != null){
                var view;

                if(Ti.Platform.name == "android"){
                    view = Ti.UI.Android.createCardView({
                        id : data[cellIndex].name,
                        left : verticalPadding,
                        right : verticalPadding,
                        height : cellWidthAndHeight,
                        width : cellWidthAndHeight,
                        borderRadius : 4,
                        borderWidth: 0,
                        elevation: 8
                    });
                }else{
                    view = Ti.UI.createView({
                        id : data[cellIndex].name,
                        left : verticalPadding,
                        right : verticalPadding,
                        height : cellWidthAndHeight,
                        width : cellWidthAndHeight,
                        viewShadowColor: 'rgba(0, 0, 0, 0.5)',
                        viewShadowRadius: 4,
                        viewShadowOffset: { x: 0, y: 8 }
                    });
                }

                var image = cellImage(cellWidthAndHeight, data[cellIndex]);
                view.add(image);

                if(saturation){
                    var imageSaturation = Ti.UI.createLabel({
                        height : cellWidthAndHeight,
                        width : cellWidthAndHeight,
                        borderRadius : 4,
                        borderWidth : 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        id : data[cellIndex].name,
                    });
                    view.add(imageSaturation);
                }

                var name = cellName(data[cellIndex]);

                if(nameRow != undefined){
                    var nameView = Ti.UI.createView({
                        left : verticalPadding,
                        right : verticalPadding,
                        height : Ti.UI.SIZE,
                        width : cellWidthAndHeight
                    });
        
                    nameView.add(name);
                    nameRow.add(nameView);
                }else{
                    view.add(name);
                }

                if(Alloy.Globals.data.length > 0){
                    Alloy.Globals.data.forEach(element => {
                        if(xGrid != 2 && xGrid != 4){
                            if(element.specie === data[cellIndex].name){
                                view.remove(imageSaturation);
                                view.add(selectedBackground(cellWidthAndHeight, 'rgba(255, 255, 255, 0.01)'));
                                view.add(selectedIconBackground());
                                view.add(selectedIcon());
                            } else if(element.divingSpot === data[cellIndex].name) {
                                view = addSelectionUIToView(view, xGrid);
                            } else if(element.litter === data[cellIndex].name){
                                view.add(selectedBackground(cellWidthAndHeight, 'rgba(255, 255, 255, 0.01)'));
                                view.add(selectedIconBackground());
                                view.add(selectedIcon());
                            } else if(element.litterType && element.litterType.includes(data[cellIndex].name) && element.litter === arg){
                                view.add(selectedBackground(cellWidthAndHeight, 'rgba(255, 255, 255, 0.01)'));
                                view.add(selectedIconBackground());
                                view.add(selectedIcon());
                            }
                        }else{
                            if(element.amount === data[cellIndex].name && element.specie === arg) {
                                view = addSelectionUIToView(view, yGrid);
                            } else if(element.duration === data[cellIndex].name){
                                view = addSelectionUIToView(view, yGrid);
                            } else if(element.diversAmount === data[cellIndex].name){
                                view = addSelectionUIToView(view, yGrid);
                            }
                        }
                    });
                }

                row.add(view);

                cellIndex++;
            } else {
                if(nameRow != undefined){
                    var nameView = Ti.UI.createView({
                        left : verticalPadding,
                        right : verticalPadding,
                        height : Ti.UI.SIZE,
                        width : cellWidthAndHeight
                    });
                    
                    nameView.add(cellName('', false));
                    nameRow.add(nameView);
                }
            }
        }

        if(nameRow != undefined){
            row.add(nameRow);
        }

        tableData.push(row);
    }

    return tableData;
};

function addSelectionUIToView (view, col) {
    view.add((col <= 2) ? selectedBackgroundFor2Col : selectedBackgroundFor3Col);
    view.add(selectedIconBackgroundVar);
    view.add(selectedIconVar);

    return view;
}

function cellName (data, hasText = true) {
    return Ti.UI.createLabel({
        bottom: (Ti.Platform.name === "android" ? 0 : -35),
        font : {
            fontSize : (Ti.Platform.name === "android" ? 20 : 22),
            fontFamily : 'Roboto-Regular'
        },
        color : 'rgba(0, 0, 0, 0.87)',
        text : (hasText ? data.name : ''),
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled : false,
        id : (hasText ? data.name : ''),
        maxLines : 1
    });
}

function cellImage (cellWidthAndHeight, data) {
    return Ti.UI.createImageView({
        image : data.logo,
        height : cellWidthAndHeight,
        width : cellWidthAndHeight,
        borderRadius : 4,
        borderWidth: 0,
        id : data.name,
        touchEnabled : false,
        backgroundColor: 'rgb(255, 255, 255)'
    });
};

function selectedBackground (cellWidthAndHeight, color) {
    return Ti.UI.createLabel({
        width : cellWidthAndHeight,
        height : cellWidthAndHeight,
        borderRadius : 4,
        borderWidth : 2,
        borderColor : '#2B8CCC',
        backgroundColor : color,
        touchEnabled: false
    });
};

function selectedIconBackground() {
    return Ti.UI.createLabel({
        width : (Ti.Platform.name === "android") ? 40 : 35,
        height : (Ti.Platform.name === "android") ? 40 : 35,
        borderRadius : (Ti.Platform.name === "android") ? 40 : 18,
        borderWidth : 0,
        backgroundColor : '#2B8CCC',
        top : 10,
        right : 10
    });
};

function selectedIcon () {
    return Ti.UI.createLabel({
        text : '✓',
        color : '#fff',
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        font : {
            fontSize : 30,
            fontFamily : 'Roboto-Regular'
        },
        top : 10,
        right : (Ti.Platform.name === "android") ? 16 : 14
    });
};

var selectedBackgroundFor2Col = selectedBackground(Alloy.Globals.cellWidthAndHeight(2), 'rgba(101, 167, 209, 0.15)');
var selectedBackgroundFor3Col = selectedBackground(Alloy.Globals.cellWidthAndHeight(3), 'rgba(255, 255, 255, 0.01)');
var selectedIconBackgroundVar = selectedIconBackground();
var selectedIconVar = selectedIcon();

Alloy.Globals.selectOnlyOne = (e, data, cellWidthAndHeight, col, choice) => {
    var cellIndex = 0;
    for(var x = 0; x < e.section.rows.length; x++){
        for (let y = 0; y < ((Ti.Platform.name === "android") ? e.section.rows[x].children.length - 1 : e.section.rows[x].children.length) ; y++) {
            e.section.rows[x].children[y].removeAllChildren();
            e.section.rows[x].children[y].add(cellImage(cellWidthAndHeight, data[cellIndex]));

            if(Ti.Platform.name !== "android"){
                e.section.rows[x].children[y].add(cellName(data[cellIndex]));
            }
            
            if(choice === e.section.rows[x].children[y].id){
                e.section.rows[x].children[y].add((col <= 2) ? selectedBackgroundFor2Col : selectedBackgroundFor3Col);
                e.section.rows[x].children[y].add(selectedIconBackgroundVar);
                e.section.rows[x].children[y].add(selectedIconVar);
            }

            cellIndex++;
        }
    }
};

Alloy.Globals.select = (e, data, cellWidthAndHeight, choices) => {
    var cellIndex = 0;
    for(var x = 0; x < e.section.rows.length; x++){
        for (let y = 0; y < ((Ti.Platform.name === "android") ? e.section.rows[x].children.length - 1 : e.section.rows[x].children.length) ; y++) {
            e.section.rows[x].children[y].removeAllChildren();
            e.section.rows[x].children[y].add(cellImage(cellWidthAndHeight, data[cellIndex]));

            if(Ti.Platform.name !== "android"){
                e.section.rows[x].children[y].add(cellName(data[cellIndex]));
            }
            
            choices.forEach(element => {
                if(element === e.section.rows[x].children[y].id){
                    e.section.rows[x].children[y].add(selectedBackground(cellWidthAndHeight, 'rgba(255, 255, 255, 0)'));
                    e.section.rows[x].children[y].add(selectedIconBackground());
                    e.section.rows[x].children[y].add(selectedIcon());
                }
            });

            cellIndex++;
        }
    }        
};